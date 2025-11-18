"use client";

import React from "react";

export default function DataTable({ columns, rows }: { columns: string[]; rows: (React.ReactNode | string)[][] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              {columns.map((c) => (
                <th key={c} className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600 border-b border-gray-200">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/60">
                {r.map((cell, j) => (
                  <td key={j} className="px-4 py-3 text-sm text-gray-700 align-middle">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
