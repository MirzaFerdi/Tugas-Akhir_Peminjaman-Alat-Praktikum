import { create } from "zustand";

export const useAdminProfileDrawer = create((set) => ({
  isAdminProfileDrawerOpen: false,
  openAdminProfileDrawer: () =>
    set({
      isAdminProfileDrawerOpen: true,
    }),
  closeAdminProfileDrawer: () =>
    set({
      isAdminProfileDrawerOpen: false,
    }),
}));

export const useMahasiswaProfileDrawer = create((set) => ({
  isMahasiswaProfileDrawerOpen: false,
  openMahasiswaProfileDrawer: () =>
    set({
      isMahasiswaProfileDrawerOpen: true,
    }),
  closeMahasiswaProfileDrawer: () =>
    set({
      isMahasiswaProfileDrawerOpen: false,
    }),
}));
