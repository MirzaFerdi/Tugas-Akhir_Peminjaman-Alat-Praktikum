import { Backdrop, CircularProgress } from "@mui/material";
import { useLoader } from "../../hooks/useLoader";

const BackdropLoader = () => {
  const { isLoading } = useLoader();

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 9999999, display: "flex", flexDirection: "column" }}
      open={isLoading}>
      <CircularProgress color="inherit" className="mb-2" />
      <p className="text-xs tracking-wide">Loading . . .</p>
    </Backdrop>
  );
};

export default BackdropLoader;
