// src/components/Forms/RoomForm.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RoomForm = ({ onSuccess }) => {
  const [cines, setCines] = useState([]);
  const [cineId, setCineId] = useState('');
  const [numeroSala, setNumeroSala] = useState('');
  const [butacas, setButacas] = useState(200); // Puedes ajustar el número de butacas por defecto

  useEffect(() => {
    // Obtener la lista de cines disponibles
    const fetchCines = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cines');
        setCines(response.data);
      } catch (error) {
        console.error('Error al obtener los cines:', error);
      }
    };

    fetchCines();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/salas', {
        cine: cineId,
        numero_sala: numeroSala,
        butacas,
      });

      console.log('Sala creada:', response.data);
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (error) {
      console.error('Error al crear la sala:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Cine:</label>
        <select 
          value={cineId} 
          onChange={(e) => setCineId(e.target.value)} 
          required
        >
          <option value="">Seleccione un cine</option>
          {cines.map((cine) => (
            <option key={cine._id} value={cine._id}>
              {cine.nombre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Número de Sala:</label>
        <input 
          type="text" 
          value={numeroSala} 
          onChange={(e) => setNumeroSala(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Butacas:</label>
        <input 
          type="number" 
          value={butacas} 
          onChange={(e) => setButacas(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Crear Sala</button>
    </form>
  );
};

export default RoomForm;
