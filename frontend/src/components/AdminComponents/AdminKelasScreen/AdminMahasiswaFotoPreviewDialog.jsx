import { Dialog } from "@mui/material";
import { useAdminPreviewPhotoDialog } from "../../../hooks/useDialog";

const AdminMahasiswaFotoPreviewDialog = () => {
  const { isPreviewPhotoDialogOpen, mahasiswaPhoto, closePreviewPhoto } = useAdminPreviewPhotoDialog();

  return (
    <Dialog open={isPreviewPhotoDialogOpen} onClose={() => closePreviewPhoto()} sx={{borderRadius: "100%"}}>
      <div className="bg-non">
        <img
          src={mahasiswaPhoto}
          alt="Mahasiswa Profil Photo"
          className="aspect-square max-w-[32rem] max-h-[32rem] w-full h-full rounded-full object-cover"
        />
      </div>
    </Dialog>
  );
};

export default AdminMahasiswaFotoPreviewDialog;
