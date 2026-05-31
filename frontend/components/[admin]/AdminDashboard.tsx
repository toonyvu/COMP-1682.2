"use client";

import { useAdminTabStore } from "@/stores/adminTabStore";
import CreateRecipePage from "@/pages/CreateRecipePage";

export default function AdminDashboard() {
  const adminTab = useAdminTabStore((state) => state.tab);
  return (
    <div className="p-8 bg-gray-100 h-full">
      {adminTab === "" && <h1>Hello</h1>}
      {adminTab === "createRecipe" && <CreateRecipePage />}
    </div>
  );
}
