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
  const [selectedSalaId, setSelectedSalaId] = useState(null);
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState('');

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
        const response = await axios.get('http://localhost:3000/peliculas');
        setMovies(response.data);
      } catch (error) {
        console.error('Error al obtener las películas:', error);
      }
    };

    fetchSalas();
    fetchCines();
    fetchMovies();
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

    salas.forEach(sala => {
      const cineInfo = getCineInfo(sala.cine);
      if (!groupedSalas[cineInfo]) {
        groupedSalas[cineInfo] = [];
      }
      groupedSalas[cineInfo].push(sala);
    });

    const sortedCines = Object.keys(groupedSalas).sort().map(cineInfo => {
      const sortedSalas = groupedSalas[cineInfo].sort((a, b) => a.numero_sala - b.numero_sala);
      return { cineInfo, sortedSalas };
    });

    return sortedCines;
  };

  const getCineInfo = (cineId) => {
    const cine = cines.find(c => c._id === cineId);
    return cine ? `${cine.nombre} (${cine.ubicacion})` : 'Cine no encontrado';
  };

  const isNumeroSalaDuplicado = (numeroSala) => {
    return salas.some(sala => Number(sala.numero_sala) === Number(numeroSala) && sala.cine === newSala.cine);
  };

  const handleAddOrUpdateSala = async () => {
    const numeroSala = Number(newSala.numero_sala);
    const butacas = Number(newSala.butacas);

    if (!numeroSala || !butacas || !newSala.cine) {
      setErrorMessage('Por favor, completa todos los campos.');
      return;
    }

    if (butacas <= 0) {
      setErrorMessage('La cantidad de butacas debe ser un número positivo.');
      return;
    }

    if (isNumeroSalaDuplicado(numeroSala)) {
      setErrorMessage('El número de sala ya existe en este cine.');
      return;
    }

    try {
      if (editingSalaId) {
        await axios.put(`http://localhost:3000/salas/${editingSalaId}`, { ...newSala, numero_sala: numeroSala, butacas });
        setEditingSalaId(null);
      } else {
        await axios.post('http://localhost:3000/salas', { ...newSala, numero_sala: numeroSala, butacas });
      }
      setNewSala({ numero_sala: '', butacas: '', cine: '' });
      await fetchSalas();
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
      await fetchSalas();
    } catch (error) {
      console.error('Error al eliminar la sala:', error);
    }
  };

  const handleCancel = () => {
    setNewSala({ numero_sala: '', butacas: '', cine: '' });
    setEditingSalaId(null);
    setErrorMessage('');
    setSelectedSalaId(null);
    setSelectedMovieId('');
  };

  const handleAddMovie = (salaId) => {
    setSelectedSalaId(salaId);
    setSelectedMovieId('');
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

      // Actualiza la lista de salas después de agregar la película
      await fetchSalas();

      setSelectedSalaId(null);
      setSelectedMovieId('');
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
          className="form-input custom-select"
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
      </div>

      {errorMessage && <p style={{ color: '#F4D35E', fontWeight: 'bold' }}>{errorMessage}</p>}

      {selectedSalaId === null ? (
        <div className="sala-grid">
          {groupAndSortSalas().map(({ cineInfo, sortedSalas }) => (
            <div key={cineInfo} className="cine-group">
              <h3>{cineInfo}</h3>
              {sortedSalas.map(sala => (
                <div key={sala._id} className="sala-card">
                  <div className="sala-info">
                    <h4>Sala {sala.numero_sala}</h4>
                    <p>Butacas: {sala.butacas}</p>
                    {sala.pelicula && (
                      <div className="pelicula-info">
                        <br></br>
                        <h5>{sala.pelicula.titulo}</h5>
                        
                      </div>
                    )}
                  </div>
                  <div className="sala-actions">
                    <button className="btn btn-warning" onClick={() => handleEditSala(sala)}>
                      Editar
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDeleteSala(sala._id)}>
                      Eliminar
                    </button>
                    <button className="btn btn-primary" onClick={() => handleAddMovie(sala._id)}>
                      Agregar Película
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="movie-selection">
          <h3>Agregar película a la sala</h3>
          <select value={selectedMovieId} onChange={(e) => setSelectedMovieId(e.target.value)}>
            <option value="">Seleccione una película</option>
            {movies.map(movie => (
              <option key={movie._id} value={movie._id}>{movie.titulo}</option>
            ))}
          </select>
          <button className="btn btn-success" onClick={handleAddMovieToSala}>Agregar</button>
          <button className="btn btn-secondary" onClick={() => setSelectedSalaId(null)}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default SalaList;
