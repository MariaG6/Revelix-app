import { MovieData, Genre, FetchMoviesResult } from "@/app/types";
import { getJwtToken } from "./route";

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
