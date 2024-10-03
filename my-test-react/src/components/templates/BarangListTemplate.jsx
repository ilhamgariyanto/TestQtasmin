import React from 'react';
import { Typography, Box } from '@mui/material';
import SearchBar from '../molecules/SearchBar';
import BarangTable from '../organisms/BarangTable';
import Button from '../atoms/Button';

const BarangListTemplate = ({ barang, searchValue, onSearchChange, onSearch, onAdd, onEdit, onDelete, onCompare }) => (
  <Box p={3}>
    <Typography variant="h4" gutterBottom>
      Daftar Barang
    </Typography>
    <SearchBar value={searchValue} onChange={onSearchChange} onSearch={onSearch} />
    <BarangTable barang={barang} onEdit={onEdit} onDelete={onDelete} />
    <Box mt={2} display="flex" gap={1}>
      <Button onClick={onAdd}>Tambah Barang</Button>
      <Button onClick={onCompare} color="secondary">
        Bandingkan Jenis Barang
      </Button>
    </Box>
  </Box>
);

export default BarangListTemplate;
