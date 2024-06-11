import PropTypes from "prop-types";
import { useState } from "react";
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
  Construction,
  DateRange,
  ReceiptLong,
  Dashboard,
  Upgrade,
  AutoDelete,
  HealthAndSafety,
  AddToPhotos,
  PlaylistAddCheck,
  Plumbing,
} from "@mui/icons-material";
import SidebarNavigationButton from "./SidebarNavigationButton";

const AdminSidebar = () => {
  const [openKelasSubNav, setOpenKelasSubNav] = useState(false);
  const [openBarangSubNav, setOpenBarangSubNav] = useState(false);
  const [openTransaksiSubNav, setOpenTransaksiSubNav] = useState(false);  

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
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "#2D1B6B",
        overflowY: "auto",
      }}
      disablePadding>
      <SidebarNavigationButton
        menuId={1}
        menuIcon={<Dashboard sx={{ color: "white" }} fontSize="small" />}
        menuText="Halaman Utama"
      />

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
          <SidebarNavigationButton
            menuId={2}
            menuIcon={<LooksOne sx={{ color: "white" }} fontSize="small" />}
            menuText="Mahasiswa Kelas 1"
            pl={4}
          />
          <SidebarNavigationButton
            menuId={3}
            menuIcon={<LooksTwo sx={{ color: "white" }} fontSize="small" />}
            menuText="Mahasiswa Kelas 2"
            pl={4}
          />
          <SidebarNavigationButton
            menuId={4}
            menuIcon={<Looks3 sx={{ color: "white" }} fontSize="small" />}
            menuText="Mahasiswa Kelas 3"
            pl={4}
          />
          <SidebarNavigationButton
            menuId={5}
            menuIcon={<Looks4 sx={{ color: "white" }} fontSize="small" />}
            menuText="Mahasiswa Kelas 4"
            pl={4}
          />
          <SidebarNavigationButton
            menuId={6}
            menuIcon={<Upgrade sx={{ color: "white" }} fontSize="small" />}
            menuText="Manajemen Naik Kelas"
            pl={4}
          />
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
          <SidebarNavigationButton
            menuId={7}
            menuIcon={<Construction sx={{ color: "white" }} fontSize="small" />}
            menuText="Daftar Alat Praktikum"
            pl={4}
          />
          <SidebarNavigationButton
            menuId={8}
            menuIcon={<Plumbing sx={{ color: "white" }} fontSize="small" />}
            menuText="Daftar Bahan Praktikum"
            pl={4}
          />
          <SidebarNavigationButton
            menuId={9}
            menuIcon={<HealthAndSafety sx={{ color: "white" }} fontSize="small" />}
            menuText="Detail Alat Rusak"
            pl={4}
          />
          <SidebarNavigationButton
            menuId={10}
            menuIcon={<AutoDelete sx={{ color: "white" }} fontSize="small" />}
            menuText="Detail Bahan Habis"
            pl={4}
          />
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
        <SidebarNavigationButton
          menuId={11}
          menuIcon={<AddToPhotos sx={{ color: "white" }} fontSize="small" />}
          menuText="Request Peminjaman"
          pl={4}
        />
        <SidebarNavigationButton
          menuId={12}
          menuIcon={<PlaylistAddCheck sx={{ color: "white" }} fontSize="small" />}
          menuText="Request Pengembalian"
          pl={4}
        />
      </Collapse>

      <SidebarNavigationButton
        menuId={13}
        menuIcon={<ReceiptLong sx={{ color: "white" }} fontSize="small" />}
        menuText="Rekap Bulanan"        
      />
    </List>
  );
};

AdminSidebar.propTypes = {
  adminPageId: PropTypes.number,
  handleToggleSidebar: PropTypes.func,
};

export default AdminSidebar;
