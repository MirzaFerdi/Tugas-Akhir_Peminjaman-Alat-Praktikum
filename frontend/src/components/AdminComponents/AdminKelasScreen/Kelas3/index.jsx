import { AddCircleOutline } from "@mui/icons-material";
import { useFetchOnMount } from "../../../../hooks/useFetchOnMount";
import { useState } from "react";
import { useAdminAddMahasiswaDialog } from "../../../../hooks/useDialog";
import AdminKelasScreenHeader from "../AdminKelasScreenHeader";
import Kelas3TableData from "./Kelas3TableData";
import AdminKelasInformation from "../AdminKelasInformation";
import AdminKelasAddMahasiswaDialog from "../AdminKelasAddMahasiswaDialog";

const Kelas2 = () => {
  const [mahasiswaKeywords, setMahasiswaKeywords] = useState("");

  const { openAddMahasiswaDialog } = useAdminAddMahasiswaDialog();

  const { data: dataInformasiKelas3 } = useFetchOnMount({
    url: "/kelas/3",
    method: "GET",
  });

  const { data: dataMahasiswaKelas3 } = useFetchOnMount({
    url: "/user/kelas/3",
    method: "GET",
  });

  const handleSearchMahasiswa = (event) => {
    setMahasiswaKeywords(event.target.value);
  };

  return (
    <div className="mb-8">
      <AdminKelasScreenHeader kelas={dataInformasiKelas3} handleSearchMahasiswa={handleSearchMahasiswa} />
      <Kelas3TableData kelas={dataInformasiKelas3} mahasiswaKeywords={mahasiswaKeywords} />

      <button
        onClick={() => openAddMahasiswaDialog()}
        className="mt-5 flex items-center bg-blue-400 hover:bg-blue-500 transition-all duration-100 py-2 px-5 rounded-sm text-white">
        <p className="text-xs tracking-wide mr-2">Tambah Data Mahasiswa Kelas 3</p>{" "}
        <AddCircleOutline fontSize="small" />
      </button>

      <AdminKelasInformation dataKelas={dataInformasiKelas3} dataMahasiswa={dataMahasiswaKelas3} />
      <AdminKelasAddMahasiswaDialog kelas={dataInformasiKelas3} />
      {/* <EditMahasiswaFormDialog /> */}
    </div>
  );
};

export default Kelas2;