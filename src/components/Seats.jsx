import React from 'react';
import './Seats.css'; // Asegúrate de tener este archivo CSS

const Seats = ({ totalSeats, selectedSeats, onSeatSelect }) => {
  const rows = Math.ceil(totalSeats / 10); // Número de filas basado en el total de butacas (10 columnas fijas)
  const columns = 10; // Total de columnas por fila

  // Generar las butacas dinámicamente
  const generateSeats = () => {
    const seats = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const label = `${String.fromCharCode(65 + row)}${col + 1}`; // Genera A1, A2, B1, B2, etc.
        if (seats.length < totalSeats) {
          seats.push({ label });
        }
      }
    }
    return seats;
  };

  const seats = generateSeats();

  return (
    <div className="seats-container">
      <h3>Selecciona tus butacas</h3>
      <div className="seat-grid">
        {seats.map((seat) => (
          <div
            key={seat.label}
            className={`seat ${selectedSeats.includes(seat.label) ? 'selected' : ''}`} // Aplicar la clase si está seleccionada
            onClick={() => onSeatSelect(seat.label)} // Llamar la función de selección
          >
            {seat.label}
          </div>
        ))}
      </div>
      <div className="selected-seats">
        <h4>Butacas Seleccionadas: {selectedSeats.join(', ')}</h4>
      </div>
    </div>
  );
};

export default Seats;
