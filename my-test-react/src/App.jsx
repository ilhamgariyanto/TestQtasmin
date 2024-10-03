import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import BarangListPage from './pages/BarangListPage';
import FormTambahBarang from './pages/FormTambahBarang';
import FormEditBarang from './pages/FormEditBarang';
// import ComparePage from './pages/ComparePage';
import ComparePage from './pages/ComparePage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<BarangListPage />} />
          <Route path="/barang/new" element={<FormTambahBarang />} />
          <Route path="/barang/:id" element={<FormEditBarang />} />
          <Route path="/compare" element={<ComparePage />} />
          {/* <Route path="/compare" element={<ComparePage />} /> */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
