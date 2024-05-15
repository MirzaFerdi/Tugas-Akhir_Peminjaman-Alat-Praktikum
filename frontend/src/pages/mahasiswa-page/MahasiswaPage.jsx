import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MahasiswaDashboardScreen,
  MahasiswaPengembalianScreen,
  AppLogoBar,
  MahasiswaDetailPeminjamanTable,
  MahasiswaDetailPengembalianTable,
  MahasiswaPeminjamanScreen,
  Profile,
  MahasiswaNavbar,
} from "../../components";
import MahasiswaSidebar from "../../components/MahasiswaComponents/MahasiswaSidebar/MahasiswaSidebar";

const MahasiswaPage = () => {
  const navigate = useNavigate();

  const [mahasiswaPageId, setMahasiswaPageId] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const getUserPayloads = JSON.parse(localStorage.getItem("user_payloads"));

    if (!getUserPayloads) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const lastVisitedMahasiswaPageId = JSON.parse(localStorage.getItem("last_visited_mahasiswa_page_id"));
    const sidebarOpen = JSON.parse(localStorage.getItem("is_sidebar_open"));

    if (
      (lastVisitedMahasiswaPageId != undefined && lastVisitedMahasiswaPageId != null) ||
      (sidebarOpen != undefined && sidebarOpen != null)
    ) {
      setMahasiswaPageId(lastVisitedMahasiswaPageId);
      setIsSidebarOpen(sidebarOpen);
    } else {
      localStorage.setItem("last_visited_mahasiswa_page_id", JSON.stringify(mahasiswaPageId));
      localStorage.setItem("is_sidebar_open", JSON.stringify(isSidebarOpen));
    }
  }, [isSidebarOpen, mahasiswaPageId]);

  const handleChangeMahasiswaPageId = (id) => {
    setMahasiswaPageId(id);
    localStorage.setItem("last_visited_mahasiswa_page_id", JSON.stringify(id));
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    localStorage.setItem("is_sidebar_open", JSON.stringify(!isSidebarOpen));
  };

  const MahasiswaPageContents = () => {
    switch (mahasiswaPageId) {
      case 1:
        return <MahasiswaDashboardScreen />;
      case 2:
        return <MahasiswaDetailPeminjamanTable />;
      case 3:
        return <MahasiswaDetailPengembalianTable />;
      case 4:
        return <MahasiswaPeminjamanScreen />;
      case 5:
        return <MahasiswaPengembalianScreen />;
      case 13:
        return <Profile />;
      case 14:
        return <MahasiswaDashboardScreen />;
      default:
        return <MahasiswaDashboardScreen />;
    }
  };

  return (
    <div className="grid grid-cols-5">
      <div className={`${isSidebarOpen ? "col-span-5 lg:col-span-1" : "hidden"} grid grid-rows-12 h-screen`}>
        <div className="row-span-1">
          <AppLogoBar handleToggleSidebar={handleToggleSidebar} isSidebarOpen={isSidebarOpen} />
        </div>
        <div className="row-span-11">
          <MahasiswaSidebar
            mahasiswaPageId={mahasiswaPageId}
            handleChangeMahasiswaPageId={handleChangeMahasiswaPageId}
            handleToggleSidebar={handleToggleSidebar}
          />
        </div>
      </div>
      <div
        className={`${
          isSidebarOpen ? "col-span-4 hidden lg:grid grid-rows-12 h-screen" : "col-span-5 grid grid-rows-12 h-screen"
        }`}>
        <div className="row-span-1">
          <MahasiswaNavbar
            mahasiswaPageId={mahasiswaPageId}
            handleChangeMahasiswaPageId={handleChangeMahasiswaPageId}
            handleToggleSidebar={handleToggleSidebar}
          />
        </div>
        <div className="row-span-11 p-4 overflow-y-auto">
          <MahasiswaPageContents />
        </div>
      </div>
    </div>
  );
};

export default MahasiswaPage;
