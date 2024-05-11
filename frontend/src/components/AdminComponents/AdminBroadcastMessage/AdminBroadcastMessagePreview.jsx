import PropTypes from "prop-types"
import { Dialog } from "@mui/material"
import { useAdminBroadcastPreviewDialog } from "../../../hooks/useDialog"
import { Close } from "@mui/icons-material";

const AdminBroadcastMessagePreview = ({ broadcastMessage }) => {
  const { isBroadcastPreviewDialogOpen, closeBroadcastPreview } = useAdminBroadcastPreviewDialog();

  return (
    <Dialog open={isBroadcastPreviewDialogOpen}>
      <div className="flex justify-between">
        <div className="py-3 px-6 bg-blue-400 w-full">
          <p className="text-lg font-semibold tracking-wider text-white">Preview Pesan Broadcast</p>
        </div>

        <button onClick={() => closeBroadcastPreview()} className="py-3 px-6 bg-zinc-300">
          <Close className="text-white" />
        </button>
      </div>
      <div className="py-3 px-6">
        <p dangerouslySetInnerHTML={{__html: broadcastMessage}}></p>
      </div>
    </Dialog>
  )
}

AdminBroadcastMessagePreview.propTypes = {
  broadcastMessage: PropTypes.any
}

export default AdminBroadcastMessagePreview