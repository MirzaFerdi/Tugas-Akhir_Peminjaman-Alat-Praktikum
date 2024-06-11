import { create } from "zustand";

export const useUrutanLampiran = create((set) => ({
  lampiranTerakhirPeminjaman: "",
  lampiranTerakhirPengembalian: "",
  handleChangeLampiranTerakahirPeminjaman: (lampiranTerakhir) =>
    set({
      lampiranTerakhirPeminjaman: lampiranTerakhir,
    }),

  handleChangeLampiranTerakahirPengembalian: (lampiranTerakhir) =>
    set({
      lampiranTerakhirPengembalian: lampiranTerakhir,
    }),
}));
