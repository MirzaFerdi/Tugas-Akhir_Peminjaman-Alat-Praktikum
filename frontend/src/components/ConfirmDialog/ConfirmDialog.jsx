import { Dialog } from "@mui/material";
import { useConfirmDialog } from "../../hooks/useDialog";
import { warningIcon } from "../../assets";

const ConfirmDialog = () => {
  const { isConfirmDialogOpen, confrimDialogTitle, confirmDialogMessage, confirmDialogOkAction, closeConfirmDialog } =
    useConfirmDialog();

  return (
    <Dialog open={isConfirmDialogOpen}>
      <div className="py-8 px-12">
        <div className="flex flex-col justify-center items-center mb-8">
          <img
            src={warningIcon}
            alt="Warning Icon Confirm Dialog"
            width={128}
            height={128}
            className="aspect-square mb-3"
          />
          <h1 className="text-lg tracking-wide font-bold">{confrimDialogTitle}</h1>
          <p className="text-center">{confirmDialogMessage}</p>
        </div>
        <div className="flex justify-between items-center gap-5">
          <button
            onClick={() => confirmDialogOkAction()}
            className="w-full py-3 px-5 rounded-sm text-white text-sm tracking-wide leading-none transition-colors duration-150 bg-blue-400 hover:bg-blue-500">
            OK
          </button>
          <button
            onClick={() => closeConfirmDialog()}
            className="w-full py-3 px-5 rounded-sm text-white text-sm tracking-wide leading-none transition-colors duration-150 bg-red-400 hover:bg-red-500">
            Batal
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmDialog;
