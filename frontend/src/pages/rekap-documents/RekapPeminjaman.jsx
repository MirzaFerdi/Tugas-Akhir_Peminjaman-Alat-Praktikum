import React, { useEffect } from "react";
import PropTypes from "prop-types";
import RekapHeader from "./RekapHeader";
import { date, time } from "../../utils/datetime";
import { useUrutanLampiran } from "../../hooks/useRekap.js";

const Document = ({ data, urutanLampiran }) => {
  return (
    <div id={`document-${urutanLampiran + 2}`} className="w-[21cm] h-[29.7cm] shadow-md p-[3cm] font-serif bg-white">
      <div className="h-full">
        <RekapHeader />
        <table className="mb-4">
          <tbody>
            <tr>
              <td className="text-sm w-fit">
                <p className="mr-3">Lampiran ke</p>
              </td>
              <td className="text-sm w-fit">
                <p className="mr-2">:</p>
              </td>
              <td className="text-sm w-fit">{parseInt(urutanLampiran) + 2}</td>
            </tr>
          </tbody>
        </table>

        <div className="mb-4">
          <p className="text-sm font-semibold">Judul: </p>
          <p className="text-sm">Rekap Data Detail Transaksi</p>
        </div>

        <p className="text-sm text-zinc-500 mb-1">Tabel Rekap Data Peminjaman</p>
        <table className="w-full mb-6">
          <thead>
            <tr>
              <th className="w-[5%] p-2 bg-main text-white text-sm border text-center font-semibold leading-none">
                No
              </th>
              <th className="w-[33%] p-2 bg-main text-white text-sm border text-start font-semibold leading-none">
                Data Mahasiswa
              </th>
              <th className="w-[20%] p-2 bg-main text-white text-sm border text-start font-semibold leading-none">
                Data Barang
              </th>
              <th className="w-[20%] p-2 bg-main text-white text-sm border text-start font-semibold leading-none">
                Transaksi
              </th>
              <th className="w-[22%] p-2 bg-main text-white text-sm border text-start font-semibold leading-none">
                Tanggal
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data?.map((datas) => {
                const { id, user, barang, tanggal_peminjaman, jumlah_peminjaman } = datas;

                return (
                  <tr key={id}>
                    <td className="w-fit px-2 py-1 text-black text-sm border text-center leading-none">{id}</td>
                    <td className="w-fit px-2 py-1 text-black text-sm border text-start leading-none">
                      <p className="text-sm leading-none mb-1">{user?.nama}</p>
                      <p className="text-sm text-zinc-500">
                        {user?.username} | Kelas {user?.kelas_id}
                      </p>
                    </td>
                    <td className="w-fit px-2 py-1 text-black text-sm border text-start leading-none">
                      <p className="text-sm leading-none">{barang?.kode_barang}</p>
                      <p className="text-sm text-zinc-500">{barang?.nama_barang}</p>
                    </td>
                    <td className="w-fit px-2 py-1 text-black text-sm border text-start leading-none">
                      <p className="text-sm leading-tight">
                        {jumlah_peminjaman} buah
                      </p>
                    </td>
                    <td className="w-fit px-2 py-1 text-black text-sm border text-start leading-none">
                      <p className="text-sm leading-none">{date(tanggal_peminjaman)}</p>
                      <p className="text-sm text-zinc-500">{time(tanggal_peminjaman)} wib</p>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>{data?.message}</tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Document.propTypes = {
  data: PropTypes.any,
  urutanLampiran: PropTypes.any,
};

const RekapPeminjaman = ({ dataDetailTransaksi }) => {
  const { handleChangeLampiranTerakahirPeminjaman } = useUrutanLampiran();

  const maxItemsPerDocument = 8;
  const totalDocuments = Math.ceil(dataDetailTransaksi?.peminjaman?.length / maxItemsPerDocument);

  const documentComponents = [];

  for (let i = 0; i < totalDocuments; i++) {
    const startIndex = i * maxItemsPerDocument;
    const endIndex = startIndex + maxItemsPerDocument;
    const dataChunk = dataDetailTransaksi?.peminjaman?.slice(startIndex, endIndex);

    documentComponents.push(<Document key={i} data={dataChunk} urutanLampiran={i + 1} />);
  }

  useEffect(() => {
    handleChangeLampiranTerakahirPeminjaman(documentComponents.length);
  }, [documentComponents.length, handleChangeLampiranTerakahirPeminjaman]);

  return <React.Fragment>{documentComponents}</React.Fragment>;
};

RekapPeminjaman.propTypes = {
  dataDetailTransaksi: PropTypes.any,
};

export default RekapPeminjaman;
