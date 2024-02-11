<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    use HasFactory;

    protected $table = 'admin';

    protected $fillable = [
        'nip',
        'nama_admin',
        'email',
        'password',
        'nohp',

    ];

    public function peminjaman(){
        return $this->hasMany(Peminjaman::class);
    }

    public function pengembalian(){
        return $this->hasMany(Pengembalian::class);
    }
}
