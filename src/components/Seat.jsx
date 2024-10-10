// src/components/Seat.jsx
import React from 'react';

const Seat = ({ isAvailable, onClick, label }) => {
  const seatStyle = {
    width: '40px',
    height: '40px',
    margin: '5px',
    backgroundColor: isAvailable ? '#4CAF50' : '#F44336', // Verde para disponible, rojo para ocupada
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    color: 'white',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  };

  return (
    <div style={seatStyle} onClick={onClick}>
      {label}
    </div>
  );
};

export default Seat;
