import React, { useState } from 'react';
import axios from 'axios';

const CinemaForm = ({ onCinemaCreated }) => {
  const [nombre, setNombre] = useState('');
  const [ubicacion, setUbicacion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCinema = { nombre, ubicacion };
      const response = await axios.post('http://localhost:3000/cines', newCinema);
      onCinemaCreated(response.data);
      setNombre('');
      setUbicacion('');
    } catch (error) {
      console.error('Error creating cinema:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre del Cine"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Ubicación"
        value={ubicacion}
        onChange={(e) => setUbicacion(e.target.value)}
        required
      />
      <button type="submit">Crear Cine</button>
    </form>
  );
};

export default CinemaForm;
