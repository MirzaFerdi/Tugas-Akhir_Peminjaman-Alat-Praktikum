import { create } from "zustand";

// ADMIN DIALOG CONFIGURATION
export const useAdminAddMahasiswaDialog = create((set) => ({
  isAdminAddMahasiswaDialogOpen: false,
  openAddMahasiswaDialog: () =>
    set({
      isAdminAddMahasiswaDialogOpen: true,
    }),
  closeAddMahasiswaDialog: () =>
    set({
      isAdminAddMahasiswaDialogOpen: false,
    }),
}));

export const useAdminEditMahasiswaDialog = create((set) => ({
  isAdminEditMahasiswaDialogOpen: false,
  mahasiswaDataById: {},
  openEditMahasiswaDialog: (mahasiswaDataById) =>
    set({
      isAdminEditMahasiswaDialogOpen: true,
      mahasiswaDataById: mahasiswaDataById,
    }),
  closeEditMahasiswaDialog: () =>
    set({
      isAdminEditMahasiswaDialogOpen: false,
    }),
}));

export const useAdminAddBarangDialog = create((set) => ({
  isAdminAddBarangDialogOpen: false,
  openAddBarangDialog: () =>
    set({
      isAdminAddBarangDialogOpen: true,
    }),
  closeAddBarangDialog: () =>
    set({
      isAdminAddBarangDialogOpen: false,
    }),
}));

export const useAdminEditBarangDialog = create((set) => ({
  isAdminEditBarangDialogOpen: false,
  dataBarangById: {},
  openEditBarangDialog: (dataBarangById) =>
    set({
      isAdminEditBarangDialogOpen: true,
      dataBarangById: dataBarangById,
    }),
  closeEditBarangDialog: () =>
    set({
      isAdminEditBarangDialogOpen: false,
    }),
}));

export const useAdminTransaksiDialog = create((set) => ({
  isAdminTransaksiDialogOpen: false,
  idTransaksi: 1,
  openTransaksiDialog: (idTransaksi) =>
    set({
      idTransaksi: idTransaksi,
      isAdminTransaksiDialogOpen: true,
    }),
  closeTransaksiDialog: () =>
    set({
      isAdminTransaksiDialogOpen: false,
    }),
}));

export const useAdminKelasInformationDialog = create((set) => ({
  isKelasInformationDialogOpen: false,
  openKelasInformationDialog: () =>
    set({
      isKelasInformationDialogOpen: true,
    }),
  closeKelasInformationDialog: () =>
    set({
      isKelasInformationDialogOpen: false,
    }),
}));

export const useAdminBarangInformationDialog = create((set) => ({
  isBarangInformationDialogOpen: false,
  openBarangInformationDialog: () =>
    set({
      isBarangInformationDialogOpen: true,
    }),
  closeBarangInformationDialog: () =>
    set({
      isBarangInformationDialogOpen: false,
    }),
}));

export const useAdminTransaksiInformationDialog = create((set) => ({
  isTransaksiInformationDialogOpen: false,
  openTransaksiInformationDialog: () =>
    set({
      isTransaksiInformationDialogOpen: true,
    }),
  closeTransaksiInformationDialog: () =>
    set({
      isTransaksiInformationDialogOpen: false,
    }),
}));

// MAHASISWA DIALOG CONFIGURATION
export const useMahasiswaPeminjamanDialog = create((set) => ({
  isMahasiswaPeminjamanDialogOpen: false,
  barangId: 1,
  openMahasiswaPeminjamanDialog: (barangId) =>
    set({
      isMahasiswaPeminjamanDialogOpen: true,
      barangId: barangId,
    }),
  closeMahasiswaPeminjamanDialog: () =>
    set({
      isMahasiswaPeminjamanDialogOpen: false,
    }),
}));

// DIALOGS CONFIGURATION
export const useConfirmDialog = create((set) => ({
  isConfirmDialogOpen: false,
  confirmDialogTitle: "",
  confirmDialogMessage: "",
  confirmDialogOkAction: () => {},
  openConfirmDialog: ({ title: title = "", message: message = "", okAction: okAction = () => {} }) =>
    set({
      isConfirmDialogOpen: true,
      confrimDialogTitle: title,
      confirmDialogMessage: message,
      confirmDialogOkAction: okAction,
    }),
  closeConfirmDialog: () =>
    set({
      isConfirmDialogOpen: false,
    }),
}));
