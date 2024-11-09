import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Seats from '../Seats';
import MovieDetails from './MovieDetails.jsx'; // Importar el nuevo componente
import './RoomList.css'; // Asegúrate de tener la hoja de estilos importada

const RoomList = ({ cineId, onBack }) => {
  const [salas, setSalas] = useState([]);
  const [cineNombre, setCineNombre] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [seatSelections, setSeatSelections] = useState({}); // Estado para las butacas por horario

  useEffect(() => {
    // Obtener el nombre del cine
    const fetchCine = async () => {
      try {
        const response = await axios.get(`https://proyecto-cine-backend.onrender.com/cines/${cineId}`);
        setCineNombre(response.data.nombre);
      } catch (error) {
        console.error('Error al obtener el cine:', error);
      }
    };

    // Obtener las salas del cine
    const fetchSalas = async () => {
      try {
        const response = await axios.get('https://proyecto-cine-backend.onrender.com/salas');
        const salasDelCine = response.data.filter(sala => sala.cine === cineId);
        setSalas(salasDelCine);
      } catch (error) {
        console.error('Error al obtener las salas:', error);
      }
    };

    fetchCine();
    fetchSalas();
  }, [cineId]);

  const handleRoomSelect = (sala) => {
    setSelectedRoom(sala);
    setSelectedShowtime(null); // Resetea el horario seleccionado
  };

  const handleShowtimeSelect = (horario) => {
    setSelectedShowtime(horario); // Guarda el horario seleccionado
  };

  // Manejar la selección de butacas para un horario específico
  const handleSeatSelect = (seatLabel) => {
    setSeatSelections((prevSelections) => {
      const currentSelections = prevSelections[selectedShowtime._id] || [];
      const isSelected = currentSelections.includes(seatLabel);

      const updatedSelections = isSelected
        ? currentSelections.filter(seat => seat !== seatLabel) // Deseleccionar butaca
        : [...currentSelections, seatLabel]; // Seleccionar butaca

      return {
        ...prevSelections,
        [selectedShowtime._id]: updatedSelections, // Actualizar solo el horario actual
      };
    });
  };

  return (
    <div className="room-list-container">
      <h2 className="cine-title">{cineNombre}</h2>

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
          <h3>Sala {selectedRoom.numero_sala}</h3>

          {/* Mostrar el componente MovieDetails */}
          <MovieDetails pelicula={selectedRoom.pelicula} />

          <p><strong>Horarios:</strong></p>
          <div className="horarios-container">
            {selectedRoom.horarios.map((horario) => (
              <button
                key={horario._id}
                className="horario-button"
                onClick={() => handleShowtimeSelect(horario)} // Selecciona el horario
              >
                {horario.hora}
              </button>
            ))}
          </div>

          {/* Botón para volver a la lista de cines */}
          <button onClick={onBack} className="back-button">Volver a la lista de cines</button>
        </div>
      ) : (
        <p>Seleccione una sala para ver los detalles.</p>
      )}

      {/* Mostrar el componente de butacas si hay un horario seleccionado */}
      {selectedShowtime && selectedRoom && (
        <div className="card" style={{ marginLeft: '20px', transition: 'margin-left 0.3s ease' }}>
          <Seats
            totalSeats={selectedRoom.butacas} // Pasar el total de butacas
            selectedSeats={seatSelections[selectedShowtime._id] || []} // Pasar las butacas seleccionadas
            onSeatSelect={handleSeatSelect} // Pasar la función para seleccionar butacas
          />
        </div>
      )}
    </div>
  );
};

export default RoomList;
