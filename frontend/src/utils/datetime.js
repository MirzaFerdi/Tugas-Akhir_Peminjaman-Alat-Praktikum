export const date = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Date(date).toLocaleDateString("id-ID", options);
};

export const getMonth = (month) => {
  var months = [
    { id: 1, monthName: "Januari" },
    { id: 2, monthName: "Februari" },
    { id: 3, monthName: "Maret" },
    { id: 4, monthName: "April" },
    { id: 5, monthName: "Mei" },
    { id: 6, monthName: "Juni" },
    { id: 7, monthName: "Juli" },
    { id: 8, monthName: "Agustus" },
    { id: 9, monthName: "September" },
    { id: 10, monthName: "Oktober" },
    { id: 11, monthName: "November" },
    { id: 12, monthName: "Desember" },
  ];

  return {
    allMonth: months,
    currentMonth: months[month - 1],
  };
};

export const getYear = (year) => {
  var years = [
    { id: 1, year: 2023 },
    { id: 2, year: 2024 },
  ];

  return {
    allYear: years,
    currentYear: year,
  };
};

export const time = (date) => {
  return new Date(date).toLocaleTimeString("id-ID", {
    timeStyle: "short",
  });
};

export const getNamaBulan = (bulan) => {  
  switch (bulan) {
    case 1:
      return "Januari";
    case 2:
      return "Februari";
    case 3:
      return "Maret";
    case 4:
      return "April";
    case 5:
      return "Mei";
    case 6:
      return "Juni";
    case 7:
      return "Juli";
    case 8:
      return "Agustus";
    case 9:
      return "September";
    case 10:
      return "Oktober";
    case 11:
      return "November";
    case 12:
      return "Desember";
    default:
      return "Bulan tidak valid";
  }  
};
