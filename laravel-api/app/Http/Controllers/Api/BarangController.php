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
            $searchTerms = explode(',', $request->search);

            foreach ($searchTerms as $term) {
                $term = trim($term);
                if (strtotime($term)) {
                    $query->whereHas('transaksi', function ($q) use ($term) {
                        $q->whereDate('tanggal_transaksi', $term);
                    });
                } else { // Asumsi term adalah nama
                    $query->whereRaw('LOWER(nama) LIKE ?', ['%' . strtolower($term) . '%']);
                }
            }
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
        // Validasi data input
        $validatedData = $request->validate([
            'nama' => 'required|string|max:255',
            'stok' => 'required|integer',
            'jenis_barang_id' => 'required|exists:jenis_barang,id',
            'jumlah_terjual' => 'nullable|integer',
            'tanggal_transaksi' => 'nullable|date',
            'transaksi_id' => 'nullable|exists:transaksi,id', // Menambahkan ID transaksi jika ada
        ]);

        // Cari data barang berdasarkan ID
        $barang = Barang::findOrFail($id);

        // Update data barang
        $barang->update($validatedData);

        // Jika ada data transaksi (jumlah_terjual & tanggal_transaksi) dan transaksi_id disediakan
        if (isset($validatedData['jumlah_terjual']) && isset($validatedData['tanggal_transaksi'])) {
            // Cek jika ada transaksi_id yang dikirimkan
            if (isset($validatedData['transaksi_id'])) {
                // Update transaksi berdasarkan ID transaksi yang diberikan
                $transaksi = $barang->transaksi()->where('id', $validatedData['transaksi_id'])->first();
                if ($transaksi) {
                    $transaksi->update([
                        'jumlah_terjual' => $validatedData['jumlah_terjual'],
                        'tanggal_transaksi' => $validatedData['tanggal_transaksi']
                    ]);
                }
            } else {
                // Jika tidak ada transaksi_id, buat transaksi baru
                $transaksi = $barang->transaksi()->updateOrCreate(
                    ['tanggal_transaksi' => $validatedData['tanggal_transaksi']],
                    ['jumlah_terjual' => $validatedData['jumlah_terjual']]
                );
            }
        }

        // Kembalikan respons berhasil
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
