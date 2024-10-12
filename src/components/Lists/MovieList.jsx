import React, { useState } from 'react';

const ShowtimeForm = ({ showtime, onSubmit, roomId }) => {
  const [time, setTime] = useState(showtime ? showtime.time : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ time, roomId });
    // Reset form or redirect after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{showtime ? 'Editar Horario' : 'Agregar Horario'}</h2>
      <div>
        <label>Hora (formato 24h, ej: 16:00):</label>
        <input
          type="text"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>
      <button type="submit">{showtime ? 'Actualizar' : 'Agregar'}</button>
    </form>
  );
};

export default ShowtimeForm;
