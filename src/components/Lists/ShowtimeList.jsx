import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowtimeList = () => {
  const [horarios, setHorarios] = useState([]);
  const [cines, setCines] = useState({});
  const [peliculas, setPeliculas] = useState({});
  const [error, setError] = useState('');

  // Función para obtener horarios
  const fetchHorarios = async () => {
    try {
      const response = await axios.get('http://localhost:3000/horarios');
      setHorarios(response.data);
      // Llama a las funciones para obtener cine y película después de obtener horarios
      await fetchCines(response.data);
      await fetchPeliculas(response.data);
    } catch (err) {
      console.error('Error al obtener los horarios:', err);
      setError('Error al obtener los horarios');
    }
  };

  // Función para obtener detalles del cine
  const fetchCines = async (horariosData) => {
    const cineIds = [...new Set(horariosData.map(h => h.sala.cine))];
    const cinePromises = cineIds.map(id => axios.get(`http://localhost:3000/cines/${id}`));
    const responses = await Promise.all(cinePromises);
    const cinesData = {};
    responses.forEach(response => {
      cinesData[response.data._id] = response.data;
    });
    setCines(cinesData);
  };

  // Función para obtener detalles de la película
  const fetchPeliculas = async (horariosData) => {
    const peliculaIds = [...new Set(horariosData.map(h => h.sala.pelicula))];
    const peliculaPromises = peliculaIds.map(id => axios.get(`http://localhost:3000/peliculas/${id}`));
    const responses = await Promise.all(peliculaPromises);
    const peliculasData = {};
    responses.forEach(response => {
      peliculasData[response.data._id] = response.data;
    });
    setPeliculas(peliculasData);
  };

  useEffect(() => {
    fetchHorarios();
  }, []);

  return (
    <div>
      <h2>Lista de Horarios</h2>
      {error && <p>{error}</p>}
      {horarios.map((horario) => (
        <div key={horario._id}>
          <h3>
            Cine: {cines[horario.sala.cine]?.nombre || 'Cine no disponible'} 
            ({cines[horario.sala.cine]?.ubicacion || 'Ubicación no disponible'})
          </h3>
          <h4>Sala {horario.sala.numero_sala || 'Número no disponible'}</h4>
          <p>Película: {peliculas[horario.sala.pelicula]?.titulo || 'Película no disponible'}</p>
          <p>Director: {peliculas[horario.sala.pelicula]?.director || 'Director no disponible'}</p>
          <p>Butacas disponibles: {horario.sala.butacas || 'Información no disponible'}</p>
          <h5>Horario: {horario.hora}</h5>
        </div>
      ))}
      <h3>Agregar Nuevo Horario</h3>
      <form>
        <input type="text" placeholder="Ingrese la hora (ej. 16:00)" />
        <input type="text" placeholder="Ingrese el ID de la sala" />
        <button type="submit">Agregar Horario</button>
      </form>
    </div>
  );
};

export default ShowtimeList;
