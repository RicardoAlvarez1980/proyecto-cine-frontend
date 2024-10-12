import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Sidebar from './components/Sidebar.jsx'; // Importa el Sidebar
import CinemaList from './components/Lists/CinemaList.jsx';
import MovieList from './components/Lists/MovieList.jsx';
import ShowtimeList from './components/Lists/ShowtimeList.jsx';
import RoomList from './components/Lists/RoomList.jsx';

import CinemaForm from './components/Forms/CinemaForm.jsx';
import MovieForm from './components/Forms/MovieForm.jsx';
import ShowtimeForm from './components/Forms/ShowtimeForm.jsx';
import RoomForm from './components/Forms/RoomForm.jsx';
import Home from './components/Home.jsx'; // Asegúrate de tener un componente de inicio

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar /> {/* Agrega el Sidebar aquí */}

        {/* Contenido Principal */}
        <div style={{ padding: '20px', flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lista-cines" element={<CinemaList />} />
            <Route path="/agregar-cine" element={<CinemaForm />} />
            <Route path="/lista-peliculas" element={<MovieList />} />
            <Route path="/agregar-pelicula" element={<MovieForm />} />
            <Route path="/lista-salas" element={<RoomList />} />
            <Route path="/agregar-sala" element={<RoomForm />} />
            <Route path="/lista-horarios" element={<ShowtimeList />} />
            <Route path="/agregar-horario" element={<ShowtimeForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
