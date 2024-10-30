"use client";
import { useEffect, useState } from "react";
import { MovieData } from "@/app/types";
import MovieSlider from "./MovieSlider";
import GenreSelector from "./GenreSelector";
import { getJwtToken } from "@/api/route";
import styles from "./HomeClient.module.css";
import MoviesRow from "./MoviesRow";
import { Genre } from "@/app/types";

export default function HomeClient() {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [highlightedMovies, setHighlightedMovies] = useState<MovieData[]>([]);
  const [availableMovies, setAvailableMovies] = useState<MovieData[]>([]);
  const [comingSoonMovies, setComingSoonMovies] = useState<MovieData[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = getJwtToken();

        const res = await fetch("/api/movies", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data: MovieData[] = await res.json();
        setMovies(data);

        // Movies available and coming soon
        const today = new Date();
        const available = data.filter(
          (movie) => new Date(movie.availableDate) <= today
        );
        const comingSoon = data.filter(
          (movie) => new Date(movie.availableDate) > today
        );

        setAvailableMovies(available);
        setComingSoonMovies(comingSoon);

        // Movies highlighted = true
        setHighlightedMovies(data.filter((movie) => movie.highlighted));
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Failed to fetch movies. Please try again later.");
      }
    };

    const fetchGenres = async () => {
      try {
        const res = await fetch("/api/films/genres");
        const data: Genre[] = await res.json();
        setGenres(data);
      } catch (error) {
        console.error("Error fetching genres:", error);
        setError("Failed to fetch genres. Please try again later.");
      }
    };

    fetchMovies();
    fetchGenres();

  }, []);

  const moviesDrama = movies.filter( (movie) => movie.genre === "e4f21b5a-5235-4b35-a26b-f88fd94da066" );
  const moviesComedy = movies.filter((movie) => movie.genre === "22f9f9a3-c84c-4d28-81f5-218d87cc41f5");
  const moviesThriller = movies.filter((movie) => movie.genre === "9cec0d28-3237-4754-ac3b-f8ac035c91f8");

  return (
    <div className={styles.homeClientContainer}>
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <MovieSlider movies={highlightedMovies}/>
          {/* <GenreSelector genres={genres} /> */}
          <MoviesRow title="Comedy" movies={moviesComedy} />
          <MoviesRow title="Drama" movies={moviesDrama} />
          <MoviesRow title="Thriller" movies={moviesThriller} />
          <MoviesRow title="Coming Soon" movies={comingSoonMovies} />
          <MoviesRow title="My list" movies={movies} />
        </>
      )}
    </div>
  );
}