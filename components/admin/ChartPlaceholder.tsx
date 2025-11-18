"use client";

import React from "react";

export default function ChartPlaceholder({ title, className = "" }: { title: string; className?: string }) {
  return (
    <div className={`bg-white border border-gray-200 rounded-2xl p-5 shadow-sm ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <div className="text-xs text-gray-500">Placeholder</div>
      </div>
      <div className="mt-4 h-52 bg-gray-50 border border-dashed border-gray-200 rounded-xl" />
    </div>
  );
}
