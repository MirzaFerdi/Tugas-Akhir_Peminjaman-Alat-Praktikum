import { Drawer } from "@mui/material";
import { useMahasiswaProfileDrawer } from "../../../hooks/useProfileDrawer";
import { useFetchOnClick } from "../../../hooks/useFetchOnClick";
import { useCallback } from "react";
import { mahasiswaIcon } from "../../../assets";
import { useAlert } from "../../../hooks/useAlert";
import { useNavigate } from "react-router-dom";

const MahasiswaProfileDrawer = () => {
  const navigate = useNavigate();

  const { isMahasiswaProfileDrawerOpen, closeMahasiswaProfileDrawer } = useMahasiswaProfileDrawer();
  const { openAlertComponent, closeAlertComponent } = useAlert();
  const { fetchData: fetchLogout } = useFetchOnClick();

  const userPayloads = JSON.parse(localStorage.getItem("user_payloads"));

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
          closeMahasiswaProfileDrawer();
          localStorage.clear();
          navigate("/login");
        }, 2000);
      }
    },
    [navigate, openAlertComponent, closeAlertComponent, closeMahasiswaProfileDrawer]
  );

  const handleErrorLogout = useCallback((logoutErrorResponse) => {
    console.log(logoutErrorResponse);
  }, []);

  return (
    <Drawer
      anchor="right"
      open={isMahasiswaProfileDrawerOpen}
      onClose={() => closeMahasiswaProfileDrawer()}
      sx={{ position: "relative" }}>
      <div className="bg-zinc-100 w-[25rem] flex flex-col items-center justify-center h-full px-8">
        <div className="w-full flex flex-col items-center p-5 bg-white rounded-md shadow-md mb-4">
          <img src={mahasiswaIcon} alt="Mahasiswa Icon" width={64} height={64} className="aspect-square mb-3" />
          <p className="text-xs text-zinc-500 tracking-wider">Masuk Sebagai</p>
          <p className="text-md font-semibold tracking-wider mb-5">{userPayloads?.user?.role?.nama}</p>
          <div className="mb-5">
            <p className="text-xs text-zinc-500 tracking-wider text-center mb-2">Nama Mahasiswa</p>
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
              onClick={() => closeMahasiswaProfileDrawer()}
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

export default MahasiswaProfileDrawer;
