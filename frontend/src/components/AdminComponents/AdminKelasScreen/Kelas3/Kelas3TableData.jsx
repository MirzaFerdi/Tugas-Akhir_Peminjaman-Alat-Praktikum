import PropTypes from "prop-types";
import { kelasTableDataHeader } from "../../../../constants/admin-kelas-contents";
import { Delete, Edit } from "@mui/icons-material";
import { useFetchOnMount } from "../../../../hooks/useFetchOnMount";

const Kelas3TableData = ({ mahasiswaKeywords, handleEditMahasiswa }) => {
  const { data: dataMahasiswaKelas3OnSearch } = useFetchOnMount({
    url: mahasiswaKeywords === "" ? `/user/kelas/3` : `/user/search/mahasiswa/3/${mahasiswaKeywords}`,
    method: "GET",
  });

  const handleDeleteMahasiswa = (idMahasiswa) => {
    console.log(idMahasiswa);
  };

  return (
    <table className="w-full">
      <thead>
        <tr>
          {kelasTableDataHeader.map((rows) => {
            const { id, row, width } = rows;

            return (
              <th
                key={id}
                className={`${
                  id == 2 || id == 4 || id == 5 ? "text-start" : "text-center"
                } border p-2 text-xs text-white bg-blue-400 tracking-wider font-semibold w-[${width}]`}>
                {row}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {dataMahasiswaKelas3OnSearch?.data?.length > 0 ? (
          dataMahasiswaKelas3OnSearch?.data?.map((payloads, index) => {
            const { id, nama, username, email, nohp } = payloads;

            const regex = new RegExp(`(${mahasiswaKeywords})`, "gi");
            const searchedNama = nama.replace(regex, (match) => `<td><b>${match}</b></td>`);
            const searchedNim = username.replace(regex, (match) => `<td><b>${match}</b></td>`);
            const searchedEmail = email.replace(regex, (match) => `<td><b>${match}</b></td>`);

            return (
              <tr key={id}>
                <td className="w-fit border p-2 text-xs text-zinc-600 text-center">{index + 1}</td>
                <td
                  className="w-fit border p-2 text-xs text-zinc-600 text-left"
                  dangerouslySetInnerHTML={{ __html: searchedNama }}></td>
                <td
                  className="w-fit border p-2 text-xs text-zinc-600 text-center"
                  dangerouslySetInnerHTML={{ __html: searchedNim }}></td>
                <td
                  className="w-fit border p-2 text-xs text-zinc-600 text-left"
                  dangerouslySetInnerHTML={{ __html: searchedEmail }}></td>
                <td className="w-fit border p-2 text-xs text-zinc-600 text-left">{nohp}</td>
                <td className="w-fit border p-2 text-xs text-center">
                  <button onClick={() => handleEditMahasiswa(id)} className="text-blue-400">
                    <Edit fontSize="small" />
                  </button>
                </td>
                <td className="w-fit border p-2 text-xs text-center">
                  <button onClick={() => handleDeleteMahasiswa(id)} className="text-red-500">
                    <Delete fontSize="small" />
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={7} className="p-2 border text-xs text-center">
              {dataMahasiswaKelas3OnSearch?.message}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

Kelas3TableData.propTypes = {
  handleEditMahasiswa: PropTypes.func,
  mahasiswaKeywords: PropTypes.string,
};

export default Kelas3TableData;
