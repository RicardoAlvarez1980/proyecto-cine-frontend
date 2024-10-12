// src/pages/Home.jsx
import React from 'react';
import CinemaList from './components/CineList';

const App = () => {
  return (
    <div>
      <h1 className="cinema-list-title">Administración de Cines</h1>
      <CinemaList />
    </div>
  );
};

export default App;