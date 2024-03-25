import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './navigation';
import QRGenerator from './qrgenerator';
import QRValidator from './qrvalidator';
import Admin from './admin';

import './qrvalidator.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigation />} />
        <Route path="/navigation" element={<Navigation />} />
        <Route path="/qrgenerator" element={<QRGenerator />} />
        <Route path="/qrvalidator" element={<QRValidator />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default App;
