import { Container } from "../../components";

const HomeJumbotron = () => {
  return (
    <div id="home">
      <div className="px-56">
        <div className="grid grid-cols-2">
          <div>
            <p className="text-xs tracking-wider leading-none py-2 px-5 text-blue-400 border-2 border-blue-400 w-fit rounded-full mb-5">
              LANDING PAGE
            </p>
            <h1 className="text-4xl leading-none mb-2 tracking-wide font-bold">
              Aplikasi <span className="text-blue-300">Peminjaman</span>
            </h1>
            <h1 className="text-4xl leading-none mb-4 tracking-wide font-bold">Alat dan Bahan Praktikum</h1>
            <h2 className="text-2xl mb-4 trackign-wide font-medium italic">Bengkel Lab Teknologi Rekayasa Otomotif</h2>
            <p className="text-sm text-zinc-600 tracking-wide mb-5 text-justify">
              Aplikasi Peminjaman Alat dan Bahan Praktikum Bengkel Teknologi Rekayasa Otomotif adalah aplikasi yang
              memberikan solusi praktis bagi mahasiswa jurusan Teknologi Rekayasa Otomotif untuk mengakses peralatan dan
              bahan praktikum dengan mudah dan efisien. Fitur yang memudahkan mahasiswa dan admin jurusan dalam
              melakukan transaksi peminjaman atau pengembalian saat praktikum sedang berlangsung.
            </p>
            <a
              href="/login"
              className="block w-fit py-3 px-5 leading-none text-sm text-white bg-blue-400 hover:bg-blue-500 transition-colors duration-150 rounded-md">
              MULAI SEKARANG
            </a>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default HomeJumbotron;
