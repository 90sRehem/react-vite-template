import create from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  navSize: "large" | "small";
  toggleNavSize: () => void;
  isOpen: boolean;
};

export const useSidebarStore = create(
  persist<Store>(
    (set, get) => ({
      navSize: "small",
      isOpen: false,
      toggleNavSize() {
        if (get().navSize === "small") set({ navSize: "large", isOpen: true });
        else set({ navSize: "small", isOpen: false });
      },
    }),
    {
      name: "navbar-storage",
      getStorage: () => sessionStorage,
    },
  ),
);
