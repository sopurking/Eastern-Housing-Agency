"use client";

import React from "react";
import ChartPlaceholder from "@/components/admin/ChartPlaceholder";

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">Analytics</h1>
        <p className="text-gray-600 text-sm">Traffic and engagement insights</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <ChartPlaceholder title="Daily Visitors" className="lg:col-span-2" />
        <ChartPlaceholder title="Devices" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <ChartPlaceholder title="Top Locations" />
        <ChartPlaceholder title="Bounce Rate" />
      </div>
    </div>
  );
}
