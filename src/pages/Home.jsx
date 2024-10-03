import React, { useState } from 'react';
import CinemaForm from '../components/CinemaForm';
import CinemaList from '../components/CinemaList';

const Home = () => {
  const [cinemas, setCinemas] = useState([]);

  const handleCinemaCreated = (newCinema) => {
    setCinemas([...cinemas, newCinema]);
  };

  return (
    <div>
      <h1>Gestión de Cines</h1>
      <CinemaForm onCinemaCreated={handleCinemaCreated} />
      <CinemaList />
    </div>
  );
};

export default Home;
