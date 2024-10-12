import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SalaList.css'; // Asegúrate de tener estilos para este componente

const SalaList = () => {
  const [salas, setSalas] = useState([]);
  const [cines, setCines] = useState([]);

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/salas');
        setSalas(response.data);
      } catch (error) {
        console.error('Error al obtener las salas:', error);
      }
    };

    const fetchCines = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cines');
        setCines(response.data);
      } catch (error) {
        console.error('Error al obtener los cines:', error);
      }
    };

    fetchSalas();
    fetchCines();
  }, []);

  // Función para obtener el nombre del cine por su ID
  const getCineNombre = (cineId) => {
    const cine = cines.find(c => c._id === cineId);
    return cine ? cine.nombre : 'Cine no encontrado';
  };

  return (
    <div className="sala-list-container">
      <h2>Lista de Salas</h2>
      {salas.map(sala => (
        <div key={sala._id} className="sala-card">
          <h3>{getCineNombre(sala.cine)} - Sala {sala.numero_sala}</h3>
          {/* Aquí puedes agregar más detalles de la sala si lo deseas */}
        </div>
      ))}
    </div>
  );
};

export default SalaList;
