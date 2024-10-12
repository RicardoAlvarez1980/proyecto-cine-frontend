import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddShowtime({ onAdd }) {
  const [hora, setHora] = useState(''); // Estado para la hora
  const [salas, setSalas] = useState([]); // Estado para almacenar las salas
  const [salaId, setSalaId] = useState(''); // Estado para el ID de la sala seleccionada
  const [cinemaId, setCinemaId] = useState(''); // Estado para el ID del cine seleccionado

  // Hook para obtener las salas disponibles
  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cines'); // Obtenemos los cines y salas
        const todasSalas = response.data.flatMap(cine => cine.salas.map(sala => ({
          id: sala._id, 
          numero: sala.numero_sala, 
          cineId: cine._id,  // Guardamos el ID del cine al que pertenece la sala
          cine: cine.nombre
        })));
        setSalas(todasSalas); // Guardamos las salas
      } catch (error) {
        console.error('Error al obtener las salas', error);
      }
    };
    fetchSalas();
  }, []);

  // Función que se ejecuta cuando se envía el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newShowtime = { horario: hora }; // Objeto que contiene el nuevo horario

      // Realizamos la petición POST con el cineId y salaId correctos
      const response = await axios.post(`http://localhost:3000/cines/${cinemaId}/salas/${salaId}/horarios`, newShowtime);
      onAdd(response.data); // Llamamos a la función onAdd para actualizar la lista de horarios
      setHora(''); // Limpiamos el formulario
      setSalaId('');
      setCinemaId('');
    } catch (error) {
      console.error('Error al agregar el horario', error); // Manejo de errores
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <h2>Agregar un nuevo horario</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Hora (ej. 16:00)"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <select
          className="form-control"
          value={salaId}
          onChange={(e) => {
            const selectedOption = salas.find(sala => sala.id === e.target.value);
            setSalaId(selectedOption.id);  // Seleccionamos el salaId
            setCinemaId(selectedOption.cineId);  // También seleccionamos el cinemaId
          }}
          required
        >
          <option value="">Selecciona una sala</option>
          {salas.map(sala => (
            <option key={sala.id} value={sala.id}>
              {`Sala ${sala.numero} - ${sala.cine}`}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Agregar Horario</button>
    </form>
  );
}

export default AddShowtime;
