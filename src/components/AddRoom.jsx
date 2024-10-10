import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Componente para agregar una nueva sala con película
function AddRoom({ onAdd }) {
  const [numeroSala, setNumeroSala] = useState('');
  const [butacas, setButacas] = useState(100);
  const [titulo, setTitulo] = useState('');
  const [director, setDirector] = useState('');
  const [duracion, setDuracion] = useState('');
  const [genero, setGenero] = useState('');
  const [cines, setCines] = useState([]);
  const [cineId, setCineId] = useState('');

  // Hook para obtener los cines disponibles
  useEffect(() => {
    const fetchCines = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cines');
        setCines(response.data);
      } catch (error) {
        console.error('Error al obtener los cines', error);
      }
    };
    fetchCines();
  }, []);

  // Función que se ejecuta cuando se envía el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newRoom = {
        numero_sala: numeroSala,
        butacas,
        pelicula: {
          titulo,
          director,
          duracion,
          genero,
        },
        horarios: []
      };
      const response = await axios.post(`http://localhost:3000/cines/${cineId}/salas`, newRoom);
      
      // Modificación aquí: crea un objeto que contenga la nueva sala y el ID del cine
      const newRoomData = { ...response.data, cineId: cineId }; // Añadir cineId a la sala
      onAdd(newRoomData); // Llama a onAdd con el nuevo objeto sala

      // Limpiamos el formulario
      setNumeroSala('');
      setButacas(100);
      setTitulo('');
      setDirector('');
      setDuracion('');
      setGenero('');
      setCineId('');
    } catch (error) {
      console.error('Error al agregar la sala', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <h2>Agregar una nueva sala con película</h2>

      <div className="mb-3">
        <select
          className="form-control"
          value={cineId}
          onChange={(e) => setCineId(e.target.value)}
          required
        >
          <option value="">Selecciona un cine</option>
          {cines.map((cine) => (
            <option key={cine._id} value={cine._id}>{cine.nombre}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Número de sala"
          value={numeroSala}
          onChange={(e) => setNumeroSala(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="Número de butacas"
          value={butacas}
          onChange={(e) => setButacas(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Título de la película"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Director de la película"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Duración de la película"
          value={duracion}
          onChange={(e) => setDuracion(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Género de la película"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Agregar Sala</button>
    </form>
  );
}

export default AddRoom;
