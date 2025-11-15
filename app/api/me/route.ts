import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { verifyJwt } from "@/lib/jwt";

export async function GET(req: NextRequest) {
  try {
    // Use NextRequest's cookies API
    const token = req.cookies.get("token")?.value;

    if (!token) return NextResponse.json({ user: null }, { status: 401 });

    const decoded = verifyJwt(token);

    if (!decoded || typeof decoded === "string")
      return NextResponse.json({ user: null }, { status: 401 });

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { name: true, email: true, id: true },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ user: null, error: "Server error" }, { status: 500 });
  }
}
