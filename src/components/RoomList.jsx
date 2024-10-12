import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RoomList.css';

const RoomList = ({ cineId }) => {
  const [salas, setSalas] = useState([]);
  const [cineNombre, setCineNombre] = useState('');
  const [posters, setPosters] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3000/cines/${cineId}`)
      .then(response => {
        setCineNombre(response.data.nombre);
      })
      .catch(error => {
        console.error('Error al obtener el cine:', error);
      });

    axios.get('http://localhost:3000/salas')
      .then(response => {
        const salasDelCine = response.data.filter(sala => sala.cine === cineId);
        setSalas(salasDelCine);
        salasDelCine.forEach(sala => {
          fetchMoviePoster(sala.pelicula.titulo);
        });
      })
      .catch(error => {
        console.error('Error al obtener las salas:', error);
      });
  }, [cineId]);
  
  const API_KEY = 'a21d39d7f9a02d48415f7e30911bb700';
  
  const fetchMoviePoster = async (titulo) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: { api_key: API_KEY, query: titulo },
      });
      const movie = response.data.results[0];
      if (movie) {
        setPosters(prevPosters => ({
          ...prevPosters,
          [titulo]: movie.poster_path,
        }));
      }
    } catch (error) {
      console.error('Error al obtener el poster de la película:', error);
    }
  };

  return (
    <div className="room-list">
      <h2 className="cine-title">CINE: {cineNombre}</h2>
      <div className="cards-container">
        {salas.map(sala => (
          <div key={sala._id} className="card">
            <h3>Sala Número {sala.numero_sala}</h3>
            {posters[sala.pelicula.titulo] && (
              <img
                src={`https://image.tmdb.org/t/p/w500/${posters[sala.pelicula.titulo]}`}
                alt={sala.pelicula.titulo}
                className="movie-poster"
              />
            )}
            <p><strong>Película:</strong> {sala.pelicula.titulo}</p>
            <p><strong>Género:</strong> {sala.pelicula.genero}</p>
            <p><strong>Director:</strong> {sala.pelicula.director}</p>
            <p><strong>Duración:</strong> {sala.pelicula.duracion} minutos</p>
            <p><strong>Horarios:</strong></p>
            <ul>
              {sala.horarios.map((horario) => (
                <li key={horario._id}>{horario.hora}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomList;
