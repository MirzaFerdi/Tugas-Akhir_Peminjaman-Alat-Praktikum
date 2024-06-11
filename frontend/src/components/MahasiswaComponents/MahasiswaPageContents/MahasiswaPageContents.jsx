import {
  MahasiswaDashboardScreen,
  MahasiswaPengembalianScreen,  
  MahasiswaDetailPeminjamanTable,
  MahasiswaDetailPengembalianTable,
  MahasiswaPeminjamanScreen,
  Profile,  
  MahasiswaBroadcastScreen,  
  MahasiswaNotificationDetail,  
} from "../../";
import { useMahasiswaPageId } from "../../../hooks/usePage";

const MahasiswaPageContents = () => {
  const { mahasiswaPageId } = useMahasiswaPageId();

  switch (mahasiswaPageId) {
    case 1:
      return <MahasiswaDashboardScreen />;
    case 2:
      return <MahasiswaDetailPeminjamanTable />;
    case 3:
      return <MahasiswaDetailPengembalianTable />;
    case 4:
      return <MahasiswaPeminjamanScreen />;
    case 5:
      return <MahasiswaPengembalianScreen />;
    case 13:
      return <Profile />;
    case 14:
      return <MahasiswaBroadcastScreen />;
    case 15:
      return <MahasiswaNotificationDetail />;
    default:
      return <MahasiswaDashboardScreen />;
  }
};

export default MahasiswaPageContents;