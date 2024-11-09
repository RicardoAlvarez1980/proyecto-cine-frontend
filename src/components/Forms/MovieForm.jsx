// src/components/Forms/MovieForm.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieForm = ({ onSuccess }) => {
  const [cines, setCines] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [director, setDirector] = useState('');
  const [duracion, setDuracion] = useState('');
  const [genero, setGenero] = useState('');
  const [cineId, setCineId] = useState('');

  useEffect(() => {
    // Obtener la lista de cines disponibles
    const fetchCines = async () => {
      try {
        const response = await axios.get('https://proyecto-cine-backend.onrender.com/cines');
        setCines(response.data);
      } catch (error) {
        console.error('Error al obtener los cines:', error);
      }
    };

    fetchCines();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://proyecto-cine-backend.onrender.com/peliculas', {
        titulo,
        director,
        duracion,
        genero,
        cine: cineId,
      });

      console.log('Película creada:', response.data);
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (error) {
      console.error('Error al crear la película:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Cine:</label>
        <select 
          value={cineId} 
          onChange={(e) => setCineId(e.target.value)} 
          required
        >
          <option value="">Seleccione un cine</option>
          {cines.map((cine) => (
            <option key={cine._id} value={cine._id}>
              {cine.nombre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Título:</label>
        <input 
          type="text" 
          value={titulo} 
          onChange={(e) => setTitulo(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Director:</label>
        <input 
          type="text" 
          value={director} 
          onChange={(e) => setDirector(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Duración (minutos):</label>
        <input 
          type="number" 
          value={duracion} 
          onChange={(e) => setDuracion(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Género:</label>
        <input 
          type="text" 
          value={genero} 
          onChange={(e) => setGenero(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Crear Película</button>
    </form>
  );
};

export default MovieForm;
