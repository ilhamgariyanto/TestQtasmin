<?php

namespace App\Models;

use App\Models\Barang;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Transaksi extends Model
{
    use HasFactory;

    protected $table = 'transaksi';
    protected $fillable = ['barang_id', 'jumlah_terjual', 'tanggal_transaksi'];

    public function barang()
    {
        return $this->belongsTo(Barang::class);
    }
}
