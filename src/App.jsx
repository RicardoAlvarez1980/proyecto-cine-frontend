import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddCinema from './components/AddCinema'; // Importamos el componente para agregar cines
import CinemaList from './components/CinemaList'; // Importamos el componente para la lista de cines
import AddRoom from './components/AddRoom'; // Importamos el componente para agregar salas
import AddMovie from './components/AddMovie'; // Importamos el componente para agregar películas
import AddShowtime from './components/AddShowtime'; // Importamos el componente para agregar horarios
import AddSeat from './components/AddSeat'; // Importamos el componente para agregar butacas

function App() {
  const [cines, setCines] = useState([]);
  const [salas, setSalas] = useState([]);
  const [peliculas, setPeliculas] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [butacas, setButacas] = useState([]);

  const fetchCines = async () => {
    try {
      const response = await axios.get('http://localhost:3000/cines'); // Cambia la URL según tu configuración
      setCines(response.data);
    } catch (error) {
      console.error("Error al obtener los cines", error);
    }
  };

  // Función para agregar un nuevo cine a la lista
  const addCinemaToList = (newCinema) => {
    setCines([...cines, newCinema]); // Actualiza la lista con el nuevo cine
  };

  // Funciones para agregar salas, películas, horarios y butacas
  const addRoomToList = (newRoom) => {
    setSalas([...salas, newRoom]);
  };

  const addMovieToList = (newMovie) => {
    setPeliculas([...peliculas, newMovie]);
  };

  const addShowtimeToList = (newShowtime) => {
    setHorarios([...horarios, newShowtime]);
  };

  const addSeatToList = (newSeat) => {
    setButacas([...butacas, newSeat]);
  };

  useEffect(() => {
    fetchCines(); // Llamamos la función para obtener los cines cuando el componente se monte
  }, []);

  return (
    <div className="App">
      <h1>Listado de Cines</h1>

      {/* Mostramos la lista de cines con sus salas, películas y horarios */}
      <CinemaList cines={cines} />

      <div className="container">
        {/* Componente para agregar nuevos cines */}
        <div className="box">
          <AddCinema onAdd={addCinemaToList} />
        </div>

        {/* Componente para agregar nuevas salas */}
        <div className="box">
          <AddRoom onAdd={addRoomToList} />
        </div>

        {/* Componente para agregar nuevas películas */}
        <div className="box">
          <AddMovie onAdd={addMovieToList} />
        </div>

        {/* Componente para agregar nuevos horarios */}
        <div className="box">
          <AddShowtime onAdd={addShowtimeToList} />
        </div>

        {/* Componente para agregar nuevas butacas */}
        <div className="box">
          <AddSeat onAdd={addSeatToList} />
        </div>
      </div>
    </div>
  );
}

export default App;