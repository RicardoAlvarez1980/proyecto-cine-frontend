import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RoomForm from '../components/RoomForm';
import RoomList from '../components/RoomList';

const CinemaDetails = () => {
  const { id } = useParams();
  const [cinema, setCinema] = useState(null);

  useEffect(() => {
    const fetchCinema = async () => {
      const response = await axios.get(`http://localhost:3000/cines/${id}`);
      setCinema(response.data);
    };
    fetchCinema();
  }, [id]);

  const handleRoomAdded = (newRoom) => {
    setCinema((prev) => ({
      ...prev,
      salas: [...prev.salas, newRoom]
    }));
  };

  if (!cinema) return <div>Loading...</div>;

  return (
    <div>
      <h2>{cinema.nombre}</h2>
      <p>Ubicación: {cinema.ubicacion}</p>

      <h3>Salas</h3>
      <RoomList rooms={cinema.salas} />

      <h3>Agregar una nueva sala</h3>
      <RoomForm cinemaId={cinema._id} onRoomAdded={handleRoomAdded} />
    </div>
  );
};

export default CinemaDetails;
