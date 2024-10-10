import React, { useState, useEffect } from 'react';
import RoomList from './RoomList';

const CinemaList = ({ cines, onAddRoom }) => {
  const [cinesState, setCinesState] = useState(cines);

  useEffect(() => {
    setCinesState(cines);
  }, [cines]);

  const handleAddRoom = (newRoomData) => {
    setCinesState((prevCines) => {
      return prevCines.map((cine) => {
        if (cine._id === newRoomData.cineId) {
          return {
            ...cine,
            salas: [...cine.salas, newRoomData],
          };
        }
        return cine;
      });
    });
    onAddRoom(newRoomData); // Llama a la función que actualiza el estado en App
  };

  return (
    <div>
      {cinesState.map((cine) => (
        <div key={cine._id}>
          <h2>{cine.nombre}</h2>
          <RoomList salas={cine.salas} />
          {/* Componente AddRoom se debe incluir en App.jsx y debe tener la función onAdd */}
        </div>
      ))}
    </div>
  );
};

export default CinemaList;
