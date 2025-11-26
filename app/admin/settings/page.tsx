"use client";

import React, { useEffect, useState } from "react";
import { updateProfile, getSystemStats } from "@/lib/actions/settings.actions";
import {
  User,
  Mail,
  Shield,
  Database,
  Users,
  Home,
  CheckCircle,
  Clock,
  Activity,
  Save,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [createdAt, setCreatedAt] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [initialName, setInitialName] = useState("");
  const [initialEmail, setInitialEmail] = useState("");

  // Load user session data
  useEffect(() => {
    async function loadSession() {
      try {
        const response = await fetch('/api/auth/session');
        const session = await response.json();
        
        if (session?.user) {
          setName(session.user.name || "");
          setEmail(session.user.email || "");
          setRole(session.user.role || "user");
          setCreatedAt(session.user.createdAt);
          setInitialName(session.user.name || "");
          setInitialEmail(session.user.email || "");
        }
      } catch (error) {
        console.error("Failed to load session", error);
      }
    }
    loadSession();
  }, []);

  useEffect(() => {
    async function load() {
      const res = await getSystemStats();
      if (res.success) setStats(res.stats);
    }
    load();
  }, []);

  async function handleSave() {
    setLoading(true);
    setSaved(false);
    const res = await updateProfile({ name, email });
    setLoading(false);

    if (res.error) return alert(res.error);
    
    setSaved(true);
    setInitialName(name);
    setInitialEmail(email);
    
    setTimeout(() => setSaved(false), 3000);
  }

  const hasChanges = name !== initialName || email !== initialEmail;

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-600 rounded-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
            Settings
          </h1>
        </div>
        <p className="text-gray-700 text-sm">
          Manage your account preferences and view system information
        </p>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-green-900">Changes Saved!</h3>
            <p className="text-sm text-green-800">Your profile has been updated successfully.</p>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Section - Takes 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Account Information */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-50 rounded-lg">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Account Information</h2>
                <p className="text-sm text-gray-600">Update your personal details</p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    type="email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Role Display */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Role
                </label>
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
                  <Shield className="w-4 h-4 text-indigo-600" />
                  <span className="font-semibold text-gray-900 capitalize">
                    {role}
                  </span>
                  <span className="ml-auto text-xs text-gray-500">Read-only</span>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-2">
                <button
                  onClick={handleSave}
                  disabled={loading || !hasChanges}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                    loading || !hasChanges
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md"
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      <span>Saving Changes...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
                {!hasChanges && !loading && (
                  <p className="text-xs text-gray-500 text-center mt-2">
                    No changes to save
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Account Stats */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-50 rounded-lg">
                <Activity className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Account Activity</h2>
                <p className="text-sm text-gray-600">Your account statistics</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                <p className="text-xs text-blue-700 font-semibold mb-1">MEMBER SINCE</p>
                <p className="text-xl font-bold text-blue-900">
                  {createdAt 
                    ? new Date(createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                    : 'N/A'}
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                <p className="text-xs text-purple-700 font-semibold mb-1">ACCOUNT TYPE</p>
                <p className="text-xl font-bold text-purple-900 capitalize">
                  {role}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* System Information Sidebar */}
        <div className="space-y-6">
          {/* System Stats */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Database className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">System Info</h2>
                <p className="text-sm text-gray-600">Platform statistics</p>
              </div>
            </div>

            {stats ? (
              <div className="space-y-4">
                {/* <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Database className="w-5 h-5 text-gray-600" />
                    <span className="text-xs font-semibold text-gray-600">DATABASE</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stats.database}</p>
                </div> */}

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="text-xs font-semibold text-blue-700">USERS</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-900">{stats.users.toLocaleString()}</p>
                  <p className="text-xs text-blue-700 mt-1">Total registered</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Home className="w-5 h-5 text-green-600" />
                    <span className="text-xs font-semibold text-green-700">PROPERTIES</span>
                  </div>
                  <p className="text-2xl font-bold text-green-900">{stats.properties.toLocaleString()}</p>
                  <p className="text-xs text-green-700 mt-1">Total listings</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-600 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">Loading stats...</p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Tips */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-6">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-amber-900">Quick Tips</h3>
            </div>
            <ul className="space-y-2 text-sm text-amber-800">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">•</span>
                <span>Keep your email updated for important notifications</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">•</span>
                <span>Use a strong, unique password for security</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">•</span>
                <span>Review system stats regularly to monitor growth</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}