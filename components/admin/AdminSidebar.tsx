"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Home, Users, BarChart2, Settings, X, Menu, MessageSquare } from "lucide-react";

export default function AdminSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: "/admin/listings", label: "Listings", icon: <Home className="w-5 h-5" /> },
    { href: "/admin/users", label: "Users", icon: <Users className="w-5 h-5" /> },
    { href: "/admin/testimonials", label: "Testimonials", icon: <MessageSquare className="w-5 h-5" /> },
    { href: "/admin/analytics", label: "Analytics", icon: <BarChart2 className="w-5 h-5" /> },
    { href: "/admin/settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed lg:sticky top-0 lg:top-16 z-50 h-full lg:h-[calc(100vh-4rem)] w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        aria-label="Sidebar"
      >
        <div className="flex items-center justify-between lg:hidden px-4 py-3 border-b border-gray-200">
          <span className="font-bold text-gray-900">Admin</span>
          <button onClick={onClose} className="p-2 rounded hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-3 py-4 space-y-1">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} onClick={onClose}>
                <span
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    active ? "bg-[#2da3dd]/10 text-[#0d2549]" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {link.icon}
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
      </aside>
    </>
  );
}
