// src/components/ShowtimeList.jsx
import React, { useState } from 'react';
import Seat from './Seat'; // Importamos el componente de butaca

const ShowtimeList = ({ horarios, butacas }) => {
  const [occupiedSeats, setOccupiedSeats] = useState({});
  const [selectedHour, setSelectedHour] = useState(null); // Nuevo estado para almacenar la hora seleccionada

  const handleSeatClick = (hour, seatLabel) => {
    const key = `${hour}-${seatLabel}`;
    setOccupiedSeats((prev) => ({ ...prev, [key]: !prev[key] })); // Ocupa/desocupa al hacer clic
  };

  // Crea una matriz para los asientos (10x10)
  const createSeatMatrix = (numSeats) => {
    const rows = 10;
    const cols = 10;
    const seatMatrix = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        if (i * cols + j < numSeats) {
          const seatLabel = `${String.fromCharCode(65 + i)}${j + 1}`; // A1, A2, B1, etc.
          row.push(seatLabel);
        }
      }
      seatMatrix.push(row);
    }
    return seatMatrix;
  };

  return (
    <div style={{ border: '2px solid #333', padding: '20px', borderRadius: '10px', width: 'fit-content', margin: '20px auto' }}>
      <h4 style={{ textAlign: 'center' }}>Selecciona una hora:</h4>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {horarios.map((hour) => (
          <button
            key={hour}
            style={{
              margin: '5px',
              padding: '10px',
              backgroundColor: selectedHour === hour ? '#3f51b5' : '#e0e0e0',
              color: selectedHour === hour ? 'white' : 'black',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
            onClick={() => setSelectedHour(hour)} // Cambia la hora seleccionada
          >
            {hour}
          </button>
        ))}
      </div>

      {selectedHour && (
        <div>
          <h4 style={{ textAlign: 'center' }}>Hora: {selectedHour}</h4>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {createSeatMatrix(butacas).map((row, rowIndex) => (
              <div key={rowIndex} style={{ display: 'flex', justifyContent: 'center' }}>
                {row.map((seatLabel) => (
                  <Seat
                    key={seatLabel}
                    isAvailable={!occupiedSeats[`${selectedHour}-${seatLabel}`]}
                    onClick={() => handleSeatClick(selectedHour, seatLabel)}
                    label={seatLabel}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowtimeList;
