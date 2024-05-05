import { create } from "zustand";

export const useLoader = create((set) => ({
  isLoading: false,
  startLoad: () =>
    set({
      isLoading: true,
    }),
  endLoad: () =>
    set({
      isLoading: false,
    }),
}));
