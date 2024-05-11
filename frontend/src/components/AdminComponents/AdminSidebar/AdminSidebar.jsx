import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  LooksOne,
  LooksTwo,
  Looks3,
  Looks4,
  School,
  HomeRepairService,
  Plumbing,
  Construction,
  DateRange,
  ReceiptLong,
  Dashboard,
} from "@mui/icons-material";
import { useFetchOnClick } from "../../../hooks/useFetchOnClick";
import { useConfirmDialog } from "../../../hooks/useDialog";
import { useAlert } from "../../../hooks/useAlert";

const AdminSidebar = ({ adminPageId, handleChangeAdminPageId }) => {
  const userPayloads = JSON.parse(localStorage.getItem("user_payloads"));

  const [openKelasSubNav, setOpenKelasSubNav] = useState(false);
  const [openBarangSubNav, setOpenBarangSubNav] = useState(false);
  const [openTransaksiSubNav, setOpenTransaksiSubNav] = useState(false);

  const { openConfirmDialog, closeConfirmDialog } = useConfirmDialog();
  const { openAlertComponent, closeAlertComponent } = useAlert();

  const { fetchData: logout } = useFetchOnClick();

  const handleSuccessLogoutResponse = useCallback((successLogoutResponse) => {
    if (successLogoutResponse.success === true) {
      localStorage.clear();

      openAlertComponent({
        alertType: "success",
        alertTitle: "BERHASIL!",
        alertMessage: successLogoutResponse?.message
      })      

      setTimeout(() => {
        closeAlertComponent();
        closeConfirmDialog();
        window.location.reload();
      }, 2000)
    }
  }, [closeAlertComponent, closeConfirmDialog, openAlertComponent])
  
  const handleErrorLogoutResponse = useCallback((errorLogoutResponse) => {
    console.log(errorLogoutResponse);
  }, [])

  const handleLogout = () => {
    openConfirmDialog({
      title: "Keluar Aplikasi",
      message: "Apakah anda yakin ingin keluar dari aplikasi?",
      okAction: () => {
        logout({
          url: "/logout",
          method: "POST",
          onSuccess: handleSuccessLogoutResponse,
          onError: handleErrorLogoutResponse
        })
      }
    })
  }

  return (
    <List
      subheader={
        <ListSubheader
          sx={{ position: "relative", bgcolor: "inherit", color: "#DFDFDF" }}
          component="div"
          id="nested-list-subheader">
          Menu
        </ListSubheader>
      }
      sx={{ width: "100%", height: "100%", bgcolor: "#2D1B6B" }}
      disablePadding>
      <ListItemButton
        onClick={() => handleChangeAdminPageId(1)}
        sx={{
          backgroundColor: adminPageId === 1 ? "#1D0C5A" : "inherit",
          ":hover": {
            backgroundColor: adminPageId === 1 ? "#1D0C5A" : "#1D0C5A",
          },
        }}>
        <ListItemIcon>
          <Dashboard sx={{ color: "white" }} fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primary="Halaman Utama"
          primaryTypographyProps={{ fontSize: "0.8em", fontFamily: "Poppins", color: "white" }}
        />
      </ListItemButton>
      <ListItemButton
        sx={{
          ":hover": {
            backgroundColor: "#1D0C5A",
          },
        }}
        onClick={() => setOpenKelasSubNav(!openKelasSubNav)}>
        <ListItemIcon>
          <School sx={{ color: "white" }} fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primary="Manajemen Mahasiswa"
          primaryTypographyProps={{ fontSize: "0.8em", fontFamily: "Poppins", color: "white" }}
        />
        {openKelasSubNav ? (
          <ExpandLess sx={{ color: "white" }} fontSize="small" />
        ) : (
          <ExpandMore sx={{ color: "white" }} fontSize="small" />
        )}
      </ListItemButton>
      <Collapse in={openKelasSubNav} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{
              pl: 4,
              backgroundColor: adminPageId === 2 ? "#1D0C5A" : "inherit",
              ":hover": {
                backgroundColor: adminPageId === 2 ? "#1D0C5A" : "#1D0C5A",
              },
            }}
            onClick={() => handleChangeAdminPageId(2)}>
            <ListItemIcon>
              <LooksOne sx={{ color: "white" }} fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="Mahasiswa Kelas 1"
              primaryTypographyProps={{ fontSize: "0.8em", fontFamily: "Poppins", color: "white" }}
            />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{
              pl: 4,
              backgroundColor: adminPageId === 3 ? "#1D0C5A" : "inherit",
              ":hover": {
                backgroundColor: adminPageId === 3 ? "#1D0C5A" : "#1D0C5A",
              },
            }}
            onClick={() => handleChangeAdminPageId(3)}>
            <ListItemIcon>
              <LooksTwo sx={{ color: "white" }} fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="Mahasiswa Kelas 2"
              primaryTypographyProps={{ fontSize: "0.8em", fontFamily: "Poppins", color: "white" }}
            />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{
              pl: 4,
              backgroundColor: adminPageId === 4 ? "#1D0C5A" : "inherit",
              ":hover": {
                backgroundColor: adminPageId === 4 ? "#1D0C5A" : "#1D0C5A",
              },
            }}
            onClick={() => handleChangeAdminPageId(4)}>
            <ListItemIcon>
              <Looks3 sx={{ color: "white" }} fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="Mahasiswa Kelas 3"
              primaryTypographyProps={{ fontSize: "0.8em", fontFamily: "Poppins", color: "white" }}
            />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{
              pl: 4,
              backgroundColor: adminPageId === 5 ? "#1D0C5A" : "inherit",
              ":hover": {
                backgroundColor: adminPageId === 5 ? "#1D0C5A" : "#1D0C5A",
              },
            }}
            onClick={() => handleChangeAdminPageId(5)}>
            <ListItemIcon>
              <Looks4 sx={{ color: "white" }} fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="Mahasiswa Kelas 4"
              primaryTypographyProps={{ fontSize: "0.8em", fontFamily: "Poppins", color: "white" }}
            />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton
        sx={{
          ":hover": {
            backgroundColor: "#1D0C5A",
          },
        }}
        onClick={() => setOpenBarangSubNav(!openBarangSubNav)}>
        <ListItemIcon>
          <HomeRepairService sx={{ color: "white" }} fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primary="Manajemen Barang"
          primaryTypographyProps={{ fontSize: "0.8em", fontFamily: "Poppins", color: "white" }}
        />
        {openBarangSubNav ? (
          <ExpandLess sx={{ color: "white" }} fontSize="small" />
        ) : (
          <ExpandMore sx={{ color: "white" }} fontSize="small" />
        )}
      </ListItemButton>
      <Collapse in={openBarangSubNav} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{
              pl: 4,
              backgroundColor: adminPageId === 6 ? "#1D0C5A" : "inherit",
              ":hover": {
                backgroundColor: adminPageId === 6 ? "#1D0C5A" : "#1D0C5A",
              },
            }}
            onClick={() => handleChangeAdminPageId(6)}>
            <ListItemIcon>
              <Plumbing sx={{ color: "white" }} fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="Manajemen Alat Praktikum"
              primaryTypographyProps={{ fontSize: "0.8em", fontFamily: "Poppins", color: "white" }}
            />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{
              pl: 4,
              backgroundColor: adminPageId === 7 ? "#1D0C5A" : "inherit",
              ":hover": {
                backgroundColor: adminPageId === 7 ? "#1D0C5A" : "#1D0C5A",
              },
            }}
            onClick={() => handleChangeAdminPageId(7)}>
            <ListItemIcon>
              <Construction sx={{ color: "white" }} fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="Manajemen Bahan Praktikum"
              primaryTypographyProps={{ fontSize: "0.8em", fontFamily: "Poppins", color: "white" }}
            />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton
        sx={{
          ":hover": {
            backgroundColor: "#1D0C5A",
          },
        }}
        onClick={() => setOpenTransaksiSubNav(!openTransaksiSubNav)}>
        <ListItemIcon>
          <DateRange sx={{ color: "white" }} fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primary="Manajemen Transaksi"
          primaryTypographyProps={{ fontSize: "0.8em", fontFamily: "Poppins", color: "white" }}
        />
        {openTransaksiSubNav ? (
          <ExpandLess sx={{ color: "white" }} fontSize="small" />
        ) : (
          <ExpandMore sx={{ color: "white" }} fontSize="small" />
        )}
      </ListItemButton>
      <Collapse in={openTransaksiSubNav} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{
              pl: 4,
              backgroundColor: adminPageId === 8 ? "#1D0C5A" : "inherit",
              ":hover": {
                backgroundColor: adminPageId === 8 ? "#1D0C5A" : "#1D0C5A",
              },
            }}
            onClick={() => handleChangeAdminPageId(8)}>
            <ListItemIcon>
              <Plumbing sx={{ color: "white" }} fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="Manajemen Alat Praktikum"
              primaryTypographyProps={{ fontSize: "0.8em", fontFamily: "Poppins", color: "white" }}
            />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{
              pl: 4,
              backgroundColor: adminPageId === 9 ? "#1D0C5A" : "inherit",
              ":hover": {
                backgroundColor: adminPageId === 9 ? "#1D0C5A" : "#1D0C5A",
              },
            }}
            onClick={() => handleChangeAdminPageId(9)}>
            <ListItemIcon>
              <Construction sx={{ color: "white" }} fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="Manajemen Bahan Praktikum"
              primaryTypographyProps={{ fontSize: "0.8em", fontFamily: "Poppins", color: "white" }}
            />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton
        sx={{
          backgroundColor: adminPageId === 10 ? "#1D0C5A" : "inherit",
          ":hover": {
            backgroundColor: adminPageId === 10 ? "#1D0C5A" : "#1D0C5A",
          },
        }}
        onClick={() => handleChangeAdminPageId(10)}>
        <ListItemIcon>
          <ReceiptLong sx={{ color: "white" }} fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primary="Rekap Bulanan"
          primaryTypographyProps={{ fontSize: "0.8em", fontFamily: "Poppins", color: "white" }}
        />
      </ListItemButton>
      <div className="absolute bottom-0 w-full left-1/2 -translate-x-1/2 bg-zinc-100 py-2 px-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-zinc-500">Sign In As</p>
            <p className="text-sm">{userPayloads?.user?.role?.nama}</p>
          </div>
          <button onClick={() => handleLogout()} className="py-2 px-5 text-sm tracking-wide bg-red-400 hover:bg-red-500 rounded-sm text-white">Logout</button>
        </div>
      </div>
    </List>
  );
};

AdminSidebar.propTypes = {
  adminPageId: PropTypes.any,
  handleChangeAdminPageId: PropTypes.func,
};

export default AdminSidebar;
