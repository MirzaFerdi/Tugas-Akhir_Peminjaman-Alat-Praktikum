import Kelas3TableData from "./Kelas3TableData";
import AdminKelasInformation from "../AdminKelasInformation";
import AdminKelasAddMahasiswaDialog from "../AdminKelasAddMahasiswaDialog";
import AdminKelasEditMahasiswaDialog from "../AdminKelasEditMahasiswaDialog";
import { useFetchOnMount } from "../../../../hooks/useFetchOnMount";
import AdminEditKelasDialog from "../AdminEditKelasDialog";

const Kelas2 = () => {
  const { data: dataInformasiKelas3 } = useFetchOnMount({
    url: "/kelas/3",
    method: "GET",
  });
  const { data: dataMahasiswaKelas3 } = useFetchOnMount({
    url: "/user/kelas/3",
    method: "GET",
  });

  return (
    <div className="mb-8">      
      <Kelas3TableData />

      <AdminEditKelasDialog />
      <AdminKelasInformation dataKelas={dataInformasiKelas3} dataMahasiswa={dataMahasiswaKelas3} />
      <AdminKelasAddMahasiswaDialog kelas={dataInformasiKelas3} />
      <AdminKelasEditMahasiswaDialog />
    </div>
  );
};

export default Kelas2;
