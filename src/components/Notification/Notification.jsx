import PropTypes from "prop-types";
import Pusher from "pusher-js";
import { useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useFetchOnClick } from "../../hooks/useFetchOnClick";
import "react-toastify/dist/ReactToastify.css";
import { useAdminPageId, useMahasiswaPageId } from "../../hooks/usePage";

const Notification = ({ roleId, userId }) => {
  const { handleChangeAdminPageId } = useAdminPageId();
  const { handleChangeMahasiswaPageId } = useMahasiswaPageId();
  const { fetchData: saveNotification } = useFetchOnClick();

  useEffect(() => {
    const pusher = new Pusher("2d2b52e560b6d5150832", {
      cluster: "ap1",
    });

    const channel = pusher.subscribe(`backend-notification-channel-${roleId}-${userId}`);

    channel.bind(`notification-event`, (data) => {
      const { message } = data;
      const { original } = message;

      toast.info(original?.message, {
        position: "top-right",
        autoClose: 2000,
        onOpen: () => {
          saveNotification({
            url: "/notifikasi",
            method: "POST",
            body: {
              user_id: userId,
              pesan: original?.message,
            },
          });
        },
        onClick: () => {
          roleId == 1 ? handleChangeAdminPageId(16) : handleChangeMahasiswaPageId(15);
        },
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [handleChangeAdminPageId, handleChangeMahasiswaPageId, roleId, saveNotification, userId]);

  return <ToastContainer />;
};

Notification.propTypes = {
  roleId: PropTypes.number,
  userId: PropTypes.number,
};

export default Notification;
