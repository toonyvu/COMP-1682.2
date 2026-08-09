"use client";

import { getNotifications } from "@/lib/api/notifications";
import { useQuery } from "@tanstack/react-query";
import type { Notificaiton } from "@/types/types";
import { Bell, ShoppingBag, Truck, CheckCircle, Tag } from "lucide-react";
import Link from "next/link";

export default function NotificationsTab() {
  const {
    data: notifications,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getNotifsQuery"],
    queryFn: async () => {
      const res = await getNotifications();
      return res.notifications;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        Loading notifications...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Failed to load notifications.
      </div>
    );
  }

  function getIcon(type: string) {
    switch (type) {
      case "order":
        return <ShoppingBag className="text-green-600" size={22} />;
      case "shipping":
        return <Truck className="text-blue-600" size={22} />;
      case "coupon":
        return <Tag className="text-orange-500" size={22} />;
      case "success":
        return <CheckCircle className="text-emerald-600" size={22} />;
      default:
        return <Bell className="text-gray-500" size={22} />;
    }
  }

  return (
    <div className="w-full p-8 bg-gray-100 h-full">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>

      <div className="flex flex-col gap-4">
        {notifications.length === 0 ? (
          <div className="rounded-lg border bg-white p-8 text-center text-gray-500">
            You do not have any notifications.
          </div>
        ) : (
          notifications.map((notif: Notificaiton) => (
            <div key={notif.id}>
              <h1 className="font-semibold">
                {new Date(notif.created_at).toLocaleDateString()}
              </h1>
              <Link
                href={notif.action_url}
                className={`flex gap-4 rounded-xl border p-5 transition hover:shadow-md ${
                  notif.is_read ? "bg-white" : "bg-green-50 border-green-300"
                }`}
              >
                <div className="mt-1">{getIcon(notif.type)}</div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h2 className="font-semibold text-lg">{notif.title}</h2>

                    {!notif.is_read && (
                      <span className="h-3 w-3 rounded-full bg-green-600"></span>
                    )}
                  </div>

                  <p className="mt-1 text-gray-600">{notif.message}</p>

                  <p className="mt-3 text-xs text-gray-400">
                    {new Date(notif.created_at).toLocaleString()}
                  </p>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
