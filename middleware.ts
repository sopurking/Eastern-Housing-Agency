import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Let client-side handle admin authorization
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};