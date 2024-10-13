import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MovieList.css'; // Asegúrate de tener este archivo para los estilos

const MovieList = () => {
  const [movies, setMovies] = useState([]); // Estado para almacenar las películas
  const [posters, setPosters] = useState({}); // Para almacenar los pósters por ID de película 
  const [cinemas, setCinemas] = useState({}); // Para almacenar los nombres de los cines
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [selectedMovie, setSelectedMovie] = useState(null); // Estado para la película seleccionada
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [newMovie, setNewMovie] = useState({ titulo: '', director: '', duracion: '', genero: '' }); // Estado para nueva película
  const API_KEY = 'a21d39d7f9a02d48415f7e30911bb700'; // Tu API Key
  const [showForm, setShowForm] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null); // Para almacenar la sala seleccionada

  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:3000/peliculas-con-salas-y-horarios');
        setMovies(response.data); // Actualiza el estado con las películas
      } catch (error) {
        console.error('Error al obtener las películas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies(); // Llama a la función para obtener las películas
  }, []);

  useEffect(() => {
    const fetchPosters = async () => {
      const newPosters = {}; // Objeto para almacenar los pósters obtenidos
      for (const movie of movies) {
        if (movie.titulo) {
          try {
            const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
              params: {
                api_key: API_KEY,
                query: movie.titulo,
              },
            });
            const result = response.data.results[0];
            if (result) {
              newPosters[movie._id] = result.poster_path; // Almacena el póster en el objeto
            } else {
              newPosters[movie._id] = null; // Si no se encuentra la película, asigna null
            }
          } catch (error) {
            console.error(`Error al obtener el poster de ${movie.titulo}:`, error);
            newPosters[movie._id] = null; // En caso de error, asigna null
          }
        }
      }
      setPosters(newPosters); // Actualiza el estado con los nuevos pósters
    };

    if (movies.length > 0) {
      fetchPosters(); // Llama a la función para obtener los pósters
    }
  }, [movies]);

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cines');
        const cinemaMap = {};
        response.data.forEach(cinema => {
          cinemaMap[cinema._id] = cinema.nombre; // Crea un mapa de cines con su ID como clave
        });
        setCinemas(cinemaMap); // Actualiza el estado con los nombres de los cines
      } catch (error) {
        console.error('Error al obtener los cines:', error);
      }
    };

    fetchCinemas(); // Llama a la función para obtener los cines
  }, []);

  const handleAddMovieToRoom = (roomId) => {
    setSelectedRoomId(roomId); // Guardar la sala seleccionada
    setNewMovie({ titulo: '', director: '', duracion: '', genero: '' }); // Reiniciar el formulario
    setShowForm(true); // Mostrar el formulario
  };
  
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleAddClick = () => {
    // Limpiar la película seleccionada y mostrar el formulario
    setSelectedMovie(null);
    setNewMovie({ titulo: '', director: '', duracion: '', genero: '' });
    setShowForm(true); // Mostrar el formulario de agregar
  };

  const handleEditClick = (movie) => {
    setSelectedMovie(movie);
    setNewMovie(movie); // Copiar los datos al formulario para editar
    setShowForm(true); // Mostrar el formulario
  };

  const handleDeleteClick = (movieId) => {
    axios.delete(`http://localhost:3000/peliculas/${movieId}`)
      .then(() => {
        // Actualizar la lista después de eliminar
        setMovies(movies.filter(movie => movie._id !== movieId));
      })
      .catch((error) => {
        console.error('Error al eliminar la película:', error);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (selectedMovie) {
      // Editar película existente
      axios.put(`http://localhost:3000/peliculas/${selectedMovie._id}`, newMovie)
        .then(() => {
          // Actualizar la lista de películas
          const updatedMovies = movies.map(movie =>
            movie._id === selectedMovie._id ? { ...movie, ...newMovie } : movie
          );
          setMovies(updatedMovies);
          setShowForm(false); // Ocultar formulario después de guardar
        })
        .catch((error) => {
          console.error('Error al actualizar la película:', error);
        });
    } else {
     // Agregar nueva película
     axios.post('http://localhost:3000/peliculas', { ...newMovie, salaId: selectedRoomId }) // Enviar salaId al backend
     .then((response) => {
       setMovies([...movies, response.data]);
       setShowForm(false);
       setSelectedRoomId(null); // Reiniciar sala seleccionada
     })
     .catch((error) => {
       console.error('Error al agregar la película:', error);
     });
 }
};

  const handleCancel = () => {
    setShowForm(false); // Cancelar edición/agregar
  };

  // Filtrar las películas según el término de búsqueda
  const filteredMovies = movies.filter(movie =>
    movie.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="movie-list-container">
      <h2>Películas Disponibles</h2>
      <div className="search-container">
        <div className="search-add-container">
          <input
            className="search-input"
            type="text"
            placeholder="Buscar película"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {!showForm && (
            <button className="btn btn-success" onClick={() => handleAddMovieToRoom(selectedRoomId)}>
            Nueva
          </button>
          )}
        </div>
      </div>
      {loading ? (
        <p>Cargando películas...</p>
      ) : (
        <div className="movie-grid">
          {showForm && (
            <form onSubmit={handleFormSubmit} className="movie-edit-form">
              <h3>{selectedMovie ? 'Editar' : 'Agregar  '}</h3>
              <label>
                Título:
                <input
                  type="text"
                  name="titulo"
                  value={newMovie.titulo}
                  onChange={(e) => setNewMovie({ ...newMovie, titulo: e.target.value })}
                  required
                />
              </label>
              <label>
                Director:
                <input
                  type="text"
                  name="director"
                  value={newMovie.director}
                  onChange={(e) => setNewMovie({ ...newMovie, director: e.target.value })}
                  required
                />
              </label>
              <label>
                Duración (minutos):
                <input
                  type="number"
                  name="duracion"
                  value={newMovie.duracion}
                  onChange={(e) => setNewMovie({ ...newMovie, duracion: e.target.value })}
                  required
                />
              </label>
              <label>
                Género:
                <input
                  type="text"
                  name="genero"
                  value={newMovie.genero}
                  onChange={(e) => setNewMovie({ ...newMovie, genero: e.target.value })}
                  required
                />
              </label>
              <button className="btn btn-success" type="submit">Guardar Cambios</button>
              <button className="btn btn-primary" type="button" onClick={handleCancel}>Cancelar</button>
            </form>
          )}
          {!showForm && filteredMovies.map((movie) => (
            <div key={movie._id} className="movie-card" onClick={() => handleEditClick(movie)}>
              {posters[movie._id] ? (
                <>
                  <div className="poster-info-container">
                    <div className="poster-container">
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${posters[movie._id]}`}
                        alt={movie.titulo}
                        className="poster-image"
                      />
                    </div>
                    <div className="movie-info">
                      <h4>{movie.titulo}</h4>
                      <p>
                        <strong>Director:</strong>
                        <br />
                        {movie.director}
                      </p>
                      <p>
                        <strong>Duración:</strong>
                        <br />
                        {movie.duracion} min
                      </p>
                      <p>
                        <strong>Género:</strong>
                        <br />
                        {movie.genero}
                      </p>
                    </div>
                  </div>
                  <button className="btn btn-danger" onClick={(e) => { e.stopPropagation(); handleDeleteClick(movie._id); }}>
                    Eliminar
                  </button>
                </>
              ) : (
                <div>
                  <h4>{movie.titulo}</h4>
                  <p>No se encontró póster</p>
                  <button className="btn btn-danger" onClick={(e) => { e.stopPropagation(); handleDeleteClick(movie._id); }}>
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;
