// src/components/AddRoom.jsx
import React, { useState } from 'react';
import axios from 'axios';

// Componente para agregar una nueva sala
function AddRoom({ onAdd }) {
  const [numeroSala, setNumeroSala] = useState(''); // Estado para el número de sala
  const [cineId, setCineId] = useState(''); // Estado para el ID del cine

  // Función que se ejecuta cuando se envía el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newRoom = { numeroSala, cineId }; // Objeto que contiene la nueva sala
      const response = await axios.post('http://localhost:3000/salas', newRoom); // Petición POST
      onAdd(response.data); // Llamamos a la función onAdd para actualizar la lista de salas
      setNumeroSala(''); // Limpiamos el formulario
      setCineId('');
    } catch (error) {
      console.error('Error al agregar la sala', error); // Manejo de errores
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <h2>Agregar una nueva sala</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Número de sala"
          value={numeroSala}
          onChange={(e) => setNumeroSala(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="ID del cine"
          value={cineId}
          onChange={(e) => setCineId(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Agregar Sala</button>
    </form>
  );
}

export default AddRoom;
