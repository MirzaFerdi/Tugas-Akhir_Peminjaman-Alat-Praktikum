// getCroppedImg.js

// Fungsi untuk memotong gambar
export default function getCroppedImg(imageSrc, crop) {
  return new Promise((resolve, reject) => {
    // Buat elemen gambar baru
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Hitung ukuran yang diperlukan untuk canvas
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;

      // Menggambar gambar asli ke canvas dengan menggunakan area crop
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      // Konversi canvas ke data URL
      const croppedImageDataURL = canvas.toDataURL('image/jpeg');

      // Resolve dengan data URL gambar yang sudah di-crop
      resolve(croppedImageDataURL);
    };
    // Tangani kesalahan saat memuat gambar
    image.onerror = (error) => {
      reject(error);
    };
  });
}
