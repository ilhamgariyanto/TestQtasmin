<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class BarangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('barang')->insert([
            ['nama' => 'Kopi', 'stok' => 100, 'jenis_barang_id' => 1],
            ['nama' => 'Teh', 'stok' => 75, 'jenis_barang_id' => 1],
            ['nama' => 'Pasta Gigi', 'stok' => 50, 'jenis_barang_id' => 2],
            ['nama' => 'Sabun Mandi', 'stok' => 100, 'jenis_barang_id' => 2],
            ['nama' => 'Sampo', 'stok' => 50, 'jenis_barang_id' => 2],
        ]);
    }
}
