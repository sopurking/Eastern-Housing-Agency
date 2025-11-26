"use client";

import React, { useEffect, useState, useMemo } from "react";
import DataTable from "@/components/admin/DataTable";
import { getAllUsers, updateUser, deleteUser } from "@/lib/actions/user.actions";
import EditUserModal from "@/components/EditUserModal";
import DeleteUserConfirmModal from "@/components/DeleteUserConfirmModal";
import { Users, Search, Filter, UserPlus, Shield, User, Calendar, TrendingUp } from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("all");
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    refreshUsers();
  }, []);

  async function refreshUsers() {
    setInitialLoading(true);
    const res = await getAllUsers();
    if (res.success) setUsers(res.users);
    setInitialLoading(false);
  }

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return users.filter((u) => {
      const matchesQ =
        !q ||
        u.name?.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q);

      const matchesRole = role === "all" || u.role === role;
      return matchesQ && matchesRole;
    });
  }, [users, query, role]);

  async function handleSave(updated) {
    setLoading(true);
    const res = await updateUser(updated.id, {
      name: updated.name,
      email: updated.email,
      role: updated.role,
    });
    setLoading(false);

    if (res.error) return alert(res.error);
    await refreshUsers();
    setEditingUser(null);
  }

  async function handleDeleteConfirm() {
    if (!deletingUser) return;
    const id = deletingUser.id;
    setDeletingUser(null);

    const original = users;
    setUsers((prev) => prev.filter((u) => u.id !== id));

    const res = await deleteUser(id);
    if (res.error) {
      alert(res.error);
      setUsers(original);
    }
  }

  // Calculate stats
  const totalUsers = users.length;
  const adminCount = users.filter(u => u.role === 'admin').length;
  const regularUserCount = users.filter(u => u.role === 'user').length;
  const recentUsers = users.filter(u => {
    const daysSinceJoined = (Date.now() - new Date(u.createdAt).getTime()) / (1000 * 60 * 60 * 24);
    return daysSinceJoined <= 7;
  }).length;

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              Users Management
            </h1>
            <p className="text-gray-700 text-sm">Manage user accounts, roles, and permissions</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-blue-200">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-blue-600" />
              <p className="text-xs text-gray-600 font-semibold">TOTAL</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-indigo-200">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-4 h-4 text-indigo-600" />
              <p className="text-xs text-gray-600 font-semibold">ADMINS</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{adminCount}</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-purple-200">
            <div className="flex items-center gap-2 mb-1">
              <User className="w-4 h-4 text-purple-600" />
              <p className="text-xs text-gray-600 font-semibold">USERS</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{regularUserCount}</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-green-200">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <p className="text-xs text-gray-600 font-semibold">NEW (7D)</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{recentUsers}</p>
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
              placeholder="Search by name or email..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Role Filter */}
          <div className="relative sm:w-48">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="w-4 h-4 text-gray-400" />
            </div>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="flex items-center px-4 py-2 bg-gray-50 rounded-xl border border-gray-200">
            <span className="text-sm text-gray-600">
              Showing <span className="font-bold text-gray-900">{filtered.length}</span> of {totalUsers}
            </span>
          </div>
        </div>
      </div>

      {/* Table Section */}
      {initialLoading ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-300 border-t-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading users...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-600 text-sm">
            {query || role !== 'all' 
              ? 'Try adjusting your filters to see more results.'
              : 'No users have been registered yet.'}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <DataTable
            columns={["Name", "Email", "Role", "Joined", "Actions"]}
            rows={filtered.map((u) => [
              <div key={`name-${u.id}`} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm">
                  {(u.name || u.email).charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-gray-900">{u.name || "—"}</span>
              </div>,
              <span key={`email-${u.id}`} className="text-gray-700">{u.email}</span>,
              <span
                key={`role-${u.id}`}
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                  u.role === "admin"
                    ? "bg-indigo-100 text-indigo-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {u.role === "admin" ? <Shield className="w-3 h-3" /> : <User className="w-3 h-3" />}
                {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
              </span>,
              <div key={`date-${u.id}`} className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4 text-gray-400" />
                {new Date(u.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>,
              <div key={`actions-${u.id}`} className="flex gap-2">
                <button
                  onClick={() => setEditingUser({ ...u })}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg border border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeletingUser(u)}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
              </div>,
            ])}
          />
        </div>
      )}

      {/* Edit Modal */}
      {editingUser && (
        <EditUserModal
          open={true}
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleSave}
          loading={loading}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletingUser && (
        <DeleteUserConfirmModal
          open={true}
          userName={deletingUser.name}
          onClose={() => setDeletingUser(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}