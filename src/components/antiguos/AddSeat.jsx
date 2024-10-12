// src/components/AddSeat.jsx
import React, { useState } from 'react';
import axios from 'axios';

// Componente para agregar butacas
function AddSeat({ onAdd }) {
  const [cantidad, setCantidad] = useState(''); // Estado para la cantidad de butacas
  const [salaId, setSalaId] = useState(''); // Estado para el ID de la sala

  // Función que se ejecuta cuando se envía el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newSeats = { cantidad, salaId }; // Objeto que contiene la cantidad de butacas
      const response = await axios.post('http://localhost:3000/butacas', newSeats); // Petición POST
      onAdd(response.data); // Llamamos a la función onAdd para actualizar la lista de butacas
      setCantidad(''); // Limpiamos el formulario
      setSalaId('');
    } catch (error) {
      console.error('Error al agregar las butacas', error); // Manejo de errores
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <h2>Agregar butacas</h2>
      <div className="mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="Cantidad de butacas"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
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
      <button type="submit" className="btn btn-primary">Agregar Butacas</button>
    </form>
  );
}

export default AddSeat;
