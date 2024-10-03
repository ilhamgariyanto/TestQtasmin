import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import Api from '../api/index';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ComparePage = () => {
  const [comparisonData, setComparisonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComparisonData = async () => {
      try {
        const response = await Api.get('/api/compare');
        setComparisonData(response.data);
      } catch (err) {
        setError('Gagal memuat data perbandingan.');
      } finally {
        setLoading(false);
      }
    };

    fetchComparisonData();
  }, []);

  if (loading) {
    return <Typography variant="h6">Memuat data...</Typography>;
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    ); // Menampilkan error
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Hasil Perbandingan Jenis Barang
      </Typography>

      {/* Tombol Back */}
      <Button variant="contained" color="primary" onClick={() => window.history.back()} sx={{ mb: 2 }}>
        Kembali
      </Button>

      {/* Tabel untuk menampilkan data perbandingan */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Jenis Barang</TableCell>
              <TableCell>Total Terjual</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {comparisonData.length > 0 ? (
              comparisonData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.jenis}</TableCell>
                  <TableCell>{item.total_terjual}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  Tidak ada data untuk ditampilkan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Grafik untuk menampilkan data perbandingan */}
      <Typography variant="h5" gutterBottom mt={4}>
        Grafik Perbandingan Penjualan
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={comparisonData}>
          <XAxis dataKey="jenis" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_terjual" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComparePage;
