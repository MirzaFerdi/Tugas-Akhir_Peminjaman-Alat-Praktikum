export const pengembalianFormValidation = (values) => {
  const { keterangan, jumlah_kondisi, kondisi } = values;

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

  if (kondisi) {
    if (jumlah_kondisi == 0) {
      errors.jumlah_kondisi = "Jumlah kondisi tidak boleh kosong!";
    }

    if (keteranganNumberOnlyRegex.test(jumlah_kondisi)) {
      errors.jumlah_kondisi = "Jumlah kondisi hanya boleh terdapat angka!";
    }
  }

  return errors;
};

export const peminjamanFormValidation = (values) => {
  const { keterangan, jumlah_peminjaman } = values;

  const keteranganNumberOnlyRegex = /^(?![0-9]+$).+$/;

  const errors = {};

  if (!keterangan) {
    errors.keterangan = "Keterangan tidak boleh kosong!";
  }

  if (keterangan.length < 10) {
    errors.keterangan = "Keterangan tidak boleh kurang dari 10 karakter!";
  }

  if (jumlah_peminjaman == 0) {
    errors.jumlah_peminjaman = "Jumlah peminjaman tidak boleh 0!";
  }

  if (keteranganNumberOnlyRegex.test(jumlah_peminjaman)) {
    errors.jumlah_peminjaman = "Jumlah peminjaman hanya boleh angka!";
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
  const { resetToken } = values;

  const errors = {};

  if (!resetToken) {
    errors.resetToken = "Token autentikasi email harus di isi!";
  }

  if (resetToken.length < 10) {
    errors.resetToken = "Token yang anda masukkan tidak valid!";
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

export const editMahasiswaFormValidation = (values) => {
  const namaMahasiswaRegex = /^[^\d]+(?: [^\d]+)*$/;
  const usernameRegex = /^\d+$/;
  const emailRegex = /^\w+@(gmail\.com|yahoo\.com|polinema\.ac\.id)$/;
  const nohpRegex = /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/;

  const { nama, username, email, nohp } = values;

  const errors = {};

  if (!nama) {
    errors.nama = "Nama mahasiswa tidak boleh kosong!";
  }

  if (nama.length < 5) {
    errors.nama = "Nama mahasiswa tidak boleh kurang dari 5 karakter!";
  }

  if (!namaMahasiswaRegex.test(nama)) {
    errors.nama = "Nama mahasiswa tidak boleh terdapat angka!";
  }

  if (!username) {
    errors.username = "Nomor Induk Mahasiswa tidak boleh kosong!";
  }

  if (username.length < 10) {
    errors.username = "Nomor Induk Mahasiswa mahasiswa tidak boleh kurang dari 10 karakter!";
  }

  if (!usernameRegex.test(username)) {
    errors.username = "Nomor Induk Mahasiswa harus hanya terdapat angka!";
  }

  if (!email) {
    errors.email = "Alamat E-Mail mahasiswa tidak boleh kosong!";
  }

  if (email.length < 10) {
    errors.email = "Alamat E-Mail tidak boleh kurang dari 10 karakter!";
  }

  if (!emailRegex.test(email)) {
    errors.email = "Alamat E-Mail tidak valid!";
  }

  if (!nohp) {
    errors.nohp = "Nomor telepon tidak boleh kosong!";
  }

  if (nohp.length < 12) {
    errors.nohp = "Nomor telepon tidak boleh kurang dari 13 angka!";
  }

  if (!nohpRegex.test(nohp)) {
    errors.nohp = "Nomor telepon tidak valid!";
  }

  if (!usernameRegex.test(nohp)) {
    errors.nohp = "Nomor telepon harus berupa angka!";
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
    errors.kodeBarang = "Kode barang tidak valid!";
  }

  if (!jumlahBarang) {
    errors.jumlahBarang = "Jumlah barang tidak boleh kosong!";
  }

  if (jumlahBarang === 0) {
    errors.jumlahBarang = "Jumlah barang awal tidak boleh kosong!";
  }

  if (jumlahBarangRegex.test(jumlahBarang)) {
    errors.jumlahBarang = "Jumlah barang harus berupa angka!";
  }

  return errors;
};

export const editBarangFormValidation = (values) => {
  const { namaBarang, kodeBarang, stokTersedia, stokAwal, stokMasuk } = values;

  const kodeBarangRegex = /^[a-zA-Z]{2}\d{2}$/;
  const stokAwalRegex = /^[^\d]+(?: [^\d]+)*$/;
  const stokTersediaRegex = /^[^\d]+(?: [^\d]+)*$/;
  const stokMasukRegex = /^[^\d]+(?: [^\d]+)*$/;

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
    errors.kodeBarang = "Kode barang tidak valid!";
  }

  if (!stokAwal) {
    errors.stokAwal = "Jumlah stok awal tidak boleh kosong!";
  }

  if (stokAwal === 0) {
    errors.stokAwal = "Jumlah stok awal awal tidak boleh kosong!";
  }

  if (stokAwalRegex.test(stokAwal)) {
    errors.stokAwal = "Jumlah stok awal harus berupa angka!";
  }

  if (!stokTersedia) {
    errors.stokTersedia = "Jumlah stok tersedia tidak boleh kosong!";
  }

  if (stokTersedia === 0) {
    errors.stokTersedia = "Jumlah stok tersedia awal tidak boleh kosong!";
  }

  if (stokTersediaRegex.test(stokTersedia)) {
    errors.stokTersedia = "Jumlah stok tersedia harus berupa angka!";
  }

  if (stokMasukRegex.test(stokMasuk)) {
    errors.stokMasuk = "Jumlah stok masuk harus berupa angka!";
  }

  return errors;
};

export const editKelasFormValidation = (values) => {
  const { dpa, tahunAjaran } = values;

  const dpaRegex = /^[^\d]+(?: [^\d]+)*$/;
  const tahunAjaranRegex = /^(20\d{2})\/(20\d{2})$/;

  const errors = {};

  if (!dpa) {
    errors.dpa = "Nama dosen pembimbing akademik tidak boleh kosong!";
  }

  if (dpa.length < 5) {
    errors.dpa = "Nama dosen pembimbing akademik tidak valid!";
  }

  if (!dpaRegex.test(dpa)) {
    errors.dpa = "Nama dosen pembimbing akademik tidak valid!";
  }

  if (!tahunAjaran) {
    errors.tahunAjaran = "Tahun ajaran tidak boleh kosong!";
  }

  if (tahunAjaran.length < 5) {
    errors.tahunAjaran = "Tahun ajaran tidak valid";
  }

  if (!tahunAjaranRegex.test(tahunAjaran)) {
    errors.tahunAjaran = "Tahun ajaran tidak valid!";
  }

  return errors;
};
