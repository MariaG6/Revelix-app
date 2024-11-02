import {
  MovieData,
  Genre,
  FetchMoviesResult,
  MoviesRowProps,
} from "@/app/types";
import { getJwtToken } from "./route";


// Función para obtener las películas desde la API
export const fetchMovies = async (): Promise<FetchMoviesResult> => {
  const token = getJwtToken(); // Obtiene el token JWT
  const res = await fetch("/api/movies", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Añade el token JWT en los encabezados
    },
  });
  const data: MovieData[] = await res.json(); // Convierte la respuesta a JSON

  const today = new Date();
    // Filtra las películas disponibles (fecha de disponibilidad menor o igual a hoy)
  const available = data.filter(
    (movie) => new Date(movie.availableDate) <= today
  );
  // Filtra las películas que estarán disponibles próximamente (fecha de disponibilidad mayor a hoy)
  const comingSoon = data.filter(
    (movie) => new Date(movie.availableDate) > today
  );
  return { available, comingSoon }; // Devuelve las películas disponibles y próximas
};

// Función para obtener las películas destacadas desde la API
export const fetchHighlightedMovies = async (): Promise<MovieData[]> => {
  try {
    const { available, comingSoon } = await fetchMovies();
    const allMovies = [...available, ...comingSoon];
    const highlightedMovies = allMovies.filter((movie) => movie.highlighted); // Filtra las películas destacadas
    return highlightedMovies;
  } catch (error) {
    console.error("Error fetching highlighted movies:", error);
    return [];
  }
};

// Función para normalizar el título de una película
export const normalizeTitle = (title: string) => {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, '') // Elimina los diacríticos
    .replace(/[.,]/g, '') // Elimina comas y puntos
    .replace(/\s+/g, '-'); // Reemplaza los espacios por guiones
};

// Función para obtener los géneros desde la API
export const fetchGenres = async (): Promise<Genre[]> => {
  const token = getJwtToken();
  const res = await fetch("/api/genres", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data: Genre[] = await res.json();
  return data;
};

// Función para clasificar películas por género
export const classifyMoviesByGenre = (
  movies: MovieData[]
): Record<string, MovieData[]> => {
  return movies.reduce((acc, movie) => {
        // Si el género no existe en el acumulador, lo inicializa como un array vacío
    if (!acc[movie.genre]) {
      acc[movie.genre] = [];
    }
        // Añade la película al array del género correspondiente
    acc[movie.genre].push(movie);
    return acc;
  }, {} as Record<string, MovieData[]>);
};


// Función para añadir una película a la lista del usuario
export const addToMyList = async (movieId: string) => {
  const token = getJwtToken();
  const response = await fetch(`/api/user/list/`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id: movieId }), // Envía el ID de la película en el cuerpo de la solicitud
  });

  // Verificación
  if (!response.ok) {
    console.log("Failed to add movie to MyList");
  }

  // Convierte la respuesta a JSON y actualiza la lista en localStorage
  const updatedList = await response.json();
  localStorage.setItem("myList", JSON.stringify(updatedList));
  return updatedList;
};

// Función para eliminar una película de la lista del usuario
export const removeFromMyList = async (movieId: string) => {
  const token = getJwtToken();
  const response = await fetch(`/api/user/list/${movieId}/`, {
    method: "DELETE",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

    // Verificación
  if (!response.ok) {
    console.log("Failed to remove movie from MyList");
  }

  // Convierte la respuesta a JSON y actualiza la lista en localStorage
  const updatedList = await response.json();
  localStorage.setItem("myList", JSON.stringify(updatedList));
  return updatedList;
};

// Función para obetener la lista de películas del usuario
export const getMyList = async () => {
  const token = getJwtToken();
  const localList = localStorage.getItem("myList");
  if (localList) {
    return JSON.parse(localList);
  }

  const response = await fetch(`/api/user/list/`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch MyList");
  }

  const myList = await response.json();
  localStorage.setItem("myList", JSON.stringify(myList));
  return myList;
};

// Función para encontrar películas por sus IDs
export const findMoviesByIds = (
  movies: MovieData[] | undefined,
  idArray: string[] | undefined
): MoviesRowProps => {
    // Verificar si movies o idArray son undefined
  if (!movies || !idArray) {
    return {
      title: "Filtered Movies",
      movies: [],
    };
  }

  const filteredMovies = movies.filter((movie) => idArray.includes(movie.id));
  return {
    title: "Filtered Movies",
    movies: filteredMovies,
  };
};
