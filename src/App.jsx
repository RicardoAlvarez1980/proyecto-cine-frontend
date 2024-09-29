import React from 'react';
import CinemaList from './components/CinemaList';
import MovieList from './components/MovieList';
import RoomList from './components/RoomList';
import ShowtimeList from './components/ShowtimeList';
import SeatList from './components/SeatList';
import './styles.css';

const App = () => {
  return (
    <div className="App">
      <h1>Cine Reservas</h1>
      <CinemaList />
      <MovieList />
      <RoomList />
      <ShowtimeList />
      <SeatList />
    </div>
  );
};

export default App;
