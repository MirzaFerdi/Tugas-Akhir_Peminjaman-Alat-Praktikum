import React, { useCallback } from "react";
import { Delete, Star } from "@mui/icons-material";
import { notifIcon } from "../../../assets";
import { useFetchOnMount } from "../../../hooks/useFetchOnMount";
import { useFetchOnClick } from "../../../hooks/useFetchOnClick";
import { useConfirmDialog } from "../../../hooks/useDialog";
import { useAlert } from "../../../hooks/useAlert";
import { useMahasiswaPageId } from "../../../hooks/usePage";

const MahasiswaNotificationDetail = () => {
  const { userId } = JSON.parse(localStorage.getItem("user_payloads"));

  const { handleChangeMahasiswaPageId } = useMahasiswaPageId();
  const { openAlertComponent } = useAlert();
  const { openConfirmDialog } = useConfirmDialog();

  const { data: notifikasiData } = useFetchOnMount({
    url: `/notifikasi/${userId}`,
    method: "GET",
  });

  const { fetchData: readNotification } = useFetchOnClick();
  const { fetchData: deleteNotifications } = useFetchOnClick();

  const handleReadNotif = (notifications) => {
    readNotification({
      url: `/notifikasi/${userId}/${notifications?.id}`,
      method: "PUT",
    });

    const isPeminjaman = notifications.pesan.includes("Peminjaman");

    if (isPeminjaman) {
      handleChangeMahasiswaPageId(2);
    } else {
      handleChangeMahasiswaPageId(3);
    }
  };

  const handleDeleteNotificationSuccessResponse = useCallback(
    (deleteNotificationSuccessResponse) => {
      if (deleteNotificationSuccessResponse?.message) {
        openAlertComponent({
          alertType: "success",
          alertTitle: "Berhasil!",
          alertMessage: deleteNotificationSuccessResponse?.message,
        });
      }
    },
    [openAlertComponent]
  );

  const handleDeleteNotifications = () => {
    openConfirmDialog({
      title: "Hapus Pesan Notifikasi",
      message: "Apakah anda ingin menghapus semua pesan notifikasi?",
      okAction: () => {
        deleteNotifications({
          url: `/notifikasi/${userId}`,
          method: "DELETE",
          onSuccess: handleDeleteNotificationSuccessResponse,
        });
      },
    });
  };

  return (
    <React.Fragment>
      <table className="mb-3 w-full">
        <thead>
          <tr>
            <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-left font-medium text-zinc-400 w-[95%]">
              Notifikasi
            </th>
            <th className="border-b border-zinc-300 px-2 py-3 text-xs tracking-wide leading-none text-center font-medium text-zinc-400 w-[5%]">
              Tandai
            </th>
          </tr>
        </thead>
        <tbody>
          {notifikasiData?.data?.length == 0 ? (
            <tr>
              <td colSpan={2} className="text-center p-2 text-sm text-zinc-400">
                Tidak ada notifikasi!
              </td>
            </tr>
          ) : (
            notifikasiData?.data?.map((notifications, index) => {
              const { pesan, dibaca } = notifications;              

              return (
                <tr key={index}>
                  <td className="border-b border-zinc-300 p-2">
                    <div className="w-full flex justify-start items-center">
                      <img
                        src={notifIcon}
                        alt="Notification Icon"
                        width={32}
                        height={32}
                        className="aspect-square mr-5"
                      />
                      <button onClick={() => handleReadNotif(notifications)} className="text-start">
                        <p className={`text-sm ${dibaca === "0" ? "font-bold" : "font-medium"}`}>{pesan}</p>
                      </button>
                    </div>
                  </td>
                  <td className="border-b border-zinc-300 text-xs p-2 w-fit text-center">
                    <button className="text-zinc-500 hover:text-amber-400 transition-colors duration-150">
                      <Star />
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <div className="flex justify-end w-full">
        <button
          disabled={notifikasiData?.data?.length == 0 ? true : false}
          onClick={() => handleDeleteNotifications()}
          className="py-3 px-5 text-xs disabled:bg-inherit disabled:text-zinc-500 bg-main hover:bg-main-hover transition-colors duration-150 text-white flex items-center justify-start rounded-md">
          <Delete fontSize="small" /> <p className="ml-2">Hapus semua</p>
        </button>
      </div>
    </React.Fragment>
  );
};

export default MahasiswaNotificationDetail;
