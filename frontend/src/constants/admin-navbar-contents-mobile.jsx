import { Apps, Assignment, Dashboard, HomeRepairService, School } from "@mui/icons-material";

export const adminNavbarContentsMobile = [
  {
    id: 2,
    buttonText: "Kelas",
    buttonIcon: <School />,
  },
  {
    id: 3,
    buttonText: "Barang",
    buttonIcon: <HomeRepairService />,
  },
  {
    id: 1,
    buttonText: "Dashboard",
    buttonIcon: <Dashboard fontSize="large"/>,
  },
  {
    id: 4,
    buttonText: "Transaksi",
    buttonIcon: <Apps />,
  },
  {
    id: 5,
    buttonText: "Rekap",
    buttonIcon: <Assignment />,
  },
];
