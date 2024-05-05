import { useState } from "react";
import { useFetchOnMount } from "../../../../hooks/useFetchOnMount";
import AdminTransaksiScreenHeader from "../AdminTransaksiScreenHeader";
import RequestPeminjamanTableData from "./RequestPeminjamanTableData";
import AdminPeminjamanDialog from "../AdminTransaksiDialog";
import AdminTransaksiInformation from "../AdminTransaksiInformation";

const AdminPeminjamanScreen = () => {
  const [transaksiPeminjamanKeywords, setTransaksiPeminjamanKeywords] = useState("");

  const { data: dataTransaksiPeminjaman } = useFetchOnMount({
    url:
      transaksiPeminjamanKeywords === "" ? "/peminjaman" : `/peminjaman/search/${transaksiPeminjamanKeywords}`,
    method: "GET",
  });

  const handleSearchDataPeminjaman = (event) => {
    setTransaksiPeminjamanKeywords(event.target.value);
  };

  return (
    <div className="mb-8">
      <AdminTransaksiScreenHeader handleSearchDataTransaksi={handleSearchDataPeminjaman} />
      <RequestPeminjamanTableData
        dataTransaksiPeminjaman={dataTransaksiPeminjaman}
        transaksiPeminjamanKeyword={transaksiPeminjamanKeywords}
      />
      <AdminTransaksiInformation dataTransaksi={dataTransaksiPeminjaman} />
      <AdminPeminjamanDialog />
      {/* <EditMahasiswaFormDialog /> */}
    </div>
  );
};

export default AdminPeminjamanScreen;
