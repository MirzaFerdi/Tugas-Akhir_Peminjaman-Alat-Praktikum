import RequestPeminjamanTableData from "./RequestPeminjamanTableData";
import AdminTransaksiInformation from "../AdminTransaksiInformation";
import AdminRequestPeminjamanDialog from "../AdminRequestPeminjamanDialog";

const AdminPeminjamanScreen = () => {
  return (
    <div className="mb-8">      
      <RequestPeminjamanTableData />
      <AdminTransaksiInformation />
      <AdminRequestPeminjamanDialog />
    </div>
  );
};

export default AdminPeminjamanScreen;
