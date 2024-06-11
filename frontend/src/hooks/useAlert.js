import { create } from "zustand";

export const useAlert = create((set) => ({
  isAlertComponentOpen: false,
  alertType: "",
  alertTitle: "",
  alertMessage: "",
  navigateTo: "",
  openAlertComponent: ({
    alertType: alertType = "error",
    alertTitle: alertTitle = "",
    alertMessage: alertMessage = "",
    navigateTo: navigateTo = "",
  }) =>
    set({
      isAlertComponentOpen: true,
      alertType: alertType,
      alertTitle: alertTitle,
      alertMessage: alertMessage,
      navigateTo: navigateTo,
    }),
  closeAlertComponent: () =>
    set({
      isAlertComponentOpen: false,
    }),
}));
