"use client";

import React, { useEffect, useState } from "react";
import DataTable from "@/components/admin/DataTable";
import PropertyModal from "@/components/admin/PropertyModal";
import PropertyDetailsModal from "@/components/admin/PropertyDetailsModal";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import { getProperties } from "@/lib/actions/listings.actions";
import {
  Home,
  Search,
  Filter,
  Plus,
  MapPin,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  Archive,
  Building,
} from "lucide-react";

export default function AdminListingsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editProperty, setEditProperty] = useState(null);
  const [viewProperty, setViewProperty] = useState(null);
  const [deletePropertyState, setDeletePropertyState] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    const result = await getProperties();
    if (result.success && result.properties) {
      setProperties(result.properties);
    }
    setLoading(false);
  };

  const handleDeleteConfirm = async () => {
    if (!deletePropertyState) return;
    
    const id = deletePropertyState.id;
    setDeletePropertyState(null);
    
    const originalProperties = properties;
    setProperties(prev => prev.filter(p => p.id !== id));
    
    const { deleteProperty: deletePropertyAction } = await import('@/lib/actions/listings.actions');
    const result = await deletePropertyAction(id);
    
    if (!result.success) {
      alert(`Failed to delete property: ${result.error}`);
      setProperties(originalProperties); 
    }
  };

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

  // Calculate stats
  const totalListings = properties.length;
  const activeCount = properties.filter(p => p.status === 'active').length;
  const pendingCount = properties.filter(p => p.status === 'pending').length;
  const archivedCount = properties.filter(p => p.status === 'archived').length;
  const featuredCount = properties.filter(p => p.featured).length;

  const getStatusIcon = (status) => {
    switch(status.toLowerCase()) {
      case 'active': return <CheckCircle className="w-3 h-3" />;
      case 'pending': return <Clock className="w-3 h-3" />;
      case 'archived': return <Archive className="w-3 h-3" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'archived': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                Property Listings
              </h1>
              <p className="text-gray-700 text-sm">Manage all property listings and details</p>
            </div>
          </div>
          
          <button 
            onClick={() => window.location.href = '/admin/listings/new'}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-sm hover:shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            New Listing
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-blue-200">
            <div className="flex items-center gap-2 mb-1">
              <Building className="w-4 h-4 text-blue-600" />
              <p className="text-xs text-gray-600 font-semibold">TOTAL</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalListings}</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-green-200">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <p className="text-xs text-gray-600 font-semibold">ACTIVE</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{activeCount}</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-amber-200">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-amber-600" />
              <p className="text-xs text-gray-600 font-semibold">PENDING</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-gray-300">
            <div className="flex items-center gap-2 mb-1">
              <Archive className="w-4 h-4 text-gray-600" />
              <p className="text-xs text-gray-600 font-semibold">ARCHIVED</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{archivedCount}</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-purple-200">
            <div className="flex items-center gap-2 mb-1">
              <Home className="w-4 h-4 text-purple-600" />
              <p className="text-xs text-gray-600 font-semibold">FEATURED</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{featuredCount}</p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, city, or type..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Status Filter */}
          <div className="relative sm:w-48">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="w-4 h-4 text-gray-400" />
            </div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="flex items-center px-4 py-2 bg-gray-50 rounded-xl border border-gray-200">
            <span className="text-sm text-gray-600">
              Showing <span className="font-bold text-gray-900">{filtered.length}</span> of {totalListings}
            </span>
          </div>
        </div>
      </div>

      {/* Table Section */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-300 border-t-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading properties...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm">
          <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No listings found</h3>
          <p className="text-gray-600 text-sm mb-4">
            {query || status !== 'all' 
              ? 'Try adjusting your filters to see more results.'
              : 'Get started by creating your first property listing.'}
          </p>
          {!query && status === 'all' && (
            <button 
              onClick={() => window.location.href = '/admin/listings/new'}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create New Listing
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <DataTable
            columns={["Property", "Location", "Type", "Price", "Status", "Actions"]}
            rows={filtered.map((r) => [
              <div key={`title-${r.id}`} className="flex items-center gap-3 min-w-[200px]">
                {r.images && r.images.length > 0 ? (
                  <img 
                    src={r.images[0]} 
                    alt={r.title}
                    className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900 line-clamp-1">{r.title}</p>
                  {r.featured && (
                    <span className="inline-flex items-center gap-1 text-xs text-purple-600 font-medium">
                      <Home className="w-3 h-3" /> Featured
                    </span>
                  )}
                </div>
              </div>,
              
              <div key={`location-${r.id}`} className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-gray-700">{r.city}, {r.state}</span>
              </div>,
              
              <span key={`type-${r.id}`} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                <Building className="w-3 h-3" />
                {r.type.charAt(0).toUpperCase() + r.type.slice(1)}
              </span>,
              
              <div key={`price-${r.id}`} className="flex items-center gap-1 font-semibold text-gray-900">
                <DollarSign className="w-4 h-4 text-green-600" />
                ₦{r.price.toLocaleString()}
              </div>,
              
              <span
                key={`status-${r.id}`}
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(r.status)}`}
              >
                {getStatusIcon(r.status)}
                {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
              </span>,
              
              <div key={`actions-${r.id}`} className="flex gap-2">
                <button 
                  onClick={() => setViewProperty(r)}
                  className="p-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                  title="View Details"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setEditProperty(r)}
                  className="p-2 rounded-lg border border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setDeletePropertyState(r)}
                  className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>,
            ])}
          />
        </div>
      )}

      {/* Modals */}
      {editProperty && (
        <PropertyModal
          open={true}
          onClose={() => setEditProperty(null)}
          property={editProperty}
          onUpdated={fetchProperties}
        />
      )}

      {viewProperty && (
        <PropertyDetailsModal
          open={true}
          onClose={() => setViewProperty(null)}
          property={viewProperty}
        />
      )}

      {deletePropertyState && (
        <DeleteConfirmModal
          open={true}
          onClose={() => setDeletePropertyState(null)}
          onConfirm={handleDeleteConfirm}
          propertyTitle={deletePropertyState.title}
        />
      )}
    </div>
  );
}