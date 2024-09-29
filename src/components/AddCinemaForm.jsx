import React, { useState } from 'react';

function AddCinemaForm({ addCinema }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addCinema({ name, location });
    setName('');
    setLocation('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-cinema-form">
      <h2>Agregar Cine</h2>
      <input
        type="text"
        placeholder="Nombre del cine"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Ubicación"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <button type="submit">Agregar</button>
    </form>
  );
}

export default AddCinemaForm;
