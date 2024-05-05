import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  MahasiswaDashboardScreen,
  MahasiswaNavbar,
  MahasiswaPeminjamanScreen,
  MahasiswaPengembalianScreen,
  MahasiswaProfileDrawer,
} from "../../components";

const MahasiswaPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getUserPayloads = JSON.parse(localStorage.getItem("user_payloads"));

    if (!getUserPayloads) {
      navigate("/login");
    }
  }, [navigate]);

  const [mahasiswaPageId, setMahasiswaPageId] = useState(1);

  const handleChangeMahasiswaPageId = (id) => {
    setMahasiswaPageId(id);
  };

  useEffect(() => {
    const lastVisitedMahasiswaPageId = JSON.parse(localStorage.getItem("last_visited_mahasiswa_page_id"));

    if (lastVisitedMahasiswaPageId != undefined && lastVisitedMahasiswaPageId != null) {
      setMahasiswaPageId(lastVisitedMahasiswaPageId);
    } else {
      localStorage.setItem("last_visited_mahasiswa_page_id", JSON.stringify(mahasiswaPageId));
    }
  }, [mahasiswaPageId]);

  const MahasiswaPageContents = () => {
    switch (mahasiswaPageId) {
      case 1:
        return <MahasiswaDashboardScreen />;
      case 2:
        return <MahasiswaPeminjamanScreen />;
      case 3:
        return <MahasiswaPengembalianScreen />;
      default:
        return <MahasiswaDashboardScreen />;
    }
  };

  return (
    <React.Fragment>
      <MahasiswaProfileDrawer />
      <MahasiswaNavbar mahasiswaPageId={mahasiswaPageId} handleChangeMahasiswaPageId={handleChangeMahasiswaPageId} />
      <Container>
        <MahasiswaPageContents />
      </Container>
    </React.Fragment>
  );
};

export default MahasiswaPage;
