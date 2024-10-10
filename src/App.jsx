import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import AddCinema from './components/AddCinema'; // Importamos el componente para agregar cines
import CinemaList from './components/CinemaList'; // Importamos el componente para la lista de cines

function App() {
  const [cines, setCines] = useState([]);

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

  useEffect(() => {
    fetchCines(); // Llamamos la función para obtener los cines cuando el componente se monte
  }, []);

  return (
    <div className="App">
      <h1>Listado de Cines</h1>

      {/* Mostramos la lista de cines con sus salas, películas y horarios */}
      <CinemaList cines={cines} />

      {/* Componente para agregar nuevos cines */}
      <AddCinema onAdd={addCinemaToList} />
    </div>
  );
}

export default App;
