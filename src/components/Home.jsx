import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css'; // Importa el CSS
import 'bootstrap/dist/css/bootstrap.min.css';


const Home = () => {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate('/lista-cines'); // Redirige a la lista de cines
  };

  return (
<div className="home-container">
  <h1>¡Bienvenido al Sistema de Administración de Cines!</h1>
  <button onClick={handleEnter} className="enter-button">Ingresar</button>
</div>

  );
};

export default Home;
