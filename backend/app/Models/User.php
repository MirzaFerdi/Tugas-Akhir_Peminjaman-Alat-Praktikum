<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

     public $timestamps = false;

     protected function getDefaultGuardName(): string { return 'api'; }

    protected $fillable = [
        'nama',
        'username',
        'email',
        'password',
        'nohp',
        'foto',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'password' => 'hashed',
    ];

    public function notifikasi(){
        return $this->hasMany(Notifikasi::class);
    }

    public function role(){
        return $this->belongsTo(Role::class);
    }
    public function kelas(){
        return $this->belongsTo(Kelas::class);
    }

    public function kondisiBarang(){
        return $this->hasMany(KondisiBarang::class);
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    public function getJWTCustomClaims()
    {
        return [
            'nama' => $this->nama,
            'username' => $this->username,
            'email' => $this->email,
            'nohp' => $this->nohp,
            'kelas' => $this->kelas,
            'role' => $this->role,
        ];
    }
}
