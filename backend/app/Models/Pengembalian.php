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
        'keterangan',
        'status',
        'tanggal_pengembalian',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
    public function barang(){
        return $this->belongsTo(Barang::class);
    }
}
