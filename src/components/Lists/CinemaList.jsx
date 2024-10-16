import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import RoomList from './RoomList';
import './CinemaList.css'; // Importa el CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar Bootstrap

const CinemaList = () => {
  const [cines, setCines] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newCinema, setNewCinema] = useState({ nombre: '', ubicacion: '' });
  const formRef = useRef(null); // Referencia al formulario

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
    setIsEditing(false); // Reset de edición
  };

  const handleBackToCines = () => {
    setSelectedCinema(null); // Al hacer clic, vuelve a la lista de cines
    setIsEditing(false);
  };

  const handleAddCinema = () => {
    setNewCinema({ nombre: '', ubicacion: '' }); // Resetear formulario
    setIsEditing(true);
    setSelectedCinema(null); // Para no mostrar detalles de un cine al agregar uno nuevo
    formRef.current.scrollIntoView({ behavior: 'smooth' }); // Scroll al formulario
  };

  const handleEditCinema = (cine) => {
    setNewCinema(cine);
    setIsEditing(true);
    setSelectedCinema(null); // Ocultar la vista de detalles al editar
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDeleteCinema = (cineId) => {
    axios.delete(`http://localhost:3000/cines/${cineId}`)
      .then(() => {
        setCines(cines.filter(cine => cine._id !== cineId));
      })
      .catch(error => {
        console.error('Error al borrar el cine:', error);
      });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (newCinema._id) {
      // Editar cine existente
      axios.put(`http://localhost:3000/cines/${newCinema._id}`, newCinema)
        .then(response => {
          setCines(cines.map(cine => (cine._id === newCinema._id ? response.data : cine)));
          setIsEditing(false);
          setNewCinema({ nombre: '', ubicacion: '' }); // Resetear formulario
        })
        .catch(error => {
          console.error('Error al editar el cine:', error);
        });
    } else {
      // Agregar nuevo cine
      axios.post('http://localhost:3000/cines', newCinema)
        .then(response => {
          setCines([...cines, response.data]);
          setIsEditing(false);
          setNewCinema({ nombre: '', ubicacion: '' }); // Resetear formulario
        })
        .catch(error => {
          console.error('Error al agregar el cine:', error);
        });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCinema({ ...newCinema, [name]: value });
  };

  return (
    <div className="cinema-list">
      <div className="container">
        {selectedCinema ? (
          <div>
            <RoomList cineId={selectedCinema._id} onBack={handleBackToCines} />
          </div>
        ) : (
          <div>
            <h2 className="cinema-list-title text-white font-weight-bold">Lista de Cines</h2>
            <button className="btn btn-primary mb-3 font-weight-bold" onClick={handleAddCinema}>Agregar Cine</button>
            <ul className="cinema-list-items list-group">
              {cines.map(cine => (
                <li key={cine._id} className="cinema-item list-group-item d-flex justify-content-between align-items-center">
                  <div className="d-flex flex-column">
                    {/* Combina nombre y ubicación en un solo span */}
                    <span className="cinema-name text-white">
                      {cine.nombre} <span className="text-white">({cine.ubicacion})</span>
                    </span>
                  </div>
                  <div className="d-flex">
                    <button className="btn btn-success ml-2 font-weight-bold" onClick={() => handleCinemaClick(cine)}>Ver Salas</button>
                    <button className="btn btn-warning ml-2 font-weight-bold" onClick={() => handleEditCinema(cine)}>Editar</button>
                    <button className="btn btn-danger ml-2 font-weight-bold" onClick={() => handleDeleteCinema(cine._id)}>Borrar</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {isEditing && (
          <div ref={formRef}>
            <h3 className="text-white font-weight-bold">{newCinema._id ? 'Editar Cine' : 'Agregar Cine'}</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label className="text-white">Nombre del Cine</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={newCinema.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="text-white">Ubicación del Cine</label>
                <input
                  type="text"
                  className="form-control"
                  name="ubicacion"
                  value={newCinema.ubicacion}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success font-weight-bold">
                {newCinema._id ? 'Guardar Cambios' : 'Agregar Cine'}
              </button>
              <button type="button" className="btn btn-secondary ml-2 font-weight-bold" onClick={() => setIsEditing(false)}>
                Cancelar
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CinemaList;
