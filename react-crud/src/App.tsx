import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AdminApp } from './admin/AdminApp';
import { MainApp } from './main/MainApp';

function App() {
  const linkStyle = {"margin": "30px 0"}
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/admin/products" element={<AdminApp/>}/>
          <Route path="/main/data" element={<MainApp/>}/>
        </Routes>
      </BrowserRouter>
      <div style={linkStyle}>
        <a href="/admin/products">Products</a>
      </div>
      <div style={linkStyle}>
        <a href="/main/data">Main (Flask)</a>
      </div>
    </div>
  );
}

export default App;
