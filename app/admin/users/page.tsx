"use client";

import React, { useMemo, useState } from "react";
import DataTable from "@/components/admin/DataTable";

export default function AdminUsersPage() {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("all");

  const rows = useMemo(
    () => [
      { id: 1, name: "Jane Doe", email: "jane@example.com", role: "Admin", joined: "2025-01-02" },
      { id: 2, name: "John Smith", email: "john@example.com", role: "User", joined: "2025-01-10" },
      { id: 3, name: "Mary Johnson", email: "mary@example.com", role: "User", joined: "2024-12-28" },
    ],
    []
  );

  const filtered = rows.filter((r) => {
    const q = query.toLowerCase();
    const matchesQ = !q || r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q);
    const matchesRole = role === "all" || r.role.toLowerCase() === role;
    return matchesQ && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">Users</h1>
          <p className="text-gray-600 text-sm">Manage user accounts and roles</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search users..."
          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2da3dd]"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2da3dd]"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>

      <DataTable
        columns={["Name", "Email", "Role", "Joined", "Actions"]}
        rows={filtered.map((r) => [
          r.name,
          r.email,
          r.role,
          r.joined,
          <div key={r.id} className="flex gap-2">
            <button className="px-3 py-1.5 text-xs rounded border border-gray-200 hover:bg-gray-50">View</button>
            <button className="px-3 py-1.5 text-xs rounded border border-gray-200 hover:bg-gray-50">Disable</button>
          </div>,
        ])}
      />
    </div>
  );
}
