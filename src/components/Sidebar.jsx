// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav style={{ width: '200px', padding: '20px', borderRight: '1px solid #ccc' }}>
      <h2>Administración de Cines</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/agregar-cine">Agregar Cine</Link>
        </li>
        <li>
          <Link to="/lista-peliculas">Lista de Películas</Link>
        </li>
        <li>
          <Link to="/agregar-pelicula">Agregar Película</Link>
        </li>
        <li>
          <Link to="/lista-salas">Lista de Salas</Link>
        </li>
        <li>
          <Link to="/agregar-sala">Agregar Sala</Link>
        </li>
        <li>
          <Link to="/lista-horarios">Lista de Horarios</Link>
        </li>
        <li>
          <Link to="/agregar-horario">Agregar Horario</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
