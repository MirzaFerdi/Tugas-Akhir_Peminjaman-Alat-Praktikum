import Kelas2TableData from "./Kelas2TableData";
import AdminKelasInformation from "../AdminKelasInformation";
import AdminKelasAddMahasiswaDialog from "../AdminKelasAddMahasiswaDialog";
import AdminKelasEditMahasiswaDialog from "../AdminKelasEditMahasiswaDialog";
import { useFetchOnMount } from "../../../../hooks/useFetchOnMount";
import { useMediaQuery } from "react-responsive";
import Kelas2SmallTableData from "./Kelas2SmallTableData";

const Kelas2 = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 1439px)" });

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
      {isMobile ? <Kelas2SmallTableData /> : <Kelas2TableData />}

      <AdminKelasInformation dataKelas={dataInformasiKelas2} dataMahasiswa={dataMahasiswaKelas2} />
      <AdminKelasAddMahasiswaDialog kelas={dataInformasiKelas2} />
      <AdminKelasEditMahasiswaDialog />
    </div>
  );
};

export default Kelas2;
