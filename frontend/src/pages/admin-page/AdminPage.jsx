import React, { useEffect, useState } from "react";
import {
  AdminBarangScreen,
  AdminDashboardScreen,
  AdminDrawerProfile,
  AdminKelasScreen,
  AdminNavbar,
  AdminRekapScreen,
  AdminTransaksiScreen,
  Container,
} from "../../components";
import { useNavigate } from "react-router-dom";

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
        return <AdminKelasScreen />;
      case 3:
        return <AdminBarangScreen />;
      case 4:
        return <AdminTransaksiScreen />;
      case 5:
        return <AdminRekapScreen />;
      default:
        return <AdminDashboardScreen />;
    }
  };

  return (
    <React.Fragment>
      <AdminNavbar adminPageId={adminPageId} handleChangeAdminPageId={handleChangeAdminPageId} />
      <AdminDrawerProfile />
      <Container>
        <AdminPageContents />
      </Container>
    </React.Fragment>
  );
};

export default AdminPage;
