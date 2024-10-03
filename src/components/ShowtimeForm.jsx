import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoomForm = () => {
  const [name, setName] = useState('');
  const [cinemaId, setCinemaId] = useState('');
  const [movieId, setMovieId] = useState('');
  const [seats, setSeats] = useState([]);  // Asientos seleccionados
  const [showtimeId, setShowtimeId] = useState('');  // Horario seleccionado
  const [cinemas, setCinemas] = useState([]);  // Lista de cines
  const [movies, setMovies] = useState([]);  // Lista de películas
  const [availableSeats, setAvailableSeats] = useState([]);  // Lista de asientos disponibles
  const [availableShowtimes, setAvailableShowtimes] = useState([]);  // Lista de horarios disponibles

  useEffect(() => {
    // Obtener lista de cines
    axios.get('http://localhost:3000/cines')
      .then((response) => setCinemas(response.data))
      .catch((error) => console.error('Error fetching cinemas:', error));

    // Obtener lista de películas
    axios.get('http://localhost:3000/peliculas')
      .then((response) => setMovies(response.data))
      .catch((error) => console.error('Error fetching movies:', error));

    // Obtener lista de asientos
    axios.get('http://localhost:3000/butacas')
      .then((response) => setAvailableSeats(response.data))
      .catch((error) => console.error('Error fetching seats:', error));

    // Obtener lista de horarios
    axios.get('http://localhost:3000/funciones')
      .then((response) => setAvailableShowtimes(response.data))
      .catch((error) => console.error('Error fetching showtimes:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const roomData = {
      name,
      cinema: cinemaId,
      movie: movieId,
      seats,
      showtime: showtimeId  // Ahora solo enviamos un horario seleccionado
    };
    
    try {
      const response = await axios.post('http://localhost:3000/salas', roomData);
      console.log('Room added:', response.data);
    } catch (error) {
      console.error('Error adding room:', error.response?.data || error);
    }
  };

  const handleSeatChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSeats([...seats, value]);
    } else {
      setSeats(seats.filter((seat) => seat !== value));
    }
  };

  return (
    <div>
      <h2>Crear Sala</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de la Sala:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Cine:</label>
          <select
            value={cinemaId}
            onChange={(e) => setCinemaId(e.target.value)}
            required
          >
            <option value="">Seleccionar Cine</option>
            {cinemas.map((cinema) => (
              <option key={cinema._id} value={cinema._id}>
                {cinema.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Película:</label>
          <select
            value={movieId}
            onChange={(e) => setMovieId(e.target.value)}
            required
          >
            <option value="">Seleccionar Película</option>
            {movies.map((movie) => (
              <option key={movie._id} value={movie._id}>
                {movie.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Asientos:</label>
          <div>
            {availableSeats.map((seat) => (
              <label key={seat._id}>
                <input
                  type="checkbox"
                  value={seat._id}
                  onChange={handleSeatChange}
                />
                {seat.number} {/* o el formato que prefieras para mostrar los asientos */}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label>Horarios:</label>
          <select
            value={showtimeId}
            onChange={(e) => setShowtimeId(e.target.value)}
            required
          >
            <option value="">Seleccionar Horario</option>
            {availableShowtimes.map((showtime) => (
              <option key={showtime._id} value={showtime._id}>
                {`Película: ${showtime.movie.title}, Sala: ${showtime.room.name}, Hora: ${new Date(showtime.time).toLocaleString()}`}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Agregar Sala</button>
      </form>
    </div>
  );
};

export default RoomForm;
