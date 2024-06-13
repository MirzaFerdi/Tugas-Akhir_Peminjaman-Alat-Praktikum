import RequestPengembalianTableData from "./RequestPengembalianTableData";
import AdminTransaksiInformation from "../AdminTransaksiInformation";
import AdminRequestPengembalianDialog from "../AdminRequestPengembalianDialog";

const AdminPengembalianScreen = () => {  
  return (
    <div className="mb-8">
      <RequestPengembalianTableData />
      <AdminTransaksiInformation />
      <AdminRequestPengembalianDialog />
    </div>
  );
};

export default AdminPengembalianScreen;
