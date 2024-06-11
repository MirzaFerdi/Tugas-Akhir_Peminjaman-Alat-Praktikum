import { Dialog } from "@mui/material";
import { useAdminTransaksiInformationDialog } from "../../../hooks/useDialog";
import { Close } from "@mui/icons-material";
import { useFetchOnMount } from "../../../hooks/useFetchOnMount";

const AdminTransaksiInformation = () => {  
  const currentTransaksiCategory = JSON.parse(localStorage.getItem("last_visited_admin_page_id"));

  const { data: dataTransaksi } = useFetchOnMount({
    url: currentTransaksiCategory === 11 ? "/peminjaman" : "pengembalian",
    method: "GET"
  })

  const { isTransaksiInformationDialogOpen, closeTransaksiInformationDialog } = useAdminTransaksiInformationDialog();  

  return (
    <Dialog open={isTransaksiInformationDialogOpen} onClose={() => closeTransaksiInformationDialog()} sx={{zIndex: 20}}>
      <div className="flex justify-between">
        <div className="py-2 lg:py-3 px-4 lg:px-6 bg-green-600 w-full">
          <p className="text-md lg:text-lg font-semibold tracking-wider text-white">Detail Data Informasi Barang Praktikum</p>
        </div>

        <button onClick={() => closeTransaksiInformationDialog()} className="py-3 px-6 bg-zinc-400">
          <Close className="text-white" fontSize="small"/>
        </button>
      </div>
      <div className="p-4 lg:p-6">
        <table className="w-full">
          <tbody>
            <tr>
              <th className="border-2 p-3 text-start text-sm font-medium tracking-wide">Tipe Transaksi</th>
              <td className="border-2 p-3 tracking-wide text-sm">
                {currentTransaksiCategory === 11 ? "Request Peminjaman" : "Request Pengembalian"}
              </td>
            </tr>
            <tr>
              <th className="border-2 p-3 text-start text-sm font-medium tracking-wide">Jumlah Transaksi Terjadi</th>
              <td className="border-2 p-3 tracking-wide text-sm">{dataTransaksi?.total} Aktivitas</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Dialog>
  );
};

export default AdminTransaksiInformation;
