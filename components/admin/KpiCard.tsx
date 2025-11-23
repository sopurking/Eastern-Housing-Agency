"use client";

import React from "react";

export default function KpiCard({ label, value, trend, color, className = "" }: {
  label: string;
  value: string;
  trend?: string;
  color?: string;
  className?: string;
}) {
  return (
    <div className={`bg-white border border-gray-200 rounded-2xl p-5 shadow-sm ${className}`}>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="mt-2 flex items-baseline gap-2">
        <div className="text-2xl font-extrabold tracking-tight text-black">{value}</div>
        {trend && (
          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            {trend}
          </span>
        )}
      </div>
      {color && (
        <div className="mt-4 h-1.5 w-full rounded-full" style={{ backgroundColor: color, opacity: 0.3 }} />
      )}
    </div>
  );
}
