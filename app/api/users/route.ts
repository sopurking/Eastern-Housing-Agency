import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signJwt } from "@/lib/jwt";
import { serialize } from "cookie";

export async function POST(req: Request) {
  try {
    const { email, name, password } = await req.json();

    // Check if user exists
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 8);
      user = await prisma.user.create({
        data: { email, name, password: hashedPassword },
      });
    }

    // Create JWT
    const token = signJwt({ id: user.id, email: user.email });

    // Set cookie
    const cookie = serialize("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return NextResponse.json({ user }, { status: 200, headers: { "Set-Cookie": cookie } });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
