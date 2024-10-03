<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TransaksiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('transaksi')->insert([
            ['barang_id' => 1, 'jumlah_terjual' => 10, 'tanggal_transaksi' => '2024-10-03'],
            ['barang_id' => 2, 'jumlah_terjual' => 19, 'tanggal_transaksi' => '2024-10-03'],
            ['barang_id' => 1, 'jumlah_terjual' => 15, 'tanggal_transaksi' => '2024-10-03'],
            ['barang_id' => 3, 'jumlah_terjual' => 20, 'tanggal_transaksi' => '2024-10-03'],
            ['barang_id' => 4, 'jumlah_terjual' => 30, 'tanggal_transaksi' => '2024-10-03'],
            ['barang_id' => 5, 'jumlah_terjual' => 25, 'tanggal_transaksi' => '2024-10-03'],
            ['barang_id' => 2, 'jumlah_terjual' => 5, 'tanggal_transaksi' => '2024-10-03'],
        ]);
    }
}
