import PropTypes from "prop-types";
import { date } from "../../../utils/datetime";
import { barangIcon, transaksiIcon } from "../../../assets";

const MahasiswaDashboardScreenHeader = ({ mahasiswaPeminjamanData, mahasiswaPengembalianData }) => {  
  return (
    <div className="block lg:flex justify-between items-center gap-5">
      <div className="shadow-md w-full bg-white rounded-md mb-6 lg:mb-0">
        <p className="text-xs lg:text-sm text-white px-4 py-3 bg-red-400 rounded-t-md font-medium tracking-wide">
          Jumlah Transaksi Peminjaman
        </p>
        <div className="flex justify-between items-center p-4">
          <div>
            <p className="text-md lg:text-xl tracking-wide font-semibold text-gray-500 mb-1 lg:mb-2">
              {mahasiswaPeminjamanData?.data?.total || 0} Transaksi Peminjaman
            </p>
            <p className="text-xs text-zinc-400">Diupdate {date(new Date())}</p>
          </div>
          <img src={transaksiIcon} alt="Users Icon Registered" className="aspect-square w-[46px] lg:w-[64px] h-[46px] lg:h-[64px]" />
        </div>
      </div>

      <div className="shadow-md w-full bg-white rounded-md">
        <p className="text-xs lg:text-sm text-white px-4 py-3 bg-green-500 rounded-t-md font-medium tracking-wide">
          Jumlah Transaksi Pengembalian
        </p>
        <div className="flex justify-between items-center p-4">
          <div>
            <p className="text-md lg:text-xl tracking-wide font-semibold text-gray-500 mb-1 lg:mb-2">
              {mahasiswaPengembalianData?.data?.total || 0} Transaksi Pengembalian
            </p>
            <p className="text-xs text-zinc-400">Diupdate {date(new Date())}</p>
          </div>
          <img src={barangIcon} alt="Noted Tools Icon" className="aspect-square w-[46px] lg:w-[64px] h-[46px] lg:h-[64px]" />
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
