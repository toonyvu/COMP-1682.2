"use client";

import { User, Bell, ShoppingBag, CreditCard } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function ProfileMenus() {
  const pathname = usePathname();
  return (
    <div className="w-64 bg-white p-4 flex flex-col gap-2">
      <Link
        href="/profile"
        className={`flex items-center gap-3 h-12 px-4 rounded-xl ${pathname === "/profile" ? "bg-green-100 text-green-700 font-medium transition hover:bg-green-200" : "text-gray-700 transition hover:bg-gray-100"} `}
      >
        <User size={20} />
        <span>Profile</span>
      </Link>

      <Link
        href="/profile/notifications"
        className={`flex items-center gap-3 h-12 px-4 rounded-xl ${pathname === "/profile/notifications" ? "bg-green-100 text-green-700 font-medium transition hover:bg-green-200" : "text-gray-700 transition hover:bg-gray-100"} `}
      >
        <Bell size={20} />
        <span>Notifications</span>
      </Link>

      <Link
        href="/profile/orders"
        className={`flex items-center gap-3 h-12 px-4 rounded-xl ${pathname === "/profile/orders" ? "bg-green-100 text-green-700 font-medium transition hover:bg-green-200" : "text-gray-700 transition hover:bg-gray-100"} `}
      >
        <ShoppingBag size={20} />
        <span>Orders</span>
      </Link>

      <Link
        href="/profile/billing"
        className={`flex items-center gap-3 h-12 px-4 rounded-xl ${pathname === "/profile/billing" ? "bg-green-100 text-green-700 font-medium transition hover:bg-green-200" : "text-gray-700 transition hover:bg-gray-100"} `}
      >
        <CreditCard size={20} />
        <span>Billing</span>
      </Link>
    </div>
  );
}
