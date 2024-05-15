import RequestPengembalianTableData from "./RequestPengembalianTableData";
import AdminPengembalianDialog from "../AdminTransaksiDialog";
import AdminTransaksiInformation from "../AdminTransaksiInformation";

const AdminPengembalianScreen = () => {  
  return (
    <div className="mb-8">
      <RequestPengembalianTableData />
      <AdminTransaksiInformation />
      <AdminPengembalianDialog />      
    </div>
  );
};

export default AdminPengembalianScreen;
