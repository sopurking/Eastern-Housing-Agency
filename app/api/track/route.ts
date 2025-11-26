import { NextRequest, NextResponse } from "next/server";
import { trackPageView } from "@/lib/tracking";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  try {
    const { path } = await request.json();
    const session = await auth();
    
    await trackPageView({
      path,
      userId: session?.user?.id,
      userRole: session?.user?.role,
      ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip"),
      userAgent: request.headers.get("user-agent"),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to track" }, { status: 500 });
  }
}
