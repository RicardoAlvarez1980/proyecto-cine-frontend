import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MovieDetails.css';

const MovieDetails = ({ pelicula }) => {
  const [poster, setPoster] = useState('');
  const API_KEY = 'a21d39d7f9a02d48415f7e30911bb700';

  useEffect(() => {
    if (pelicula && pelicula.titulo) {
      fetchMoviePoster(pelicula.titulo);
    }
  }, [pelicula]);

  const fetchMoviePoster = async (titulo) => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: API_KEY,
          query: titulo,
        },
      });
      const movie = response.data.results[0];
      if (movie) {
        setPoster(movie.poster_path);
      } else {
        console.log(`No se encontró película para: ${titulo}`);
      }
    } catch (error) {
      console.error('Error al obtener el póster de la película:', error);
    }
  };

  // Verificar si la película está disponible
  if (!pelicula) {
    return (
      <div className="no-movie">
        <p>Esta sala no tiene películas disponibles</p>
      </div>
    );
  }

  return (
    <div className="movie-details">
      {poster && (
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster}`}
          alt={pelicula.titulo}
          className="movie-poster"
        />
      )}
      <div>
        <p><strong>Película:</strong> {pelicula.titulo}</p>
        <p><strong>Género:</strong> {pelicula.genero}</p>
        <p><strong>Director:</strong> {pelicula.director}</p>
        <p><strong>Duración:</strong> {pelicula.duracion} minutos</p>
      </div>
    </div>
  );
};

export default MovieDetails;
