"use server"

import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { signJwt } from "@/lib/jwt"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

export async function createUser(email: string, name: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 8)
  
  const user = await prisma.user.create({
    data: { email, name, password: hashedPassword }
  })

  const token = signJwt({ id: user.id, email: user.email })
  cookies().set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 7 * 24 * 60 * 60
  })

  revalidatePath("/")
  return { success: true, user }
}

export async function getCurrentUser() {
  const token = cookies().get("token")?.value
  if (!token) return null

  try {
    const decoded = signJwt(token)
    if (!decoded || typeof decoded === "string") return null

    return await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { name: true, email: true, id: true }
    })
  } catch {
    return null
  }
}

export async function getAllUsers() {
  console.log("🔍 [getAllUsers] Fetching all users...");

  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });

    console.log(`✅ [getAllUsers] Retrieved ${users.length} users`);
    return { success: true, users };
  } catch (error) {
    console.error("💥 [getAllUsers] Error fetching users:", error);
    return { error: "Failed to fetch users" };
  }
}

export async function updateUser(
  id: string,
  updates: {
    email?: string;
    name?: string;
    role?: string;
    password?: string;
    image?: string;
  }
) {
  console.log("✏️ [updateUser] Incoming update request:", { id, updates });

  try {
    const data: any = {};

    // Only update if provided
    if (updates.email) data.email = updates.email;
    if (updates.name) data.name = updates.name;
    if (updates.role) data.role = updates.role;
    if (updates.image) data.image = updates.image;

    // Hash password if provided
    if (updates.password) {
      console.log("🔐 [updateUser] Hashing new password...");
      data.password = await bcrypt.hash(updates.password, 8);
    }

    console.log("🛠️ [updateUser] Updating user with data:", data);

    const updatedUser = await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    console.log("✅ [updateUser] User updated successfully:", updatedUser);

    revalidatePath("/admin/users");
    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("💥 [updateUser] Error updating user:", error);
    return { error: "Failed to update user" };
  }
}

export async function deleteUser(id: string) {
  console.log("🗑️ [deleteUser] Attempting delete:", id);

  try {
    await prisma.user.delete({ where: { id } });
    console.log("✅ [deleteUser] User deleted successfully");

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("💥 [deleteUser] Error deleting user:", error);
    return { error: "Failed to delete user" };
  }
}
