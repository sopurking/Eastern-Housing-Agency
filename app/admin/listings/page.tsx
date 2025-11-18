"use client";

import React, { useMemo, useState } from "react";
import DataTable from "@/components/admin/DataTable";

export default function AdminListingsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  const rows = useMemo(
    () => [
      { id: 1, title: "Luxury 4-Bedroom Duplex", location: "Enugu", type: "Duplex", price: "₦85,000,000", status: "Active" },
      { id: 2, title: "Modern 3-Bedroom Apartment", location: "Owerri", type: "Apartment", price: "₦45,000,000", status: "Pending" },
      { id: 3, title: "Cozy Bungalow", location: "Enugu", type: "House", price: "₦35,000,000", status: "Archived" },
    ],
    []
  );

  const filtered = rows.filter((r) => {
    const q = query.toLowerCase();
    const matchesQ = !q || r.title.toLowerCase().includes(q) || r.location.toLowerCase().includes(q) || r.type.toLowerCase().includes(q);
    const matchesStatus = status === "all" || r.status.toLowerCase() === status;
    return matchesQ && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">Listings</h1>
          <p className="text-gray-600 text-sm">Manage all property listings</p>
        </div>
        <button className="px-4 py-2 bg-[#2da3dd] hover:bg-[#278fbe] text-white rounded-lg font-semibold">New Listing</button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search listings..."
          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2da3dd]"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2da3dd]"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <DataTable
        columns={["Title", "Location", "Type", "Price", "Status", "Actions"]}
        rows={filtered.map((r) => [
          r.title,
          r.location,
          r.type,
          r.price,
          r.status,
          <div key={r.id} className="flex gap-2">
            <button className="px-3 py-1.5 text-xs rounded border border-gray-200 hover:bg-gray-50">View</button>
            <button className="px-3 py-1.5 text-xs rounded border border-gray-200 hover:bg-gray-50">Edit</button>
            <button className="px-3 py-1.5 text-xs rounded border border-red-200 text-red-600 hover:bg-red-50">Archive</button>
          </div>,
        ])}
      />
    </div>
  );
}
