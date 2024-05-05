import PropTypes from "prop-types";
import { mahasiswaDetailPengembalianTableHeader } from "../../../constants/mahasiswa-detail-pengembalian-table-header";
import { date, time } from "../../../utils/datetime";

const MahasiswaDetailPengembalianTable = ({ mahasiswaPengembalianData }) => {
  return (
    <table className="w-full">
      <thead>
        <tr>
          {mahasiswaDetailPengembalianTableHeader.map((rows) => {
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
        {mahasiswaPengembalianData?.data?.length === 0 ? (
          <tr>
            <td colSpan={5} className="w-[8%] border bg-zinc-50 p-2 text-xs text-zinc-600 text-center">
              Tidak ada pengembalian yang dilakukan!
            </td>
          </tr>
        ) : (
          mahasiswaPengembalianData?.data?.map((values, index) => {
            const { id, barang, status, tanggal_pengembalian } = values;

            return (
              <tr key={id}>
                <td className="w-fit border bg-zinc-50 p-2 text-xs text-zinc-600 text-center">{index + 1}</td>
                <td className="w-fit border bg-zinc-50 p-2 text-xs text-zinc-600 text-left">{barang?.nama_barang}</td>
                <td className="w-fit border bg-zinc-50 p-2 text-xs text-zinc-600 text-left">
                  {time(tanggal_pengembalian)} wib
                </td>
                <td className="w-fit border bg-zinc-50 p-2 text-xs text-zinc-600 text-left">
                  {date(tanggal_pengembalian)}
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

MahasiswaDetailPengembalianTable.propTypes = {
  mahasiswaPengembalianData: PropTypes.any,
};

export default MahasiswaDetailPengembalianTable;
