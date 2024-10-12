// src/components/Forms/RoomForm.jsx
import React, { useState } from 'react';

const RoomForm = () => {
  const [numeroSala, setNumeroSala] = useState('');
  const [cineId, setCineId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Manejar el envío del formulario
  };

  return (
    <div className="container mt-5">
      <h2>Agregar Sala</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="numeroSala" className="form-label">Número de Sala</label>
          <input 
            type="text" 
            className="form-control" 
            id="numeroSala" 
            value={numeroSala} 
            onChange={(e) => setNumeroSala(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cineId" className="form-label">Cine</label>
          <input 
            type="text" 
            className="form-control" 
            id="cineId" 
            value={cineId} 
            onChange={(e) => setCineId(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">Agregar Sala</button>
      </form>
    </div>
  );
};

export default RoomForm;
