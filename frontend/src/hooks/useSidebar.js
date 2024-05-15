import { create } from "zustand";

export const useSidebar = create((set) => ({
  isSidebarDrawerOpen: true,
  toggleSidebar: () => {    
    set((state) => ({ isSidebarDrawerOpen: !state.isSidebarDrawerOpen }));
  },
}));
