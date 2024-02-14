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
        'nama_barang',
        'jumlah_barang',
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
}
