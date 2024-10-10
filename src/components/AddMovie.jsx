// src/components/AddMovie.jsx
import React, { useState } from 'react';
import axios from 'axios';

// Componente para agregar una nueva película
function AddMovie({ onAdd }) {
  const [titulo, setTitulo] = useState(''); // Estado para el título de la película
  const [director, setDirector] = useState(''); // Estado para el director
  const [duracion, setDuracion] = useState(''); // Estado para la duración
  const [genero, setGenero] = useState(''); // Estado para el género

  // Función que se ejecuta cuando se envía el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newMovie = { titulo, director, duracion, genero }; // Objeto que contiene la nueva película
      const response = await axios.post('http://localhost:3000/peliculas', newMovie); // Petición POST
      onAdd(response.data); // Llamamos a la función onAdd para actualizar la lista de películas
      setTitulo(''); // Limpiamos el formulario
      setDirector('');
      setDuracion('');
      setGenero('');
    } catch (error) {
      console.error('Error al agregar la película', error); // Manejo de errores
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <h2>Agregar una nueva película</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Título de la película"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Director"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Duración (minutos)"
          value={duracion}
          onChange={(e) => setDuracion(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Género"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Agregar Película</button>
    </form>
  );
}

export default AddMovie;
