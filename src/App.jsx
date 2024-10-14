import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Sidebar from './components/Sidebar.jsx'; // Importa el Sidebar
import CinemaList from './components/Lists/CinemaList.jsx';
import MovieContainer from './components/MovieContainer.jsx';
import ShowtimeList from './components/Lists/ShowtimeList.jsx';
import RoomList from './components/Lists/RoomList.jsx';
import SalaList from './components/Lists/SalaList.jsx'; // Importa SalaList

import CinemaAdminList from './components/Lists/CinemaAdminList.jsx';
import MovieForm from './components/Forms/MovieForm.jsx';
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
            <Route path="/lista-peliculas" element={<MovieContainer />} />
            <Route path="/lista-salas" element={<SalaList />} />
            <Route path="/formulario-cines" element={<CinemaAdminList />} /> {/* Agregar ruta para agregar/modificar cines */}
            <Route path="/formulario-salas" element={<RoomForm />} /> {/* Agregar ruta para agregar/modificar salas */}
            <Route path="/formulario-peliculas" element={<MovieForm />} /> {/* Agregar ruta para agregar/modificar películas */}
            <Route path="/lista-horarios" element={<ShowtimeList />} /> {/* Agregar ruta para agregar/modificar horarios */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
