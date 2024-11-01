"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MovieData, Genre } from "@/app/types";
import MovieSlider from "@/components/Home/MovieSlider";
import MoviesRow from "@/components/Home/MoviesRow";
import { fetchGenres, fetchMovies, fetchHighlightedMovies } from "@/api/movies";
import styles from "@/components/Home/HomeClient.module.css";
import Loading from "@/components/ui/Loading";
import GenreSelector from "@/components/Home/GenreSelector";

const GenrePage = () => {
  const { genreId } = useParams();
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [comingSoonMovies, setComingSoonMovies] = useState<MovieData[]>([]);
  const [highlightedMovies, setHighlightedMovies] = useState<MovieData[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!genreId) return;

        const [{ available, comingSoon }, genresData, highlightedMoviesData] =
          await Promise.all([
            fetchMovies(),
            fetchGenres(),
            fetchHighlightedMovies(),
          ]);
        const moviesData = available.filter(
          (movie: MovieData) => movie.genre === genreId
        );
        setMovies(moviesData);
        setGenres(genresData);
        setComingSoonMovies(comingSoon);
        setHighlightedMovies(highlightedMoviesData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
      }
    };

    loadData();
  }, [genreId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.homeClientContainer}>
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <MovieSlider title="Highlighted Movies" movies={highlightedMovies} />
          <GenreSelector genres={genres} />
          {movies.length > 0 ? (
            <MoviesRow
              title={
                genres.find((genre) => genre.id === genreId)?.name || "Movies"
              }
              movies={movies}
            />
          ) : (
            <div className={styles.noMoviesMessage}>
              {genres.find((genre) => genre.id === genreId)?.name || "Movies"}{" "}
              movies not available now, check out coming soon.
            </div>
          )}
        </>
      )}
      <MoviesRow title="Coming Soon" movies={comingSoonMovies} />
    </div>
  );
};

export default GenrePage;
