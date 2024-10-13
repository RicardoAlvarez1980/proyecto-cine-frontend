import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SalaList.css';

const SalaList = () => {
  const navigate = useNavigate();
  const [salas, setSalas] = useState([]);
  const [cines, setCines] = useState([]);
  const [newSala, setNewSala] = useState({ numero_sala: '', butacas: '', cine: '' });
  const [editingSalaId, setEditingSalaId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedSalaId, setSelectedSalaId] = useState(null); // Estado para la sala seleccionada
  const [movies, setMovies] = useState([]); // Estado para las películas disponibles
  const [selectedMovieId, setSelectedMovieId] = useState(''); // Estado para la película seleccionada

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/salas');
        setSalas(response.data);
      } catch (error) {
        console.error('Error al obtener las salas:', error);
      }
    };

    const fetchCines = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cines');
        setCines(response.data);
      } catch (error) {
        console.error('Error al obtener los cines:', error);
      }
    };

    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:3000/peliculas'); // Asegúrate de tener esta ruta
        setMovies(response.data);
      } catch (error) {
        console.error('Error al obtener las películas:', error);
      }
    };

    fetchSalas();
    fetchCines();
    fetchMovies(); // Obtener la lista de películas
  }, []);

  const fetchSalas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/salas');
      setSalas(response.data);
    } catch (error) {
      console.error('Error al obtener las salas:', error);
    }
  };

  const groupAndSortSalas = () => {
    const groupedSalas = {};

    // Agrupar salas por cine
    salas.forEach(sala => {
      const cineInfo = getCineInfo(sala.cine);
      if (!groupedSalas[cineInfo]) {
        groupedSalas[cineInfo] = [];
      }
      groupedSalas[cineInfo].push(sala);
    });

    // Convertir el objeto a un array de entradas y ordenar los cines
    const sortedCines = Object.keys(groupedSalas).sort().map(cineInfo => {
      // Ordenar salas dentro de cada cine
      const sortedSalas = groupedSalas[cineInfo].sort((a, b) => Number(a.numero_sala) - Number(b.numero_sala));
      return { cineInfo, sortedSalas };
    });

    return sortedCines;
  };

  const getCineInfo = (cineId) => {
    const cine = cines.find(c => c._id === cineId);
    return cine ? `${cine.nombre} (${cine.ubicacion})` : 'Cine no encontrado';
  };

  const handleAddOrUpdateSala = async () => {
    if (!newSala.numero_sala || !newSala.butacas || !newSala.cine) {
      setErrorMessage('Por favor, completa todos los campos.');
      return;
    }

    if (newSala.butacas <= 0) {
      setErrorMessage('La cantidad de butacas debe ser un número positivo.');
      return;
    }

    try {
      if (editingSalaId) {
        await axios.put(`http://localhost:3000/salas/${editingSalaId}`, newSala);
        setEditingSalaId(null);
      } else {
        await axios.post('http://localhost:3000/salas', newSala);
      }
      setNewSala({ numero_sala: '', butacas: '', cine: '' });
      await fetchSalas(); // Volver a cargar las salas
      setErrorMessage('');
    } catch (error) {
      console.error('Error al agregar o actualizar la sala:', error);
    }
  };

  const handleEditSala = (sala) => {
    setNewSala({ numero_sala: sala.numero_sala, butacas: sala.butacas, cine: sala.cine });
    setEditingSalaId(sala._id);
    setErrorMessage('');
  };

  const handleDeleteSala = async (salaId) => {
    try {
      await axios.delete(`http://localhost:3000/salas/${salaId}`);
      await fetchSalas(); // Volver a cargar las salas después de eliminar
    } catch (error) {
      console.error('Error al eliminar la sala:', error);
    }
  };

  const handleCancel = () => {
    setNewSala({ numero_sala: '', butacas: '', cine: '' }); // Reiniciar campos
    setEditingSalaId(null); // Salir del modo de edición
    setErrorMessage(''); // Limpiar mensajes de error
    setSelectedSalaId(null); // Reiniciar la sala seleccionada
    setSelectedMovieId(''); // Reiniciar película seleccionada
  };

  const handleAddMovie = (salaId) => {
    setSelectedSalaId(salaId); // Establecer la sala seleccionada
    setSelectedMovieId(''); // Reiniciar película seleccionada
  };

  const handleAddMovieToSala = async () => {
    if (!selectedMovieId) {
      alert('Por favor, selecciona una película.');
      return;
    }

    try {
      console.log(`URL: http://localhost:3000/salas/${selectedSalaId}/pelicula/${selectedMovieId}`);
      const response = await axios.put(`http://localhost:3000/salas/${selectedSalaId}/pelicula/${selectedMovieId}`);
      console.log('Película agregada a la sala:', response.data);
      setSelectedSalaId(null); // Reiniciar la sala seleccionada después de agregar
      setSelectedMovieId(''); // Reiniciar la película seleccionada
    } catch (error) {
      console.error('Error al agregar la película a la sala:', error);
      alert('Error al agregar la película: ' + error.response?.data?.message || 'Error desconocido');
    }
  };
  
  return (
    <div className="sala-list-container">
      <h2 className="sala-list-title">Lista de Salas</h2>

      <div className="add-sala-form">
        <input
          type="text"
          placeholder="Número de sala"
          value={newSala.numero_sala}
          onChange={(e) => setNewSala({ ...newSala, numero_sala: e.target.value })}
          className="form-input"
        />
        <input
          type="number"
          placeholder="Cantidad de butacas"
          value={newSala.butacas}
          onChange={(e) => setNewSala({ ...newSala, butacas: e.target.value })}
          className="form-input"
        />
        <select
          value={newSala.cine}
          onChange={(e) => setNewSala({ ...newSala, cine: e.target.value })}
          className="form-input"
        >
          <option value="">Seleccione un cine</option>
          {cines.map(cine => (
            <option key={cine._id} value={cine._id}>{`${cine.nombre} (${cine.ubicacion})`}</option>
          ))}
        </select>
        <button className="btn btn-success" onClick={handleAddOrUpdateSala}>
          {editingSalaId ? 'Actualizar' : 'Agregar'}
        </button>
        {editingSalaId && (
          <button className="btn btn-primary" onClick={handleCancel}>
            Cancelar
          </button>
        )}
        {errorMessage && <p style={{ color: '#F4D35E' }}>{errorMessage}</p>}
      </div>

      {/* Mostrar solo la sala seleccionada para agregar película */}
      {selectedSalaId === null ? (
        <div className="sala-grid">
          {groupAndSortSalas().map(({ cineInfo, sortedSalas }) => (
            <div key={cineInfo} className="cine-group">
              <h3>{cineInfo}</h3>
              {sortedSalas.map(sala => (
                <div key={sala._id} className="sala-card">
                  <h4>Sala {sala.numero_sala}</h4>
                  <p>Butacas: {sala.butacas}</p>
                  <button className="btn btn-info" onClick={() => handleEditSala(sala)}>
                    Editar
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDeleteSala(sala._id)}>
                    Eliminar
                  </button>
                  <button className="btn btn-warning" onClick={() => handleAddMovie(sala._id)}>
                    Agregar Película
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="add-movie-form">
          <h2>Agregar Película a Sala</h2>
          <select
            value={selectedMovieId}
            onChange={(e) => setSelectedMovieId(e.target.value)}
            className="form-input"
          >
            <option value="">Seleccione una película</option>
            {movies.map(movie => (
              <option key={movie._id} value={movie._id}>{movie.titulo}</option>
            ))}
          </select>
          <button className="btn btn-success" onClick={handleAddMovieToSala}>
            Agregar Película
          </button>
          <button className="btn btn-primary" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};

export default SalaList;
