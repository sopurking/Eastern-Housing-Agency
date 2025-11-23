import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({ user: session.user }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ user: null, error: "Server error" }, { status: 500 });
  }
}
