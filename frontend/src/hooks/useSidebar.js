import { create } from "zustand";

export const useSidebar = create((set) => ({
  isSidebarDrawerOpen: true,
  openSidebarDrawer: () =>
    set({
      isSidebarDrawerOpen: true,
    }),
  closeSidebarDrawer: () =>
    set({
      isSidebarDrawerOpen: false,
    }),
}));
