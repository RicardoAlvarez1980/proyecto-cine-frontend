import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Importar el archivo de estilos

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul className="sidebar-list">
        <li>
          <Link to="/" className="sidebar-link">Inicio</Link>
        </li>
        <li>
          <Link to="/lista-peliculas" className="sidebar-link">Lista de Películas</Link>
        </li>
        <li>
          <Link to="/lista-salas" className="sidebar-link">Lista de Salas</Link>
        </li>
        <li>
          <Link to="/lista-horarios" className="sidebar-link">Agregar/Modificar Horarios</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
