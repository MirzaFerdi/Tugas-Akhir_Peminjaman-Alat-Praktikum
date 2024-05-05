import PropTypes from "prop-types";
import { OpenInNew } from "@mui/icons-material";
import { date, time } from "../../../../utils/datetime";
import { adminTransaksiPengembalianTableHeader } from "../../../../constants/admin-transaksi-table-header";
import { useAdminTransaksiDialog } from "../../../../hooks/useDialog";

const RequestPengembalianTableData = ({ dataTransaksiPengembalian, transaksiPengembalianKeywords }) => {
  const { openTransaksiDialog } = useAdminTransaksiDialog();

  return (
    <table className="w-full">
      <thead>
        <tr>
          {adminTransaksiPengembalianTableHeader.map((rows) => {
            const { id, row, width } = rows;

            return (
              <th
                key={id}
                className={`${
                  id == 2 || id == 3 ? "text-start" : "text-center"
                } border p-2 text-xs text-white bg-blue-400 tracking-wider font-semibold w-[${width}]`}>
                {row}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {dataTransaksiPengembalian?.success != false ? (
          dataTransaksiPengembalian?.map((payloads, index) => {
            const { id, user, barang, tanggal_pengembalian, status } = payloads;

            const regex = new RegExp(`(${transaksiPengembalianKeywords})`, "gi");
            const searchedPeminjamn = user?.nama?.replace(regex, (match) => `<td><b>${match}</b></td>`);
            const searchedBarang = barang?.nama_barang.replace(regex, (match) => `<td><b>${match}</b></td>`);

            return (
              <tr key={id}>
                <td className="w-fit border bg-zinc-50 p-2 text-xs text-zinc-600 text-center">{index + 1}</td>
                <td
                  className="w-fit border bg-zinc-50 p-2 text-xs text-zinc-600 text-left"
                  dangerouslySetInnerHTML={{ __html: searchedPeminjamn }}></td>
                <td
                  className="w-fit border bg-zinc-50 p-2 text-xs text-zinc-600 text-left"
                  dangerouslySetInnerHTML={{ __html: searchedBarang }}></td>
                <td className="w-fit border bg-zinc-50 p-2 text-xs text-zinc-600 text-center">
                  {date(tanggal_pengembalian)}
                </td>
                <td className="w-fit border bg-zinc-50 p-2 text-xs text-zinc-600 text-center">
                  {time(tanggal_pengembalian)} wib
                </td>
                <td className="w-fit border bg-zinc-50 p-2 text-xs text-zinc-600 text-center">
                  <p
                    className={`${
                      status === "Diterima" ? "bg-green-500" : status === "Ditolak" ? "bg-red-400" : "bg-zinc-400"
                    } p-1 text-white`}>
                    {status}
                  </p>
                </td>
                <td className="w-fit border bg-zinc-50 p-2 text-xs text-center">
                  <button onClick={() => openTransaksiDialog(id)} className="text-blue-400">
                    <OpenInNew fontSize="small" />
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={7} className="p-2 border text-xs text-center">
              {dataTransaksiPengembalian?.message}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

RequestPengembalianTableData.propTypes = {
  dataTransaksiPengembalian: PropTypes.any,
  transaksiPengembalianKeywords: PropTypes.any,
};

export default RequestPengembalianTableData;
