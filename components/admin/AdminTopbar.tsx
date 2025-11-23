"use client";

import React from "react";
import { Menu, Bell, Search, UserCircle2 } from "lucide-react";

export default function AdminTopbar({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
      <div className="max-w-[1300px] mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onMenu} className="lg:hidden p-2 rounded hover:bg-gray-100">
            <Menu className="w-5 h-5 text-black" />
          </button>
          <span className="font-extrabold text-gray-900 tracking-tight">Eastern Housing Agency</span>
        </div>

        <div className="hidden md:flex items-center gap-2 flex-1 mx-6 max-w-xl">
          <div className="flex items-center gap-2 w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              placeholder="Search…"
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 rounded hover:bg-gray-100 relative">
            <Bell className="w-5 h-5 text-black" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#2da3dd] rounded-full"></span>
          </button>
          <button className="p-1.5 rounded-full border border-gray-200">
            <UserCircle2 className="w-7 h-7 text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  );
}
