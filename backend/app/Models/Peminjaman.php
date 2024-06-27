<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Peminjaman extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'peminjaman';

    protected $fillable = [
        'user_id',
        'barang_id',
        'keterangan',
        'status',
        'jumlah_peminjaman',
        'tanggal_peminjaman',
        'tenggat_peminjaman',
    ];


    public function user(){
        return $this->belongsTo(User::class);
    }

    public function barang(){
        return $this->belongsTo(Barang::class);
    }

    public function pengembalian(){
        return $this->hasOne(Pengembalian::class);
    }

    public function notifikasi(){
        return $this->hasOne(Notifikasi::class);
    }
}
