"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session?.user || session.user.role !== "admin") {
      router.push("/");
    }
  }, [session, status, router]);

  // if (status === "loading") {
  //   return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  // }

  if (!session?.user || session.user.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminTopbar onMenu={() => setSidebarOpen(true)} />

      <div className="flex pt-16">
        <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 min-w-0">
          <div className="max-w-[1300px] mx-auto px-6 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
