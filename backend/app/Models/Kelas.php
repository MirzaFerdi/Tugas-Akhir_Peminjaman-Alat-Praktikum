<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kelas extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'kelas';

    protected $fillable = [
        'kelas',
        'dosen_pembimbing_akademik',
        'tahun_ajaran',
    ];

    public function user(){
        return $this->hasMany(User::class);
    }
}
