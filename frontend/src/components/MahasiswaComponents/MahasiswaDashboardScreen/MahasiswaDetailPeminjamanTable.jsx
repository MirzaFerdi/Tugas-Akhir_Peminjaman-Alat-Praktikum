import PropTypes from "prop-types";
import { mahasiswaDetailPeminjamanTableHeader } from "../../../constants/mahasiswa-detail-peminjaman-table-header";
import { date, time } from "../../../utils/datetime";

const MahasiswaDetailPeminjamanTable = ({ mahasiswaPeminjamanData }) => {
  return (
    <table className="w-full">
      <thead>
        <tr>
          {mahasiswaDetailPeminjamanTableHeader.map((rows) => {
            const { id, row, width } = rows;

            return (
              <th
                key={id}
                className={`${
                  id == 1 || id == 5 ? "text-center" : "text-start"
                } border p-2 text-xs text-white bg-blue-400 tracking-wider font-semibold w-[${width}]`}>
                {row}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {mahasiswaPeminjamanData?.data?.length === 0 ? (
          <tr>
            <td colSpan={5} className="w-[8%] border bg-zinc-50 p-2 text-xs text-zinc-600 text-center">
              Tidak ada peminjaman yang dilakukan!
            </td>
          </tr>
        ) : (
          mahasiswaPeminjamanData?.data?.map((values, index) => {
            const { id, barang, status, tanggal_peminjaman } = values;

            return (
              <tr key={id}>
                <td className="w-fit border bg-zinc-50 p-2 text-xs text-zinc-600 text-center">{index + 1}</td>
                <td className="w-fit border bg-zinc-50 p-2 text-xs text-zinc-600 text-left">{barang?.nama_barang}</td>
                <td className="w-fit border bg-zinc-50 p-2 text-xs text-zinc-600 text-left">
                  {time(tanggal_peminjaman)} wib
                </td>
                <td className="w-fit border bg-zinc-50 p-2 text-xs text-zinc-600 text-left">
                  {date(tanggal_peminjaman)}
                </td>
                <td className="w-fit border bg-zinc-50 p-2 text-xs text-zinc-600 text-left">
                  <p
                    className={`${
                      status === "Pending" ? "bg-zinc-300" : status === "Diterima" ? "bg-green-300" : "bg-red-400"
                    } p-1 rounded-sm text-center`}>
                    {status}
                  </p>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};

MahasiswaDetailPeminjamanTable.propTypes = {
  mahasiswaPeminjamanData: PropTypes.any,
};

export default MahasiswaDetailPeminjamanTable;
