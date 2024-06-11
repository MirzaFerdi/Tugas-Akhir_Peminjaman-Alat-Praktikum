import PropTypes from "prop-types";
import { Dialog } from "@mui/material";
import { useEditPhotoDialog } from "../../hooks/useDialog";
import { useCallback, useState } from "react";
import { Close } from "@mui/icons-material";
import { fakeIcon } from "../../assets";
import CropPhotoDialog from "./CropPhotoDialog";
import getCroppedImg from "./getCroppedImage";
import { useFetchOnClick } from "../../hooks/useFetchOnClick";
import { useAlert } from "../../hooks/useAlert";

const EditPhotoDialog = ({ userPayloads }) => {
  const user = userPayloads;

  const { openAlertComponent } = useAlert();
  const { isDialogEditPhotoOpen, closeEditPhoto } = useEditPhotoDialog();
  const { fetchData: fetchEditProfile } = useFetchOnClick();

  const [openCropPhotoDialog, setOpenCropPhotoDialog] = useState(false);
  const [image, setImage] = useState("");
  const [croppedImage, setCroppedImage] = useState("");

  const onCropComplete = async (_, croppedAreaPixels) => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error("Error cropping image:", e);
    }
  };

  const handleChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
    setOpenCropPhotoDialog(true);
  };

  const handleEditProfileSuccessResponse = useCallback(
    (editProfileSuccessResponse) => {
      if (editProfileSuccessResponse?.success == true) {
        openAlertComponent({
          alertType: "success",
          alertTitle: "Berhasil!",
          alertMessage: "Berhasil mengupdate foto profil!",
        });
      }
    },
    [openAlertComponent]
  );

  const handleEditProfileErrorResponse = useCallback((editProfileErrorResponse) => {
    console.log(editProfileErrorResponse);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const type = croppedImage.split(";")[0].split("/")[1];

    const byteCharacters = atob(croppedImage.split(",")[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type });

    const file = new File([blob], `${user?.username}-${user?.nama}.jpg`, { type: "image/jpeg" });

    const payloads = {
      nama: user?.nama,
      username: user?.username,
      email: user?.email,
      nohp: user?.nohp,
      role_id: user?.role_id,
      kelas_id: user?.kelas_id,
      foto: file,
    };

    fetchEditProfile({
      url: `/user/${user.id}`,
      method: "POST",
      body: payloads,
      onSuccess: handleEditProfileSuccessResponse,
      onError: handleEditProfileErrorResponse,
    });
  };

  return (
    <Dialog open={isDialogEditPhotoOpen} onClose={() => closeEditPhoto()} sx={{ zIndex: 20 }}>
      <CropPhotoDialog
        open={openCropPhotoDialog}
        setOpen={setOpenCropPhotoDialog}
        image={image}
        onCropComplete={onCropComplete}
      />

      <div className="flex justify-between">
        <div className="py-2 lg:py-3 px-3 lg:px-6 bg-blue-400 w-full flex items-center">
          <p className="text-sm leading-snug lg:text-lg font-semibold tracking-wider text-white">
            Formulir Edit Foto Profil
          </p>
        </div>

        <button onClick={() => closeEditPhoto()} className="py-2 lg:py-3 px-3 lg:px-6 bg-zinc-300">
          <Close fontSize="small" className="text-white" />
        </button>
      </div>
      <div className="py-5 px-5 lg:px-32">
        <div className="flex justify-center items-center">
          <img
            src={croppedImage || fakeIcon}
            alt="User Image Profile"
            className="w-full h-auto max-w-[9rem] lg:max-w-[12rem] rounded-full mb-8"
          />
        </div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="file"
            name="foto"
            onChange={handleChange}
            className="border-2 border-blue-200 p-3 text-sm w-full rounded-md mb-6 block"
          />
          <button
            type="submit"
            className="bg-blue-400 hover:bg-blue-500 w-1/2 cursor-pointer py-3 px-5 rounded-sm text-sm tracking-wide text-white leading-none">
            Kirim
          </button>
        </form>
      </div>
    </Dialog>
  );
};

EditPhotoDialog.propTypes = {
  userPayloads: PropTypes.any,
};

export default EditPhotoDialog;
