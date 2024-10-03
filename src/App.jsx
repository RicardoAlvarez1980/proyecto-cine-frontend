import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CinemaList from './components/CinemaList';

const App = () => {
  const [cinemas, setCinemas] = useState([]);

  useEffect(() => {
    // Llama al backend para obtener la lista de cines
    axios.get('http://localhost:3000/cines')
      .then(response => {
        setCinemas(response.data);
      })
      .catch(error => {
        console.error('Error fetching cinemas:', error);
      });
  }, []);

  return (
    <div>
      <h1>Lista de Cines</h1>
      <CinemaList cinemas={cinemas} />
    </div>
  );
}

export default App;
