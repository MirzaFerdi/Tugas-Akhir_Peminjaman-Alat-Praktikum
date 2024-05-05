import { Refresh } from "@mui/icons-material";
import MahasiswaDashboardScreenHeader from "./MahasiswaDashboardScreenHeader";
import { useFetchOnMount } from "../../../hooks/useFetchOnMount";
import MahasiswaDetailPeminjamanTable from "./MahasiswaDetailPeminjamanTable";
import MahasiswaDetailPengembalianTable from "./MahasiswaDetailPengembalianTable";
import { useFetchOnClick } from "../../../hooks/useFetchOnClick";

const MahasiswaDashboardScreen = () => {
  const userPayloads = JSON.parse(localStorage.getItem("user_payloads"));

  const { data: mahasiswaPeminjamanData } = useFetchOnMount({
    url: `/peminjaman/user/${userPayloads?.user?.id}`,
    method: "GET",
  });
  const { data: mahasiswaPengembalianData } = useFetchOnMount({
    url: `/pengembalian/user/${userPayloads?.user?.id}`,
    method: "GET",
  });

  const { fetchData: fetchMahasiswaTransaksi } = useFetchOnClick();  

  return (
    <div className="mb-8">
      <div className="mb-12">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-xl font-semibold tracking-wide text-gray-500">Mahasiswa Dashboard</h1>
          <button
            onClick={() =>
              fetchMahasiswaTransaksi({
                url: `/peminjaman/user/${userPayloads?.user?.id}`,
                method: "GET",
              })
            }
            className="bg-blue-400 hover:bg-blue-500 transition-colors duration-150 py-2 px-5 rounded-md text-white text-sm tracking-wide">
            refresh <Refresh fontSize="small" />
          </button>
        </div>
        <MahasiswaDashboardScreenHeader
          mahasiswaPeminjamanData={mahasiswaPeminjamanData}
          mahasiswaPengembalianData={mahasiswaPengembalianData}
        />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <h1 className="text-xl font-semibold tracking-wide text-gray-500 mb-2">Detail Peminjaman Mahasiswa</h1>
          <MahasiswaDetailPeminjamanTable mahasiswaPeminjamanData={mahasiswaPeminjamanData} />
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-wide text-gray-500 mb-2">Detail Pengembalian Mahasiswa</h1>
          <MahasiswaDetailPengembalianTable mahasiswaPengembalianData={mahasiswaPengembalianData} />
        </div>
      </div>
    </div>
  );
};

export default MahasiswaDashboardScreen;
