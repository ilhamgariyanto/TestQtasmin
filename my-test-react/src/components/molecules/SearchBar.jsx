import React from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const SearchBar = ({ value, onChange, onSearch }) => (
  <div style={{ display: 'flex', gap: '1rem' }}>
    <Input placeholder="Cari barang..." value={value} onChange={onChange} />
    <Button onClick={onSearch}>Cari</Button>
  </div>
);

export default SearchBar;
