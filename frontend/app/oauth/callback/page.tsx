"use client";

import { useEffect } from "react";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const setUser = useUserStore((state) => state.setUser);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("http://localhost:8080/auth/me", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    };

    fetchUser();
  }, []);

  return <p>Logging you in...</p>;
}
