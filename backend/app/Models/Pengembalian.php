<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengembalian extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'pengembalian';

    protected $fillable = [
        'user_id',
        'barang_id',
        'peminjaman_id',
        'keterangan',
        'status',
        'jumlah_pengembalian',
        'tanggal_pengembalian',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
    public function barang(){
        return $this->belongsTo(Barang::class);
    }
    public function peminjaman(){
        return $this->belongsTo(Peminjaman::class);
    }

    public function kondisiBarang(){
        return $this->hasMany(KondisiBarang::class);
    }
    public function notifikasi(){
        return $this->hasOne(Notifikasi::class);
    }
}
