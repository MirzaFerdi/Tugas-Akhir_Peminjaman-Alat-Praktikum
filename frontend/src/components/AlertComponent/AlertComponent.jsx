import { useEffect } from "react";
import Swal from "sweetalert2";
import { useAlert } from "../../hooks/useAlert";
import { useNavigate } from "react-router-dom";

const AlertComponent = () => {
  const navigate = useNavigate();

  const { isAlertComponentOpen, alertType, alertTitle, navigateTo, alertMessage, closeAlertComponent } = useAlert();

  useEffect(() => {
    if (isAlertComponentOpen === true) {
      if (alertType === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: alertTitle,
          text: alertMessage,
          showConfirmButton: false,
          showLoaderOnConfirm: true,
          timer: 2000,
          customClass: "z-100",
          didClose: () => {
            navigateTo == "" ? window.location.reload() : navigate(navigateTo);
          },
        });
      } else {
        Swal.fire({
          position: "center",
          icon: alertType === "success" ? "success" : "error",
          title: alertTitle,
          text: alertMessage,
          confirmButtonText: "Benahi",
          customClass: "z-100",
        }).then((result) => {
          if (result.isConfirmed) {
            closeAlertComponent();
            Swal.close();
          }
        });
      }
    }
  }, [alertMessage, alertTitle, alertType, closeAlertComponent, isAlertComponentOpen, navigate, navigateTo]);

  return null;
};

export default AlertComponent;
