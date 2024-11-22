import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../components/Lists/MovieList.jsx';
import './Lists/MovieDetails.css';

const MovieContainer = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('https://proyecto-cine-backend.onrender.com/peliculas')  // Cambia esta URL a la de tu API
      .then(response => {
        setMovies(response.data);  // Asegúrate de que tu backend devuelve un array de películas
    })
      .catch(error => {
        console.error('Error al obtener las películas:', error);
      });
  }, []);

  return <MovieList movies={movies} />;
};

export default MovieContainer;
