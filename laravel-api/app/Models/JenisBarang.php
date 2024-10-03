<?php

namespace App\Models;

use App\Models\Barang;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class JenisBarang extends Model
{
    use HasFactory;

    protected $table = 'jenis_barang'; // Ganti array dengan string
    protected $fillable = ['nama'];

    public function barang()
    {
        return $this->hasMany(Barang::class);
    }
}
