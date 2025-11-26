import prisma from "@/lib/prisma";

export async function trackPageView(data: {
  path: string;
  userId?: string;
  userRole?: string;
  ip?: string;
  userAgent?: string;
}) {
  try {
    await prisma.pageView.create({ data });
  } catch (error) {
    console.error("Track page view error:", error);
  }
}
