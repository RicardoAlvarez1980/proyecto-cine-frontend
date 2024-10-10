// src/components/MovieList.jsx
import React, { useState } from 'react';
import ShowtimeList from './ShowtimeList'; // Importamos el componente para listar horarios

const MovieList = ({ pelicula, horarios }) => {
  const [showtimesVisible, setShowtimesVisible] = useState(false);

  return (
    <div style={{ paddingLeft: '40px' }}>
      <div onClick={() => setShowtimesVisible(!showtimesVisible)} style={{ cursor: 'pointer' }}>
        Película: {pelicula.titulo} ({pelicula.duracion} minutos) - Dirigida por {pelicula.director}
      </div>

      {/* Si los horarios están visibles, los mostramos */}
      {showtimesVisible && <ShowtimeList horarios={horarios} />}
    </div>
  );
};

export default MovieList;
