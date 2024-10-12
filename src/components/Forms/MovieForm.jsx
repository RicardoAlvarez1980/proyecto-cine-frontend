// src/components/Forms/MovieForm.jsx
import React, { useState } from 'react';

const MovieForm = () => {
  const [titulo, setTitulo] = useState('');
  const [director, setDirector] = useState('');
  const [duracion, setDuracion] = useState('');
  const [genero, setGenero] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Manejar el envío del formulario
  };

  return (
    <div className="container mt-5">
      <h2>Agregar Película</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">Título</label>
          <input 
            type="text" 
            className="form-control" 
            id="titulo" 
            value={titulo} 
            onChange={(e) => setTitulo(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="director" className="form-label">Director</label>
          <input 
            type="text" 
            className="form-control" 
            id="director" 
            value={director} 
            onChange={(e) => setDirector(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="duracion" className="form-label">Duración (minutos)</label>
          <input 
            type="number" 
            className="form-control" 
            id="duracion" 
            value={duracion} 
            onChange={(e) => setDuracion(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="genero" className="form-label">Género</label>
          <input 
            type="text" 
            className="form-control" 
            id="genero" 
            value={genero} 
            onChange={(e) => setGenero(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">Agregar Película</button>
      </form>
    </div>
  );
};

export default MovieForm;
