<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notifikasi extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'notifikasi';

    protected $fillable = [
        'user_id',
        'pesan',
        'dibaca',
        'tanggal',
        'peminjaman_id',
        'pengembalian_id',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function peminjaman(){
        return $this->belongsTo(Peminjaman::class);
    }

    public function pengembalian(){
        return $this->belongsTo(Pengembalian::class);
    }
}
