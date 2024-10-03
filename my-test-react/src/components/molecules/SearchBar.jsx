import React from 'react';
import { TextField, Button, Box } from '@mui/material';

const SearchBar = ({ value, onChange, onSearch }) => {
  return (
    <Box display="flex" alignItems="center" gap={2} mb={2}>
      <TextField variant="outlined" placeholder="Cari barang..." value={value} onChange={onChange} size="small" fullWidth />
      <Button variant="contained" color="primary" onClick={onSearch} size="small">
        Cari
      </Button>
    </Box>
  );
};

export default SearchBar;
