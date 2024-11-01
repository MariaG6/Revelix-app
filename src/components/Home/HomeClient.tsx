"use client";
import { useEffect, useState } from "react";
import { MovieData, Genre } from "@/app/types";
import MovieSlider from "./MovieSlider";
import GenreSelector from "./GenreSelector";
import MoviesRow from "./MoviesRow";
import { fetchMovies, fetchGenres, classifyMoviesByGenre, fetchHighlightedMovies } from "@/api/movies";
import styles from "./HomeClient.module.css";
import Loading from "../Loading";
import { useRouter } from "next/navigation";

export default function HomeClient() {
  const [highlightedMovies, setHighlightedMovies] = useState<MovieData[]>([]);
  const [availableMovies, setAvailableMovies] = useState<MovieData[]>([]);
  const [comingSoonMovies, setComingSoonMovies] = useState<MovieData[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [{ available, comingSoon }, genresData, highlightedMoviesData] = await Promise.all([
          fetchMovies(),
          fetchGenres(),
          fetchHighlightedMovies()
        ]);
        setAvailableMovies(available);
        setComingSoonMovies(comingSoon);
        setGenres(genresData);
        setHighlightedMovies(highlightedMoviesData);

        setLoading(false); 
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
        setLoading(false); 
        router.push("/login");
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const moviesByGenre = classifyMoviesByGenre(availableMovies);

  return (
    <div className={styles.homeClientContainer}>
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <MovieSlider title='Highlighted movies' movies={highlightedMovies} />
          <GenreSelector genres={genres} />
          {genres.map(genre => {
            const genreMovies = moviesByGenre[genre.id] || [];
            if (genreMovies.length === 0) return null;
            return <MoviesRow key={genre.id} title={genre.name} movies={genreMovies} />;
          })}
          <MoviesRow title='Coming soon' movies={comingSoonMovies} />
        </>
      )}
    </div>
  );
}