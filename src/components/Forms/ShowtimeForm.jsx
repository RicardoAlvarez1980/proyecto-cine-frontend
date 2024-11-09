import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowtimeForm = ({ showtimeId, onSuccess }) => {
  const [hora, setHora] = useState('');
  const [salaId, setSalaId] = useState('');

  useEffect(() => {
    if (showtimeId) {
      axios.get(`https://proyecto-cine-backend.onrender.com/horarios/${showtimeId}`)
        .then(response => {
          setHora(response.data.hora);
          setSalaId(response.data.sala);
        })
        .catch(error => console.error('Error al cargar el horario:', error));
    }
  }, [showtimeId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const showtimeData = { hora, sala: salaId };

    if (showtimeId) {
      axios.put(`https://proyecto-cine-backend.onrender.com/horarios/${showtimeId}`, showtimeData)
        .then(response => {
          onSuccess();
          alert('Horario actualizado con éxito');
        })
        .catch(error => console.error('Error al actualizar el horario:', error));
    } else {
      axios.post('https://proyecto-cine-backend.onrender.com/horarios', showtimeData)
        .then(response => {
          onSuccess();
          alert('Horario creado con éxito');
        })
        .catch(error => console.error('Error al crear el horario:', error));
    }
  };

  const handleDelete = () => {
    if (showtimeId && window.confirm('¿Estás seguro de que deseas eliminar este horario?')) {
      axios.delete(`https://proyecto-cine-backend.onrender.com/horarios/${showtimeId}`)
        .then(response => {
          onSuccess();
          alert('Horario eliminado con éxito');
        })
        .catch(error => console.error('Error al eliminar el horario:', error));
    }
  };

  return (
    <div>
      <h2>{showtimeId ? 'Modificar Horario' : 'Agregar Horario'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Hora:</label>
          <input type="text" value={hora} onChange={(e) => setHora(e.target.value)} required />
        </div>
        <div>
          <label>Sala:</label>
          <input type="text" value={salaId} onChange={(e) => setSalaId(e.target.value)} required />
        </div>
        <button type="submit">{showtimeId ? 'Actualizar' : 'Crear'}</button>
        {showtimeId && <button type="button" onClick={handleDelete}>Eliminar</button>}
      </form>
    </div>
  );
};

export default ShowtimeForm;
