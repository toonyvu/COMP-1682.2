"use client";
import { getNotifications } from "@/lib/api/notifications";
import { useQuery } from "@tanstack/react-query";

export default function NotificationsTab() {
  const {
    data: notifications,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["getNotifsQuery"],

    queryFn: async () => {
      const res = await getNotifications();
      console.log(res);
      return res.notifications;
    },
  });
  return (
    <div className="w-full h-full bg-gray-100">
      <h1>Hi!</h1>
    </div>
  );
}
