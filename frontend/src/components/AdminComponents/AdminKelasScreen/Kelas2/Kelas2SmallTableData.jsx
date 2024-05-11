import PropTypes from "prop-types";
import { useFetchOnMount } from "../../../../hooks/useFetchOnMount";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Delete, Edit, ExpandMore } from "@mui/icons-material";

const Kelas2SmallTableData = ({ mahasiswaKeywords }) => {
  const { data: dataMahasiswaKelas1OnSearch } = useFetchOnMount({
    url: mahasiswaKeywords === "" ? `/user/kelas/2` : `/user/search/mahasiswa/2/${mahasiswaKeywords}`,
    method: "GET",
  });

  return (
    <div>
      {dataMahasiswaKelas1OnSearch?.data?.length > 0 ? (
        dataMahasiswaKelas1OnSearch?.data?.map((payloads) => {
          const { id, nama, username, email, nohp } = payloads;

          const regex = new RegExp(`(${mahasiswaKeywords})`, "gi");
          const searchedNama = nama.replace(regex, (match) => `<td><b>${match}</b></td>`);
          const searchedNim = username.replace(regex, (match) => `<td><b>${match}</b></td>`);
          const searchedEmail = email.replace(regex, (match) => `<td><b>${match}</b></td>`);

          return (
            <Accordion key={id}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <p className="text-xs" dangerouslySetInnerHTML={{ __html: searchedNama }}></p>
              </AccordionSummary>
              <AccordionDetails>
                <table className="w-full">
                  <tbody>
                    <tr>
                      <th className="border p-3 tracking-wide bg-blue-400 text-white font-medium leading-none text-start text-xs">
                        Nama
                      </th>
                      <td
                        className="border p-3 tracking-wide leading-none text-xs"
                        dangerouslySetInnerHTML={{ __html: searchedNama }}></td>
                    </tr>
                    <tr>
                      <th className="border p-3 tracking-wide bg-blue-400 text-white font-medium leading-none text-start text-xs">
                        NIM
                      </th>
                      <td
                        className="border p-3 tracking-wide leading-none text-xs"
                        dangerouslySetInnerHTML={{ __html: searchedNim }}></td>
                    </tr>
                    <tr>
                      <th className="border p-3 tracking-wide bg-blue-400 text-white font-medium leading-none text-start text-xs">
                        E-Mail
                      </th>
                      <td
                        className="border p-3 tracking-wide leading-none text-xs"
                        dangerouslySetInnerHTML={{ __html: searchedEmail }}></td>
                    </tr>
                    <tr>
                      <th className="border p-3 tracking-wide bg-blue-400 text-white font-medium leading-none text-start text-xs">
                        Nomor Telepon
                      </th>
                      <td className="border p-3 tracking-wide leading-none text-xs">{nohp}</td>
                    </tr>
                    <tr>
                      <th className="border p-3 tracking-wide bg-blue-400 text-white font-medium leading-none text-start text-xs">
                        Edit
                      </th>
                      <td className="border p-2 tracking-wide leading-none text-xs">
                        <button className="bg-yellow-300 p-2 rounded-sm flex justify-between items-center w-full">
                          <p>Edit</p>
                          <Edit fontSize="small" />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <th className="border p-3 tracking-wide bg-blue-400 text-white font-medium leading-none text-start text-xs">
                        Hapus                        
                      </th>
                      <td className="border p-2 tracking-wide leading-none text-xs">
                        <button className="bg-red-400 p-2 rounded-sm flex justify-between items-center w-full">
                          <p>Hapus</p>
                          <Delete fontSize="small" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </AccordionDetails>
            </Accordion>
          );
        })
      ) : (
        <div>
          <p className="p-2 border text-xs text-center">{dataMahasiswaKelas1OnSearch?.message}</p>
        </div>
      )}
    </div>
  );
};

Kelas2SmallTableData.propTypes = {
  mahasiswaKeywords: PropTypes.string,
};

export default Kelas2SmallTableData;
