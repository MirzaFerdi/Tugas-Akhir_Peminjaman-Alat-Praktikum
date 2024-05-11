import { useEffect, useState } from "react";
import { AdminBroadcastMessage, AdminDashboardScreen, Navbar, AdminRekapScreen } from "../../components";
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

const AdminPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getUserPayloads = JSON.parse(localStorage.getItem("user_payloads"));

    if (!getUserPayloads) {
      navigate("/login");
    }
  }, [navigate]);

  const [adminPageId, setAdminPageId] = useState(1);

  const handleChangeAdminPageId = (id) => {
    setAdminPageId(id);
    localStorage.setItem("last_visited_admin_page_id", JSON.stringify(id));
  };

  useEffect(() => {
    const lastVisitedAdminPageId = JSON.parse(localStorage.getItem("last_visited_admin_page_id"));

    if (lastVisitedAdminPageId != undefined && lastVisitedAdminPageId != null) {
      setAdminPageId(lastVisitedAdminPageId);
    } else {
      localStorage.setItem("last_visited_admin_page_id", JSON.stringify(adminPageId));
    }
  }, [adminPageId]);

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
        return <AdminAlatScreen />;
      case 7:
        return <AdminBahanScreen />;
      case 8:
        return <AdminPeminjamanScreen />;
      case 9:
        return <AdminPengembalianScreen />;
      case 10:
        return <AdminRekapScreen />;
      case 11:
        return <AdminBroadcastMessage />;
      default:
        return <AdminDashboardScreen />;
    }
  };

  return (
    <div className="grid grid-cols-5">
      <div className="col-span-1 grid grid-rows-12 h-screen">
        <div className="row-span-1">
          <AppLogoBar />
        </div>
        <div className="row-span-11">
          <AdminSidebar adminPageId={adminPageId} handleChangeAdminPageId={handleChangeAdminPageId} />
        </div>
      </div>
      <div className="col-span-4 grid grid-rows-12 h-screen">
        <div className="row-span-1">
          <Navbar adminPageId={adminPageId} handleChangeAdminPageId={handleChangeAdminPageId} />
        </div>
        <div className="row-span-11 p-4 overflow-y-auto">
          <AdminPageContents />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
