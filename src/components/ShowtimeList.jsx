import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowtimeList = () => {
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
      <h2>Funciones</h2>
      <ul>
        {showtimes.map(showtime => (
          <li key={showtime._id}>
            Película: {showtime.movie.title}, Sala: {showtime.room.name}, Horario: {formatTime(showtime.time)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowtimeList;
