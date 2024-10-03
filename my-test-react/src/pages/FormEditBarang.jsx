// src/pages/FormEditBarang.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Box, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Api from '../api/index';

const FormEditBarang = () => {
  const { id } = useParams();
  const [nama, setNama] = useState('');
  const [stok, setStok] = useState('');
  const [jenisBarangId, setJenisBarangId] = useState('');
  const [jenisBarangs, setJenisBarangs] = useState([]);
  const [jumlahTerjual, setJumlahTerjual] = useState('');
  const [tanggalTransaksi, setTanggalTransaksi] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJenisBarang = async () => {
      try {
        const response = await Api.get('/api/jenis-barang');
        setJenisBarangs(response.data);
      } catch (error) {
        console.error('Error fetching jenis barang:', error);
      }
    };

    const fetchBarang = async () => {
      try {
        const response = await Api.get(`/api/barang/${id}`);
        const { nama, stok, jenis_barang_id, jumlah_terjual, tanggal_transaksi } = response.data;
        setNama(nama);
        setStok(stok);
        setJenisBarangId(jenis_barang_id);
        setJumlahTerjual(jumlah_terjual);
        setTanggalTransaksi(tanggal_transaksi);
      } catch (error) {
        console.error('Error fetching barang:', error);
      }
    };

    fetchJenisBarang();
    fetchBarang();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi jumlah terjual tidak boleh lebih dari stok
    if (parseInt(jumlahTerjual) > parseInt(stok)) {
      alert('Jumlah terjual tidak boleh melebihi stok!');
      return;
    }

    try {
      await Api.put(`/api/barang/${id}`, {
        nama,
        stok,
        jenis_barang_id: jenisBarangId,
        jumlah_terjual: jumlahTerjual,
        tanggal_transaksi: tanggalTransaksi,
      });
      alert('Data Barang Berhasil Diperbarui!');
      navigate('/');
    } catch (error) {
      console.error('Error updating barang:', error);
      alert('Gagal memperbarui barang!');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Edit Barang
      </Typography>
      <Button variant="contained" color="primary" onClick={() => window.history.back()} sx={{ mb: 2 }}>
        Kembali
      </Button>
      <form onSubmit={handleSubmit}>
        <TextField label="Nama Barang" value={nama} onChange={(e) => setNama(e.target.value)} fullWidth required sx={{ mb: 1 }} />
        <TextField label="Stok" type="number" value={stok} onChange={(e) => setStok(e.target.value)} fullWidth required sx={{ mb: 1 }} />
        <FormControl fullWidth required sx={{ mb: 1 }}>
          <InputLabel>Jenis Barang</InputLabel>
          <Select value={jenisBarangId} onChange={(e) => setJenisBarangId(e.target.value)}>
            {jenisBarangs.map((jenis) => (
              <MenuItem key={jenis.id} value={jenis.id}>
                {jenis.nama}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField label="Jumlah Terjual" type="number" value={jumlahTerjual} onChange={(e) => setJumlahTerjual(e.target.value)} fullWidth required sx={{ mb: 1 }} />
        <TextField
          label="Tanggal Transaksi"
          type="date"
          value={tanggalTransaksi}
          onChange={(e) => setTanggalTransaksi(e.target.value)}
          fullWidth
          required
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ mb: 1 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Simpan Perubahan
        </Button>
      </form>
    </Box>
  );
};

export default FormEditBarang;
