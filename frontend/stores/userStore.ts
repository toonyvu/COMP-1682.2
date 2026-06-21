import type { UserType } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserStore = {
  user: UserType | null;
  hydrated: boolean;
  setUser: (user: UserType) => void;
  clearUser: () => void;
  setHydrated: (v: boolean) => void;
};

export const useUserStore = create<UserStore>()((set) => ({
  user: null,
  hydrated: false,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  setHydrated: (v) => set({ hydrated: v }),
}));
