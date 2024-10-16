proyecto-cine-frontend
--
## Descripción del Proyecto
Este proyecto es la interfaz frontend de un sistema de reserva de butacas para cines. Permite a los usuarios seleccionar una ciudad, elegir un cine, una película, un horario, y reservar sus butacas. El proyecto está construido con React.js y se comunica con un backend que gestiona la base de datos de cines, películas y horarios.
## Tecnologías Utilizadas
Tecnologías Utilizadas
React.js: Biblioteca principal para construir la interfaz de usuario.
Axios: Para hacer peticiones HTTP al backend.
React Router: Para la gestión de rutas y navegación entre páginas.
CSS: Para la estética y el diseño visual de la página.
## Funcionalidades
- Visualización de cines, salas, películas y horarios.
- Gestión de reservas de entradas.
- Interfaz amigable y dinámica para una mejor experiencia del usuario.

## Estructura del Proyecto
El proyecto está dividido en diferentes componentes de React para mantener el código modular y fácil de manejar.
1. App.js:
Componente principal del proyecto que organiza las rutas del sitio web utilizando React Router.
Renderiza los componentes principales como el listado de cines y la selección de butacas.
2. CinemaList.js:
Este componente se encarga de mostrar la lista de cines disponibles.
Utiliza Axios para hacer una petición HTTP al backend (http://localhost:3000/cines) y obtener la lista de cines.
Cada cine se renderiza como un componente individual.
3. ShowtimeForm.js:
Un formulario para crear, editar y eliminar horarios de cine.
Realiza peticiones HTTP (POST, PUT, DELETE) para gestionar los horarios en el backend.
Permite seleccionar una película, una sala y la hora.
4. RoomForm.js:
Formulario que permite agregar una nueva sala a un cine existente.
Se puede seleccionar el cine y definir el número de sala y la cantidad de butacas.
Utiliza peticiones HTTP para crear nuevas salas en el backend.
## Instalación y Ejecución
Clonar el repositorio:
git clone https://github.com/RicardoAlvarez1980/proyecto-cine-frontend.git
Instalar las dependencias:
npm install
Iniciar la aplicación:
npm start
## Explicación del Flujo:
Seleccionar Cine: El usuario escoge una ciudad y un cine de la lista generada por CinemaList.js.
Seleccionar Película y Horario: Luego, el usuario selecciona una película y un horario desde el formulario ShowtimeForm.js.
Reservar Butacas: Una vez que se elige el horario, el sistema muestra la disposición de las butacas, y el usuario puede elegir las que están disponibles.
Ver Tráiler: Antes de confirmar la reserva, el usuario puede ver el tráiler de la película haciendo clic en el botón "Ver Trailer".
## Notas Técnicas:
El proyecto está diseñado para comunicarse con un backend que gestiona la lógica de los cines, películas y horarios. Este backend debe estar corriendo localmente para que las peticiones HTTP de Axios funcionen correctamente.
## Mejoras a Futuro:
Reservar Butacas: Una vez que se elige el horario, el sistema muestra la disposición de las butacas, y el usuario puede elegir las que están disponibles.
Ver Tráiler: Antes de confirmar la reserva, el usuario puede ver el tráiler de la película haciendo clic en el botón "Ver Trailer".
Botón "Ver Trailer":
Este botón está presente en la selección de horarios y en el listado de películas.
Al hacer clic, redirige al usuario al enlace de YouTube correspondiente al tráiler de la película seleccionada.
## Contribuciones:
Si deseas contribuir a este proyecto, por favor haz un fork del repositorio y envía un pull request.

