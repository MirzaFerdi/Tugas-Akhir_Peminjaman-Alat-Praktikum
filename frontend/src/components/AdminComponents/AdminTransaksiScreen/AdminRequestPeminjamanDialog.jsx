import { Dialog } from "@mui/material";
import { useAdminRequestPeminjamanDialog, useConfirmDialog } from "../../../hooks/useDialog";
import { Close } from "@mui/icons-material";
import { date, time } from "../../../utils/datetime";
import { useFetchOnClick } from "../../../hooks/useFetchOnClick";
import { useCallback } from "react";
import { useAlert } from "../../../hooks/useAlert";

const AdminRequestPeminjamanDialog = () => {
  const { requestPeminjamanById, isAdminRequestPeminjamanDialogOpen, closeRequestPeminjamanDialog } =
    useAdminRequestPeminjamanDialog();

  const { openConfirmDialog } = useConfirmDialog();
  const { openAlertComponent } = useAlert();

  const { fetchData: approvePeminjaman } = useFetchOnClick();
  const { fetchData: rejectPeminjaman } = useFetchOnClick();

  const handleSuccessApproveResponse = useCallback(
    (successApprovePeminjamanResponse) => {
      if (successApprovePeminjamanResponse?.success === true) {
        openAlertComponent({
          alertType: "success",
          alertTitle: "BERHASIL!",
          alertMessage: successApprovePeminjamanResponse?.message,
        });
      }
    },
    [openAlertComponent]
  );

  const handleApprovePeminjaman = (id) => {
    openConfirmDialog({
      title: "Terima Peminjaman",
      message: "Apakah anda yakin akan menerima peminjaman dari mahasiswa tersebut?",
      okAction: () => {
        approvePeminjaman({
          url: `/peminjaman/approve/${id}`,
          method: "PUT",
          onSuccess: handleSuccessApproveResponse,
        });
      },
    });
  };

  const handleSuccessRejectResponse = useCallback(
    (successRejectResponse) => {
      if (successRejectResponse.success === true) {
        openAlertComponent({
          alertType: "success",
          alertTitle: "BERHASIL!",
          alertMessage: successRejectResponse?.message,
        });
      }
    },
    [openAlertComponent]
  );

  const handleRejectPeminjaman = (id) => {
    openConfirmDialog({
      title: "Tolak Peminjaman",
      message: "Apakah anda yakin akan menolak peminjaman dari mahasiswa tersebut?",
      okAction: () => {
        rejectPeminjaman({
          url: `/peminjaman/reject/${id}`,
          method: "PUT",
          onSuccess: handleSuccessRejectResponse,
        });
      },
    });
  };

  return (
    <Dialog
      open={isAdminRequestPeminjamanDialogOpen}
      onClose={() => closeRequestPeminjamanDialog()}
      sx={{ zIndex: 20 }}>
      <div className="flex justify-between">
        <div className="py-2 lg:py-3 px-4 lg:px-6 bg-blue-400 w-full">
          <p className="text-sm lg:text-md font-semibold tracking-wider text-white">Detail Transaksi Peminjaman</p>
        </div>

        <button
          onClick={() => closeRequestPeminjamanDialog()}
          className="lg:py-3 px-4 lg:px-6 bg-zinc-200 text-red-600 hover:text-red-700 transition-colors duration-150">
          <Close fontSize="small" />
        </button>
      </div>
      <div className="p-6">
        <table className="w-full">
          <tbody>
            <tr>
              <th className="border-2 p-2 lg:p-3 text-start text-xs lg:text-sm font-semibold tracking-wide">
                Nama Peminjam
              </th>
              <td className="border-2 p-2 lg:p-3 tracking-wide text-xs lg:text-sm">
                {requestPeminjamanById?.user?.nama}
              </td>
            </tr>
            <tr>
              <th className="border-2 p-2 lg:p-3 text-start text-xs lg:text-sm font-semibold tracking-wide">
                Barang di Pinjam
              </th>
              <td className="border-2 p-2 lg:p-3 tracking-wide text-xs lg:text-sm">
                {requestPeminjamanById?.barang?.nama_barang}
              </td>
            </tr>
            <tr>
              <th className="border-2 p-2 lg:p-3 text-start text-xs lg:text-sm font-semibold tracking-wide">
                Tanggal Peminjaman
              </th>
              <td className="border-2 p-2 lg:p-3 tracking-wide text-xs lg:text-sm">
                {date(requestPeminjamanById?.tanggal_peminjaman)}
              </td>
            </tr>
            <tr>
              <th className="border-2 p-2 lg:p-3 text-start text-xs lg:text-sm font-semibold tracking-wide">
                Waktu Peminjaman
              </th>
              <td className="border-2 p-2 lg:p-3 tracking-wide text-xs lg:text-sm">
                {time(requestPeminjamanById?.tanggal_peminjaman)} wib
              </td>
            </tr>
            <tr>
              <th className="border-2 p-2 lg:p-3 text-start text-xs lg:text-sm font-semibold tracking-wide">
                Keterlambatan Pengembalian
              </th>
              <td className="border-2 p-2 lg:p-3 tracking-wide text-xs lg:text-sm">-</td>
            </tr>
            <tr>
              <th className="border-2 p-2 lg:p-3 text-start text-xs lg:text-sm font-semibold tracking-wide">
                Status Peminjaman
              </th>
              <td className="border-2 p-2 lg:p-3 tracking-wide text-xs lg:text-sm">
                <p
                  className={`p-2 ${
                    requestPeminjamanById?.status === "Diterima"
                      ? "bg-green-500"
                      : requestPeminjamanById?.status === "Ditolak"
                      ? "bg-red-400"
                      : "bg-zinc-500"
                  } text-white`}>
                  {requestPeminjamanById?.status}
                </p>
              </td>
            </tr>
            <tr>
              <th className="border-2 p-2 lg:p-3 text-start text-xs lg:text-sm font-semibold tracking-wide">
                Keterangan Peminjaman
              </th>
              <td className="border-2 p-2 lg:p-3 tracking-wide text-xs lg:text-sm">
                {requestPeminjamanById?.keterangan}
              </td>
            </tr>
            <tr>
              <th className="border-2 p-2 lg:p-3 text-start text-xs lg:text-sm font-semibold tracking-wide">Aksi</th>
              <td className="border-2 p-2 lg:p-3 tracking-wide text-xs lg:text-sm">
                <div className="flex justify-between items-center gap-4">
                  <button
                    disabled={requestPeminjamanById?.status !== "Pending" ? true : false}
                    onClick={() => handleApprovePeminjaman(requestPeminjamanById?.id)}
                    className={`${
                      requestPeminjamanById?.status !== "Pending" ? "bg-zinc-300" : "bg-blue-400 hover:bg-blue-500"
                    } w-full p-2 lg:p-3  transition-all duration-150 rounded-sm leading-none text-white`}>
                    Approve
                  </button>
                  <button
                    disabled={requestPeminjamanById?.status !== "Pending" ? true : false}
                    onClick={() => handleRejectPeminjaman(requestPeminjamanById?.id)}
                    className={`${
                      requestPeminjamanById?.status !== "Pending" ? "bg-zinc-300" : "bg-red-400 hover:bg-red-500"
                    } w-full p-2 lg:p-3  transition-all duration-150 rounded-sm leading-none text-white`}>
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Dialog>
  );
};

export default AdminRequestPeminjamanDialog;
