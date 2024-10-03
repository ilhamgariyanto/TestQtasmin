<?php

namespace App\Models;

use App\Models\Transaksi;
use App\Models\JenisBarang;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Barang extends Model
{
    use HasFactory;

    protected $table = 'barang';
    protected $fillable = ['nama', 'stok', 'jenis_barang_id'];

    public function getNamaStokAttribute()
    {
        return "{$this->nama} - {$this->stok}"; // Pastikan menggunakan 'stok'
    }

    public function jenisBarang()
    {
        return $this->belongsTo(JenisBarang::class, 'jenis_barang_id'); // Tambahkan parameter foreign key jika perlu
    }

    public function transaksi()
    {
        return $this->hasMany(Transaksi::class);
    }
}
