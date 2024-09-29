import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SeatList = () => {
  const [showtimes, setShowtimes] = useState([]);

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/funciones');
        setShowtimes(response.data);
      } catch (error) {
        console.error('Error fetching showtimes:', error);
      }
    };

    fetchShowtimes();
  }, []);

  const formatTime = (isoDate) => {
    const date = new Date(isoDate);
    const localDate = new Date(date.getTime() + (3 * 60 * 60 * 1000)); // Resta 3 horas para UTC-3
    return localDate.toLocaleTimeString('es-AR', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false,
      timeZone: 'America/Argentina/Buenos_Aires' 
    });
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
