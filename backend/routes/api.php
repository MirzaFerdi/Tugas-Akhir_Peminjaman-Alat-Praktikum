<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BarangController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\PeminjamanController;
use App\Http\Controllers\PengembalianController;
use App\Http\Controllers\KelasController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
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
    Route::get('/user/{id}', [UserController::class, 'show'])->name('user.show');
    Route::get('/user/kelas/{id}', [UserController::class, 'showByKelas'])->name('user.showByKelas');
    Route::get('/user/search/mahasiswa/{kelasid}/{keywords}', [UserController::class, 'searchMahasiswa'])->name('user.searchMahasiswa');
    Route::get('/user/mahasiswa/{kelasid}/{id}', [UserController::class, 'mahasiswaByKelasId'])->name('user.mahasiswaByKelasId');
    Route::post('/user', [UserController::class, 'store'])->name('user.store');
    Route::put('/user/{id}', [UserController::class, 'update'])->name('user.update');
    Route::delete('/user/{id}', [UserController::class, 'destroy'])->name('user.destroy');

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

    // Barang
    Route::get('/barang', [BarangController::class, 'index'])->name('barang.index');
    Route::get('/barang/{id}', [BarangController::class, 'show'])->name('barang.show');
    Route::get('/barang/pagination/alat/{limit}', [BarangController::class, 'paginationAlat'])->name('barang.paginationAlat');
    Route::get('/barang/pagination/bahan/{limit}', [BarangController::class, 'paginationBahan'])->name('barang.paginationBahan');
    Route::get('/barang/kategori/{id}', [BarangController::class, 'showByKategori'])->name('barang.showByKategori');
    Route::get('/barang/search/alat/{keywords}', [BarangController::class, 'searchAlat'])->name('barang.searchAlat');
    Route::get('/barang/search/bahan/{keywords}', [BarangController::class, 'searchBahan'])->name('barang.searchBahan');
    Route::post('/barang', [BarangController::class, 'store'])->name('barang.store');
    Route::put('/barang/{id}', [BarangController::class, 'update'])->name('barang.update');
    Route::delete('/barang/{id}', [BarangController::class, 'destroy'])->name('barang.destroy');

    // Peminjaman
    Route::get('/peminjaman', [PeminjamanController::class, 'index'])->name('peminjaman.index');
    Route::get('/peminjaman/{id}', [PeminjamanController::class, 'show'])->name('peminjaman.show');
    Route::get('/peminjaman/search/{keywords}', [PeminjamanController::class, 'searchPeminjaman'])->name('peminjaman.search');
    Route::get('/peminjaman/approved/{id}', [PeminjamanController::class, 'peminjamanApproved'])->name('peminjaman.getApproved');
    Route::get('/peminjaman/rekap', [PeminjamanController::class, 'rekapPeminjaman'])->name('peminjaman.rekap');
    Route::get('/peminjaman/sort/{keywords}', [PeminjamanController::class, 'sortTimestamps'])->name('peminjaman.sort');
    Route::get('/peminjaman/user/{id}', [PeminjamanController::class, 'peminjamanByUserId'])->name('peminjaman.showByUser');
    Route::post('/peminjaman', [PeminjamanController::class, 'store'])->name('peminjaman.store');
    Route::put('/peminjaman/{id}', [PeminjamanController::class, 'update'])->name('peminjaman.update');
    Route::put('/peminjaman/pengembalian/id/{id}', [PeminjamanController::class, 'updatePengembalian'])->name('peminjaman.pengembalian');
    Route::delete('/peminjaman/{id}', [PeminjamanController::class, 'destroy'])->name('peminjaman.destroy');
    Route::put('/peminjaman/approve/{id}', [PeminjamanController::class, 'approve'])->name('peminjaman.approve');
    Route::put('/peminjaman/reject/{id}', [PeminjamanController::class, 'reject'])->name('peminjaman.reject');


    // Pengembalian
    Route::get('/pengembalian', [PengembalianController::class, 'index'])->name('pengembalian.index');
    Route::get('/pengembalian/{id}', [PengembalianController::class, 'show'])->name('pengembalian.show');
    Route::get('/pengembalian/search/{keywords}', [PengembalianController::class, 'searchPengembalian'])->name('pengembalian.search');
    Route::get('/pengembalian/approved/{id}', [PengembalianController::class, 'pengembalianApproved'])->name('pengembalian.getApproved');
    Route::post('/pengembalian', [PengembalianController::class, 'store'])->name('pengembalian.store');
    Route::put('/pengembalian/{id}', [PengembalianController::class, 'update'])->name('pengembalian.update');
    Route::delete('/pengembalian/{id}', [PengembalianController::class, 'destroy'])->name('pengembalian.destroy');
    Route::put('/pengembalian/approve/{id}', [PengembalianController::class, 'approve'])->name('pengembalian.approve');
    Route::put('/pengembalian/reject/{id}', [PengembalianController::class, 'reject'])->name('pengembalian.reject');
    Route::get('/pengembalian/sort/{keywords}', [PengembalianController::class, 'sortTimestamps'])->name('pengembalian.sort');
    Route::get('/pengembalian/user/{id}', [PengembalianController::class, 'pengembalianByUserId'])->name('pengembalian.showByUser');
});
