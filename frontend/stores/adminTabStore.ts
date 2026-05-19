import { create } from "zustand";

type TabType = {
  tab: string;
  setTab: (tab: string) => void;
};

export const useAdminTabStore = create<TabType>((set) => ({
  tab: "",

  setTab: (tab) => {
    set({ tab });
  },
}));
