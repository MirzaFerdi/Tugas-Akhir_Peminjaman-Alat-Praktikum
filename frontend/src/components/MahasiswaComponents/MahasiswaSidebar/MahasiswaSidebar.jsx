import PropTypes from "prop-types";
import { useState } from "react";
import {
  Dashboard,
  DateRange,
  ExpandLess,
  ExpandMore,
  HomeRepairService,
  ManageHistory,
  NoteAlt,
  Notes,
} from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import { useMediaQuery } from "react-responsive";

const MahasiswaSidebar = ({ mahasiswaPageId, handleChangeMahasiswaPageId, handleToggleSidebar }) => {  
  const isMobile = useMediaQuery({ query: "(max-width: 1439px)" });

  const [openDetailTransaksiSubNav, setOpenDetailTransaksiSubNav] = useState(true);  

  const handleChangePage = (id) => {
    handleChangeMahasiswaPageId(id);
    isMobile && handleToggleSidebar();
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
      sx={{ width: "100%", height: "100%", bgcolor: "#2D1B6B", overflowY: "auto" }}
      disablePadding>
      <ListItemButton
        onClick={() => handleChangePage(1)}
        sx={{
          backgroundColor: mahasiswaPageId === 1 ? "#1D0C5A" : "inherit",
          ":hover": {
            backgroundColor: mahasiswaPageId === 1 ? "#1D0C5A" : "#1D0C5A",
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
          backgroundColor: mahasiswaPageId === 4 ? "#1D0C5A" : "inherit",
          ":hover": {
            backgroundColor: mahasiswaPageId === 4 ? "#1D0C5A" : "#1D0C5A",
          },
        }}
        onClick={() => handleChangePage(4)}>
        <ListItemIcon>
          <HomeRepairService sx={{ color: "white" }} fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primary="Peminjaman Barang"
          primaryTypographyProps={{ fontSize: "0.8em", fontFamily: "Poppins", color: "white" }}
        />
      </ListItemButton>
      <ListItemButton
        sx={{
          backgroundColor: mahasiswaPageId === 5 ? "#1D0C5A" : "inherit",
          ":hover": {
            backgroundColor: mahasiswaPageId === 5 ? "#1D0C5A" : "#1D0C5A",
          },
        }}
        onClick={() => handleChangePage(5)}>
        <ListItemIcon>
          <DateRange sx={{ color: "white" }} fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primary="Pengembalian Barang"
          primaryTypographyProps={{ fontSize: "0.8em", fontFamily: "Poppins", color: "white" }}
        />
      </ListItemButton>
      <ListItemButton
        sx={{
          ":hover": {
            backgroundColor: "#1D0C5A",
          },
        }}
        onClick={() => setOpenDetailTransaksiSubNav(!openDetailTransaksiSubNav)}>
        <ListItemIcon>
          <Notes sx={{ color: "white" }} fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primary="Histori Transaksi"
          primaryTypographyProps={{ fontSize: "0.8em", fontFamily: "Poppins", color: "white" }}
        />
        {openDetailTransaksiSubNav ? (
          <ExpandLess sx={{ color: "white" }} fontSize="small" />
        ) : (
          <ExpandMore sx={{ color: "white" }} fontSize="small" />
        )}
      </ListItemButton>
      <Collapse in={openDetailTransaksiSubNav} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{
              pl: 4,
              backgroundColor: mahasiswaPageId === 2 ? "#1D0C5A" : "inherit",
              ":hover": {
                backgroundColor: mahasiswaPageId === 2 ? "#1D0C5A" : "#1D0C5A",
              },
            }}
            onClick={() => handleChangePage(2)}>
            <ListItemIcon>
              <NoteAlt sx={{ color: "white" }} fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="Detail Histori Peminjaman"
              primaryTypographyProps={{ fontSize: "0.8em", fontFamily: "Poppins", color: "white" }}
            />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{
              pl: 4,
              backgroundColor: mahasiswaPageId === 3 ? "#1D0C5A" : "inherit",
              ":hover": {
                backgroundColor: mahasiswaPageId === 3 ? "#1D0C5A" : "#1D0C5A",
              },
            }}
            onClick={() => handleChangePage(3)}>
            <ListItemIcon>
              <ManageHistory sx={{ color: "white" }} fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="Detail Histori Pengembalian"
              primaryTypographyProps={{ fontSize: "0.8em", fontFamily: "Poppins", color: "white" }}
            />
          </ListItemButton>
        </List>
      </Collapse>      
    </List>
  );
};

MahasiswaSidebar.propTypes = {
  handleChangeMahasiswaPageId: PropTypes.func,
  handleChangePage: PropTypes.func,
  handleToggleSidebar: PropTypes.func,
  mahasiswaPageId: PropTypes.number
}

export default MahasiswaSidebar;
