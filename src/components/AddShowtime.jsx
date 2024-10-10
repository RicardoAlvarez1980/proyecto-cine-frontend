// src/components/AddShowtime.jsx
import React, { useState } from 'react';
import axios from 'axios';

// Componente para agregar un nuevo horario
function AddShowtime({ onAdd }) {
  const [hora, setHora] = useState(''); // Estado para la hora
  const [salaId, setSalaId] = useState(''); // Estado para el ID de la sala

  // Función que se ejecuta cuando se envía el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newShowtime = { hora, salaId }; // Objeto que contiene el nuevo horario
      const response = await axios.post('http://localhost:3000/horarios', newShowtime); // Petición POST
      onAdd(response.data); // Llamamos a la función onAdd para actualizar la lista de horarios
      setHora(''); // Limpiamos el formulario
      setSalaId('');
    } catch (error) {
      console.error('Error al agregar el horario', error); // Manejo de errores
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <h2>Agregar un nuevo horario</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Hora (ej. 16:00)"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="ID de la sala"
          value={salaId}
          onChange={(e) => setSalaId(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Agregar Horario</button>
    </form>
  );
}

export default AddShowtime;
