import { Editor } from "@tinymce/tinymce-react";
import { useCallback, useRef, useState } from "react";
import { useFetchOnClick } from "../../../hooks/useFetchOnClick";
import { useAdminBroadcastPreviewDialog, useConfirmDialog } from "../../../hooks/useDialog";
import { useAlert } from "../../../hooks/useAlert";
import { IconButton, Tooltip } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import AdminBroadcastMessagePreview from "./AdminBroadcastMessagePreview";

const AdminBroadcastMessage = () => {
  const editorRef = useRef(null);

  const [message, setMessage] = useState("");

  const { openBroadcastPreview } = useAdminBroadcastPreviewDialog();
  const { openConfirmDialog, closeConfirmDialog } = useConfirmDialog();
  const { openAlertComponent, closeAlertComponent } = useAlert();

  const { fetchData: sendBroadcastMessage } = useFetchOnClick();

  const handleSendBroadcastSuccessResponse = useCallback(
    (sendBroadcastSuccessResponse) => {
      if (sendBroadcastSuccessResponse.success === true) {
        openAlertComponent({
          alertType: "success",
          alertTitle: "BERHASIL!",
          alertMessage: sendBroadcastSuccessResponse?.message,
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

  const handleSendBroadcastErrorResponse = useCallback((sendBroadcastErrorResponse) => {
    console.log(sendBroadcastErrorResponse);
  }, []);

  const handleSubmit = () => {
    if (editorRef.current) {
      openConfirmDialog({
        title: "Kirim Pesan Broadcast",
        message: "Apakah anda ingin mengirimkan pesan tersebut kepada seluruh mahasiswa?",
        okAction: () => {
          sendBroadcastMessage({
            url: "/broadcast",
            method: "POST",
            body: {
              pesan: editorRef.current.getContent(),
            },
            onSuccess: handleSendBroadcastSuccessResponse,
            onError: handleSendBroadcastErrorResponse,
          });
        },
      });
    }
  };

  return (
    <div>
      <div className="mb-2 flex items-center">
        <h1 className="text-xl font-semibold tracking-wide text-gray-500 mr-2">Pesan Broadcast Mahasiswa</h1>
        <Tooltip
          placement="bottom-start"
          title="Melalui fitur ini administrator dapat
                  memberikan pesan kepada seluruh mahasiswa yang terdaftar dalam aplikasi.">
          <IconButton>
            <InfoOutlined />
          </IconButton>
        </Tooltip>
      </div>
      <div className="mb-5">
        <Editor
          onEditorChange={(content) => {
            setMessage(content);
          }}
          apiKey="drn189g37lqe8leioroz4nu0smerk0tj62w2xamggc6u4gf2"
          init={{
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
            tinycomments_mode: "embedded",
            tinycomments_author: "ADMINISTRATOR",
            mergetags_list: [
              { value: "First.Name", title: "First Name" },
              { value: "Email", title: "Email" },
            ],
            ai_request: (request, respondWith) =>
              respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
          }}
          initialValue="tulis pesan disini ..."
          onInit={(_evt, editor) => (editorRef.current = editor)}
        />
      </div>
      <div className="flex items-center gap-5">
        <button
          className="py-3 px-5 text-sm tracking-wide leading-none text-white rounded-sm bg-blue-400 hover:bg-blue-500 transition-colors duration-100"
          onClick={handleSubmit}>
          Kirim Pesan Broadcast
        </button>
        <button
          className="py-3 px-5 text-sm tracking-wide leading-none text-white rounded-sm bg-green-500 hover:bg-green-600 transition-colors duration-100"
          onClick={() => openBroadcastPreview()}>
          Preview Pesan
        </button>
      </div>
      <AdminBroadcastMessagePreview broadcastMessage={message} />
    </div>
  );
};

export default AdminBroadcastMessage;
