import React, { useState } from 'react';
import axios from 'axios';

const CinemaForm = ({ onSuccess }) => {
  const [nombre, setNombre] = useState('');
  const [ubicacion, setUbicacion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/cines', {
        nombre,
        ubicacion,
      });

      console.log('Cine creado:', response.data);

      // Llama a la función onSuccess si está definida
      if (onSuccess) {
        onSuccess(response.data); // Llama a onSuccess con los datos del nuevo cine
      }
    } catch (error) {
      console.error('Error al crear el cine:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input 
          type="text" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Ubicación:</label>
        <input 
          type="text" 
          value={ubicacion} 
          onChange={(e) => setUbicacion(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Crear Cine</button>
    </form>
  );
};

export default CinemaForm;
