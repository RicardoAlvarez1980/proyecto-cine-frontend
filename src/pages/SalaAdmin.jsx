// src/pages/SalaAdmin.jsx
import React from 'react';
import HorarioAdmin from './HorarioAdmin.jsx'; // Importamos el componente HorarioAdmin para manejar los horarios

function SalaAdmin({ sala }) {
  return (
    <div>
      <h3>Sala {sala.numero_sala}</h3>
      <p>Película: {sala.pelicula.titulo} (Dirigida por: {sala.pelicula.director})</p>
      <p>Género: {sala.pelicula.genero}, Duración: {sala.pelicula.duracion} min</p>
      <p>Cantidad de Butacas: {sala.butacas}</p>
      <h4>Horarios</h4>
      {sala.horarios.map((horario, index) => (
        <HorarioAdmin key={index} horario={horario} />
      ))}
    </div>
  );
}

export default SalaAdmin;
