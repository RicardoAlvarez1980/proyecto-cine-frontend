import React, { useState } from 'react';
import axios from 'axios';

const RoomForm = ({ cinemaId, onRoomAdded }) => {
  const [numero_sala, setNumeroSala] = useState('');
  const [butacas, setButacas] = useState(100);
  const [pelicula, setPelicula] = useState({
    titulo: '',
    director: '',
    duracion: '',
    genero: ''
  });
  const [horarios, setHorarios] = useState(['']);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newRoom = { numero_sala, butacas, pelicula, horarios };
      const response = await axios.post(`http://localhost:3000/cines/${cinemaId}/salas`, newRoom);
      onRoomAdded(response.data);
      setNumeroSala('');
      setButacas(100);
      setPelicula({ titulo: '', director: '', duracion: '', genero: '' });
      setHorarios(['']);
    } catch (error) {
      console.error('Error adding room:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Número de Sala"
        value={numero_sala}
        onChange={(e) => setNumeroSala(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Cantidad de Butacas"
        value={butacas}
        onChange={(e) => setButacas(e.target.value)}
      />
      <input
        type="text"
        placeholder="Título de la Película"
        value={pelicula.titulo}
        onChange={(e) => setPelicula({ ...pelicula, titulo: e.target.value })}
        required
      />
      {/* Inputs para director, duracion, genero */}
      <button type="submit">Agregar Sala</button>
    </form>
  );
};

export default RoomForm;
