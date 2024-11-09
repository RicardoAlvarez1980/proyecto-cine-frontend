import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CinemaAdminList.css';

const CinemaAdminList = () => {
  const [cines, setCines] = useState([]);
  const [nuevoCine, setNuevoCine] = useState({ nombre: '', ubicacion: '' });
  const [editarCine, setEditarCine] = useState(null);
  const [error, setError] = useState(''); // Estado para manejar los errores

  useEffect(() => {
    // Obtener la lista de cines desde el backend
    axios.get('https://proyecto-cine-backend.onrender.com/cines')
      .then(response => {
        setCines(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los cines:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoCine({ ...nuevoCine, [name]: value });
  };

  const handleAddCine = () => {
    // Validación de campos
    if (!nuevoCine.nombre || !nuevoCine.ubicacion) {
      setError('Por favor, complete todos los campos.');
      return; // No continuar si hay campos vacíos
    }
    
    // Limpiar el mensaje de error si la validación es exitosa
    setError('');

    axios.post('https://proyecto-cine-backend.onrender.com/cines', nuevoCine)
      .then(response => {
        setCines([...cines, response.data]);
        setNuevoCine({ nombre: '', ubicacion: '' }); // Reiniciar el formulario
      })
      .catch(error => {
        console.error('Error al agregar cine:', error);
      });
  };

  const handleEditCine = (cine) => {
    setEditarCine(cine);
    setNuevoCine({ nombre: cine.nombre, ubicacion: cine.ubicacion });
  };

  const handleUpdateCine = () => {
    // Validación de campos
    if (!nuevoCine.nombre || !nuevoCine.ubicacion) {
      setError('Por favor, complete todos los campos.');
      return; // No continuar si hay campos vacíos
    }

    setError('');

    axios.put(`https://proyecto-cine-backend.onrender.com/cines/${editarCine._id}`, nuevoCine)
      .then(response => {
        setCines(cines.map(c => (c._id === editarCine._id ? response.data : c)));
        setEditarCine(null);
        setNuevoCine({ nombre: '', ubicacion: '' }); // Reiniciar el formulario
      })
      .catch(error => {
        console.error('Error al actualizar cine:', error);
      });
  };

  const handleDeleteCine = (cineId) => {
    axios.delete(`https://proyecto-cine-backend.onrender.com/cines/${cineId}`)
      .then(() => {
        setCines(cines.filter(c => c._id !== cineId));
        // Reiniciar el formulario si se elimina el cine que está siendo editado
        if (editarCine && editarCine._id === cineId) {
          setEditarCine(null);
          setNuevoCine({ nombre: '', ubicacion: '' }); // Reiniciar el formulario
        }
      })
      .catch(error => {
        console.error('Error al eliminar cine:', error);
      });
  };

  const handleCancelEdit = () => {
    setEditarCine(null);
    setNuevoCine({ nombre: '', ubicacion: '' }); // Reiniciar el formulario
  };

  return (
    <div className="cinema-admin-list">
      <h2>Administrar Cines</h2>
      {error && <div className="error-message">{error}</div>} {/* Mostrar mensaje de error */}
      <div className="add-cinema-form">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del cine"
          value={nuevoCine.nombre}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="ubicacion"
          placeholder="Ubicación del cine"
          value={nuevoCine.ubicacion}
          onChange={handleInputChange}
        />
        {editarCine ? (
          <>
            <button className="btn btn-success" onClick={handleUpdateCine}>Actualizar</button>
            <button className="btn btn-primary" onClick={handleCancelEdit}>Cancelar</button>
          </>
        ) : (
          <button className="btn btn-success" onClick={handleAddCine}>Agregar</button>
        )}
      </div>
      <ul className="cinema-list-items">
        {cines.map(cine => (
          <li key={cine._id} className="cinema-item">
            {cine.nombre} - {cine.ubicacion}
            <div className="cinema-buttons">
              <button className="btn btn-warning" onClick={() => handleEditCine(cine)}>Editar</button>
              <button className="btn btn-danger" onClick={() => handleDeleteCine(cine._id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CinemaAdminList;
