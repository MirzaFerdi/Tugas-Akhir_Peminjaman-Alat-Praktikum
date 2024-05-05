import { create } from "zustand";

export const useAlert = create((set) => ({
  isAlertComponentOpen: false,
  alertType: "",
  alertTitle: "",
  alertMessage: "",
  openAlertComponent: ({
    alertType: alertType = "error",
    alertTitle: alertTitle = "",
    alertMessage: alertMessage = "",
  }) =>
    set({
      isAlertComponentOpen: true,
      alertType: alertType,
      alertTitle: alertTitle,
      alertMessage: alertMessage,
    }),
  closeAlertComponent: () =>
    set({
      isAlertComponentOpen: false,
    }),
}));
