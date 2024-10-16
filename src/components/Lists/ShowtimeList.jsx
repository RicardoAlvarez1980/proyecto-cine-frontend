import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './ShowtimeList.css';

const ShowtimeList = () => {
  const [cines, setCines] = useState([]);
  const [selectedSala, setSelectedSala] = useState(null);
  const [newHorario, setNewHorario] = useState('');
  const [editingHorarioId, setEditingHorarioId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const inputRef = useRef(null);

  const fetchCines = async () => {
    try {
      const response = await axios.get('http://localhost:3000/cines-con-salas-peliculas-y-horarios');
      setCines(response.data);
    } catch (err) {
      console.error('Error al obtener los cines:', err);
      setErrorMessage('Error al obtener los datos');
    }
  };

  const sortHorarios = (horarios) => {
    return horarios.sort((a, b) => a.hora.localeCompare(b.hora));
  };

  const handleAddHorarioClick = (salaId) => {
    setSelectedSala(selectedSala === salaId ? null : salaId);
    setNewHorario('');
    setEditingHorarioId(null);
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleNewHorarioChange = (e) => {
    setNewHorario(e.target.value);
  };

  const handleSaveHorario = async (salaId) => {
    if (!newHorario) {
      setErrorMessage('Por favor, ingresa un horario válido.');
      return;
    }

    try {
      await axios.post('http://localhost:3000/horarios', {
        sala: salaId,
        hora: newHorario,
      });

      await fetchCines();
      setNewHorario('');
      setSelectedSala(null);
      setSuccessMessage('Horario agregado exitosamente.');
    } catch (error) {
      console.error('Error al guardar el horario:', error);
      setErrorMessage('Ocurrió un error al guardar el horario.');
    }
  };

  const handleEditHorarioClick = (horarioId, hora) => {
    setEditingHorarioId(horarioId);
    setNewHorario(hora);
  };

  const handleUpdateHorario = async (horarioId) => {
    if (!newHorario) {
      setErrorMessage('Por favor, ingresa un horario válido.');
      return;
    }

    try {
      await axios.put(`http://localhost:3000/horarios/${horarioId}`, {
        hora: newHorario,
      });

      setNewHorario('');
      setEditingHorarioId(null);
      await fetchCines();
      setSuccessMessage('Horario actualizado exitosamente.');
    } catch (error) {
      console.error('Error al actualizar el horario:', error);
      setErrorMessage('Ocurrió un error al actualizar el horario.');
    }
  };

  const handleDeleteHorario = async (horarioId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este horario?')) {
      try {
        await axios.delete(`http://localhost:3000/horarios/${horarioId}`);
        await fetchCines();
        setSuccessMessage('Horario eliminado exitosamente.');
      } catch (error) {
        console.error('Error al eliminar el horario:', error);
        setErrorMessage('Ocurrió un error al eliminar el horario.');
      }
    }
  };

  useEffect(() => {
    fetchCines();
  }, []);

  useEffect(() => {
    if (selectedSala !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedSala]);

  return (
    <div className="sala-list-container">
      <h2>Lista de Horarios</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}

      {cines.map(cine => (
        <div key={cine._id} className="cine-container">
          <h2 className="cine-name">{cine.nombre} ({cine.ubicacion})</h2>
          <div className="cine-section">
            {cine.salas.map(sala => (
              <div key={sala._id} className="sala-row">
                <div className="sala-info">
                  <span className="sala-number">Sala: {sala.numero_sala}</span>
                  <span className="pelicula-title">{sala.pelicula?.titulo || 'Película no disponible'}</span>
                </div>

                <div className="horarios-container">
                  {sala.horarios.length > 0 ? (
                    sortHorarios(sala.horarios).map(horario => (
                      <div key={horario._id} className="horario-box">
                        {editingHorarioId === horario._id ? (
                          <div>
                            <input
                              type="text"
                              value={newHorario}
                              onChange={handleNewHorarioChange}
                              placeholder="Ej. 14:00"
                              className="input-horario"
                              ref={inputRef}
                            />
                            <button
                              className="btn btn-success font-weight-bold"
                              onClick={() => handleUpdateHorario(horario._id)}
                            >
                              Guardar
                            </button>
                            <button
                              className="btn btn-secondary font-weight-bold"
                              onClick={() => setEditingHorarioId(null)}
                            >
                              Cancelar
                            </button>
                          </div>
                        ) : (
                          <div>
                            {horario.hora}
                            <button
                              className="btn btn-warning font-weight-bold ml-2"
                              onClick={() => handleEditHorarioClick(horario._id, horario.hora)}
                            >
                              Editar
                            </button>
                            <button
                              className="btn btn-danger font-weight-bold ml-2"
                              onClick={() => handleDeleteHorario(horario._id)}
                            >
                              Eliminar
                            </button>
                          </div>
                        )} 
                      </div>
                    ))
                  ) : (
                    <p>No hay horarios disponibles</p>
                  )}
                </div>

                <div className="button-container mt-3">
                  <button
                    className="btn btn-primary font-weight-bold"
                    onClick={() => handleAddHorarioClick(sala._id)}
                  >
                    {selectedSala === sala._id ? 'Cancelar' : 'Agregar'}
                  </button>
                </div>

                {selectedSala === sala._id && (
                  <div className="add-horario-form mt-3">
                    <div className="horario-input-container">
                      <input
                        type="text"
                        value={newHorario}
                        onChange={handleNewHorarioChange}
                        placeholder="Ej. 14:00"
                        className="input-horario"
                        ref={inputRef}
                      />
                      <button
                        className="btn btn-success mt-2 font-weight-bold"
                        onClick={() => handleSaveHorario(sala._id)}
                      >
                        Guardar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowtimeList;
