import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ShowtimeList.css';

const ShowtimeList = () => {
  const [cines, setCines] = useState([]);
  const [selectedSala, setSelectedSala] = useState(null);
  const [newHorario, setNewHorario] = useState('');
  const [editingHorarioId, setEditingHorarioId] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState(''); // Para mostrar mensajes de éxito/error

  const fetchCines = async () => {
    try {
      const response = await axios.get('http://localhost:3000/cines-con-salas-peliculas-y-horarios');
      setCines(response.data);
    } catch (err) {
      console.error('Error al obtener los cines:', err);
      setError('Error al obtener los datos');
    }
  };

  const handleAddHorarioClick = (salaId) => {
    setSelectedSala(selectedSala === salaId ? null : salaId);
    setNewHorario('');
    setEditingHorarioId(null);
    setMessage(''); // Limpiar mensaje
  };

  const handleNewHorarioChange = (e) => {
    setNewHorario(e.target.value);
  };

  const handleSaveHorario = async (salaId) => {
    if (!newHorario) {
      alert('Por favor, ingresa un horario válido.');
      return;
    }

    try {
      await axios.post('http://localhost:3000/horarios', {
        sala: salaId,
        hora: newHorario,
      });

      setNewHorario('');
      setSelectedSala(null);
      await fetchCines();
      setMessage('Horario agregado exitosamente.');
    } catch (error) {
      console.error('Error al guardar el horario:', error);
      alert('Ocurrió un error al guardar el horario.');
    }
  };

  const handleEditHorarioClick = (horarioId, hora) => {
    setEditingHorarioId(horarioId);
    setNewHorario(hora); // Cargar la hora en el input para edición
  };

  const handleUpdateHorario = async (horarioId) => {
    if (!newHorario) {
      alert('Por favor, ingresa un horario válido.');
      return;
    }

    try {
      await axios.put(`http://localhost:3000/horarios/${horarioId}`, {
        hora: newHorario,
      });

      setNewHorario('');
      setEditingHorarioId(null);
      await fetchCines();
      setMessage('Horario actualizado exitosamente.');
    } catch (error) {
      console.error('Error al actualizar el horario:', error);
      alert('Ocurrió un error al actualizar el horario.');
    }
  };

  const handleDeleteHorario = async (horarioId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este horario?')) {
      try {
        const horario = await axios.get(`http://localhost:3000/horarios/${horarioId}`);
        await axios.delete(`http://localhost:3000/horarios/${horarioId}`);
        await fetchCines();
        setMessage(`Horario de ${horario.data.hora} eliminado exitosamente.`);
      } catch (error) {
        console.error('Error al eliminar el horario:', error);
        alert('Ocurrió un error al eliminar el horario.');
      }
    }
  };

  useEffect(() => {
    fetchCines();
  }, []);

  return (
    <div className="sala-list-container">
      <h1>Lista de Horarios</h1>

      {error && <p className="text-danger">{error}</p>}
      {message && <p className="text-success">{message}</p>} {/* Mensaje de éxito/error */}

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
                    sala.horarios.map(horario => (
                      <div key={horario._id} className="horario-box">
                        {editingHorarioId === horario._id ? (
                          <div>
                            <input
                              type="text"
                              value={newHorario}
                              onChange={handleNewHorarioChange}
                              placeholder="Ej. 14:00"
                              className="form-control"
                            />
                            <button
                              className="btn btn-success"
                              onClick={() => handleUpdateHorario(horario._id)}
                            >
                              Guardar
                            </button>
                            <button
                              className="btn btn-secondary"
                              onClick={() => setEditingHorarioId(null)}
                            >
                              Cancelar
                            </button>
                          </div>
                        ) : (
                          <div>
                            {horario.hora}
                            <button
                              className="btn btn-warning ml-2"
                              onClick={() => handleEditHorarioClick(horario._id, horario.hora)}
                            >
                              Editar
                            </button>
                            <button
                              className="btn btn-danger ml-2"
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
                    className="btn btn-primary"
                    onClick={() => handleAddHorarioClick(sala._id)}
                  >
                    {selectedSala === sala._id ? 'Cancelar' : 'Agregar Horario'}
                  </button>
                </div>

                {selectedSala === sala._id && (
                  <div className="add-horario-form mt-3">
                    <input
                      type="text"
                      value={newHorario}
                      onChange={handleNewHorarioChange}
                      placeholder="Ej. 14:00"
                      className="form-control"
                    />
                    <button
                      className="btn btn-success mt-2"
                      onClick={() => handleSaveHorario(sala._id)}
                    >
                      Guardar Horario
                    </button>
                    <button
                      className="btn btn-secondary mt-2"
                      onClick={() => setSelectedSala(null)}
                    >
                      Cancelar
                    </button>
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
