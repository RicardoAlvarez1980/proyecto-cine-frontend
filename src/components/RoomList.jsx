import React, { useState } from 'react';
import axios from 'axios';
import ShowtimeList from './ShowtimeList'; // Importamos el componente para mostrar horarios y butacas

const API_KEY = 'a21d39d7f9a02d48415f7e30911bb700'; // Reemplaza con tu API Key de TMDb

const RoomList = ({ salas, onAddRoom }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [peliculaDetalles, setPeliculaDetalles] = useState({}); // Para almacenar detalles de la película
  const [loading, setLoading] = useState(false); // Para mostrar un estado de carga

  const toggleRoom = (numeroSala) => {
    if (selectedRoom === numeroSala) {
      setSelectedRoom(null); // Ocultar sala
      setPeliculaDetalles({}); // Limpiar detalles de la película
    } else {
      setSelectedRoom(numeroSala); // Mostrar sala
      fetchMovieDetails(salas.find(sala => sala.numero_sala === numeroSala).pelicula.titulo); // Obtener detalles de la película
    }
  };

  const fetchMovieDetails = async (titulo) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${titulo}`);
      if (response.data.results.length > 0) {
        setPeliculaDetalles(response.data.results[0]); // Guardamos los detalles de la película
      } else {
        setPeliculaDetalles({}); // No se encontraron resultados
      }
    } catch (error) {
      console.error('Error al obtener detalles de la película:', error);
      setPeliculaDetalles({}); // Resetear en caso de error
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {salas.map((sala) => (
        <div key={sala.numero_sala} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <h3 onClick={() => toggleRoom(sala.numero_sala)} style={{ cursor: 'pointer' }}>
            Sala {sala.numero_sala}
          </h3>
          {selectedRoom === sala.numero_sala && (
            <>
              <div style={{ flex: 1 }}>
                <ShowtimeList horarios={sala.horarios} butacas={sala.butacas} />
              </div>
              <div style={{
                flex: '0 0 auto',
                padding: '10px',
                border: '2px solid #333',
                borderRadius: '5px',
                maxHeight: '700px',
                minWidth: '200px',
                marginLeft: '10px',
                marginTop: '0px',
                maxWidth: '300px',
                boxSizing: 'border-box',
              }}>
                <h4>Detalles de la película</h4>
                {loading ? ( // Mostrar estado de carga
                  <p>Cargando detalles...</p>
                ) : (
                  <>
                    {peliculaDetalles.poster_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${peliculaDetalles.poster_path}`}
                        alt={peliculaDetalles.title}
                        style={{ width: '100%', height: 'auto', borderRadius: '5px', marginBottom: '10px' }}
                      />
                    )}
                    <p><strong>Título:</strong> {peliculaDetalles.title || sala.pelicula.titulo}</p>
                    <p><strong>Director:</strong> {sala.pelicula.director}</p>
                    <p><strong>Duración:</strong> {sala.pelicula.duracion} minutos</p>
                    <p><strong>Género:</strong> {sala.pelicula.genero}</p>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default RoomList;
