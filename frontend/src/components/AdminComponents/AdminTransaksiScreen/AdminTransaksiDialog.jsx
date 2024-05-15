import { Close } from "@mui/icons-material";
import { Dialog } from "@mui/material";
import { useAdminTransaksiDialog, useConfirmDialog } from "../../../hooks/useDialog";
import { date, time } from "../../../utils/datetime";
import { useFetchOnClick } from "../../../hooks/useFetchOnClick";
import { useAlert } from "../../../hooks/useAlert";
import { useCallback } from "react";

const AdminTransaksiDialog = () => {
  const currentTransaksiCategory = JSON.parse(localStorage.getItem("last_visited_admin_page_id"));

  const { isAdminTransaksiDialogOpen, transaksiById, closeTransaksiDialog } = useAdminTransaksiDialog();
  const { openConfirmDialog, closeConfirmDialog } = useConfirmDialog();
  const { openAlertComponent, closeAlertComponent } = useAlert();

  const { fetchData: approveTransaksi } = useFetchOnClick();
  const { fetchData: rejectTransaksi } = useFetchOnClick();

  const handleSuccessApprovePeminjamanResponse = useCallback(
    (successApprovePeminjamanResponse) => {
      if (successApprovePeminjamanResponse?.success === true) {
        openAlertComponent({
          alertType: "success",
          alertTitle: "BERHASIL!",
          alertMessage: successApprovePeminjamanResponse?.message,
        });

        setTimeout(() => {
          closeAlertComponent();
          closeConfirmDialog();
          window.location.reload();
        }, 2000);
      }
    },
    [closeAlertComponent, closeConfirmDialog, openAlertComponent]
  );

  const handleApprovePeminjaman = (id) => {
    openConfirmDialog({
      title: "Terima Peminjaman",
      message: `Apakah anda yakin akan menerima ${
        currentTransaksiCategory === 9 ? "peminjaman" : "pengembalian"
      } dari mahasiswa tersebut?`,
      okAction: () => {
        approveTransaksi({
          url: currentTransaksiCategory === 9 ? `/peminjaman/approve/${id}` : `/pengembalian/approve/${id}`,
          method: "PUT",
          onSuccess: handleSuccessApprovePeminjamanResponse,
          onError: handleErrorApprovePeminjamanResponse,
        });
      },
    });
  };

  const handleErrorApprovePeminjamanResponse = useCallback((errorApprovePeminjamanResponse) => {
    console.log(errorApprovePeminjamanResponse);
  }, []);

  const handleSuccessRejectPeminjamanResponse = useCallback(
    (successRejectPeminjamanResponse) => {
      if (successRejectPeminjamanResponse.success === true) {
        openAlertComponent({
          alertType: "success",
          alertTitle: "BERHASIL!",
          alertMessage: successRejectPeminjamanResponse?.message,
        });

        setTimeout(() => {
          closeAlertComponent();
          closeConfirmDialog();
          window.location.reload();
        }, 2000);
      }
    },
    [closeAlertComponent, closeConfirmDialog, openAlertComponent]
  );

  const handleErrorRejectPeminjamanResponse = useCallback((errorRejectPeminjamanResponse) => {
    console.log(errorRejectPeminjamanResponse);
  }, []);

  const handleRejectPeminjaman = (id) => {
    openConfirmDialog({
      title: "Tolak Peminjaman",
      message: `Apakah anda yakin akan menolak ${
        currentTransaksiCategory === 9 ? "peminjaman" : "pengembalian"
      } dari mahasiswa tersebut?`,
      okAction: () => {
        rejectTransaksi({
          url: currentTransaksiCategory === 9 ? `/peminjaman/reject/${id}` : `/pengembalian/reject/${id}`,
          method: "PUT",
          onSuccess: handleSuccessRejectPeminjamanResponse,
          onError: handleErrorRejectPeminjamanResponse,
        });
      },
    });
  };

  return (
    <Dialog open={isAdminTransaksiDialogOpen} onClose={() => closeTransaksiDialog()}>
      <div className="flex justify-between">
        <div className="py-3 px-6 bg-blue-400 w-full">
          <p className="text-md font-semibold tracking-wider text-white">
            Detail Transaksi {currentTransaksiCategory === 9 ? "Peminjaman" : "Pengembalian"}
          </p>
        </div>

        <button
          onClick={() => closeTransaksiDialog()}
          className="py-3 px-6 bg-zinc-200 text-red-600 hover:text-red-700 transition-colors duration-150">
          <Close fontSize="small" />
        </button>
      </div>
      <div className="p-6">
        <table className="w-full">
          <tbody>
            <tr>
              <th className="border-2 p-3 text-start text-sm font-semibold tracking-wide">
                Nama {currentTransaksiCategory === 9 ? "Peminjam" : "Pengembali"}
              </th>
              <td className="border-2 p-3 tracking-wide text-sm">{transaksiById?.user?.nama}</td>
            </tr>
            <tr>
              <th className="border-2 p-3 text-start text-sm font-semibold tracking-wide">Barang di Pinjam</th>
              <td className="border-2 p-3 tracking-wide text-sm">{transaksiById?.barang?.nama_barang}</td>
            </tr>
            <tr>
              <th className="border-2 p-3 text-start text-sm font-semibold tracking-wide">Tanggal Peminjaman</th>
              <td className="border-2 p-3 tracking-wide text-sm">
                {currentTransaksiCategory === 9
                  ? date(transaksiById?.tanggal_peminjaman)
                  : date(transaksiById?.tanggal_pengembalian)}
              </td>
            </tr>
            <tr>
              <th className="border-2 p-3 text-start text-sm font-semibold tracking-wide">
                Waktu {currentTransaksiCategory === 9 ? "Peminjaman" : "Pengembalian"}
              </th>
              <td className="border-2 p-3 tracking-wide text-sm">
                {currentTransaksiCategory === 9
                  ? time(transaksiById?.tanggal_peminjaman)
                  : time(transaksiById?.tanggal_pengembalian)}{" "}
                wib
              </td>
            </tr>
            <tr>
              <th className="border-2 p-3 text-start text-sm font-semibold tracking-wide">
                Status {currentTransaksiCategory === 9 ? "Peminjaman" : "Pengembalian"}
              </th>
              <td className="border-2 p-3 tracking-wide text-sm">
                <p
                  className={`p-2 ${
                    transaksiById?.status === "Diterima"
                      ? "bg-green-500"
                      : transaksiById?.status === "Ditolak"
                      ? "bg-red-400"
                      : "bg-zinc-500"
                  } text-white`}>
                  {transaksiById?.status}
                </p>
              </td>
            </tr>
            <tr>
              <th className="border-2 p-3 text-start text-sm font-semibold tracking-wide">
                Keterangan {currentTransaksiCategory === 9 ? "Peminjaman" : "Pengembalian"}
              </th>
              <td className="border-2 p-3 tracking-wide text-sm">{transaksiById?.keterangan}</td>
            </tr>
            <tr>
              <th className="border-2 p-3 text-start text-sm font-semibold tracking-wide">Aksi</th>
              <td className="border-2 p-3 tracking-wide text-sm">
                <div className="flex justify-between items-center gap-4">
                  <button
                    disabled={transaksiById?.status !== "Pending" ? true : false}
                    onClick={() => handleApprovePeminjaman(transaksiById?.id)}
                    className={`${
                      transaksiById?.status !== "Pending" ? "bg-zinc-300" : "bg-blue-400 hover:bg-blue-500"
                    } w-full p-3  transition-all duration-150 rounded-sm leading-none text-white`}>
                    Approve
                  </button>
                  <button
                    disabled={transaksiById?.status !== "Pending" ? true : false}
                    onClick={() => handleRejectPeminjaman(transaksiById?.id)}
                    className={`${
                      transaksiById?.status !== "Pending" ? "bg-zinc-300" : "bg-red-400 hover:bg-red-500"
                    } w-full p-3  transition-all duration-150 rounded-sm leading-none text-white`}>
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

export default AdminTransaksiDialog;
