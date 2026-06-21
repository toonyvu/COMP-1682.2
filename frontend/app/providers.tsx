"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { getMe } from "@/lib/api/auth";
import { useUserStore } from "@/stores/userStore";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const setHydrated = useUserStore((state) => state.setHydrated);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await getMe();
        setUser(res.user);
      } catch {
        clearUser();
      }
    };

    initAuth();
  }, [setUser, clearUser, setHydrated]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
