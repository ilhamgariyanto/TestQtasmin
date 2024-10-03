<?php

namespace App\Http\Controllers\Api;

use App\Models\Barang;
use App\Models\Transaksi;
use Illuminate\Http\Request;
use App\Http\Resources\ApiResource;
use App\Http\Controllers\Controller;
use App\Models\JenisBarang;

class BarangController extends Controller
{



    public function index(Request $request)
    {
        $query = Barang::with(['jenisBarang', 'transaksi']);

        if ($request->has('search')) {
            $query->whereRaw('LOWER(nama) LIKE ?', ['%' . strtolower($request->search) . '%']);
        }

        if ($request->has('sort')) {
            $validSortFields = ['nama', 'stok', 'jenis_barang_id'];
            $sortField = in_array($request->sort, $validSortFields) ? $request->sort : 'nama';
            $sortOrder = $request->order === 'desc' ? 'desc' : 'asc';

            $query->orderBy($sortField, $sortOrder);
        }

        return response()->json($query->get());
    }



    public function store(Request $request)
    {

        $validatedData = $request->validate([
            'nama' => 'required|string|min:1|max:255',
            'stok' => 'required|min:1',
            'jenis_barang_id' => 'required|exists:jenis_barang,id',
            'jumlah_terjual' => 'required|integer',
            'tanggal_transaksi' => 'required|date',
        ]);


        $barang = Barang::create($validatedData);

        $transaksi = new Transaksi([
            'barang_id' => $barang->id,
            'jumlah_terjual' => $validatedData['jumlah_terjual'],
            'tanggal_transaksi' => $validatedData['tanggal_transaksi'],
        ]);


        $barang->transaksi()->save($transaksi);

        return new ApiResource(true, 'Data Barang Berhasil Ditambahkan!', $barang);
    }

    public function show($id)
    {
        $barang = Barang::with(['jenisBarang', 'transaksi'])->findOrFail($id);
        return response()->json($barang);
    }

    public function update(Request $request, $id)
    {

        $validatedData = $request->validate([
            'nama' => 'required|string|max:255',
            'stok' => 'required|integer',
            'jenis_barang_id' => 'required|exists:jenis_barang,id',
            'jumlah_terjual' => 'nullable|integer',
            'tanggal_transaksi' => 'nullable|date',
        ]);


        $barang = Barang::findOrFail($id);


        $barang->update($validatedData);

        if (isset($validatedData['jumlah_terjual']) && isset($validatedData['tanggal_transaksi'])) {
            $transaksi = $barang->transaksi()->updateOrCreate(
                ['tanggal_transaksi' => $validatedData['tanggal_transaksi']], // Kondisi untuk memperbarui
                ['jumlah_terjual' => $validatedData['jumlah_terjual']] // Data yang diperbarui
            );
        }

        return new ApiResource(true, 'Data Barang Berhasil Diperbarui!', $barang);
    }


    public function destroy($id)
    {
        // Hapus barang berdasarkan ID
        Barang::findOrFail($id)->delete();
        return response()->json(null, 204);
    }

    public function compareJenisBarang(Request $request)
    {
        $query = Transaksi::selectRaw('jenis_barang.nama as jenis, SUM(transaksi.jumlah_terjual) as total_terjual')
            ->join('barang', 'transaksi.barang_id', '=', 'barang.id')
            ->join('jenis_barang', 'barang.jenis_barang_id', '=', 'jenis_barang.id')
            ->groupBy('jenis_barang.id', 'jenis_barang.nama');

        // Filter berdasarkan rentang tanggal
        if ($request->has('start_date') && $request->has('end_date')) {
            $query->whereBetween('transaksi.tanggal_transaksi', [$request->start_date, $request->end_date]);
        }

        // Sorting berdasarkan total terjual
        $result = $query->orderBy('total_terjual', $request->order ?? 'desc')->get();

        return response()->json($result);
    }

    public function getJenisBarang()
    {
        return response()->json(JenisBarang::all());
    }
}
