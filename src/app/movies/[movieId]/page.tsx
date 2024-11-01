"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./MoviePage.module.css";
import { MovieData, Genre } from "../../types";
import { fetchMovies, fetchGenres } from "@/api/movies";
import Loading from "@/components/Loading";
import { normalizeTitle } from "@/api/movies";
import { generateKeySync } from "crypto";

const MoviePage = () => {
  const params = useParams();
  const movieName = params.movieId;
  const [movie, setMovie] = useState<MovieData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [genreName, setGenreName] = useState<string>('Unknown');

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!movieName) return;
        const [{ available, comingSoon }, genres ] = await Promise.all([
          fetchMovies(),
          fetchGenres(),
        ]);
        const allMovies = [...available, ...comingSoon];
        const movieData = allMovies.find(
          (movie: MovieData) => normalizeTitle(movie.title) === movieName
        );
        setMovie(movieData || null);
        setGenres(genres);

        if (movieData) {
          const genreName = genres.find(genre => genre.id === movieData.genre)?.name || 'Unknown';
          setGenreName(genreName);
        }

        setLoading(false);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
      }
    };

    loadData();
  }, [movieName]);

  if (loading) {
    return <Loading />;
  }

  if (!movie) {
    return <div className={styles.noMoviesMessage}>Movie not found</div>;
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.header}
        style={{ backgroundImage: `url(${movie.thumbnail})` }}
      >
        <div className={styles.buttons}>
          <a
            href="#"
            className={`${styles.button} ${styles.buttonTrailer}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Trailer
          </a>
          <a
            href={`/play/${movie.id}`}
            className={`${styles.button} ${styles.buttonPlay}`}
          >
            Play
          </a>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.addToList}>
          <span>+</span> <p className={styles.metadata}>Add to my list</p>
        </div>

        <div className={styles.metadata}>
          <ul className={styles.list}>
            <li>
              <strong> Rating:  </strong>
              {"★".repeat(movie.rating ?? 0)}
            </li>
            <li>
              <strong> Cast:  </strong>
              {movie.cast}
            </li>
            <li>
              <strong>Genre:</strong>  {genreName}
            </li>
          </ul>
          <div className={styles.title}>{movie.title}</div>
          <div className={styles.description}>{movie.description}</div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
