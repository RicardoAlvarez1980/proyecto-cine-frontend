import React from 'react';

const ShowtimeList = ({ showtimes, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Listado de Horarios</h2>
      <table>
        <thead>
          <tr>
            <th>Hora</th>
            <th>ID de Sala</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {showtimes.map((showtime) => (
            <tr key={showtime._id}>
              <td>{showtime.time}</td>
              <td>{showtime.roomId}</td>
              <td>
                <button onClick={() => onEdit(showtime)}>Editar</button>
                <button onClick={() => onDelete(showtime._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowtimeList;
