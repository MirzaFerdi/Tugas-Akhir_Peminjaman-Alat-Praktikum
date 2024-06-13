import { Dialog } from "@mui/material";
import { useConfirmDialog } from "../../hooks/useDialog";
import { warningIcon } from "../../assets";

const ConfirmDialog = () => {
  const { isConfirmDialogOpen, confrimDialogTitle, confirmDialogMessage, confirmDialogOkAction, closeConfirmDialog } =
    useConfirmDialog();

  return (
    <Dialog open={isConfirmDialogOpen} sx={{zIndex: 20}}>
      <div className="py-4 lg:py-8 px-6 lg:px-12">
        <div className="flex flex-col justify-center items-center mb-8">
          <img
            src={warningIcon}
            alt="Warning Icon Confirm Dialog"            
            className="aspect-square w-[78px] lg:w-[128px] h-[78px] lg:h-[128px] mb-3"
          />
          <h1 className="text-md text-center leading-snug lg:text-lg tracking-wide font-bold mb-3 lg:mb-0">{confrimDialogTitle}</h1>
          <p className="text-xs lg:text-sm lg:text-md text-center">{confirmDialogMessage}</p>
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
