// src/components/CineForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const CineForm = () => {
  const [nombre, setNombre] = useState('');
  const [ubicacion, setUbicacion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/cines', { nombre, ubicacion });
      console.log('Cine agregado:', response.data);
      setNombre('');
      setUbicacion('');
    } catch (error) {
      console.error('Error al agregar cine:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Agregar Nuevo Cine</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre del Cine</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ubicacion">Ubicación</label>
          <input
            type="text"
            className="form-control"
            id="ubicacion"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Agregar Cine</button>
      </form>
    </div>
  );
};

export default CineForm;
