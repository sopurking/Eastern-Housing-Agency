
import { NextResponse } from "next/server";

export async function POST() {
  // Clear the auth cookie
  const response = NextResponse.json({ message: "Logged out successfully" });
  response.cookies.set({
    name: "token",      // your JWT cookie name
    value: "",
    httpOnly: true,
    path: "/",
    maxAge: 0,          // expire immediately
  });
  return response;
}
