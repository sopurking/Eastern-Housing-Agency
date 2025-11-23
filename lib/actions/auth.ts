"use server"

import { signIn, signOut } from "@/auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function login() {
  await signIn("google")
}

export async function logout() {
  cookies().delete("token")
  await signOut()
  redirect("/")
}
