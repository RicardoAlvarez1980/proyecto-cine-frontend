// src/components/ShowtimeList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowtimeList = ({ peliculaId }) => {
  const [horarios, setHorarios] = useState([]);

  useEffect(() => {
    // Obtener los horarios de la película
    axios.get(`http://localhost:3000/peliculas/${peliculaId}/horarios`)
      .then(response => {
        setHorarios(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los horarios:', error);
      });
  }, [peliculaId]);

  return (
    <div>
      <h5>Horarios Disponibles</h5>
      <ul>
        {horarios.map(horario => (
          <li key={horario._id}>
            {horario.hora} - Cine: {horario.cineNombre}, Sala: {horario.salaNumero}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowtimeList;
