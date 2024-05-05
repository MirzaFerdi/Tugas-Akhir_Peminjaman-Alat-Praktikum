export const pengembalianFormValidation = (values) => {
  const { keterangan } = values;

  const keteranganNumberOnlyRegex = /^(?![0-9]+$).+$/;

  const errors = {};

  if (!keterangan) {
    errors.keterangan = "Keterangan tidak boleh kosong!";
  }

  if (keterangan.length < 10) {
    errors.keterangan = "Keterangan tidak boleh kurang dari 10 karakter!";
  }

  if (!keteranganNumberOnlyRegex.test(keterangan)) {
    errors.keterangan = "Keterangan tidak boleh hanya terdapat angka!";
  }

  return errors;
};

export const peminjamanFormValidation = (values) => {
  const { keterangan } = values;

  const keteranganNumberOnlyRegex = /^(?![0-9]+$).+$/;

  const errors = {};

  if (!keterangan) {
    errors.keterangan = "Keterangan tidak boleh kosong!";
  }

  if (keterangan.length < 10) {
    errors.keterangan = "Keterangan tidak boleh kurang dari 10 karakter!";
  }

  if (!keteranganNumberOnlyRegex.test(keterangan)) {
    errors.keterangan = "Keterangan tidak boleh hanya terdapat angka!";
  }

  return errors;
};

export const loginFormValidation = (values) => {
  const { username, password } = values;

  const errors = {};

  const usernameRegex = /^\d+$/;

  if (!username) {
    errors.username = "NIP/NIM wajib di isi!";
  }

  if (username.length < 10) {
    errors.username = "NIP/NIM tidak valid, cek kembali!";
  }

  if (!usernameRegex.test(username)) {
    errors.username = "NIP/NIM tidak valid, cek kembali!";
  }

  if (!password) {
    errors.password = "Password wajib di isi!";
  }

  if (password.length < 3) {
    errors.password = "Password kurang dari 3 karakter!";
  }

  return errors;
};

export const forgotPasswordValidation = (values) => {
  const { email } = values;

  const emailRegex = /^\w+@(gmail\.com|yahoo\.com|polinema\.ac\.id)$/;

  const errors = {};

  if (!email) {
    errors.email = "E-Mail wajib di isi!";
  }

  if (!values.email) {
    errors.email = "Alamat E-Mail mahasiswa tidak boleh kosong!";
  }

  if (values.email.length < 10) {
    errors.email = "Alamat E-Mail tidak boleh kurang dari 10 karakter!";
  }

  if (!emailRegex.test(values.email)) {
    errors.email = "Alamat E-Mail tidak valid!";
  }

  return errors;
};

export const forgotPasswordEmailAuthenticationValidation = (values) => {
  const { token } = values;

  const errors = {};

  if (!token) {
    errors.token = "Token autentikasi email harus di isi!";
  }

  if (token.length < 10) {
    errors.token = "Token yang anda masukkan tidak valid!";
  }

  return errors;
};

export const resetPasswordValidation = (values) => {
  const { password, confPassword } = values;

  const errors = {};

  if (!password) {
    errors.password = "Password tidak boleh kosong!";
  }

  if (password.length < 8) {
    errors.password = "Password kurang dari 8 karakter!";
  }

  if (!confPassword) {
    errors.confPassword = "Konfirmasi password tidak boleh kosong!";
  }

  if (password !== confPassword) {
    errors.confPassword = "Password dan konfirmasi password tidak sama!";
  }

  return errors;
};

export const addMahasiswaFormValidation = (values) => {
  const namaMahasiswaRegex = /^[^\d]+(?: [^\d]+)*$/;
  const usernameRegex = /^\d+$/;
  const emailRegex = /^\w+@(gmail\.com|yahoo\.com|polinema\.ac\.id)$/;
  const nohpRegex = /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/;

  const errors = {};

  if (!values.nama) {
    errors.nama = "Nama mahasiswa tidak boleh kosong!";
  }

  if (values.nama.length < 5) {
    errors.nama = "Nama mahasiswa tidak boleh kurang dari 5 karakter!";
  }

  if (!namaMahasiswaRegex.test(values.nama)) {
    errors.nama = "Nama mahasiswa tidak boleh terdapat angka!";
  }

  if (!values.username) {
    errors.username = "Nomor Induk Mahasiswa tidak boleh kosong!";
  }

  if (values.username.length < 10) {
    errors.username = "Nomor Induk Mahasiswa mahasiswa tidak boleh kurang dari 10 karakter!";
  }

  if (!usernameRegex.test(values.username)) {
    errors.username = "Nomor Induk Mahasiswa harus hanya terdapat angka!";
  }

  if (!values.email) {
    errors.email = "Alamat E-Mail mahasiswa tidak boleh kosong!";
  }

  if (values.email.length < 10) {
    errors.email = "Alamat E-Mail tidak boleh kurang dari 10 karakter!";
  }

  if (!emailRegex.test(values.email)) {
    errors.email = "Alamat E-Mail tidak valid!";
  }

  if (!values.nohp) {
    errors.nohp = "Nomor telepon tidak boleh kosong!";
  }

  if (values.nohp.length < 12) {
    errors.nohp = "Nomor telepon tidak boleh kurang dari 13 angka!";
  }

  if (!nohpRegex.test(values.nohp)) {
    errors.nohp = "Nomor telepon tidak valid!";
  }

  if (!usernameRegex.test(values.nohp)) {
    errors.nohp = "Nomor telepon harus berupa angka!";
  }

  if (!values.password) {
    errors.password = "Password tidak boleh kosong!";
  }

  if (values.password.length < 5) {
    errors.password = "Password tidak boleh kurang dari 5 karakter!";
  }

  if (values.confPassword !== values.password) {
    errors.confPassword = "Konfirmasi password dan password sebelumnya tidak sama!";
  }

  return errors;
};

export const addBarangFormValidation = (values) => {
  const { namaBarang, kodeBarang, jumlahBarang } = values;
  
  const kodeBarangRegex = /^[a-zA-Z]{2}\d{2}$/;  
  const jumlahBarangRegex = /^[^\d]+(?: [^\d]+)*$/;

  const errors = {};

  if (!namaBarang) {
    errors.namaBarang = "Nama barang tidak boleh kosong!";
  }

  if (namaBarang.length <= 2) {
    errors.namaBarang = "Nama barang tidak boleh kurang dari 1 karakter!";
  }

  if (!kodeBarang) {
    errors.kodeBarang = "Kode barang tidak boleh kosong!";
  }

  if (kodeBarang.length <= 3) {
    errors.kodeBarang = "Kode barang tidak boleh kurang dari 4 karakter!";
  }

  if (kodeBarangRegex.test(kodeBarang)) {
    errors.kodeBarang = "Kode barang tidak valid!"
  }

  if (!jumlahBarang) {
    errors.jumlahBarang = "Jumlah barang tidak boleh kosong!"
  }

  if (jumlahBarang === 0) {
    errors.jumlahBarang = "Jumlah barang awal tidak boleh kosong!"
  }

  if (jumlahBarangRegex.test(jumlahBarang)) {
    errors.jumlahBarang = "Jumlah barang harus berupa angka!"
  }

  return errors;
};