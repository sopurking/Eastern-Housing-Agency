"use client";

import React, { useEffect, useState } from "react";
import DataTable from "@/components/admin/DataTable";
import { MessageSquare, Star, Check, X, Edit2, Trash2, Calendar, List, Grid } from "lucide-react";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", role: "", rating: 5, text: "" });
  const [viewMode, setViewMode] = useState("list");

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/admin/testimonials");
      const data = await res.json();
      setTestimonials(data.testimonials || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id, currentStatus) => {
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved: !currentStatus }),
      });

      if (res.ok) {
        fetchTestimonials();
      }
    } catch (error) {
      console.error("Error updating testimonial:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchTestimonials();
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  const startEdit = (testimonial) => {
    setEditingId(testimonial.id);
    setEditForm({
      name: testimonial.name,
      role: testimonial.role,
      rating: testimonial.rating,
      text: testimonial.text,
    });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`/api/admin/testimonials/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      if (res.ok) {
        setEditingId(null);
        fetchTestimonials();
      }
    } catch (error) {
      console.error("Error updating testimonial:", error);
    }
  };

  const approvedCount = testimonials.filter(t => t.approved).length;
  const pendingCount = testimonials.filter(t => !t.approved).length;

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                Testimonials Management
              </h1>
              <p className="text-gray-700 text-sm">Review, edit, approve, and manage customer testimonials</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-blue-200">
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <p className="text-xs text-gray-600 font-semibold">TOTAL</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{testimonials.length}</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-green-200">
            <div className="flex items-center gap-2 mb-1">
              <Check className="w-4 h-4 text-green-600" />
              <p className="text-xs text-gray-600 font-semibold">APPROVED</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{approvedCount}</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-orange-200">
            <div className="flex items-center gap-2 mb-1">
              <X className="w-4 h-4 text-orange-600" />
              <p className="text-xs text-gray-600 font-semibold">PENDING</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition ${
              viewMode === "list" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <List className="w-4 h-4" />
            List
          </button>
          <button
            onClick={() => setViewMode("card")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition ${
              viewMode === "card" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Grid className="w-4 h-4" />
            Cards
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-300 border-t-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading testimonials...</p>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm">
          <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No testimonials yet</h3>
          <p className="text-gray-600 text-sm">Customer testimonials will appear here.</p>
        </div>
      ) : editingId ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Edit Testimonial</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <input
                  type="text"
                  value={editForm.role}
                  onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setEditForm({ ...editForm, rating: star })}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= editForm.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Testimonial</label>
              <textarea
                value={editForm.text}
                onChange={(e) => setEditForm({ ...editForm, text: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditingId(null)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : viewMode === "card" ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                    {t.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    t.approved ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {t.approved ? "Approved" : "Pending"}
                </span>
              </div>

              <div className="flex gap-1 mb-3">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                "{t.text}"
              </p>

              <div className="flex items-center gap-2 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-200">
                <Calendar className="w-3 h-3" />
                {new Date(t.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleApprove(t.id, t.approved)}
                  className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-lg transition ${
                    t.approved
                      ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
                >
                  {t.approved ? "Unapprove" : "Approve"}
                </button>
                <button
                  onClick={() => startEdit(t)}
                  className="p-1.5 rounded-lg border border-blue-200 text-blue-700 hover:bg-blue-50 transition"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <DataTable
            columns={["Customer", "Rating", "Testimonial", "Date", "Status", "Actions"]}
            rows={testimonials.map((t) => [
              <div key={`name-${t.id}`} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm">
                  {t.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>,
              
              <div key={`rating-${t.id}`} className="flex gap-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>,
              
              <p key={`text-${t.id}`} className="text-gray-700 line-clamp-2 max-w-md">
                "{t.text}"
              </p>,
              
              <div key={`date-${t.id}`} className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4 text-gray-400" />
                {new Date(t.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>,
              
              <span
                key={`status-${t.id}`}
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                  t.approved ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                }`}
              >
                {t.approved ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                {t.approved ? "Approved" : "Pending"}
              </span>,
              
              <div key={`actions-${t.id}`} className="flex gap-2">
                <button
                  onClick={() => handleApprove(t.id, t.approved)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                    t.approved
                      ? "border-orange-200 text-orange-700 hover:bg-orange-50"
                      : "border-green-200 text-green-700 hover:bg-green-50"
                  }`}
                >
                  {t.approved ? "Unapprove" : "Approve"}
                </button>
                <button
                  onClick={() => startEdit(t)}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg border border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
              </div>,
            ])}
          />
        </div>
      )}
    </div>
  );
}
