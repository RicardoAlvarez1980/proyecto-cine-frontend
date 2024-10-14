import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ShowtimeList.css'; // Asegúrate de tener este archivo para la estilización

const ShowtimeList = () => {
  const [showtimes, setShowtimes] = useState([]);
  const [selectedSala, setSelectedSala] = useState(null); // Sala seleccionada para agregar horario
  const [newHorario, setNewHorario] = useState(''); // Nuevo horario a agregar

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/peliculas-con-salas-y-horarios');
        setShowtimes(response.data);
      } catch (error) {
        console.error("Error fetching showtimes:", error);
      }
    };

    fetchShowtimes();
  }, []);

  // Función para manejar clic en "Agregar Horario"
  const handleAddHorarioClick = (salaId) => {
    if (selectedSala === salaId) {
      setSelectedSala(null); // Si ya está seleccionada, ocultar el formulario
    } else {
      setSelectedSala(salaId); // Mostrar el formulario para esta sala
    }
  };

  // Función para manejar el cambio en el input de nuevo horario
  const handleNewHorarioChange = (e) => {
    setNewHorario(e.target.value);
  };

  // Función para manejar la acción de guardar el nuevo horario
  const handleSaveHorario = async (salaId) => {
    if (!newHorario) {
      alert('Por favor, ingresa un horario válido.');
      return;
    }

    try {
      // Petición POST al backend para agregar el nuevo horario
      const response = await axios.post('http://localhost:3000/horarios', {
        sala: salaId,
        hora: newHorario,
      });

      console.log('Horario agregado:', response.data);

      // Limpiar estado
      setNewHorario('');
      setSelectedSala(null);

      // Actualizar los horarios en el frontend (recarga los datos o actualiza el estado)
      const updatedResponse = await axios.get('http://localhost:3000/peliculas-con-salas-y-horarios');
      setShowtimes(updatedResponse.data);
    } catch (error) {
      console.error("Error saving horario:", error);
      alert('Ocurrió un error al guardar el horario.');
    }
  };

  return (
    <div className="sala-list-container"> {/* Contenedor principal */}
      <h1>Lista de Horarios</h1>

      {showtimes.map(movie => (
        movie.salas.map(sala => (
          sala.cine ? (
            <div key={sala._id} className="sala-details"> {/* Detalles de sala */}
              <h2 className="cine-name">{sala.cine.nombre} - {sala.cine.ubicacion}</h2>
              <button 
                className="btn btn-primary add-horario-button" // Clase de Bootstrap para el botón
                onClick={() => handleAddHorarioClick(sala._id)} // Llamar a la función al hacer clic
              >
                Agregar Horario
              </button>
              <div className="pelicula-info">
                <h2 className="pelicula-title">{movie.titulo} <span className="sala-number">(Sala {sala.numero_sala})</span></h2>
              </div>
              <h4 className="horarios-title">Horarios</h4>
              <div className="horarios-container"> {/* Contenedor para los horarios */}
                {sala.horarios.length > 0 ? (
                  sala.horarios.map(horario => (
                    <div key={horario._id} className="horario-item"> {/* Horario individual */}
                      <p>{horario.hora}</p>
                    </div>
                  ))
                ) : (
                  <p className="no-horarios">No hay horarios disponibles</p> // Texto en blanco
                )}
              </div>

              {/* Mostrar el formulario solo si la sala es la seleccionada */}
              {selectedSala === sala._id && (
                <div className="add-horario-form">
                  <h3>Agregar nuevo horario</h3>
                  <input 
                    type="text" 
                    value={newHorario} 
                    onChange={handleNewHorarioChange} 
                    placeholder="Ej. 14:00" 
                    className="form-control" 
                  />
                  <button 
                    className="btn btn-success" 
                    onClick={() => handleSaveHorario(sala._id)}
                  >
                    Guardar Horario
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p>Cine no disponible</p> // Mensaje para indicar que el cine no está disponible
          )
        ))
      ))}
    </div>
  );
};

export default ShowtimeList;
