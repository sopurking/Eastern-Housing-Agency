"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateProfile(data: { name?: string; email?: string }) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.email && { email: data.email }),
      },
    });

    revalidatePath("/admin/settings");
    return { success: true, user };
  } catch (error) {
    console.error("Update profile error:", error);
    return { error: "Failed to update profile" };
  }
}

export async function getSystemStats() {
  try {
    const [dbSize, userCount, propertyCount] = await Promise.all([
      prisma.$queryRaw`SELECT pg_size_pretty(pg_database_size(current_database())) as size`,
      prisma.user.count(),
      prisma.property.count(),
    ]);

    return {
      success: true,
      stats: {
        database: dbSize[0]?.size || "N/A",
        users: userCount,
        properties: propertyCount,
      },
    };
  } catch (error) {
    return {
      success: true,
      stats: { database: "N/A", users: 0, properties: 0 },
    };
  }
}
