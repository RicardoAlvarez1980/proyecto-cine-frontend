import React, { useState } from 'react';
import ShowtimeList from './ShowtimeList'; // Importamos el componente para mostrar horarios y butacas

const RoomList = ({ salas }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const toggleRoom = (numeroSala) => {
    setSelectedRoom(selectedRoom === numeroSala ? null : numeroSala); // Mostrar/ocultar horarios de la sala
  };

  return (
    <div>
      {salas.map((sala) => (
        <div key={sala.numero_sala}>
          <h3 onClick={() => toggleRoom(sala.numero_sala)} style={{ cursor: 'pointer' }}>
            Sala {sala.numero_sala}
          </h3>
          {selectedRoom === sala.numero_sala && (
            <div>
              <h4>{sala.pelicula.titulo}</h4> {/* Mostrar el título de la película */}
              <ShowtimeList horarios={sala.horarios} butacas={sala.butacas} /> {/* Pasamos los horarios y butacas a ShowtimeList */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RoomList;
