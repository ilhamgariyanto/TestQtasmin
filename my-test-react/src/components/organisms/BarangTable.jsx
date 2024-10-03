import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Box, TextField, Button as MUIButton, Typography } from '@mui/material';
import Button from '../atoms/Button';

const BarangTable = ({ barang, onEdit, onDelete }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5);
  const [comparisonData, setComparisonData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // State untuk sorting
  const [sortConfig, setSortConfig] = useState({ key: 'nama', direction: 'asc' });

  // Fungsi untuk mengubah halaman
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const count = Array.isArray(barang) ? barang.length : 0;

  const handleCompare = (type) => {
    const sortedBarang = [...barang].sort((a, b) => {
      const totalA = a.transaksi.reduce((sum, t) => sum + t.jumlah_terjual, 0);
      const totalB = b.transaksi.reduce((sum, t) => sum + t.jumlah_terjual, 0);
      return type === 'highest' ? totalB - totalA : totalA - totalB;
    });

    const comparisonResult = sortedBarang.map((item) => ({
      nama: item.nama,
      jenis: item.jenis_barang ? item.jenis_barang.nama : 'Tidak Diketahui',
      totalTerjual: item.transaksi.reduce((sum, t) => sum + t.jumlah_terjual, 0),
    }));

    setComparisonData(comparisonResult);
  };

  // Filter barang berdasarkan pencarian
  const filteredBarang = barang.filter((item) => item.nama.toLowerCase().includes(searchTerm.toLowerCase()));

  // Fungsi untuk mengatur sorting
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Sort barang berdasarkan pengaturan sorting
  const sortedBarang = useMemo(() => {
    let sortableItems = [...filteredBarang];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredBarang, sortConfig]);

  const paginatedBarang = sortedBarang.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="flex-start">
      <Box flex={8} mr={2}>
        <Box mb={2} display="flex" alignItems="center">
          <MUIButton variant="contained" color="primary" onClick={() => handleCompare('highest')} size="small" sx={{ mr: 1 }}>
            Penjualan Terbanyak
          </MUIButton>
          <MUIButton variant="contained" color="secondary" onClick={() => handleCompare('lowest')} size="small">
            Penjualan Terendah
          </MUIButton>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell onClick={() => requestSort('nama')} style={{ cursor: 'pointer' }}>
                  Nama Barang
                </TableCell>
                <TableCell onClick={() => requestSort('jenis_barang_id')} style={{ cursor: 'pointer' }}>
                  Jenis Barang
                </TableCell>
                <TableCell onClick={() => requestSort('stok')} style={{ cursor: 'pointer' }}>
                  Stok
                </TableCell>
                <TableCell onClick={() => requestSort('jumlah_terjual')} style={{ cursor: 'pointer' }}>
                  Jumlah Terjual
                </TableCell>
                <TableCell onClick={() => requestSort('tanggal_transaksi')} style={{ cursor: 'pointer' }}>
                  Tanggal Transaksi Terakhir
                </TableCell>
                <TableCell>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(paginatedBarang) && paginatedBarang.length > 0 ? (
                paginatedBarang.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.nama}</TableCell>
                    <TableCell>{item.jenis_barang ? item.jenis_barang.nama : 'Tidak Diketahui'}</TableCell>
                    <TableCell>{item.stok}</TableCell>
                    <TableCell>{item.transaksi && item.transaksi.length > 0 ? item.transaksi[0].jumlah_terjual : 0}</TableCell>
                    <TableCell>{item.transaksi && item.transaksi.length > 0 ? item.transaksi[0].tanggal_transaksi : 'Tidak Ada Transaksi'}</TableCell>
                    <TableCell>
                      <Button onClick={() => onEdit(item.id)}>Edit</Button>
                      <Button onClick={() => onDelete(item.id)} color="secondary">
                        Hapus
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Tidak ada data barang
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination rowsPerPageOptions={[]} component="div" count={count} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} />
        </TableContainer>
      </Box>

      {/* Menampilkan data perbandingan di sebelah tabel */}
      <Box ml={2} flex={4} minWidth={300}>
        {comparisonData && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Hasil Perbandingan:
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nama Barang</TableCell>
                  <TableCell>Jenis Barang</TableCell>
                  <TableCell>Total Terjual</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {comparisonData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.nama}</TableCell>
                    <TableCell>{item.jenis}</TableCell>
                    <TableCell>{item.totalTerjual}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default BarangTable;
