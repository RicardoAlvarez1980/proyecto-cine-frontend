import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:3000/peliculas');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h2>Películas</h2>
      <ul>
        {movies.map(movie => (
          <li key={movie._id}>{movie.title} - {movie.genre}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
