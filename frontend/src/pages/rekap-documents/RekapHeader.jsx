import React from "react";
import { logoImage } from "../../assets";
import { date } from "../../utils/datetime";

const RekapHeader = () => {
  return (
    <React.Fragment>
      <div className="flex justify-around items-center mb-2">
        <img src={logoImage} alt="Logo Polinema" width={90} height={90} className="aspect-square" />
        <div>
          <h1 className="text-center text-sm">KEMENTRIAN PENDIDIKAN, KEBUDAYAAN,</h1>
          <h1 className="text-center text-sm">RISET, DAN TEKNOLOGI</h1>
          <h1 className="text-center text-sm">POLITEKNIK NEGERI MALANG</h1>
          <h1 className="text-center text-sm font-bold">PROGRAM STUDI DILUAR KAMPUS UTAMA (PSDKU)</h1>
          <h1 className="text-center text-sm font-bold mb-2">KABUPATEN LUMAJANG</h1>
          <p className="text-center text-xs">Jalan Lintas Timur - 67311</p>
          <p className="text-center text-xs">Telp. (0334) 8786800</p>
          <p className="text-center text-xs">Website: www.polinema.ac.id - Email:psdku.lumajang@polinema.ac.id</p>
        </div>
      </div>

      <div className="bg-zinc-800 h-[0.1rem] mb-[0.1rem]"></div>
      <div className="bg-zinc-800 h-[0.2rem] mb-4"></div>

      <div className="flex flex-col items-end mb-2">
        <p className="text-sm">Lumajang</p>
        <p className="text-sm">{date(new Date())}</p>
      </div>
    </React.Fragment>
  );
};

export default RekapHeader;
