import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CinemaList = () => {
  const [cinemas, setCinemas] = useState([]);

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cines');
        setCinemas(response.data);
      } catch (error) {
        console.error('Error fetching cinemas:', error);
      }
    };

    fetchCinemas();
  }, []);

  return (
    <div>
      <h2>Cines</h2>
      <ul>
        {cinemas.map(cinema => (
          <li key={cinema._id}>{cinema.name} - {cinema.location}</li>
        ))}
      </ul>
    </div>
  );
};

export default CinemaList;
