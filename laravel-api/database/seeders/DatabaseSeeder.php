<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\BarangSeeder;
use Database\Seeders\TransaksiSeeder;
use Database\Seeders\JenisBarangSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            JenisBarangSeeder::class,
            BarangSeeder::class,
            TransaksiSeeder::class,
        ]);
    }
}
