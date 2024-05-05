import { Drawer } from "@mui/material";
import { useAdminProfileDrawer } from "../../../hooks/useProfileDrawer";
import { adminsIcon } from "../../../assets";
import { useFetchOnClick } from "../../../hooks/useFetchOnClick";
import { useCallback } from "react";
import { useAlert } from "../../../hooks/useAlert";
import { useNavigate } from "react-router-dom";

const AdminDrawerProfile = () => {
  const navigate = useNavigate();

  const userPayloads = JSON.parse(localStorage.getItem("user_payloads"));

  const { isAdminProfileDrawerOpen, closeAdminProfileDrawer } = useAdminProfileDrawer();
  const { openAlertComponent, closeAlertComponent } = useAlert();
  const { fetchData: fetchLogout } = useFetchOnClick();

  const handleSuccessLogout = useCallback(
    (logoutSuccessResponse) => {
      if (logoutSuccessResponse?.success === true) {
        openAlertComponent({
          alertType: "success",
          alertTitle: "BERHASIL!",
          alertMessage: logoutSuccessResponse?.message,
        });
        setTimeout(() => {
          closeAlertComponent();
          closeAdminProfileDrawer();
          localStorage.clear();
          navigate("/login");
        }, 2000);
      }
    },
    [closeAdminProfileDrawer, closeAlertComponent, navigate, openAlertComponent]
  );

  const handleErrorLogout = useCallback((logoutErrorResponse) => {
    console.log(logoutErrorResponse);
  }, []);

  return (
    <Drawer
      anchor="right"
      open={isAdminProfileDrawerOpen}
      onClose={() => closeAdminProfileDrawer()}
      sx={{ position: "relative" }}>
      <div className="bg-zinc-100 w-[25rem] flex flex-col items-center justify-center h-full px-8">
        <div className="w-full flex flex-col items-center p-5 bg-white rounded-md shadow-md mb-4">
          <img src={adminsIcon} alt="Admin Icon" width={64} height={64} className="aspect-square mb-3" />
          <p className="text-xs text-zinc-500 tracking-wider">Masuk Sebagai</p>
          <p className="text-md font-semibold tracking-wider mb-5">{userPayloads?.user?.role?.nama}</p>
          <div className="mb-5">
            <p className="text-xs text-zinc-500 tracking-wider text-center mb-2">Nama Admin</p>
            <p className="text-center tracking-wider leading-none font-semibold">{userPayloads?.user?.nama}</p>
          </div>
          <div className="mb-5">
            <p className="text-xs text-zinc-500 tracking-wider text-center mb-2">Username</p>
            <p className="text-center tracking-wide leading-none font-semibold">{userPayloads?.user?.username}</p>
          </div>
          <div className="mb-5">
            <p className="text-xs text-zinc-500 tracking-wider text-center mb-2">E-Mail</p>
            <p className="text-center tracking-wide leading-none font-semibold">{userPayloads?.user?.email}</p>
          </div>
          <div className="mb-8">
            <p className="text-xs text-zinc-500 tracking-wider text-center mb-2">Nomor Telepon</p>
            <p className="text-center tracking-wide leading-none font-semibold">{userPayloads?.user?.nohp}</p>
          </div>
          <div className="grid grid-cols-2 items-center gap-3">
            <button
              onClick={() =>
                fetchLogout({
                  url: "/logout",
                  method: "POST",
                  body: null,
                  onSuccess: handleSuccessLogout,
                  onError: handleErrorLogout,
                })
              }
              className="w-full py-3 leading-none px-5 rounded-sm tracking-wide text-white text-sm bg-red-400 hover:bg-red-500 transition-all duration-150">
              Logout
            </button>
            <button
              onClick={() => closeAdminProfileDrawer()}
              className="w-full py-3 leading-none px-5 rounded-sm tracking-wide text-white text-sm bg-blue-300 hover:bg-blue-400 transition-all duration-150">
              Tutup
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center absolute left-1/2 -translate-x-1/2 bottom-5 gap-5 w-3/4">
        <p className="text-xs tracking-wide text-zinc-500 text-center">
          Copyrights&copy; And All Rights Reserved By Polinema PSDKU Lumajang 2024.
        </p>
      </div>
    </Drawer>
  );
};

export default AdminDrawerProfile;
