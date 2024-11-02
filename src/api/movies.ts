import { MovieData, Genre, FetchMoviesResult, MoviesRowProps } from "@/app/types";
import { getJwtToken } from "./route";

// Movies

export const fetchMovies = async (): Promise<FetchMoviesResult> => {
  const token = getJwtToken();
  const res = await fetch("/api/movies", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data: MovieData[] = await res.json();

  const today = new Date();
  const available = data.filter(
    (movie) => new Date(movie.availableDate) <= today
  );
  const comingSoon = data.filter(
    (movie) => new Date(movie.availableDate) > today
  );
  return { available, comingSoon };
};

export const fetchHighlightedMovies = async (): Promise<MovieData[]> => {
  try {
    const { available, comingSoon } = await fetchMovies();
    const allMovies = [...available, ...comingSoon];
    const highlightedMovies = allMovies.filter((movie) => movie.highlighted);
    return highlightedMovies;
  } catch (error) {
    console.error("Error fetching highlighted movies:", error);
    return [];
  }
};

export const normalizeTitle = (title: string) => {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[.,]/g, "")
    .replace(/\s+/g, "-");
};

// Genres
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

export const classifyMoviesByGenre = (
  movies: MovieData[]
): Record<string, MovieData[]> => {
  return movies.reduce((acc, movie) => {
    if (!acc[movie.genre]) {
      acc[movie.genre] = [];
    }
    acc[movie.genre].push(movie);
    return acc;
  }, {} as Record<string, MovieData[]>);
};

// User List

export const addToMyList = async (movieId: string) => {
  const token = getJwtToken();
  const response = await fetch(`/api/user/list/`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id: movieId }),
  });

  if (!response.ok) {
    console.log("Failed to add movie to MyList");
  }

  const updatedList = await response.json();
  localStorage.setItem("myList", JSON.stringify(updatedList));
  return updatedList;
};

export const removeFromMyList = async (movieId: string) => {
  const token = getJwtToken();
  const response = await fetch(`/api/user/list/${movieId}/`, {
    method: "DELETE",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.log("Failed to remove movie from MyList");
  }

  const updatedList = await response.json();
  localStorage.setItem("myList", JSON.stringify(updatedList));
  return updatedList;
};

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

export const findMoviesByIds = (
  movies: MovieData[] | undefined,
  idArray: string[] | undefined
): MoviesRowProps => {
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
