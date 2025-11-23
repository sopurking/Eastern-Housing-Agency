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