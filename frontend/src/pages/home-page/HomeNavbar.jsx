import { logoImage } from "../../assets";
import { Container } from "../../components";

const HomeNavbar = () => {
  return (
    <div className="py-2 shadow-md mb-8">
      <div className="px-56">
        <div className="grid grid-cols-2 items-center">
          <div>
            <a href="/" className="flex items-center w-fit">
              <img
                src={logoImage}
                alt="Polinema Logo Images"
                width="64"
                height="64"
                className="aspect-square w-[42px] h-[42px] lg:w-[64px] lg:h-[64px] mr-3"
              />
              <div>
                <p className="leading-none text-xs lg:text-sm mb-1 tracking-wide font-medium">
                  Politenik Negeri Malang PSDKU Lumajang
                </p>
                <p className="leading-none text-xs text-zinc-600 tracking-wide mb-1">
                  Sistem Peminjaman Alat dan Bahan Praktikum
                </p>
                <p className="leading-none text-xs text-zinc-600 tracking-wide">Polinema PSDKU Lumajang</p>
              </div>
            </a>
          </div>
          <div>
            <div className="flex justify-end items-center gap-5">
              Halo
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeNavbar;
