import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowtimeList = () => {
    const [showtimes, setShowtimes] = useState([]);

    useEffect(() => {
        const fetchShowtimes = async () => {
            try {
                const response = await axios.get('http://localhost:3000/peliculas-con-salas-y-horarios');
                setShowtimes(response.data);
            } catch (error) {
                console.error("Error fetching showtimes:", error);
            }
        };

        fetchShowtimes();
    }, []);

    return (
        <div>
            <h1>Lista de Horarios</h1>
            {showtimes.map(movie => (
                <div key={movie._id}>
                    <h2>{movie.titulo}</h2>
                    <p>Director: {movie.director}</p>
                    <p>Duración: {movie.duracion} minutos</p>
                    <p>Género: {movie.genero}</p>
                    <h3>Salas</h3>
                    {movie.salas.map(sala => (
                        <div key={sala._id}>
                            <p>Número de Sala: {sala.numero_sala}</p>
                            <p>Butacas disponibles: {sala.butacas}</p>
                            <h4>Horarios</h4>
                            {sala.horarios.length > 0 ? (
                                sala.horarios.map(horario => (
                                    <div key={horario._id}>
                                        <p>Hora: {horario.hora}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No hay horarios disponibles</p>
                            )}
                            {/* Mostrar el nombre del cine y su ubicación */}
                            <p>Cine: {sala.cine.nombre}</p>
                            <p>Ubicación: {sala.cine.ubicacion}</p>
                            <hr />
                        </div>
                    ))}
                    <hr />
                </div>
            ))}
        </div>
    );
};

export default ShowtimeList;
