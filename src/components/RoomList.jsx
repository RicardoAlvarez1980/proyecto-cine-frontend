import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:3000/salas'); // Cambia esta URL según corresponda
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        setRooms([]); // Manejo de errores, puedes establecer un estado por defecto
      }
    };

    fetchRooms();
  }, []);

  if (!Array.isArray(rooms) || rooms.length === 0) {
    return <div>No hay salas disponibles.</div>;
  }

  return (
    <div>
      <h2>Salas</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room._id}>
            Sala: {room.name || 'Sin nombre'} {/* Maneja el caso de que `name` sea undefined */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
