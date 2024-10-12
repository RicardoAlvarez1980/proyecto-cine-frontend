// src/components/CinemaList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RoomList from './RoomList';

const CinemaList = () => {
  const [cines, setCines] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);

  useEffect(() => {
    // Obtener la lista de cines desde el backend
    axios.get('http://localhost:3000/cines')
      .then(response => {
        setCines(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los cines:', error);
      });
  }, []);

  const handleCinemaClick = (cine) => {
    setSelectedCinema(cine);
  };

  return (
    <div>
      <h2>Lista de Cines</h2>
      <ul>
        {cines.map(cine => (
          <li key={cine._id} onClick={() => handleCinemaClick(cine)}>
            {cine.nombre} - {cine.ubicacion}
          </li>
        ))}
      </ul>
      {selectedCinema && <RoomList cineId={selectedCinema._id} />}
    </div>
  );
};

export default CinemaList;
