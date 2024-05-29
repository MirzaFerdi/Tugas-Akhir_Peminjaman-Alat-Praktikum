<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Barang extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'barang';

    protected $fillable = [
        'kategori_id',
        'kode_barang',
        'nama_barang',
        'stok_awal',
        'stok_tersedia',
    ];

    public function kategori(){
        return $this->belongsTo(Kategori::class);
    }

    public function peminjaman(){
        return $this->hasMany(Peminjaman::class);
    }

    public function pengembalian(){
        return $this->hasMany(Pengembalian::class);
    }

    public function kondisiBarang(){
        return $this->hasMany(KondisiBarang::class);
    }
}
