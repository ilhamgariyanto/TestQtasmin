<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BarangController;


// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


Route::apiResource('barang', BarangController::class);
Route::get('compare', [BarangController::class, 'compareJenisBarang']);
Route::get('jenis-barang', [BarangController::class, 'getJenisBarang']);
