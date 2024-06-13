import { create } from "zustand";

export const useAdminPageId = create((set) => ({
  adminPageId: 1,
  handleChangeAdminPageId: (adminPageId) => {
    localStorage.setItem("last_visited_admin_page_id", JSON.stringify(adminPageId));
    set({
      adminPageId: adminPageId,
    });
  },
}));

export const useMahasiswaPageId = create((set) => ({
  mahasiswaPageId: 1,
  handleChangeMahasiswaPageId: (mahasiswaPageId) => {
    localStorage.setItem("last_visited_mahasiswa_page_id", JSON.stringify(mahasiswaPageId));
    set({
      mahasiswaPageId: mahasiswaPageId,
    });
  },
}));
