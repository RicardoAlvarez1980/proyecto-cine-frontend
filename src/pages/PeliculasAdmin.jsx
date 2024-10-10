// src/pages/PeliculasAdmin.jsx
import React from 'react';

function PeliculasAdmin({ pelicula }) {
  return (
    <div>
      <h4>{pelicula.titulo}</h4>
      <p>Director: {pelicula.director}</p>
      <p>Duración: {pelicula.duracion} min</p>
      <p>Género: {pelicula.genero}</p>
    </div>
  );
}

export default PeliculasAdmin;
