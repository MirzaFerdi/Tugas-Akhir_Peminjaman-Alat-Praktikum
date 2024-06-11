import React, { useEffect } from "react";
import PropTypes from "prop-types";
import RekapHeader from "./RekapHeader";
import { date, time } from "../../utils/datetime";
import { useUrutanLampiran } from "../../hooks/useRekap";

const Document = ({ data }) => {
  const { lampiranTerakhirPeminjaman, handleChangeLampiranTerakahirPengembalian } = useUrutanLampiran();

  useEffect(() => {
    handleChangeLampiranTerakahirPengembalian(lampiranTerakhirPeminjaman + 3);
  }, [handleChangeLampiranTerakahirPengembalian, lampiranTerakhirPeminjaman]);

  return (
    <div
      id={`document-${lampiranTerakhirPeminjaman + 3}`}
      className="w-[21cm] h-[29.7cm] shadow-md p-[3cm] font-serif bg-white">
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
              <td className="text-sm w-fit">{lampiranTerakhirPeminjaman + 2}</td>
            </tr>
          </tbody>
        </table>

        <div className="mb-4">
          <p className="text-sm font-semibold">Judul: </p>
          <p className="text-sm">Rekap Data Detail Transaksi</p>
        </div>

        <p className="text-sm text-zinc-500 mb-1">Tabel Rekap Data Pengembalian</p>
        <table className="w-full mb-6">
          <thead>
            <tr>
              <th className="w-[5%] p-2 bg-main text-white text-sm border text-center font-semibold leading-none">
                No
              </th>
              <th className="w-[30%] p-2 bg-main text-white text-sm border text-start font-semibold leading-none">
                Data Mahasiswa
              </th>
              <th className="w-[20%] p-2 bg-main text-white text-sm border text-start font-semibold leading-none">
                Data Barang
              </th>
              <th className="w-[20%] p-2 bg-main text-white text-sm border text-start font-semibold leading-none">
                Transaksi
              </th>
              <th className="w-[25%] p-2 bg-main text-white text-sm border text-start font-semibold leading-none">
                Tanggal
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data?.map((datas) => {
                const { id, user, barang, tanggal_pengembalian, jumlah_pengembalian } = datas;

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
                        {jumlah_pengembalian} buah
                      </p>
                    </td>
                    <td className="w-fit px-2 py-1 text-black text-sm border text-start leading-none">
                      <p className="text-sm leading-none">{date(tanggal_pengembalian)}</p>
                      <p className="text-sm text-zinc-500">{time(tanggal_pengembalian)} wib</p>
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

const RekapPengembalian = ({ dataDetailTransaksi }) => {
  const maxItemsPerDocument = 8;
  const totalDocuments = Math.ceil(dataDetailTransaksi?.pengembalian?.length / maxItemsPerDocument);

  const documentComponents = [];

  for (let i = 0; i < totalDocuments; i++) {
    const startIndex = i * maxItemsPerDocument;
    const endIndex = startIndex + maxItemsPerDocument;
    const dataChunk = dataDetailTransaksi?.pengembalian?.slice(startIndex, endIndex);

    documentComponents.push(<Document key={i} data={dataChunk} urutanLampiran={i} />);
  }

  return <React.Fragment>{documentComponents}</React.Fragment>;
};

RekapPengembalian.propTypes = {
  dataDetailTransaksi: PropTypes.any,
};

export default RekapPengembalian;
