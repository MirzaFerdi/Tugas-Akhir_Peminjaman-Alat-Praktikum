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
  Plumbing,
  Construction,
  DateRange,
  ReceiptLong,
  Dashboard,
  Upgrade,
} from "@mui/icons-material";
import { useMediaQuery } from "react-responsive";

const AdminSidebar = ({ adminPageId, handleChangeAdminPageId, handleToggleSidebar }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 1439px)" });

  const [openKelasSubNav, setOpenKelasSubNav] = useState(false);
  const [openBarangSubNav, setOpenBarangSubNav] = useState(false);
  const [openTransaksiSubNav, setOpenTransaksiSubNav] = useState(false);  

  const handleChangePage = (id) => {
    handleChangeAdminPageId(id);
    isMobile && handleToggleSidebar();
  };  
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
      <ListItemButton
        onClick={() => handleChangePage(1)}
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
            onClick={() => handleChangePage(2)}>
            <ListItemIcon>
              <LooksOne sx={{ color: "white" }} fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="Mahasiswa Kelas 1"
              primaryTypographyProps={{ fontSize: "0.8em", fontFamily: "Poppins", color: "white" }}
            />
          </ListItemButton>
          <ListItemButton
            sx={{
              pl: 4,
              backgroundColor: adminPageId === 3 ? "#1D0C5A" : "inherit",
              ":hover": {
                backgroundColor: adminPageId === 3 ? "#1D0C5A" : "#1D0C5A",
              },
            }}
            onClick={() => handleChangePage(3)}>
            <ListItemIcon>
              <LooksTwo sx={{ color: "white" }} fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="Mahasiswa Kelas 2"
              primaryTypographyProps={{ fontSize: "0.8em", fontFamily: "Poppins", color: "white" }}
            />
          </ListItemButton>
          <ListItemButton
            sx={{
              pl: 4,
              backgroundColor: adminPageId === 4 ? "#1D0C5A" : "inherit",
              ":hover": {
                backgroundColor: adminPageId === 4 ? "#1D0C5A" : "#1D0C5A",
              },
            }}
            onClick={() => handleChangePage(4)}>
            <ListItemIcon>
              <Looks3 sx={{ color: "white" }} fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="Mahasiswa Kelas 3"
              primaryTypographyProps={{ fontSize: "0.8em", fontFamily: "Poppins", color: "white" }}
            />
          </ListItemButton>
          <ListItemButton
            sx={{
              pl: 4,
              backgroundColor: adminPageId === 5 ? "#1D0C5A" : "inherit",
              ":hover": {
                backgroundColor: adminPageId === 5 ? "#1D0C5A" : "#1D0C5A",
              },
            }}
            onClick={() => handleChangePage(5)}>
            <ListItemIcon>
              <Looks4 sx={{ color: "white" }} fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="Mahasiswa Kelas 4"
              primaryTypographyProps={{ fontSize: "0.8em", fontFamily: "Poppins", color: "white" }}
            />
          </ListItemButton>
          <ListItemButton
            sx={{
              pl: 4,
              backgroundColor: adminPageId === 6 ? "#1D0C5A" : "inherit",
              ":hover": {
                backgroundColor: adminPageId === 6 ? "#1D0C5A" : "#1D0C5A",
              },
            }}
            onClick={() => handleChangePage(6)}>
            <ListItemIcon>
              <Upgrade sx={{ color: "white" }} fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="Manajemen Naik Kelas"
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
              backgroundColor: adminPageId === 7 ? "#1D0C5A" : "inherit",
              ":hover": {
                backgroundColor: adminPageId === 7 ? "#1D0C5A" : "#1D0C5A",
              },
            }}
            onClick={() => handleChangePage(7)}>
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
              backgroundColor: adminPageId === 8 ? "#1D0C5A" : "inherit",
              ":hover": {
                backgroundColor: adminPageId === 8 ? "#1D0C5A" : "#1D0C5A",
              },
            }}
            onClick={() => handleChangePage(8)}>
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
              backgroundColor: adminPageId === 9 ? "#1D0C5A" : "inherit",
              ":hover": {
                backgroundColor: adminPageId === 9 ? "#1D0C5A" : "#1D0C5A",
              },
            }}
            onClick={() => handleChangePage(9)}>
            <ListItemIcon>
              <Plumbing sx={{ color: "white" }} fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="Request Peminjaman"
              primaryTypographyProps={{ fontSize: "0.8em", fontFamily: "Poppins", color: "white" }}
            />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{
              pl: 4,
              backgroundColor: adminPageId === 10 ? "#1D0C5A" : "inherit",
              ":hover": {
                backgroundColor: adminPageId === 10 ? "#1D0C5A" : "#1D0C5A",
              },
            }}
            onClick={() => handleChangePage(10)}>
            <ListItemIcon>
              <Construction sx={{ color: "white" }} fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="Request Pengembalian"
              primaryTypographyProps={{ fontSize: "0.8em", fontFamily: "Poppins", color: "white" }}
            />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton
        sx={{
          backgroundColor: adminPageId === 11 ? "#1D0C5A" : "inherit",
          ":hover": {
            backgroundColor: adminPageId === 11 ? "#1D0C5A" : "#1D0C5A",
          },
        }}
        onClick={() => handleChangePage(11)}>
        <ListItemIcon>
          <ReceiptLong sx={{ color: "white" }} fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primary="Rekap Bulanan"
          primaryTypographyProps={{ fontSize: "0.8em", fontFamily: "Poppins", color: "white" }}
        />
      </ListItemButton>
    </List>
  );
};

AdminSidebar.propTypes = {
  adminPageId: PropTypes.number,
  handleChangeAdminPageId: PropTypes.func,
  handleToggleSidebar: PropTypes.func,
};

export default AdminSidebar;
