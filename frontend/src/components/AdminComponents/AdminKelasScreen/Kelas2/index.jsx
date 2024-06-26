import Kelas2TableData from "./Kelas2TableData";
import AdminKelasInformation from "../AdminKelasInformation";
import AdminKelasAddMahasiswaDialog from "../AdminKelasAddMahasiswaDialog";
import AdminKelasEditMahasiswaDialog from "../AdminKelasEditMahasiswaDialog";
import AdminEditKelasDialog from "../AdminEditKelasDialog";
import { useFetchOnMount } from "../../../../hooks/useFetchOnMount";

const Kelas2 = () => {  
  const { data: dataInformasiKelas2 } = useFetchOnMount({
    url: "/kelas/2",
    method: "GET",
  });
  const { data: dataMahasiswaKelas2 } = useFetchOnMount({
    url: "/user/kelas/2",
    method: "GET",
  });

  return (
    <div className="mb-8">
       <Kelas2TableData />      

      <AdminEditKelasDialog />
      <AdminKelasInformation dataKelas={dataInformasiKelas2} dataMahasiswa={dataMahasiswaKelas2} />
      <AdminKelasAddMahasiswaDialog kelas={dataInformasiKelas2} />
      <AdminKelasEditMahasiswaDialog />
    </div>
  );
};

export default Kelas2;
