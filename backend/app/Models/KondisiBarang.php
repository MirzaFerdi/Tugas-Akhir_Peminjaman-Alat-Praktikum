<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KondisiBarang extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'kondisi_barang';

    protected $fillable = [
        'user_id',
        'barang_id',
        'pengembalian_id',
        'kondisi_barang',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function barang(){
        return $this->belongsTo(Barang::class);
    }

    public function pengembalian(){
        return $this->belongsTo(Pengembalian::class);
    }
}
