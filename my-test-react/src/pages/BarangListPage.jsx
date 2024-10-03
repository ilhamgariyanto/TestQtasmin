import React, { useState, useEffect } from 'react';
import Api from '../api/index';
import { useNavigate } from 'react-router-dom';
import BarangListTemplate from '../components/templates/BarangListTemplate';

const BarangListPage = () => {
  const [barang, setBarang] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchBarang();
  }, []);

  const fetchBarang = async () => {
    try {
      const response = await Api.get('/api/barang');
      setBarang(response.data);
    } catch (error) {
      console.error('Error fetching barang:', error);
    }
  };

  const handleSearchChange = (e) => setSearchValue(e.target.value);

  const handleSearch = async () => {
    try {
      const response = await Api.get(`/api/barang?search=${searchValue}`);
      setBarang(response.data);
    } catch (error) {
      console.error('Error searching barang:', error);
    }
  };

  const handleAdd = () => navigate('/barang/new');

  const handleEdit = (id) => navigate(`/barang/${id}`);

  const handleDelete = async (id) => {
    try {
      await Api.delete(`/api/barang/${id}`);
      fetchBarang();
    } catch (error) {
      console.error('Error deleting barang:', error);
    }
  };

  const handleCompare = () => navigate('/compare');

  return <BarangListTemplate barang={barang} searchValue={searchValue} onSearchChange={handleSearchChange} onSearch={handleSearch} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} onCompare={handleCompare} />;
};

export default BarangListPage;
