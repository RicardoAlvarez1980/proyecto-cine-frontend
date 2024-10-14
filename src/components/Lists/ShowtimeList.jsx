import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowtimeList = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPeliculas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/peliculas-con-salas-y-horarios');
        console.log('Datos recibidos del backend:', response.data); // Log para depuración
        setPeliculas(response.data);
      } catch (err) {
        console.error('Error al obtener las películas:', err);
        setError('Error al cargar las películas');
      } finally {
        setLoading(false);
      }
    };

    fetchPeliculas();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Películas y Salas</h2>
      {peliculas.length > 0 ? (
        peliculas.map((pelicula) => (
          <div key={pelicula._id}>
            <h3>{pelicula.titulo}</h3>
            <p>Director: {pelicula.director}</p>
            <p>Duración: {pelicula.duracion} minutos</p>
            <p>Género: {pelicula.genero}</p>
            <h4>Salas:</h4>
            {pelicula.salas.length > 0 ? (
              <ul>
                {pelicula.salas.map((sala) => (
                  <li key={sala._id}>
                    Sala {sala.numero_sala}
                    <h5>Horarios:</h5>
                    {sala.horarios.length > 0 ? (
                      <ul>
                        {sala.horarios.map((horario) => (
                          <li key={horario._id}>{horario.hora}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>No hay horarios disponibles.</p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay salas disponibles.</p>
            )}
          </div>
        ))
      ) : (
        <p>No hay películas disponibles.</p>
      )}
    </div>
  );
};

export default ShowtimeList;
