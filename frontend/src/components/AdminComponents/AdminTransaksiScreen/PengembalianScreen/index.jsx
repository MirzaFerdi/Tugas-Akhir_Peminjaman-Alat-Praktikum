import { useState } from "react";
import { useFetchOnMount } from "../../../../hooks/useFetchOnMount";
import AdminTransaksiScreenHeader from "../AdminTransaksiScreenHeader";
import RequestPengembalianTableData from "./RequestPengembalianTableData";
import AdminPengembalianDialog from "../AdminTransaksiDialog";
import AdminTransaksiInformation from "../AdminTransaksiInformation";

const AdminPengembalianScreen = () => {
  const [transaksiPengembalianKeywords, setTransaksiPengembalianKeywords] = useState("");

  const { data: dataTransaksiPengembalian } = useFetchOnMount({
    url:
      transaksiPengembalianKeywords === "" ? "/pengembalian" : `/pengembalian/search/${transaksiPengembalianKeywords}`,
    method: "GET",
  });

  const handleSearchDataPengembalian = (event) => {
    setTransaksiPengembalianKeywords(event.target.value);
  };

  return (
    <div className="mb-8">
      <AdminTransaksiScreenHeader handleSearchDataTransaksi={handleSearchDataPengembalian} />
      <RequestPengembalianTableData
        dataTransaksiPengembalian={dataTransaksiPengembalian}
        transaksiPengembalianKeyword={transaksiPengembalianKeywords}
      />
      <AdminTransaksiInformation dataTransaksi={dataTransaksiPengembalian} />
      <AdminPengembalianDialog />
      {/* <EditMahasiswaFormDialog /> */}
    </div>
  );
};

export default AdminPengembalianScreen;
