import { create } from "zustand";

// ADMIN DIALOG CONFIGURATION
export const useAdminEditKelasDialog = create((set) => ({
  isEditKelasDialogOpen: false,
  kelasDataById: {},
  openEditKelasDialog: (kelasDataById) =>
    set({
      kelasDataById: kelasDataById,
      isEditKelasDialogOpen: true,
    }),
  closeEditKelasDialog: () =>
    set({
      isEditKelasDialogOpen: false,
    }),
}));

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

export const useAdminRequestPeminjamanDialog = create((set) => ({
  isAdminRequestPeminjamanDialogOpen: false,
  requestPeminjamanById: {},
  openRequestPeminjamanDialog: (requestPeminjamanId) =>
    set({
      requestPeminjamanById: requestPeminjamanId,
      isAdminRequestPeminjamanDialogOpen: true,
    }),
  closeRequestPeminjamanDialog: () =>
    set({
      isAdminRequestPeminjamanDialogOpen: false,
    }),
}));

export const useAdminRequestPengembalianDialog = create((set) => ({
  isAdminRequestPengembalianDialogOpen: false,
  requestPengembalianById: {},
  openRequestPengembalianDialog: (requestPengembalianId) =>
    set({
      requestPengembalianById: requestPengembalianId,
      isAdminRequestPengembalianDialogOpen: true,
    }),
  closeRequestPengembalianDialog: () =>
    set({
      isAdminRequestPengembalianDialogOpen: false,
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

export const useAdminBroadcastPreviewDialog = create((set) => ({
  isBroadcastPreviewDialogOpen: false,
  openBroadcastPreview: () =>
    set({
      isBroadcastPreviewDialogOpen: true,
    }),
  closeBroadcastPreview: () =>
    set({
      isBroadcastPreviewDialogOpen: false,
    }),
}));

export const useAdminPreviewPhotoDialog = create((set) => ({
  isPreviewPhotoDialogOpen: false,
  mahasiswaPhoto: "",
  openPreviewPhoto: (mahasiswaPhoto) =>
    set({
      mahasiswaPhoto: mahasiswaPhoto,
      isPreviewPhotoDialogOpen: true,
    }),
  closePreviewPhoto: () =>
    set({
      isPreviewPhotoDialogOpen: false,
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

export const useMahasiswaPengembalianDialog = create((set) => ({
  isMahasiswaPengembalianDialogOpen: false,
  approvedDataPayloads: "",
  openMahasiswaPengembalianDialog: (approvedDataPayloads) =>
    set({
      isMahasiswaPengembalianDialogOpen: true,
      approvedDataPayloads: approvedDataPayloads,
    }),
  closeMahasiswaPengembalianDialog: () =>
    set({
      isMahasiswaPengembalianDialogOpen: false,
    }),
}));

export const useEditPhotoDialog = create((set) => ({
  isDialogEditPhotoOpen: false,
  openEditPhoto: () =>
    set({
      isDialogEditPhotoOpen: true,
    }),
  closeEditPhoto: () =>
    set({
      isDialogEditPhotoOpen: false,
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
