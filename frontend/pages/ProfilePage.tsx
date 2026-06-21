"use client";

import UserProfile from "@/components/[userpage]/UserProfile";
import ProfileMenus from "@/components/[userpage]/ProfileMenus";

export default function ProfilePage() {
  return (
    <div className="flex flex-row">
      <div className="sticky top-12 h-[calc(100vh-3rem)] w-64 overflow-y-auto mt-2">
        <ProfileMenus />
      </div>

      <div className="flex-1">
        <UserProfile></UserProfile>
      </div>
    </div>
  );
}
