import { useAdminPageId } from "../../../hooks/usePage";
import AdminDashboardScreen from "../AdminDashboardScreen/AdminDashboardScreen";
import AdminDashboardScreenUpClass from "../AdminDashboardScreen/AdminDashboardScreenUpClass";
import Kelas1 from "../AdminKelasScreen/Kelas1";
import Kelas2 from "../AdminKelasScreen/Kelas2";
import Kelas3 from "../AdminKelasScreen/Kelas3";
import Kelas4 from "../AdminKelasScreen/Kelas4";
import AdminAlatScreen from "../AdminBarangScreen/AdminAlatScreen";
import AdminBahanScreen from "../AdminBarangScreen/AdminBahanScreen";
import AdminPeminjamanScreen from "../AdminTransaksiScreen/PeminjamanScreen";
import AdminPengembalianScreen from "../AdminTransaksiScreen/PengembalianScreen";
import AdminRekapScreen from "../AdminRekapScreen/AdminRekapScreen";
import AdminBroadcastMessage from "../AdminBroadcastMessage/AdminBroadcastMessage";
import Profile from "../../Profile/Profile";
import AdminNotificationDetail from "../AdminNotificationDetail/AdminNotificationDetail";
import AdminAlatRusakScreen from "../AdminBarangScreen/AdminAlatRusakScreen/AdminAlatRusakScreen";
import AdminBahanHabisScreen from "../AdminBarangScreen/AdminBahanHabisScreen/AdminBahanHabisScreen";

const AdminPageContents = () => {
  const { adminPageId } = useAdminPageId();

  switch (adminPageId) {
    case 1:
      return <AdminDashboardScreen />;
    case 2:
      return <Kelas1 />;
    case 3:
      return <Kelas2 />;
    case 4:
      return <Kelas3 />;
    case 5:
      return <Kelas4 />;
    case 6:
      return <AdminDashboardScreenUpClass />;
    case 7:
      return <AdminAlatScreen />;
    case 8:
      return <AdminBahanScreen />;
    case 9:
      return <AdminAlatRusakScreen />;
    case 10:
      return <AdminBahanHabisScreen />
    case 11:
      return <AdminPeminjamanScreen />;
    case 12:
      return <AdminPengembalianScreen />;
    case 13:
      return <AdminRekapScreen />;
    case 14:
      return <AdminBroadcastMessage />;
    case 15:
      return <Profile />;
    case 16:
      return <AdminNotificationDetail />;
    default:
      return <AdminDashboardScreen />;
  }
};

export default AdminPageContents;
