<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BarangController;
use App\Http\Controllers\BroadcastController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\KondisiBarangController;
use App\Http\Controllers\PeminjamanController;
use App\Http\Controllers\PengembalianController;
use App\Http\Controllers\KelasController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\NotifikasiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Accept:application/json


Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/forgot-password', [AuthController::class, 'forgotPassword'])->name('forgotPassword');
Route::post('/reset-password', [AuthController::class, 'resetPassword'])->name('resetPassword');



Route::middleware('auth:api', 'role:Admin')->group(function () {

    // Role
    Route::get('/role', [RoleController::class, 'index'])->name('role.index');
    Route::get('/role/{id}', [RoleController::class, 'show'])->name('role.show');
    Route::post('/role', [RoleController::class, 'store'])->name('role.store');
    Route::put('/role/{id}', [RoleController::class, 'update'])->name('role.update');
    Route::delete('/role/{id}', [RoleController::class, 'destroy'])->name('role.destroy');

    // User
    Route::get('/user', [UserController::class, 'index'])->name('user.index');
    Route::get('/user/mahasiswa/pagination', [UserController::class, 'mahasiswaAll'])->name('user.mahasiswaAll');
    Route::get('/user/search/{keywords}', [UserController::class, 'searchMahasiswaAll'])->name('user.search');
    Route::get('/user/kelas/{kelasId}', [UserController::class, 'showByKelas'])->name('user.showByKelas');
    Route::get('/user/search/mahasiswa/{kelasId}/{keywords}', [UserController::class, 'searchMahasiswaKelas'])->name('user.searchMahasiswa');
    Route::get('/user/mahasiswa/{kelasId}/{id}', [UserController::class, 'mahasiswaByKelasId'])->name('user.mahasiswaByKelasId');
    Route::post('/user', [UserController::class, 'store'])->name('user.store');
    Route::delete('/user/{id}', [UserController::class, 'destroy'])->name('user.destroy');


    //Kondisi Barang
    Route::get('/kondisibarang', [KondisiBarangController::class, 'index'])->name('kondisibarang.index');
    Route::put('/kondisibarang/{id}', [KondisiBarangController::class, 'update'])->name('kondisibarang.update');
    Route::delete('/kondisibarang/{id}', [KondisiBarangController::class, 'destroy'])->name('kondisibarang.destroy');

    //Broadcast
    Route::post('/broadcast', [BroadcastController::class, 'store'])->name('broadcast.store');
    Route::put('/broadcast/{id}', [BroadcastController::class, 'update'])->name('broadcast.update');
    Route::delete('/broadcast/{id}', [BroadcastController::class, 'destroy'])->name('broadcast.destroy');

    //Peminjaman
    Route::get('/peminjaman/transaksi/bulanan/{bulan}/{tahun}', [PeminjamanController::class, 'transaksiBulanan'])->name('peminjaman.rekap');
    Route::get('/peminjaman/transaksi/harian/{hari}/{bulan}/{tahun}',[PeminjamanController::class, 'transaksiHarian'])->name('peminjaman.rekapHarian');
    Route::put('/peminjaman/approve/{id}', [PeminjamanController::class, 'approve'])->name('peminjaman.approve');
    Route::put('/peminjaman/reject/{id}', [PeminjamanController::class, 'reject'])->name('peminjaman.reject');

    //Pengembalian
    Route::put('/pengembalian/approve/{id}', [PengembalianController::class, 'approve'])->name('pengembalian.approve');
    Route::put('/pengembalian/approve/barangrusak/{id}', [PengembalianController::class, 'approveBarangRusak'])->name('pengembalian.approveBarangRusak');
    Route::put('/pengembalian/approve/bahanhabis/{id}', [PengembalianController::class, 'approveBahanHabis'])->name('pengembalian.approveBahanHabis');
    Route::put('/pengembalian/reject/{id}', [PengembalianController::class, 'reject'])->name('pengembalian.reject');

    //Barang
    Route::post('/barang', [BarangController::class, 'store'])->name('barang.store');
    Route::put('/barang/{id}', [BarangController::class, 'update'])->name('barang.update');
    Route::delete('/barang/{id}', [BarangController::class, 'destroy'])->name('barang.destroy');

    // Kelas
    Route::get('/kelas', [KelasController::class, 'index'])->name('kelas.index');
    Route::get('/kelas/{id}', [KelasController::class, 'show'])->name('kelas.show');
    Route::post('/kelas', [KelasController::class, 'store'])->name('kelas.store');
    Route::put('/kelas/naik', [KelasController::class, 'naikKelas'])->name('kelas.naikKelas');
    Route::put('/kelas/{id}', [KelasController::class, 'update'])->name('kelas.update');
    Route::delete('/kelas/{id}', [KelasController::class, 'destroy'])->name('kelas.destroy');

    //Kategori
    Route::get('/kategori', [KategoriController::class, 'index'])->name('kategori.index');
    Route::get('/kategori/{id}', [KategoriController::class, 'show'])->name('kategori.show');
    Route::post('/kategori', [KategoriController::class, 'store'])->name('kategori.store');
    Route::put('/kategori/{id}', [KategoriController::class, 'update'])->name('kategori.update');
    Route::delete('/kategori/{id}', [KategoriController::class, 'destroy'])->name('kategori.destroy');
});

