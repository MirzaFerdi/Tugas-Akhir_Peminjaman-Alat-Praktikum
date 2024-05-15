import RequestPeminjamanTableData from "./RequestPeminjamanTableData";
import AdminPeminjamanDialog from "../AdminTransaksiDialog";
import AdminTransaksiInformation from "../AdminTransaksiInformation";

const AdminPeminjamanScreen = () => {
  return (
    <div className="mb-8">      
      <RequestPeminjamanTableData />
      <AdminTransaksiInformation />
      <AdminPeminjamanDialog />      
    </div>
  );
};

export default AdminPeminjamanScreen;
