import { useEffect, useState } from "react";
import { AdminBroadcastMessage, AdminDashboardScreen, AdminNavbar, AdminRekapScreen, Profile } from "../../components";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminComponents/AdminSidebar/AdminSidebar";
import AppLogoBar from "../../components/AppLogoBar/AppLogoBar";
import Kelas1 from "../../components/AdminComponents/AdminKelasScreen/Kelas1";
import Kelas2 from "../../components/AdminComponents/AdminKelasScreen/Kelas2";
import Kelas3 from "../../components/AdminComponents/AdminKelasScreen/Kelas3";
import Kelas4 from "../../components/AdminComponents/AdminKelasScreen/Kelas4";
import AdminAlatScreen from "../../components/AdminComponents/AdminBarangScreen/AdminAlatScreen";
import AdminBahanScreen from "../../components/AdminComponents/AdminBarangScreen/AdminBahanScreen";
import AdminPeminjamanScreen from "../../components/AdminComponents/AdminTransaksiScreen/PeminjamanScreen";
import AdminPengembalianScreen from "../../components/AdminComponents/AdminTransaksiScreen/PengembalianScreen";
import AdminDashboardScreenUpClass from "../../components/AdminComponents/AdminDashboardScreen/AdminDashboardScreenUpClass";

const AdminPage = () => {
  const navigate = useNavigate();

  const [adminPageId, setAdminPageId] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const getUserPayloads = JSON.parse(localStorage.getItem("user_payloads"));

    if (!getUserPayloads) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const sidebarOpen = JSON.parse(localStorage.getItem("is_sidebar_open"));
    const lastVisitedAdminPageId = JSON.parse(localStorage.getItem("last_visited_admin_page_id"));

    if (
      (lastVisitedAdminPageId != undefined && lastVisitedAdminPageId != null) ||
      (sidebarOpen != undefined && sidebarOpen != null)
    ) {
      setAdminPageId(lastVisitedAdminPageId);
      setIsSidebarOpen(sidebarOpen);
    } else {
      localStorage.setItem("last_visited_admin_page_id", JSON.stringify(adminPageId));
      localStorage.setItem("is_sidebar_open", JSON.stringify(isSidebarOpen));
    }
  }, [adminPageId, isSidebarOpen]);

  const handleChangeAdminPageId = (id) => {
    setAdminPageId(id);
    localStorage.setItem("last_visited_admin_page_id", JSON.stringify(id));
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    localStorage.setItem("is_sidebar_open", JSON.stringify(!isSidebarOpen));
  };

  const AdminPageContents = () => {
    switch (adminPageId) {
      case 1:
        return <AdminDashboardScreen />;
      case 2:
        return <Kelas1 />;
      case 3:
        return <Kelas2 />;
      case 4:
        return <Kelas3 />;
      case 5:
        return <Kelas4 />;
      case 6:
        return <AdminDashboardScreenUpClass />;
      case 7:
        return <AdminAlatScreen />;
      case 8:
        return <AdminBahanScreen />;
      case 9:
        return <AdminPeminjamanScreen />;
      case 10:
        return <AdminPengembalianScreen />;
      case 11:
        return <AdminRekapScreen />;
      case 12:
        return <AdminBroadcastMessage />;
      case 13:
        return <Profile />;
      default:
        return <AdminDashboardScreen />;
    }
  };

  return (
    <div className="grid grid-cols-5">
      <div className={`${isSidebarOpen ? "col-span-5 lg:col-span-1" : "hidden"} grid grid-rows-12 h-screen`}>
        <div className="row-span-1">
          <AppLogoBar handleToggleSidebar={handleToggleSidebar} isSidebarOpen={isSidebarOpen} />
        </div>
        <div className="row-span-11">
          <AdminSidebar
            adminPageId={adminPageId}
            handleChangeAdminPageId={handleChangeAdminPageId}
            handleToggleSidebar={handleToggleSidebar}
          />
        </div>
      </div>
      <div
        className={`${
          isSidebarOpen ? "col-span-4 hidden lg:grid grid-rows-12 h-screen" : "col-span-5 grid grid-rows-12 h-screen"
        }`}>
        <div className="row-span-1">
          <AdminNavbar
            adminPageId={adminPageId}
            handleChangeAdminPageId={handleChangeAdminPageId}
            isSidebarOpen={isSidebarOpen}
            handleToggleSidebar={handleToggleSidebar}
          />
        </div>
        <div className="row-span-11 p-4 overflow-y-auto">
          <AdminPageContents />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
