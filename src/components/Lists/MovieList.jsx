import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MovieList.css'; // Asegúrate de tener este archivo para los estilos

const MovieList = () => {
  const [movies, setMovies] = useState([]); // Estado para almacenar las películas
  const [posters, setPosters] = useState({}); // Para almacenar los pósters por ID de película 
  const [cinemas, setCinemas] = useState({}); // Para almacenar los nombres de los cines
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const API_KEY = 'a21d39d7f9a02d48415f7e30911bb700'; // Tu API Key

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:3000/peliculas-con-salas-y-horarios');
        setMovies(response.data); // Actualiza el estado con las películas
      } catch (error) {
        console.error('Error al obtener las películas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies(); // Llama a la función para obtener las películas
  }, []);

  useEffect(() => {
    const fetchPosters = async () => {
      const newPosters = {}; // Objeto para almacenar los pósters obtenidos
      for (const movie of movies) {
        if (movie.titulo) {
          try {
            const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
              params: {
                api_key: API_KEY,
                query: movie.titulo,
              },
            });
            const result = response.data.results[0];
            if (result) {
              newPosters[movie._id] = result.poster_path; // Almacena el póster en el objeto
            } else {
              newPosters[movie._id] = null; // Si no se encuentra la película, asigna null
            }
          } catch (error) {
            console.error(`Error al obtener el poster de ${movie.titulo}:`, error);
            newPosters[movie._id] = null; // En caso de error, asigna null
          }
        }
      }
      setPosters(newPosters); // Actualiza el estado con los nuevos pósters
    };

    if (movies.length > 0) {
      fetchPosters(); // Llama a la función para obtener los pósters
    }
  }, [movies]);

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cines');
        const cinemaMap = {};
        response.data.forEach(cinema => {
          cinemaMap[cinema._id] = cinema.nombre; // Crea un mapa de cines con su ID como clave
        });
        setCinemas(cinemaMap); // Actualiza el estado con los nombres de los cines
      } catch (error) {
        console.error('Error al obtener los cines:', error);
      }
    };

    fetchCinemas(); // Llama a la función para obtener los cines
  }, []);

  return (
    <div className="movie-list-container">
      <h2>Películas Disponibles</h2>
      {loading ? (
        <p>Cargando películas...</p>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <div key={movie._id} className="movie-card">
              {posters[movie._id] ? (
                <>
                  <div className="poster-info-container">
                    <div className="poster-container">
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${posters[movie._id]}`}
                        alt={movie.titulo}
                        className="poster-image"
                      />
                    </div>
                    <div className="movie-info">
                      <h4>{movie.titulo}</h4>
                      <p>
                        <strong>Director:</strong>
                        <br />
                        {movie.director}
                      </p>
                      <p>
                        <strong>Duración:</strong>
                        <br />
                        {movie.duracion} minutos
                      </p>
                      <p>
                        <strong>Género:</strong>
                        <br />
                        {movie.genero}
                      </p>
                    </div>
                  </div>
                  <div className="cinema-info">
                    <h4 className="cinema-title">
                      {cinemas[movie.salas[0]?.cine] || 'Cine no disponible'}
                    </h4>
                    <p>
                      <strong>Sala: </strong>
                      {movie.salas[0]?.numero_sala || 'No disponible'}
                    </p>
                    <div className="showtimes-container">
                      {movie.salas[0]?.horarios.map((horario) => (
                        <span key={horario._id} className="showtime-box">{horario.hora}</span>
                      )) || <p>No hay horarios disponibles</p>}
                    </div>
                  </div>
                </>
              ) : (
                !loading && <p>No hay póster disponible</p> // Muestra solo si no hay póster y no está cargando
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;
