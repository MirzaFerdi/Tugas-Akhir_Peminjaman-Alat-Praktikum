import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from "@mui/icons-material";
import { logoImage } from "../../assets";
import { useSidebar } from "../../hooks/useSidebar";

const AppLogoBar = () => {
  const { isSidebarDrawerOpen, openSidebar, closeSidebar } = useSidebar();

  return (
    <div className="flex justify-between items-center w-full h-full px-4 bg-main-hover shadow-md z-50">
      <button onClick={() => window.location.reload()} className="flex justify-start items-center w-fit">
        <img
          src={logoImage}
          alt="Polinema Logo Images"
          width="64"
          height="64"
          className="aspect-square w-[32px] h-[32px] lg:w-[40px] lg:h-[40px] mr-3"
        />
        <div className="text-start">
          <p className="leading-none text-xs lg:text-xs mb-1 text-white tracking-wide font-medium">
            Aplikasi Sistem Peminjaman
          </p>
          <p className="leading-none text-[0.6em] text-zinc-200 tracking-wide mb-1">
            Alat dan Bahan Praktikum Bengkel TRO
          </p>
          <p className="leading-none text-[0.6em] text-zinc-200 tracking-wide">Polinema PSDKU Lumajang</p>
        </div>
      </button>

      <button onClick={isSidebarDrawerOpen ? () => closeSidebar() : () => openSidebar()} className="block lg:hidden text-white">
        {isSidebarDrawerOpen ? <KeyboardDoubleArrowLeft /> : <KeyboardDoubleArrowRight />}
      </button>
    </div>
  );
};

export default AppLogoBar;
