import RekapPage from "./RekapPage";
import * as htmlToImage from "html-to-image";
import { useParams } from "react-router-dom";
import { Download, ExitToApp } from "@mui/icons-material";
import { jsPDF } from "jspdf";
import { useUrutanLampiran } from "../../hooks/useRekap";

const RekapDocuments = () => {
  const { month, year } = useParams();
  const { lampiranTerakhirPengembalian } = useUrutanLampiran();

  const handleDownload = async () => {
    const elements = Array.from({ length: lampiranTerakhirPengembalian }, (_, index) => `document-${index + 1}`);

    const imageDataArray = [];

    for (const element of elements) {
      try {
        const dataUrl = await htmlToImage.toPng(document.getElementById(element), {
          quality: 0.8,
        });
        imageDataArray.push(dataUrl);
      } catch (error) {
        console.log(error);
      }
    }

    createPDF(imageDataArray);
  };

  const createPDF = (imageDataArray) => {
    const pdf = new jsPDF({
      unit: "cm",
      format: [21, 29.7],
    });

    imageDataArray.forEach((imageData, index) => {
      if (index > 0) {
        pdf.addPage();
      }
      pdf.addImage(imageData, "PNG", 0, 0, 21, 29.7, "", "MEDIUM");
    });

    pdf.save(`[Dokumen Rekap] - Rekap Data Peminjaman Alat dan Bahan Praktikum Bulan ${month} Tahun ${year} 2024.pdf`);
  };

  return (
    <>
      <div className="sticky top-0 flex justify-between items-center bg-zinc-100 shadow-md p-2 mb-5">
        <div>
          <p>
            Rekap Data Bulan {month} tahun {year}
          </p>
          <p></p>
        </div>
        <div className="flex justify-center items-center gap-3">
          <button
            onClick={handleDownload}
            className="text-xs w-full flex justify-center items-center py-2 px-5 bg-main hover:bg-main-hover transition-colors duration-150 rounded-full text-white">
            <Download sx={{ fontSize: "1.4em" }} className="mr-3" /> <p className="leading-none">Download</p>
          </button>
          <a
            href="/admin"
            className="text-xs w-full flex justify-center items-center py-2 px-5 bg-red-500 hover:bg-red-600
                  transition-colors duration-150 rounded-full text-white">
            <ExitToApp sx={{ fontSize: "1.4em" }} className="mr-3" /> <p className="leading-none">Kembali</p>
          </a>
        </div>
      </div>
      <div className="flex flex-col items-center gap-5 bg-zinc-100 p-8">
        <RekapPage />
      </div>
    </>
  );
};

export default RekapDocuments;
