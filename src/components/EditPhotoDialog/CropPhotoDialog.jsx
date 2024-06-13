import PropTypes from "prop-types";
import Cropper from "react-easy-crop";
import { useState } from "react";
import { Dialog } from "@mui/material";

const CropPhotoDialog = ({ open, setOpen, image, onCropComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);  

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className="p-[10rem] mb-[5rem]">
        <Cropper
          style={{
            containerStyle: {
              backgroundColor: "white",
              width: "20rem",
              height: "20rem",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            },
            cropAreaStyle: {
              borderRadius: "100%",
            },
            mediaStyle: {
              width: "100",
              height: "auto",
              maxWidth: "20rem",
            },
          }}
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <button
        onClick={() => setOpen(false)}
        className="py-3 px-5 rounded-sm bg-main text-sm text-white tracking-wide">
        Simpan
      </button>
    </Dialog>
  );
};

CropPhotoDialog.propTypes = {
  image: PropTypes.any,
  onCropComplete: PropTypes.any,
  open: PropTypes.any,
  setOpen: PropTypes.func
}

export default CropPhotoDialog;
