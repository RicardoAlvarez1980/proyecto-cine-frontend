import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdmMovieList.css'; // Asegúrate de tener este archivo para los estilos

const AdminMovieList = () => {
  const [movies, setMovies] = useState([]); // Estado para almacenar las películas
  const [newMovie, setNewMovie] = useState({ titulo: '', director: '', duracion: '', genero: '' }); // Estado para nueva película
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:3000/peliculas');
        setMovies(response.data); // Actualiza el estado con las películas
      } catch (error) {
        console.error('Error al obtener las películas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies(); // Llama a la función para obtener las películas
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({ ...newMovie, [name]: value }); // Actualiza el estado de la nueva película
  };

  const handleAddMovie = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    try {
      const response = await axios.post('http://localhost:3000/peliculas', newMovie);
      setMovies([...movies, response.data]); // Añadir la nueva película a la lista
      setNewMovie({ titulo: '', director: '', duracion: '', genero: '' }); // Reiniciar el formulario
    } catch (error) {
      console.error('Error al agregar la película:', error);
    }
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      await axios.delete(`http://localhost:3000/peliculas/${movieId}`);
      setMovies(movies.filter(movie => movie._id !== movieId)); // Eliminar la película de la lista
    } catch (error) {
      console.error('Error al eliminar la película:', error);
    }
  };

  return (
    <div className="movie-list-container">
      <h2>Administrar Películas</h2>
      {loading ? (
        <p>Cargando películas...</p>
      ) : (
        <div>
          <form onSubmit={handleAddMovie} className="add-movie-form">
            <input 
              type="text" 
              name="titulo" 
              placeholder="Título" 
              value={newMovie.titulo} 
              onChange={handleChange} 
              required 
            />
            <input 
              type="text" 
              name="director" 
              placeholder="Director" 
              value={newMovie.director} 
              onChange={handleChange} 
              required 
            />
            <input 
              type="number" 
              name="duracion" 
              placeholder="Duración (min)" 
              value={newMovie.duracion} 
              onChange={handleChange} 
              required 
            />
            <input 
              type="text" 
              name="genero" 
              placeholder="Género" 
              value={newMovie.genero} 
              onChange={handleChange} 
              required 
            />
            <button type="submit">Agregar Película</button>
          </form>

          <div className="movie-grid">
            {movies.map((movie) => (
              <div key={movie._id} className="movie-card">
                <h4>{movie.titulo}</h4>
                <p>
                  <strong>Director:</strong> {movie.director}
                </p>
                <p>
                  <strong>Duración:</strong> {movie.duracion} minutos
                </p>
                <p>
                  <strong>Género:</strong> {movie.genero}
                </p>
                <button onClick={() => handleDeleteMovie(movie._id)}>Eliminar</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMovieList;
