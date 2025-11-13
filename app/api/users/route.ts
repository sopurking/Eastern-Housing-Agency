// app/api/users/route.ts (Next.js App Router)
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs"; // for password hashing
import test from "node:test";

export async function POST(req: NextRequest) {
  try {
    const { email, name,password }=await req.json();
    console.log(email, name,password)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 8);
    // interface test{
    //   data:{
    //     email:string;
    //     name:string;
    //     password:string;
    //   }
    // }

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
