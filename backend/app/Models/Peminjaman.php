<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Peminjaman extends Model
{
    use HasFactory;

    protected $table = 'peminjaman';

    protected $fillable = [
        'admin_id',
        'mahasiswa_id',
        'barang_id',
        'keterangan',
        'status',
        'tanggal_peminjaman',
    ];

    public function admin(){
        return $this->belongsTo(Admin::class);
    }

    public function mahasiswa(){
        return $this->belongsTo(Mahasiswa::class);
    }

    public function barang(){
        return $this->belongsTo(Barang::class);
    }
}
