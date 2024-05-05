import PropTypes from "prop-types";
import { date } from "../../../utils/datetime";
import { barangIcon, transaksiIcon } from "../../../assets";

const MahasiswaDashboardScreenHeader = ({ mahasiswaPeminjamanData, mahasiswaPengembalianData }) => {
  return (
    <div className="flex justify-between items-center gap-5">
      <div className="shadow-md w-full bg-white rounded-md">
        <p className="text-sm text-white px-4 py-3 bg-red-400 rounded-t-md font-medium tracking-wide">
          Jumlah Transaksi Peminjaman
        </p>
        <div className="flex justify-between items-center p-4">
          <div>
            <p className="text-xl tracking-wide font-semibold text-gray-500 mb-2">
              {mahasiswaPeminjamanData?.data?.length} Transaksi Peminjaman
            </p>
            <p className="text-xs text-zinc-400">Terakhir diupdate {date(new Date())}</p>
          </div>
          <img src={transaksiIcon} alt="Users Icon Registered" width={64} height={64} className="aspect-square" />
        </div>
      </div>

      <div className="shadow-md w-full bg-white rounded-md">
        <p className="text-sm text-white px-4 py-3 bg-[#2BBC2F] rounded-t-md font-medium tracking-wide">
          Jumlah Transaksi Pengembalian
        </p>
        <div className="flex justify-between items-center p-4">
          <div>
            <p className="text-xl tracking-wide font-semibold text-gray-500 mb-2">
              {mahasiswaPengembalianData?.data?.length} Transaksi Pengembalian
            </p>
            <p className="text-xs text-zinc-400">Terakhir diupdate {date(new Date())}</p>
          </div>
          <img src={barangIcon} alt="Noted Tools Icon" width={64} height={64} className="aspect-square" />
        </div>
      </div>
    </div>
  );
};

MahasiswaDashboardScreenHeader.propTypes = {
  mahasiswaPeminjamanData: PropTypes.any,
  mahasiswaPengembalianData: PropTypes.any
};

export default MahasiswaDashboardScreenHeader;
