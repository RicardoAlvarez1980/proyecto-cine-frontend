// src/components/Forms/ShowtimeForm.jsx
import React, { useState } from 'react';

const ShowtimeForm = () => {
  const [horario, setHorario] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Manejar el envío del formulario
  };

  return (
    <div className="container mt-5">
      <h2>Agregar Horario</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="horario" className="form-label">Horario (formato 24h)</label>
          <input 
            type="text" 
            className="form-control" 
            id="horario" 
            value={horario} 
            onChange={(e) => setHorario(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">Agregar Horario</button>
      </form>
    </div>
  );
};

export default ShowtimeForm;
