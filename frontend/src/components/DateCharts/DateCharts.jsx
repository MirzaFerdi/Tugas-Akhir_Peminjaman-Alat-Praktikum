import React from 'react';

// Fungsi untuk menghitung minggu ke berapa dalam tahun
const getWeekNumber = (date) => {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - startOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
};

// Fungsi untuk mendapatkan tanggal awal minggu tertentu dalam tahun
const getStartOfWeek = (year, week) => {
  const startOfYear = new Date(year, 0, 1);
  const startWeekDay = startOfYear.getDay() === 0 ? 7 : startOfYear.getDay();
  const startOfWeek = new Date(year, 0, 1 + (week - 1) * 7 - startWeekDay + 1);
  return startOfWeek;
};

// Fungsi untuk mendapatkan semua tanggal dalam minggu tersebut
const getDatesOfWeek = (startOfWeek) => {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    dates.push(formatDate(date));
  }
  return dates;
};

// Fungsi untuk memformat tanggal menjadi DD-MM-YYYY
const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const DateCharts = () => {
  const now = new Date();
  const weekOfYear = getWeekNumber(now);
  const startOfWeek = getStartOfWeek(now.getFullYear(), weekOfYear);
  const datesOfWeek = getDatesOfWeek(startOfWeek);
  const formattedNow = formatDate(now);

  return (
    <div>
      <p>Tanggal sekarang: {formattedNow}</p>
      <p>Minggu ke: {weekOfYear}</p>
      <p>Tanggal dalam minggu tersebut:</p>
      <ul>
        {datesOfWeek.map(date => (
          <li key={date}>{date}</li>
        ))}
      </ul>
    </div>
  );
};

export default DateCharts;
