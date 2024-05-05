import { Alert, AlertTitle, Dialog } from "@mui/material";
import { useAlert } from "../../hooks/useAlert";

const AlertComponent = () => {
  const { isAlertComponentOpen, alertType, alertTitle, alertMessage } = useAlert();

  return (
    <Dialog open={isAlertComponentOpen}>
      <Alert severity={alertType}>
        <AlertTitle>{alertTitle}</AlertTitle>
        <p>{alertMessage}</p>
      </Alert>
    </Dialog>
  );
};

export default AlertComponent;
