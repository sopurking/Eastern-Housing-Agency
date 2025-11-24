"use client";

import React, { useEffect, useState } from "react";
import DataTable from "@/components/admin/DataTable";
import PropertyModal from "@/components/admin/PropertyModal";
import PropertyDetailsModal from "@/components/admin/PropertyDetailsModal";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import { getProperties, deleteProperty } from "@/lib/actions/listings.actions";

// Type definition for a property
type Property = {
  id: string;
  title: string;
  description: string;
  city: string;
  state: string;
  location: string;
  type: string;
  price: number;
  beds: number | null;
  baths: number | null;
  images: string[];
  videos: string[];
  featured: boolean;
  status: string;
};

export default function AdminListingsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [editProperty, setEditProperty] = useState<Property | null>(null);
  const [viewProperty, setViewProperty] = useState<Property | null>(null);
  const [deleteProperty, setDeleteProperty] = useState<Property | null>(null);

  // 1. Initial Data Fetch
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

  // 2. Real-time Delete Handler (Optimistic Update)
  const handleDeleteConfirm = async () => {
    if (!deleteProperty) return;
    
    const id = deleteProperty.id;
    setDeleteProperty(null);
    
    // --- OPTIMISTIC UPDATE START ---
    const originalProperties = properties;
    setProperties(prev => prev.filter(p => p.id !== id));
    
    const { deleteProperty: deletePropertyAction } = await import('@/lib/actions/listings.actions');
    const result = await deletePropertyAction(id);
    
    if (!result.success) {
      alert(`Failed to delete property: ${result.error}`);
      setProperties(originalProperties); 
    }
    // --- OPTIMISTIC UPDATE END ---
  };

  // 3. Filtering Logic
  const filtered = properties.filter((r) => {
    const q = query.toLowerCase();
    const matchesQ = 
      !q || 
      r.title.toLowerCase().includes(q) || 
      r.city.toLowerCase().includes(q) || 
      r.type.toLowerCase().includes(q);
      
    const matchesStatus = status === "all" || r.status.toLowerCase() === status;
    return matchesQ && matchesStatus;
  });

  // 4. Component Render
  return (
    <div className="space-y-6">
      {/* Header and Add Button */}
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

      {/* Filters and Search */}
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

      {/* DataTable / Loading State */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading properties...</p>
        </div>
      ) : filtered.length === 0 && (query || status !== 'all') ? (
        <div className="text-center py-12 text-gray-500">
          No listings match your current filter criteria.
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
                onClick={() => setViewProperty(r)}
                className="px-3 py-1.5 text-xs rounded border border-gray-200 hover:bg-gray-50"
              >
                View
              </button>
              <button 
                onClick={() => setEditProperty(r)}
                className="px-3 py-1.5 text-xs rounded border border-gray-200 hover:bg-gray-50"
              >
                Edit
              </button>
              <button 
                onClick={() => setDeleteProperty(r)}
                className="px-3 py-1.5 text-xs rounded border border-red-200 text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </div>,
          ])}
        />
      )}

      {/* Edit Modal */}
      {editProperty && (
        <PropertyModal
          open={true}
          onClose={() => setEditProperty(null)}
          property={editProperty}
          onUpdated={fetchProperties}
        />
      )}

      {/* View Details Modal */}
      {viewProperty && (
        <PropertyDetailsModal
          open={true}
          onClose={() => setViewProperty(null)}
          property={viewProperty}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteProperty && (
        <DeleteConfirmModal
          open={true}
          onClose={() => setDeleteProperty(null)}
          onConfirm={handleDeleteConfirm}
          propertyTitle={deleteProperty.title}
        />
      )}
    </div>
  );
}