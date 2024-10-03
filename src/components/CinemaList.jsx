import React from 'react';

const CinemaList = ({ cinemas }) => {
  return (
    <div>
      {cinemas.length > 0 ? (
        cinemas.map((cinema) => (
          <div key={cinema._id} style={{ marginBottom: '20px' }}>
            <h2>{cinema.nombre} - {cinema.ubicacion}</h2>
            {cinema.salas.length > 0 ? (
              cinema.salas.map((sala) => (
                <div key={sala._id} style={{ marginLeft: '20px' }}>
                  <h3>Sala {sala.numero_sala}</h3>
                  <p>Butacas: {sala.butacas}</p>
                  <h4>Película: {sala.pelicula.titulo}</h4>
                  <p>Director: {sala.pelicula.director}</p>
                  <p>Duración: {sala.pelicula.duracion} minutos</p>
                  <p>Género: {sala.pelicula.genero}</p>
                  <h5>Horarios:</h5>
                  <ul>
                    {sala.horarios.map((horario, index) => (
                      <li key={index}>{horario}</li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p>No hay salas disponibles en este cine.</p>
            )}
          </div>
        ))
      ) : (
        <p>No hay cines disponibles.</p>
      )}
    </div>
  );
};

export default CinemaList;
