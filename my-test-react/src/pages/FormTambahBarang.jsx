// src/pages/FormTambahBarang.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Api from '../api/index';

const FormTambahBarang = () => {
  const [nama, setNama] = useState('');
  const [stok, setStok] = useState('');
  const [jenisBarangId, setJenisBarangId] = useState('');
  const [jenisBarangs, setJenisBarangs] = useState([]);
  const [jumlahTerjual, setJumlahTerjual] = useState('');
  const [tanggalTransaksi, setTanggalTransaksi] = useState('');
  const [error, setError] = useState('');

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

    fetchJenisBarang();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (parseInt(jumlahTerjual) > parseInt(stok)) {
      setError('Jumlah terjual tidak boleh melebihi stok.');
      return;
    } else {
      setError('');
    }

    try {
      await Api.post('/api/barang', {
        nama,
        stok,
        jenis_barang_id: jenisBarangId,
        jumlah_terjual: jumlahTerjual,
        tanggal_transaksi: tanggalTransaksi,
      });

      setNama('');
      setStok('');
      setJenisBarangId('');
      setJumlahTerjual('');
      setTanggalTransaksi('');

      alert('Data Barang Berhasil Ditambahkan!');

      navigate('/');
    } catch (error) {
      console.error('Error adding barang:', error);
      alert('Gagal menambahkan barang!');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Tambah Barang
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

        {error && <Typography color="error">{error}</Typography>}

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
          Tambah Barang
        </Button>
      </form>
    </Box>
  );
};

export default FormTambahBarang;
