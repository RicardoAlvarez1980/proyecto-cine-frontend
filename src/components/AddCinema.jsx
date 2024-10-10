import React, { useState } from 'react';
import axios from 'axios';

// Componente para agregar un nuevo cine
function AddCinema({ onAdd }) {
  const [nombre, setNombre] = useState(''); // Estado para el nombre del cine
  const [ubicacion, setUbicacion] = useState(''); // Estado para la ubicación

  // Función que se ejecuta cuando se envía el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    try {
      const newCinema = { nombre, ubicacion }; // Objeto que contiene el nuevo cine
      const response = await axios.post('http://localhost:3000/cines', newCinema); // Petición POST
      onAdd(response.data); // Llamamos a la función onAdd para actualizar la lista de cines
      setNombre(''); // Limpiamos el formulario
      setUbicacion('');
    } catch (error) {
      console.error('Error al agregar el cine', error); // Manejo de errores
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <h2>Agregar un nuevo cine</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nombre del cine"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)} // Actualiza el valor del estado
          required // Agrega la validación de campo requerido
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Ubicación del cine"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)} // Actualiza el valor del estado
          required // Agrega la validación de campo requerido
        />
      </div>
      <button type="submit" className="btn btn-primary">Agregar Cine</button>
    </form>
  );
}

export default AddCinema;
