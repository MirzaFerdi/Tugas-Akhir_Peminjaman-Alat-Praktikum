import {
  Email,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  Logout,
  Notifications,
  Person,
  PersonRounded,
  Settings,
} from "@mui/icons-material";
import { Badge, Divider, Grow, ListItemIcon, ListItemText, MenuItem, MenuList, Paper, Tooltip } from "@mui/material";
import { useCallback, useState } from "react";
import { useConfirmDialog } from "../../../hooks/useDialog";
import { useAlert } from "../../../hooks/useAlert";
import { useFetchOnClick } from "../../../hooks/useFetchOnClick";
import { useAdminPageId } from "../../../hooks/usePage";
import { useSidebar } from "../../../hooks/useSidebar";
import { useFetchOnMount } from "../../../hooks/useFetchOnMount";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const users = JSON?.parse(localStorage.getItem("user_payloads"));

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const { adminPageId, handleChangeAdminPageId } = useAdminPageId();
  const { isSidebarDrawerOpen, openSidebar, closeSidebar } = useSidebar();
  const { openConfirmDialog } = useConfirmDialog();
  const { openAlertComponent } = useAlert();
  
  const { data: unreadNotif } = useFetchOnMount({
    url: `/notifikasi/belumdibaca/${users?.userId}`,
    method: "GET",
  });
  const { fetchData: logout } = useFetchOnClick();  

  const handleChangePageFromNavbar = (id) => {
    handleChangeAdminPageId(id);
    setProfileDropdownOpen(false);
  };

  const handleSuccessLogoutResponse = useCallback(
    (successLogoutResponse) => {
      if (successLogoutResponse.success === true) {
        localStorage.clear();

        openAlertComponent({
          alertType: "success",
          alertTitle: "BERHASIL!",
          alertMessage: successLogoutResponse?.message,
        });

        navigate("/login");
      }
    },
    [navigate, openAlertComponent]
  );

  const handleErrorLogoutResponse = useCallback((errorLogoutResponse) => {
    console.log(errorLogoutResponse);
  }, []);

  const handleLogout = () => {
    openConfirmDialog({
      title: "Keluar Aplikasi",
      message: "Apakah anda yakin ingin keluar dari aplikasi?",
      okAction: () => {
        logout({
          url: "/logout",
          method: "POST",
          onSuccess: handleSuccessLogoutResponse,
          onError: handleErrorLogoutResponse,
        });
      },
    });
  };

  return (
    <div className="shadow-md flex flex-col justify-center h-full w-full top-0 bg-white z-10">
      <div className="relative grid grid-cols-2 items-center px-4 lg:mb-0 z-[1]">
        <div>
          <button onClick={isSidebarDrawerOpen ? () => closeSidebar() : () => openSidebar()}>
            {isSidebarDrawerOpen ? <KeyboardDoubleArrowLeft /> : <KeyboardDoubleArrowRight />}
          </button>
        </div>
        <div className="flex items-center justify-end gap-3">
          <Tooltip placement="bottom-start" title="Pesan Pengumuman">
            <button
              onClick={() => handleChangePageFromNavbar(14)}
              className={
                adminPageId === 14
                  ? "p-2 leading-none text-xs border-2 text-white bg-main rounded-full tracking-wide transition-all duration-100 hover:bg-main hover:text-white"
                  : "p-2 leading-none text-xs border-2 rounded-full text-zinc-600 tracking-wide transition-all duration-100 hover:bg-main hover:text-white"
              }>
              <Email fontSize="small" />
            </button>
          </Tooltip>
          <Tooltip placement="bottom-start" title="Notifikasi" sx={{ position: "relative" }}>
            <button
              onClick={() => handleChangePageFromNavbar(16)}
              className={
                adminPageId === 16
                  ? "p-2 leading-none text-xs border-2 text-white bg-main rounded-full tracking-wide transition-all duration-100 hover:bg-main hover:text-white"
                  : "p-2 leading-none text-xs border-2 rounded-full text-zinc-600 tracking-wide transition-all duration-100 hover:bg-main hover:text-white"
              }>
              <Badge badgeContent={unreadNotif?.data?.length} color="info">
                <Notifications />
              </Badge>
            </button>
          </Tooltip>
          <Tooltip placement="bottom-start" title="Profil" sx={{ position: "relative" }}>
            <button
              onClick={() => setProfileDropdownOpen((prevState) => !prevState)}
              className={`${
                profileDropdownOpen ? "bg-main text-white" : "hover:bg-main hover:text-white text-zinc-600"
              } p-2 leading-none text-xs border-2 rounded-full tracking-wide transition-all duration-100`}>
              <Person />
            </button>
          </Tooltip>
          <Grow in={profileDropdownOpen} unmountOnExit>
            <Paper
              sx={{
                display: profileDropdownOpen ? "block" : "none",
                width: 320,
                maxWidth: "100%",
                position: "absolute",
                zIndex: 50,
                right: 20,
                top: 60,
              }}>
              <MenuList>
                <MenuItem onClick={() => handleChangePageFromNavbar(15)}>
                  <ListItemIcon>
                    <PersonRounded fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Profil</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleChangePageFromNavbar(15)}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Pengaturan</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => handleLogout()}>
                  <ListItemIcon sx={{ color: "red", fontFamily: "Poppins" }}>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </MenuList>
            </Paper>
          </Grow>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
