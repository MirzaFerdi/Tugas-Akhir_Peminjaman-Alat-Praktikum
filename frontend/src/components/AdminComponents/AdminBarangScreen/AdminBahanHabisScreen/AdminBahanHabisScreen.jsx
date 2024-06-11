import React, { useState } from "react";
import { ErrorOutline, Search } from "@mui/icons-material";
import { Tooltip } from "@mui/material";

const AdminBahanHabisScreen = () => {
  const [keywords, setKeywords] = useState();

  return (
    <React.Fragment>
      <div className="flex justify-between items-center px-4 lg:px-8 py-2 lg:py-4 bg-main shadow-sm shadow-main mx-6 lg:mx-8 rounded-xl text-white -mb-5 lg:-mb-10 relative">
        <h1 className="text-sm lg:text-2xl tracking-wide font-bold leading-none mr-4">Detail Bahan Habis</h1>
        <Tooltip
          arrow
          placement="bottom-start"
          title="Berikut ini merupakan data bahan praktikum lab bengkel TRO yang habis terpakai.">
          <button className="p-1 w-fit h-fit bg-white flex items-center transition-colors duration-150 leading-none text-blue-600 hover:text-blue-700 rounded-full">
            <ErrorOutline fontSize="small" />
          </button>
        </Tooltip>
      </div>
      <div className="pb-5 pt-10 lg:pt-16 bg-white px-8 rounded-md shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-start mb-8">
          <div className="flex flex-col lg:items-start mb-3 lg:mb-0">
            <p className="text-md tracking-wide text-center lg:text-start">Tabel Data Peralatan Bahan Habis Pakai</p>
            <p className="text-sm tracking-wide text-zinc-500 text-center lg:text-start">Teknologi Rekayasa Otomotif</p>
          </div>
          <div className="flex justify-end relative">
            <input
              type="text"
              autoComplete="off"
              className="p-2 text-xs border-2 border-blue-300 rounded-sm w-full lg:w-1/2 leading-none tracking-wide hover:border-blue-400 focus:outline-none focus:border-blue-400"
              name="keywords"
              placeholder="cari bahan habis ..."
              onChange={(event) => {
                setKeywords(event.target.value);
              }}
            />
            <button className="absolute top-1/2 -translate-y-1/2 right-2 text-blue-700">
              <Search />
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AdminBahanHabisScreen