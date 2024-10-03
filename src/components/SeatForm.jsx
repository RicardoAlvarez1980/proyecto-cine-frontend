// forms/SeatForm.js
import React, { useState } from 'react';
import axios from 'axios';

const SeatForm = () => {
  const [showtimeId, setShowtimeId] = useState('');
  const [seatCount, setSeatCount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/butacas', { showtimeId, seatCount });
      console.log('Seats added:', response.data);
    } catch (error) {
      console.error('Error adding seats:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Butacas</h2>
      <label>
        Horario ID:
        <input type="text" value={showtimeId} onChange={(e) => setShowtimeId(e.target.value)} />
      </label>
      <br />
      <label>
        Cantidad de Butacas:
        <input type="number" value={seatCount} onChange={(e) => setSeatCount(e.target.value)} />
      </label>
      <br />
      <button type="submit">Guardar</button>
    </form>
  );
};

export default SeatForm;
