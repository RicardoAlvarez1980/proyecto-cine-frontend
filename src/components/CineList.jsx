import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RoomList from './RoomList';
import './CinemaList.css'; // Importa el CSS

const CinemaList = () => {
  const [cines, setCines] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);

  useEffect(() => {
    // Obtener la lista de cines desde el backend
    axios.get('http://localhost:3000/cines')
      .then(response => {
        setCines(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los cines:', error);
      });
  }, []);

  const handleCinemaClick = (cine) => {
    setSelectedCinema(cine);
  };

  const handleBackToCines = () => {
    setSelectedCinema(null); // Al hacer clic, vuelve a la lista de cines
  };

  return (
    <div className="cinema-list">
      {selectedCinema ? (
        <div>
          <h2 className="cinema-list-title">CINE: {selectedCinema.nombre}</h2>
          <RoomList cineId={selectedCinema._id} onBack={handleBackToCines} />
        </div>
      ) : (
        <div>
          <h2 className="cinema-list-title">Lista de Cines</h2>
          <ul className="cinema-list-items">
            {cines.map(cine => (
              <li 
                key={cine._id} 
                className="cinema-item" 
                onClick={() => handleCinemaClick(cine)}
              >
                {cine.nombre} - {cine.ubicacion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CinemaList;
