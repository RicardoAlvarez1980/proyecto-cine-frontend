// src/components/Forms.js (o Forms.jsx)

import React from 'react';

export const CinemaForm = () => {
  return (
    <form>
      <h2>Agregar Cine</h2>
      {/* Campos del formulario aquí */}
      <button type="submit">Agregar Cine</button>
    </form>
  );
};

export const MovieForm = () => {
  return (
    <form>
      <h2>Agregar Película</h2>
      {/* Campos del formulario aquí */}
      <button type="submit">Agregar Película</button>
    </form>
  );
};

export const ShowtimeForm = () => {
  return (
    <form>
      <h2>Agregar Horario</h2>
      {/* Campos del formulario aquí */}
      <button type="submit">Agregar Horario</button>
    </form>
  );
};
