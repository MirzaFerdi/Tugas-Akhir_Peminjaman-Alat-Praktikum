import { mahasiswaPengembalianTableHeader } from "../../../constants/mahasiswa-pengembalian-table-header";
import { useFetchOnMount } from "../../../hooks/useFetchOnMount";
import { date, time } from "../../../utils/datetime";

const MahasiswaPengembalianScreen = () => {
  const userPayloads = JSON.parse(localStorage.getItem("user_payloads"));

  const { data: approvedPeminjamanData } = useFetchOnMount({
    url: `/peminjaman/approved/${userPayloads?.user?.id}`,
    method: "GET"
  });

  const handlePengembalian = (id, barangId) => {
    console.log(id);
    console.log(barangId);
  }

  return (
    <table className="w-full">
      <thead>
        <tr>
          {mahasiswaPengembalianTableHeader.map((headerRows) => {
            const { id, row, width } = headerRows;

            return (
              <th
                key={id}
                className={`${
                  id == 1 || id == 4 || id == 5 ? "text-center" : "text-left"
                } border p-2 text-xs text-white bg-blue-400 tracking-wider font-semibold w-[${width}]`}>
                {row}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {approvedPeminjamanData?.success === false ? (
          <tr>
            <td colSpan={5} className="w-[8%] border bg-zinc-50 p-2 text-xs text-zinc-600 text-center">
              {approvedPeminjamanData?.message}
            </td>
          </tr>
        ) : (
          approvedPeminjamanData?.data?.map((values, index) => {
            const { id, barang, barang_id, pengembalian_id, status, tanggal_peminjaman, pengembalian } = values;            

            return (
              <tr key={id}>
                <td className="w-fit border bg-zinc-50 p-2 text-xs text-zinc-600 text-center">{index + 1}</td>
                <td className="w-fit border bg-zinc-50 p-2 text-xs text-zinc-600 text-left">{barang?.nama_barang}</td>
                <td className="w-fit border bg-zinc-50 p-2 text-xs text-zinc-800 text-left">
                  {date(tanggal_peminjaman)}
                </td>
                <td className="w-fit border bg-zinc-50 p-2 text-xs text-zinc-800 text-center">
                  {time(tanggal_peminjaman)} wib
                </td>
                <td
                  onClick={() => handlePengembalian(id, barang_id)}
                  className="w-fit border bg-zinc-50 p-2 text-xs text-center">
                  <button
                    disabled={
                      pengembalian_id === null && status === "Pending"
                        ? true
                        : pengembalian_id !== null && pengembalian.status === "Pending"
                        ? true
                        : pengembalian_id !== null && pengembalian.status === "Diterima"
                        ? true
                        : false
                    }
                    className={`${
                      pengembalian_id === null && status === "Pending"
                        ? "bg-zinc-400"
                        : pengembalian_id !== null && pengembalian.status === "Pending"
                        ? "bg-zinc-400"
                        : pengembalian_id !== null && pengembalian.status === "Diterima"
                        ? "bg-green-400"
                        : "bg-blue-400 hover:bg-blue-500"
                    } text-white tracking-wide p-2 transition-colors duration-100 rounded-md`}>
                    {pengembalian_id === null && status === "Pending"
                      ? "Menunggu persetujuan peminjaman!"
                      : pengembalian_id !== null && pengembalian.status === "Pending"
                      ? "Menunggu persetujuan pengembalian!"
                      : pengembalian_id !== null && pengembalian.status === "Diterima"
                      ? "Persetujuan pengembalian diterima!"
                      : "Kembalikan"}
                  </button>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  )
}

export default MahasiswaPengembalianScreen