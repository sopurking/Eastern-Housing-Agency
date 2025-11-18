"use client";

import React from "react";
import KpiCard from "@/components/admin/KpiCard";
import ChartPlaceholder from "@/components/admin/ChartPlaceholder";

export default function AdminDashboardPage() {
  const kpis = [
    { label: "Total Listings", value: "2,500", trend: "+4.2%", color: "#2da3dd" },
    { label: "Active Listings", value: "1,820", trend: "+1.1%", color: "#1e55a7" },
    { label: "Pending Approvals", value: "64", trend: "-0.5%", color: "#0d2549" },
    { label: "Total Users", value: "10,342", trend: "+2.3%", color: "#2da3dd" },
    { label: "New Signups", value: "187", trend: "+8.7%", color: "#1e55a7" },
    { label: "Visitors Today", value: "3,420", trend: "+12.1%", color: "#0d2549" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Monitor your platform at a glance</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpis.map((k) => (
          <KpiCard key={k.label} label={k.label} value={k.value} trend={k.trend} color={k.color} />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <ChartPlaceholder title="Traffic (Last 7 days)" className="lg:col-span-2" />
        <ChartPlaceholder title="Listings by State" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <ChartPlaceholder title="New Signups (30 days)" />
        <ChartPlaceholder title="Conversion Rate" />
      </div>
    </div>
  );
}
