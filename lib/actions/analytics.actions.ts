"use server";

import prisma from "@/lib/prisma";

export async function getDashboardStats() {
  try {
    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const last1Hour = new Date(now.getTime() - 60 * 60 * 1000);

    const [
      totalListings,
      activeListings,
      pendingListings,
      totalUsers,
      recentUsers,
      listingsByState,
      activeUsersNow,
      activeUsersToday,
    ] = await Promise.all([
      prisma.property.count(),
      prisma.property.count({ where: { status: "active" } }),
      prisma.property.count({ where: { status: "pending" } }),
      prisma.user.count(),
      prisma.user.count({
        where: {
          createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        },
      }),
      prisma.property.groupBy({
        by: ["state"],
        _count: { id: true },
        where: { status: "active" },
        orderBy: { _count: { id: "desc" } },
        take: 5,
      }),
      prisma.$queryRaw`
        SELECT COUNT(DISTINCT "userId") as count
        FROM "PageView"
        WHERE "userId" IS NOT NULL AND "createdAt" >= ${last1Hour}
      `,
      prisma.$queryRaw`
        SELECT COUNT(DISTINCT "userId") as count
        FROM "PageView"
        WHERE "userId" IS NOT NULL AND "createdAt" >= ${last24Hours}
      `,
    ]);

    return {
      success: true,
      stats: {
        totalListings,
        activeListings,
        pendingListings,
        totalUsers,
        recentUsers,
        activeUsersNow: Number(activeUsersNow[0]?.count || 0),
        activeUsersToday: Number(activeUsersToday[0]?.count || 0),
        listingsByState: listingsByState.map((s) => ({
          state: s.state,
          count: s._count.id,
        })),
      },
    };
  } catch (error) {
    console.error("Get dashboard stats error:", error);
    return { error: "Failed to fetch stats" };
  }
}

export async function getAnalytics() {
  try {
    const now = new Date();
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const last1Hour = new Date(now.getTime() - 60 * 60 * 1000);

    const [propertyTypes, statusBreakdown, priceRanges, totalViews, last7DaysViews, userViews, adminViews, dailyViews, activeUsers] = await Promise.all([
      prisma.property.groupBy({
        by: ["type"],
        _count: { id: true },
        where: { status: "active" },
      }),
      prisma.property.groupBy({
        by: ["status"],
        _count: { id: true },
      }),
      prisma.$queryRaw`
        SELECT 
          CASE 
            WHEN price < 50000000 THEN 'Under 50M'
            WHEN price < 100000000 THEN '50M - 100M'
            WHEN price < 200000000 THEN '100M - 200M'
            ELSE 'Above 200M'
          END as range,
          COUNT(*) as count
        FROM "Property"
        WHERE status = 'active'
        GROUP BY range
        ORDER BY MIN(price)
      `,
      prisma.pageView.count(),
      prisma.pageView.count({ where: { createdAt: { gte: last7Days } } }),
      prisma.pageView.count({ where: { userRole: "user" } }),
      prisma.pageView.count({ where: { userRole: "admin" } }),
      prisma.$queryRaw`
        SELECT DATE("createdAt") as date, COUNT(*) as views
        FROM "PageView"
        WHERE "createdAt" >= ${last30Days}
        GROUP BY DATE("createdAt")
        ORDER BY date
      `,
      prisma.$queryRaw`
        SELECT DISTINCT "userId", "userRole", MAX("createdAt") as "lastActive"
        FROM "PageView"
        WHERE "userId" IS NOT NULL
        GROUP BY "userId", "userRole"
        ORDER BY "lastActive" DESC
      `,
    ]);

    // Calculate active users
    const activeUsersLast24h = activeUsers.filter(
      (u: any) => new Date(u.lastActive) >= last24Hours
    ).length;
    const activeUsersLast1h = activeUsers.filter(
      (u: any) => new Date(u.lastActive) >= last1Hour
    ).length;

    return {
      success: true,
      analytics: {
        propertyTypes: propertyTypes.map((t) => ({
          type: t.type,
          count: t._count.id,
        })),
        statusBreakdown: statusBreakdown.map((s) => ({
          status: s.status,
          count: s._count.id,
        })),
        priceRanges,
        visitors: {
          total: totalViews,
          last7Days: last7DaysViews,
          users: userViews,
          admins: adminViews,
          guests: totalViews - userViews - adminViews,
          activeNow: activeUsersLast1h,
          activeToday: activeUsersLast24h,
          totalUniqueUsers: activeUsers.length,
        },
        dailyViews,
        activeUsers: activeUsers.slice(0, 10).map((u: any) => ({
          userId: u.userId,
          role: u.userRole,
          lastActive: u.lastActive,
        })),
      },
    };
  } catch (error) {
    console.error("Get analytics error:", error);
    return { error: "Failed to fetch analytics" };
  }
}
