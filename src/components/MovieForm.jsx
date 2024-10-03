// forms/MovieForm.js
import React, { useState } from 'react';
import axios from 'axios';

const MovieForm = () => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/peliculas', { title, duration });
      console.log('Movie added:', response.data);
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Película</h2>
      <label>
        Título:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <br />
      <label>
        Duración (minutos):
        <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
      </label>
      <br />
      <button type="submit">Guardar</button>
    </form>
  );
};

export default MovieForm;
