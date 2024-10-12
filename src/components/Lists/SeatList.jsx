import React, { useEffect, useState } from 'react';
import './SeatList.css'; // Asegúrate de tener este archivo CSS

const SeatList = ({ selectedRoom }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const rows = 10; // Total de filas
  const columns = 10; // Total de columnas

  // Generar las butacas dinámicamente
  const generateSeats = () => {
    const seats = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const label = `${String.fromCharCode(65 + row)}${col + 1}`; // Genera A1, A2, etc.
        seats.push({ label, isSelected: false });
      }
    }
    return seats;
  };

  const [seats, setSeats] = useState(generateSeats());

  const handleSelectSeat = (seatLabel) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.label === seatLabel ? { ...seat, isSelected: !seat.isSelected } : seat
      )
    );

    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatLabel)) {
        return prevSelectedSeats.filter((selectedSeat) => selectedSeat !== seatLabel);
      } else {
        return [...prevSelectedSeats, seatLabel];
      }
    });
  };

  return (
    <div className="seat-list">
      <h3>Selecciona tus butacas</h3>
      <div className="seat-grid">
        {seats.map((seat) => (
          <div
            key={seat.label}
            className={`seat ${seat.isSelected ? 'selected' : ''}`}
            onClick={() => handleSelectSeat(seat.label)}
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

export default SeatList;
