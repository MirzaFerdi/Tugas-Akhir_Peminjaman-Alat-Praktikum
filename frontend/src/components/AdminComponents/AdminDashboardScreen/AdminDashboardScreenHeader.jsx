import PropTypes from "prop-types";
import { barangIcon, transaksiIcon, usersIcon } from "../../../assets";

const AdminDashboardScreenHeader = ({ countAllData }) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-5">
      <div className="shadow-md w-full bg-white rounded-md">
        <p className="text-sm text-white px-4 py-3 bg-blue-400 rounded-t-md font-medium tracking-wide">
          Mahasiswa Terdaftar
        </p>
        <div className="flex justify-between items-center p-4">
          <div>
            <p className="text-xl tracking-wide font-semibold text-gray-500 mb-2">
              {countAllData["User: "] || 0} Mahasiswa
            </p>
            <p className="text-xs text-zinc-400">Terakhir diupdate 15 April 2024</p>
          </div>
          <img src={usersIcon} alt="Users Icon Registered" width={64} height={64} className="aspect-square" />
        </div>
      </div>
      <div className="shadow-md w-full bg-white rounded-md">
        <p className="text-sm text-white px-4 py-3 bg-[#2BBC2F] rounded-t-md font-medium tracking-wide">
          Barang Praktikum
        </p>
        <div className="flex justify-between items-center p-4">
          <div>
            <p className="text-xl tracking-wide font-semibold text-gray-500 mb-2">{countAllData["Barang: "]} Barang</p>
            <p className="text-xs text-zinc-400">Terakhir diupdate 15 April 2024</p>
          </div>
          <img src={barangIcon} alt="Noted Tools Icon" width={64} height={64} className="aspect-square" />
        </div>
      </div>
      <div className="shadow-md w-full bg-white rounded-md">
        <p className="text-sm text-white px-4 py-3 bg-red-400 rounded-t-md font-medium tracking-wide">
          Total Transaksi
        </p>
        <div className="flex justify-between items-center p-4">
          <div>
            <p className="text-xl tracking-wide font-semibold text-gray-500 mb-2">
              {countAllData["Peminjaman: "] + countAllData["Pengembalian: "]} Transaksi
            </p>
            <p className="text-xs text-zinc-400">Terakhir diupdate 15 April 2024</p>
          </div>
          <img src={transaksiIcon} alt="Transaction Icons" width={64} height={64} className="aspect-square" />
        </div>
      </div>
    </div>
  );
};

AdminDashboardScreenHeader.propTypes = {
  countAllData: PropTypes.any,
};

export default AdminDashboardScreenHeader;
