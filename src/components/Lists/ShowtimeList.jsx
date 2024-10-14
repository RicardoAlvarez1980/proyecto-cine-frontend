import React from 'react';
import './ShowtimeList.css';

const ShowtimeList = ({ showtimes, onEditShowtime, onDeleteShowtime }) => {
  return (
    <div className="showtime-list">
      <h2>Listado de Horarios</h2>
      {showtimes.length > 0 ? (
        <table className="table-showtimes">
          <thead>
            <tr>
              <th>Hora</th>
              <th>Número de Sala</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {showtimes.map((showtime) => (
              <tr key={showtime._id}>
                <td>{showtime.time}</td>
                <td>{showtime.numero_sala}</td> {/* Muestra el número de sala */}
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => onEditShowtime(showtime)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => onDeleteShowtime(showtime._id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay horarios disponibles para esta sala.</p>
      )}
    </div>
  );
};

export default ShowtimeList;
