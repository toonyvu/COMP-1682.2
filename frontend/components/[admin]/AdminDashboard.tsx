"use client";

import { useAdminTabStore } from "@/stores/adminTabStore";

export default function AdminDashboard() {
  const adminTab = useAdminTabStore((state) => state.tab);
  return (
    <div className="p-8 bg-gray-100 h-full">
      <h1>Admin Dashboard</h1>
    </div>
  );
}
