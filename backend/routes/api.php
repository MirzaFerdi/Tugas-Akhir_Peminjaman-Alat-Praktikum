<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\BarangController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\MahasiswaController;
use App\Http\Controllers\PeminjamanController;
use App\Http\Controllers\PengembalianController;
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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


//Kategori
Route::get('/kategori',[KategoriController::class, 'index']);
Route::get('/kategori/{id}',[KategoriController::class, 'show']);
Route::post('/kategori',[KategoriController::class, 'store']);
Route::put('/kategori/{id}',[KategoriController::class, 'update']);
Route::delete('/kategori/{id}',[KategoriController::class, 'destroy']);

// Barang
Route::get('/barang',[BarangController::class, 'index']);
Route::get('/barang/{id}',[BarangController::class, 'show']);
Route::post('/barang',[BarangController::class, 'store']);
Route::put('/barang/{id}',[BarangController::class, 'update']);
Route::delete('/barang/{id}',[BarangController::class, 'destroy']);

// Admin
Route::get('/admin',[AdminController::class, 'index']);
Route::get('/admin/{id}',[AdminController::class, 'show']);
Route::post('/admin',[AdminController::class, 'store']);
Route::put('/admin/{id}',[AdminController::class, 'update']);
Route::delete('/admin/{id}',[AdminController::class, 'destroy']);

// Mahasiswa
Route::get('/mahasiswa',[MahasiswaController::class, 'index']);
Route::get('/mahasiswa/{id}',[MahasiswaController::class, 'show']);
Route::post('/mahasiswa',[MahasiswaController::class, 'store']);
Route::put('/mahasiswa/{id}',[MahasiswaController::class, 'update']);
Route::delete('/mahasiswa/{id}',[MahasiswaController::class, 'destroy']);

// Peminjaman
Route::get('/peminjaman',[PeminjamanController::class, 'index']);
Route::get('/peminjaman/{id}',[PeminjamanController::class, 'show']);
Route::post('/peminjaman',[PeminjamanController::class, 'store']);
Route::put('/peminjaman/{id}',[PeminjamanController::class, 'update']);
Route::delete('/peminjaman/{id}',[PeminjamanController::class, 'destroy']);

// Pengembalian
Route::get('/pengembalian',[PengembalianController::class, 'index']);
Route::get('/pengembalian/{id}',[PengembalianController::class, 'show']);
Route::post('/pengembalian',[PengembalianController::class, 'store']);
Route::put('/pengembalian/{id}',[PengembalianController::class, 'update']);
Route::delete('/pengembalian/{id}',[PengembalianController::class, 'destroy']);

