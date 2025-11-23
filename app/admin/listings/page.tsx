"use client";

import React, { useEffect, useState } from "react";
import DataTable from "@/components/admin/DataTable";
import { getProperties, deleteProperty } from "@/lib/actions/listings.actions";

type Property = {
  id: string;
  title: string;
  city: string;
  state: string;
  type: string;
  price: number;
  status: string;
};

export default function AdminListingsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    const result = await getProperties();
    if (result.success && result.properties) {
      setProperties(result.properties as Property[]);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;
    
    const result = await deleteProperty(id);
    if (result.success) {
      fetchProperties();
    } else {
      alert(result.error);
    }
  };

  const filtered = properties.filter((r) => {
    const q = query.toLowerCase();
    const matchesQ = !q || r.title.toLowerCase().includes(q) || r.city.toLowerCase().includes(q) || r.type.toLowerCase().includes(q);
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
        <button 
          onClick={() => window.location.href = '/admin/listings/new'}
          className="px-4 py-2 bg-[#2da3dd] hover:bg-[#278fbe] text-white rounded-lg font-semibold"
        >
          New Listing
        </button>
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

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      ) : (
        <DataTable
          columns={["Title", "Location", "Type", "Price", "Status", "Actions"]}
          rows={filtered.map((r) => [
            r.title,
            `${r.city}, ${r.state}`,
            r.type.charAt(0).toUpperCase() + r.type.slice(1),
            `₦${r.price.toLocaleString()}`,
            r.status.charAt(0).toUpperCase() + r.status.slice(1),
            <div key={r.id} className="flex gap-2">
              <button 
                onClick={() => window.location.href = `/properties/${r.id}`}
                className="px-3 py-1.5 text-xs rounded border border-gray-200 hover:bg-gray-50"
              >
                View
              </button>
              <button 
                onClick={() => window.location.href = `/admin/listings/${r.id}/edit`}
                className="px-3 py-1.5 text-xs rounded border border-gray-200 hover:bg-gray-50"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(r.id)}
                className="px-3 py-1.5 text-xs rounded border border-red-200 text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </div>,
          ])}
        />
      )}
    </div>
  );
}
