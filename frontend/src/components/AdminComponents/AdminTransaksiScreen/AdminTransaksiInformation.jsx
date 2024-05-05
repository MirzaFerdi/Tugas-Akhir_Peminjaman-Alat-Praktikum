import PropTypes from "prop-types";
import { Dialog } from "@mui/material";
import { useAdminTransaksiInformationDialog } from "../../../hooks/useDialog";
import { Close } from "@mui/icons-material";

const AdminTransaksiInformation = ({ dataTransaksi }) => {  
  const currentTransaksiCategory = JSON.parse(localStorage.getItem("last_visited_admin_transaksi_page_id"));

  const { isTransaksiInformationDialogOpen, closeTransaksiInformationDialog } = useAdminTransaksiInformationDialog();

  return (
    <Dialog open={isTransaksiInformationDialogOpen} onClose={() => closeTransaksiInformationDialog()}>
      <div className="flex justify-between">
        <div className="py-3 px-6 bg-green-600 w-full">
          <p className="text-lg font-semibold tracking-wider text-white">Detail Data Informasi Barang Praktikum</p>
        </div>

        <button onClick={() => closeTransaksiInformationDialog()} className="py-3 px-6 bg-zinc-400">
          <Close className="text-white" />
        </button>
      </div>
      <div className="p-6">
        <table className="w-full">
          <tbody>
            <tr>
              <th className="border-2 p-3 text-start text-sm font-medium tracking-wide">Tipe Transaksi</th>
              <td className="border-2 p-3 tracking-wide text-sm">
                {currentTransaksiCategory === 1 ? "Request Peminjaman" : "Request Pengembalian"}
              </td>
            </tr>
            <tr>
              <th className="border-2 p-3 text-start text-sm font-medium tracking-wide">Jumlah Transaksi Terjadi</th>
              <td className="border-2 p-3 tracking-wide text-sm">{dataTransaksi?.length} Aktivitas</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Dialog>
  );
};

AdminTransaksiInformation.propTypes = {
  dataTransaksi: PropTypes.any,
};

export default AdminTransaksiInformation;