Route::middleware('auth:api', 'role:Admin|Mahasiswa')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('/countall', [UserController::class, 'countAll'])->name('countAll');

    // User
    Route::get('/user/{id}', [UserController::class, 'show'])->name('user.show');
    Route::post('/user/{id}', [UserController::class, 'update'])->name('user.update');

    //Kondisi Barang
    Route::post('/kondisibarang', [KondisiBarangController::class, 'store'])->name('kondisibarang.store');

    //Broadcast
    Route::get('/broadcast', [BroadcastController::class, 'index'])->name('broadcast.index');
    Route::get('/broadcast/{id}', [BroadcastController::class, 'show'])->name('broadcast.show');

    //Notifikasi
    Route::get('/notifikasi/{userId}', [NotifikasiController::class, 'notifikasiByUser'])->name('notifikasi.notifikasiByUser');
    Route::get('/notifikasi/belumdibaca/{userId}', [NotifikasiController::class, 'belumDibaca'])->name('notifikasi.belumDibaca');
    Route::post('/notifikasi', [NotifikasiController::class, 'store'])->name('notifikasi.store');
    Route::put('/notifikasi/{userId}/{id}', [NotifikasiController::class, 'dibaca'])->name('notifikasi.update');
    Route::delete('/notifikasi/{userId}', [NotifikasiController::class, 'destroy'])->name('notifikasi.destroy');

    // Barang
    Route::get('/barang', [BarangController::class, 'index'])->name('barang.index');
    Route::get('/barang/{id}', [BarangController::class, 'show'])->name('barang.show');
    Route::get('/barang/pagination/{kategoriId}/{limit}', [BarangController::class, 'paginationBarang'])->name('barang.paginationBarang');
    Route::get('/barang/kategori/{kategoriId}', [BarangController::class, 'showByKategori'])->name('barang.showByKategori');
    Route::get('/barang/search/{kategoriId}/{keywords}', [BarangController::class, 'search'])->name('barang.search');

    // Peminjaman
    Route::get('/peminjaman', [PeminjamanController::class, 'index'])->name('peminjaman.index');
    Route::get('/peminjaman/{id}', [PeminjamanController::class, 'show'])->name('peminjaman.show');
    Route::get('/peminjaman/search/{keywords}', [PeminjamanController::class, 'searchPeminjaman'])->name('peminjaman.search');
    Route::get('/peminjaman/approved/{userId}', [PeminjamanController::class, 'peminjamanApproved'])->name('peminjaman.getApproved');
    Route::get('/peminjaman/sort/{keywords}', [PeminjamanController::class, 'sortTimestamps'])->name('peminjaman.sort');
    Route::get('/peminjaman/user/{userId}', [PeminjamanController::class, 'peminjamanByUserId'])->name('peminjaman.showByUser');
    Route::post('/peminjaman', [PeminjamanController::class, 'store'])->name('peminjaman.store');



    Route::put('/peminjaman/{id}', [PeminjamanController::class, 'update'])->name('peminjaman.update');
    Route::put('/peminjaman/pengembalian/id/{id}', [PeminjamanController::class, 'updatePengembalian'])->name('peminjaman.pengembalian');
    Route::delete('/peminjaman/{id}', [PeminjamanController::class, 'destroy'])->name('peminjaman.destroy');


    // Pengembalian
    Route::get('/pengembalian', [PengembalianController::class, 'index'])->name('pengembalian.index');
    Route::get('/pengembalian/{id}', [PengembalianController::class, 'show'])->name('pengembalian.show');
    Route::get('/pengembalian/user/{useriId}', [PengembalianController::class, 'pengembalianByUserId'])->name('pengembalian.showByUser');
    Route::get('/pengembalian/search/{keywords}', [PengembalianController::class, 'searchPengembalian'])->name('pengembalian.search');
    Route::get('/pengembalian/sort/{keywords}', [PengembalianController::class, 'sortTimestamps'])->name('pengembalian.sort');
    Route::get('/pengembalian/approved/{userId}', [PengembalianController::class, 'pengembalianApproved'])->name('pengembalian.getApproved');
    Route::post('/pengembalian', [PengembalianController::class, 'store'])->name('pengembalian.store');
    Route::put('/pengembalian/{id}', [PengembalianController::class, 'update'])->name('pengembalian.update');
    Route::delete('/pengembalian/{id}', [PengembalianController::class, 'destroy'])->name('pengembalian.destroy');
});
