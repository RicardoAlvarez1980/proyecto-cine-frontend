// src/components/MovieList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ShowtimeList from './ShowtimeList';

const MovieList = ({ salaId }) => {
  const [pelicula, setPelicula] = useState(null);

  useEffect(() => {
    // Obtener la película de la sala seleccionada
    axios.get(`http://localhost:3000/salas/${salaId}/pelicula`)
      .then(response => {
        setPelicula(response.data);
      })
      .catch(error => {
        console.error('Error al obtener la película:', error);
      });
  }, [salaId]);

  return (
    <div>
      <h4>Película en la Sala</h4>
      {pelicula ? (
        <div>
          <p>Título: {pelicula.titulo}</p>
          <p>Director: {pelicula.director}</p>
          <p>Duración: {pelicula.duracion} minutos</p>
          <p>Género: {pelicula.genero}</p>
          <ShowtimeList peliculaId={pelicula._id} />
        </div>
      ) : (
        <p>No hay película asignada a esta sala.</p>
      )}
    </div>
  );
};

export default MovieList;
