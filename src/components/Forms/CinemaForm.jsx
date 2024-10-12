// src/components/Forms/CinemaForm.jsx
import React, { useState } from 'react';

const CinemaForm = () => {
  const [nombre, setNombre] = useState('');
  const [ubicacion, setUbicacion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Manejar el envío del formulario
  };

  return (
    <div className="container mt-5">
      <h2>Agregar Cine</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre del Cine</label>
          <input 
            type="text" 
            className="form-control" 
            id="nombre" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ubicacion" className="form-label">Ubicación</label>
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

export default CinemaForm;
