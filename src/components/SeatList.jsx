import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SeatList = () => {
  const [showtimes, setShowtimes] = useState([]);

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/funciones-y-butacas');
        setShowtimes(response.data);
      } catch (error) {
        console.error('Error fetching showtimes:', error);
      }
    };

    fetchShowtimes();
  }, []);

  const formatTime = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  return (
    <div>
      <h2>Funciones y Butacas</h2>
      <ul>
        {showtimes.map(showtime => (
          <li key={showtime._id}>
            <strong>Función: {showtime.movie?.title} en {showtime.room?.name} a la hora {formatTime(showtime.time)}</strong>
            <ul>
              {showtime.seats.map(seat => (
                <li key={seat._id}>Butaca: {seat.number}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SeatList;
