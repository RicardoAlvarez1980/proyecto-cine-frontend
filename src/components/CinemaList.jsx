// src/components/CinemaList.jsx
import React, { useState } from 'react';
import RoomList from './RoomList'; // Importamos el componente para listar salas
import ShowtimeList from './ShowtimeList'; // Importamos ShowtimeList para mostrar horarios y butacas

const CinemaList = ({ cines }) => {
  const [selectedCinema, setSelectedCinema] = useState(null);

  const toggleCinema = (id) => {
    setSelectedCinema(selectedCinema === id ? null : id); // Mostrar/ocultar las salas del cine
  };

  return (
    <ul>
      {cines.map((cine) => (
        <li key={cine._id}>
          <div onClick={() => toggleCinema(cine._id)} style={{ cursor: 'pointer' }}>
            {cine.nombre} - {cine.ubicacion}
          </div>
          
          {/* Si el cine está seleccionado, mostramos las salas */}
          {selectedCinema === cine._id && (
            <RoomList salas={cine.salas} /> // Asumimos que RoomList mostrará las salas
          )}
        </li>
      ))}
    </ul>
  );
};

export default CinemaList;
