import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RoomList.css'; // Asegúrate de tener este archivo CSS

const RoomList = ({ cineId, onBack }) => {
  const [salas, setSalas] = useState([]);
  const [cineNombre, setCineNombre] = useState('');
  const [posters, setPosters] = useState({});
  const [selectedRoom, setSelectedRoom] = useState(null); // Estado para la sala seleccionada

  useEffect(() => {
    // Obtener el nombre del cine
    axios.get(`http://localhost:3000/cines/${cineId}`)
      .then(response => {
        setCineNombre(response.data.nombre);
      })
      .catch(error => {
        console.error('Error al obtener el cine:', error);
      });

    // Obtener las salas del cine
    axios.get('http://localhost:3000/salas')
      .then(response => {
        const salasDelCine = response.data.filter(sala => sala.cine === cineId);
        setSalas(salasDelCine);

        // Obtener posters para cada película de las salas
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
        params: {
          api_key: API_KEY,
          query: titulo,
        },
      });
      const movie = response.data.results[0];
      if (movie) {
        setPosters(prevPosters => ({
          ...prevPosters,
          [titulo]: movie.poster_path,
        }));
      } else {
        console.log(`No se encontró película para: ${titulo}`);
      }
    } catch (error) {
      console.error('Error al obtener el poster de la película:', error);
    }
  };

  const handleRoomSelect = (sala) => {
    setSelectedRoom(sala); // Al seleccionar una sala, actualiza el estado
  };

  return (
    <div className="room-list-container">
      <h2 className="cine-title">CINE: {cineNombre}</h2>

      {/* Botones para seleccionar las salas */}
      <div className="room-buttons">
        {salas.map(sala => (
          <button
            key={sala._id}
            onClick={() => handleRoomSelect(sala)}
            className="room-button"
          >
            Sala {sala.numero_sala}
          </button>
        ))}
      </div>

      {/* Mostrar detalles solo de la sala seleccionada */}
      {selectedRoom ? (
        <div className="card">
          <h3>Sala Número {selectedRoom.numero_sala}</h3>
          <div className="movie-details">
            {posters[selectedRoom.pelicula.titulo] && (
              <img
                src={`https://image.tmdb.org/t/p/w500/${posters[selectedRoom.pelicula.titulo]}`}
                alt={selectedRoom.pelicula.titulo}
                className="movie-poster"
              />
            )}
            <div>
              <p><strong>Película:</strong> {selectedRoom.pelicula.titulo}</p>
              <p><strong>Género:</strong> {selectedRoom.pelicula.genero}</p>
              <p><strong>Director:</strong> {selectedRoom.pelicula.director}</p>
              <p><strong>Duración:</strong> {selectedRoom.pelicula.duracion} minutos</p>
            </div>
          </div>
          <p><strong>Horarios:</strong></p>
          <div className="horarios-container">
            {selectedRoom.horarios.map((horario) => (
              <button key={horario._id} className="horario-button">{horario.hora}</button>
            ))}
          </div>
      
          {/* Botón para volver a la lista de cines */}
          <button onClick={onBack} className="back-button">Volver a la lista de cines</button>
        </div>      
      ) : (
        <p>Seleccione una sala para ver los detalles.</p>
      )}
    </div>
  );
};

export default RoomList;
