"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProperty(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    console.error('❌ Unauthorized access attempt');
    return { error: "Unauthorized" };
  }

  console.log('🔐 User authenticated:', session.user.id);
  console.log('📝 Received form data keys:', Array.from(formData.keys()));

  try {
    // Extract and log all form data
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const state = formData.get("state") as string;
    const city = formData.get("city") as string;
    const location = formData.get("location") as string;
    const type = formData.get("type") as string;
    const price = parseInt(formData.get("price") as string);
    const beds = formData.get("beds") ? parseInt(formData.get("beds") as string) : null;
    const baths = formData.get("baths") ? parseInt(formData.get("baths") as string) : null;
    const featured = formData.get("featured") === "true";
    const status = formData.get("status") as string || "active";
    
    // Parse media URLs
    const imagesRaw = formData.get("images") as string || "[]";
    const videosRaw = formData.get("videos") as string || "[]";
    
    console.log('🖼️ Raw images data:', imagesRaw);
    console.log('🎥 Raw videos data:', videosRaw);
    
    const images = JSON.parse(imagesRaw).filter((url: string) => url);
    const videos = JSON.parse(videosRaw).filter((url: string) => url);
    
    console.log('🖼️ Parsed images:', images);
    console.log('🎥 Parsed videos:', videos);
    
    const propertyData = {
      title,
      description,
      state,
      city,
      location,
      type,
      price,
      beds,
      baths,
      images,
      videos,
      featured,
      status,
      createdBy: session.user.id,
    };
    
    console.log('💾 Property data to save:', propertyData);

    const property = await prisma.property.create({
      data: propertyData,
    });

    console.log('✅ Property created successfully:', {
      id: property.id,
      title: property.title,
      imagesCount: property.images.length,
      videosCount: property.videos.length
    });

    revalidatePath("/admin/listings");
    return { success: true, property };
  } catch (error) {
    console.error("💥 Create property error:", error);
    return { error: "Failed to create property" };
  }
}

export async function updateProperty(id: string, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  try {
    // Helpers
    const getString = (key: string) => {
      const val = formData.get(key);
      return val === undefined || val === null ? "" : String(val);
    };

    const getNumber = (key: string) => {
      const val = formData.get(key);
      return val ? Number(val) : null;
    };

    const parseJSON = (key: string) => {
      const raw = getString(key);
      try {
        return JSON.parse(raw || "[]").filter((x: string) => x);
      } catch {
        return [];
      }
    };

    const property = await prisma.property.update({
      where: { id },
      data: {
        title: getString("title"),
        description: getString("description"),
        state: getString("state"),
        city: getString("city"),
        location: getString("location"),
        type: getString("type"),
        price: Number(getString("price") || 0),
        beds: getNumber("beds"),
        baths: getNumber("baths"),

        images: parseJSON("images"),
        videos: parseJSON("videos"),

        featured: getString("featured") === "true",
        status: getString("status") || "active",
      },
    });

    revalidatePath("/admin/listings");
    return { success: true, property };
  } catch (error) {
    console.error("Update property error:", error);
    return { error: "Failed to update property" };
  }
}

export async function deleteProperty(id: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  try {
    const property = await prisma.property.findUnique({ where: { id } });
    if (!property) return { error: "Property not found" };

    // Delete media from Cloudinary
    const allMedia = [...(property.images || []), ...(property.videos || [])];
    for (const url of allMedia) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/delete`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url })
        });
      } catch (err) {
        console.error('Failed to delete media:', url);
      }
    }

    await prisma.property.delete({ where: { id } });

    revalidatePath("/admin/listings");
    return { success: true };
  } catch (error) {
    console.error("Delete property error:", error);
    return { error: "Failed to delete property" };
  }
}

export async function getProperties(filters?: {
  state?: string;
  city?: string;
  type?: string;
  status?: string;
  featured?: boolean;
}) {
  try {
    const properties = await prisma.property.findMany({
      where: {
        ...(filters?.state && { state: filters.state }),
        ...(filters?.city && { city: filters.city }),
        ...(filters?.type && { type: filters.type }),
        ...(filters?.status && { status: filters.status }),
        ...(filters?.featured !== undefined && { featured: filters.featured }),
      },
      include: {
        creator: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, properties };
  } catch (error) {
    console.error("Get properties error:", error);
    return { error: "Failed to fetch properties" };
  }
}

export async function getPropertyById(id: string) {
  try {
    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!property) {
      return { error: "Property not found" };
    }

    return { success: true, property };
  } catch (error) {
    console.error("Get property error:", error);
    return { error: "Failed to fetch property" };
  }
}

export async function getLocations() {
  try {
    const properties = await prisma.property.findMany({
      where: { status: "active" },
      select: {
        state: true,
        city: true,
      },
    });

    const locationMap = new Map<string, Set<string>>();
    
    properties.forEach(({ state, city }) => {
      if (!locationMap.has(state)) {
        locationMap.set(state, new Set());
      }
      locationMap.get(state)!.add(city);
    });

    const locations = Array.from(locationMap.entries()).map(([state, cities]) => ({
      state,
      cities: Array.from(cities).sort(),
    })).sort((a, b) => a.state.localeCompare(b.state));

    return { success: true, locations };
  } catch (error) {
    console.error("Get locations error:", error);
    return { error: "Failed to fetch locations" };
  }
}
