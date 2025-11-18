"use client";

import React from "react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">Settings</h1>
        <p className="text-gray-600 text-sm">Configure platform preferences</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">General</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Brand Name</label>
              <input className="w-full px-3 py-2 border border-gray-200 rounded-lg" defaultValue="Eastern Housing Agency" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Primary Color</label>
              <input type="color" className="w-16 h-10 p-0 border border-gray-200 rounded" defaultValue="#0d2549" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Roles & Permissions</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <p>Admins can manage listings, users, and settings.</p>
            <p>Agents can manage listings assigned to them.</p>
            <p>Users can view and save properties.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
