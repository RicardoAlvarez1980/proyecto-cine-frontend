import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CinemaSelector = () => {
  const [cines, setCines] = useState([]);
  const [salas, setSalas] = useState([]);
  const [peliculas, setPeliculas] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [selectedCine, setSelectedCine] = useState('');
  const [selectedSala, setSelectedSala] = useState('');
  const [selectedPelicula, setSelectedPelicula] = useState('');
  const [selectedHorario, setSelectedHorario] = useState('');

  useEffect(() => {
    // Cargar la lista de cines
    const fetchCines = async () => {
      const response = await axios.get('http://localhost:3000/cines');
      setCines(response.data);
    };
    fetchCines();
  }, []);

  const handleCineChange = (event) => {
    const cineId = event.target.value;
    setSelectedCine(cineId);
    // Cargar salas para el cine seleccionado
    const cine = cines.find(c => c._id === cineId);
    setSalas(cine ? cine.salas : []);
    setSelectedSala('');
    setPeliculas([]);
    setHorarios([]);
  };

  const handleSalaChange = (event) => {
    const salaId = event.target.value;
    setSelectedSala(salaId);
    // Cargar película para la sala seleccionada
    const sala = salas.find(s => s.numero_sala === salaId);
    setPeliculas(sala ? sala.pelicula : []);
    setSelectedPelicula('');
    setHorarios([]);
  };

  const handlePeliculaChange = (event) => {
    const peliculaId = event.target.value;
    setSelectedPelicula(peliculaId);
    // Cargar horarios para la película seleccionada
    const sala = salas.find(s => s.numero_sala === selectedSala);
    const pelicula = sala.pelicula.find(p => p.titulo === peliculaId);
    setHorarios(pelicula ? pelicula.horarios : []);
    setSelectedHorario('');
  };

  const handleHorarioChange = (event) => {
    setSelectedHorario(event.target.value);
  };

  return (
    <div>
      <h1>Seleccionar Cine</h1>
      <div>
        <label>Lista de Cines:</label>
        <select value={selectedCine} onChange={handleCineChange}>
          <option value="">Seleccionar Cine</option>
          {cines.map(cine => (
            <option key={cine._id} value={cine._id}>
              {cine.nombre}
            </option>
          ))}
        </select>
      </div>

      {salas.length > 0 && (
        <div>
          <label>Lista de Salas:</label>
          <select value={selectedSala} onChange={handleSalaChange}>
            <option value="">Seleccionar Sala</option>
            {salas.map(sala => (
              <option key={sala.numero_sala} value={sala.numero_sala}>
                Sala {sala.numero_sala}
              </option>
            ))}
          </select>
        </div>
      )}

      {peliculas.length > 0 && (
        <div>
          <label>Películas:</label>
          <select value={selectedPelicula} onChange={handlePeliculaChange}>
            <option value="">Seleccionar Película</option>
            {peliculas.map(pelicula => (
              <option key={pelicula.titulo} value={pelicula.titulo}>
                {pelicula.titulo}
              </option>
            ))}
          </select>
        </div>
      )}

      {horarios.length > 0 && (
        <div>
          <label>Horarios:</label>
          <select value={selectedHorario} onChange={handleHorarioChange}>
            <option value="">Seleccionar Horario</option>
            {horarios.map(horario => (
              <option key={horario} value={horario}>
                {horario}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedHorario && <div>Mostrar butacas disponibles aquí...</div>}
    </div>
  );
};

export default CinemaSelector;
