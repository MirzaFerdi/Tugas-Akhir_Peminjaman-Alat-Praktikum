import { create } from "zustand";

export const useSidebar = create((set) => ({
  isSidebarDrawerOpen: true,
  openSidebar: () => {
    localStorage.setItem("is_sidebar_open", JSON.stringify(true));
    set({
      isSidebarDrawerOpen: true,
    });
  },
  closeSidebar: () => {
    localStorage.setItem("is_sidebar_open", JSON.stringify(false));
    set({
      isSidebarDrawerOpen: false,
    });
  },
}));
