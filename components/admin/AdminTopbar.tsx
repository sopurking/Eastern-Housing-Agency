"use client";

import React, { useState, useRef, useEffect } from "react";
import { Menu, Bell, Search } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function AdminTopbar({ onMenu }: { onMenu: () => void }) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const userInitial =
    session?.user?.name?.[0]?.toUpperCase() ||
    session?.user?.email?.[0]?.toUpperCase() ||
    "U";

  // Close when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 shadow-sm">
      <div className="w-full mx-auto px-6 h-full flex items-center justify-between">
        
        {/* LEFT SECTION */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenu}
            className="lg:hidden p-2 rounded hover:bg-gray-100"
          >
            <Menu className="w-5 h-5 text-black" />
          </button>

          {/* Brand → clickable */}
          <Link
            href="/"
            className="font-extrabold text-gray-900 tracking-tight hover:opacity-80 transition"
          >
            Eastern Housing Agency
          </Link>
        </div>

        {/* SEARCH BAR */}
        <div className="hidden md:flex items-center gap-2 flex-1 mx-6 max-w-xl">
          <div className="flex items-center gap-2 w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              placeholder="Search…"
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4 relative" ref={dropdownRef}>
          
          {/* Notification bell */}
          <button className="p-2 rounded hover:bg-gray-100 relative">
            <Bell className="w-5 h-5 text-black" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#2da3dd] rounded-full"></span>
          </button>

          {/* User Avatar (first letter) */}
          <button
            onClick={() => setOpen(!open)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition"
          >
            {userInitial}
          </button>

          {/* Dropdown */}
          {open && (
            <div
              className="absolute top-12 right-0 w-56 bg-white shadow-lg border rounded-xl p-4 animate-fadeIn"
            >
              <p className="text-sm font-medium text-gray-900">
                {session?.user?.name || "User"}
              </p>

              <p className="text-xs text-gray-500 truncate mt-1">
                {session?.user?.email}
              </p>

              <button
                onClick={() => signOut()}
                className="w-full mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Small animation style */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.18s ease-out;
        }
      `}</style>
    </header>
  );
}
