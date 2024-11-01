"use client";
import { useEffect, useState } from "react";
import { MovieData, Genre } from "@/app/types";
import MovieSlider from "./MovieSlider";
import GenreSelector from "./GenreSelector";
import MoviesRow from "./MoviesRow";
import { fetchMovies, fetchGenres, classifyMoviesByGenre, fetchHighlightedMovies, getMyList, findMoviesByIds } from "@/api/movies";
import styles from "./HomeClient.module.css";
import Loading from "../Loading";
import { useRouter } from "next/navigation";

export default function HomeClient() {
  const [highlightedMovies, setHighlightedMovies] = useState<MovieData[]>([]);
  const [availableMovies, setAvailableMovies] = useState<MovieData[]>([]);
  const [comingSoonMovies, setComingSoonMovies] = useState<MovieData[]>([]);
  const [myList, setMyList] = useState<string[]>([])
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [{ available, comingSoon }, genresData, highlightedMoviesData, myListData] = await Promise.all([
          fetchMovies(),
          fetchGenres(),
          fetchHighlightedMovies(),
          getMyList()
        ]);
        setAvailableMovies(available);
        setComingSoonMovies(comingSoon);
        setGenres(genresData);
        setHighlightedMovies(highlightedMoviesData);
        setMyList(myListData.myList);

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
  const myListMovies = findMoviesByIds([...availableMovies, ...comingSoonMovies], myList);

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
          <MoviesRow title="My List" movies={myListMovies.movies} />
        </>
      )}
    </div>
  );
}