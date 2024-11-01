"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./MoviePage.module.css";
import { MovieData, Genre } from "../../types";
import {
  normalizeTitle,
  fetchMovies,
  fetchGenres,
  addToMyList,
  removeFromMyList,
  getMyList,
} from "@/api/movies";
import Loading from "@/components/Loading";
import {formatDate} from "@/api/services";

const MoviePage = () => {
  const params = useParams();
  const movieName = params.movieId;
  const [movie, setMovie] = useState<MovieData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [genreName, setGenreName] = useState<string>("Unknown");
  const [myList, setMyList] = useState<string[]>([]);
  const [isInMyList, setIsInMyList] = useState<boolean>(false);
  const [comingSoonMovies, setComingSoonMovies] = useState<MovieData[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!movieName) return;
        const [{ available, comingSoon }, genres] = await Promise.all([
          fetchMovies(),
          fetchGenres(),
        ]);
        const allMovies = [...available, ...comingSoon];
        const movieData = allMovies.find(
          (movie: MovieData) => normalizeTitle(movie.title) === movieName
        );
        setMovie(movieData || null);
        setGenres(genres);
        setComingSoonMovies(comingSoon);

        const myListData = await getMyList();
        setMyList(Array.isArray(myListData) ? myListData : []);

        if (movieData) {
          const genreMovieTitle =
            genres.find((genre) => genre.id === movieData.genre)?.name ||
            "Unknown";
          setGenreName(genreMovieTitle);
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

  const handleAddToMyList = async () => {
    if (movie) {
      try {
        const updatedMyList = await addToMyList(movie.id);
        setMyList(updatedMyList);
      } catch (error) {
        console.error("Error adding movie to MyList:", error);
      }
    }
  };

  const handleRemoveFromMyList = async () => {
    if (movie) {
      try {
        const updatedMyList = await removeFromMyList(movie.id);
        setMyList(updatedMyList);
      } catch (error) {
        console.error("Error removing movie from MyList:", error);
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!movie) {
    return <div className={styles.noMoviesMessage}>Movie not found</div>;
  }

  // ComingSoon Movies
  const isComingSoon = comingSoonMovies.some((m) => m.id === movie.id); 
  const availableDate = isComingSoon ? formatDate(comingSoonMovies.find((m) => m.id === movie.id)?.availableDate || '') : null;

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
          {isComingSoon ? (
            <div className={` ${styles.buttonComingSoon}`}>
              Coming Soon {availableDate}
            </div>
          ) : (
            <a
              href={`/play/${movie.id}`}
              className={`${styles.button} ${styles.buttonPlay}`}
            >
              Play
            </a>
          )}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.addToList}>
          <button
            className={styles.buttonList}
            onClick={isInMyList ? handleRemoveFromMyList : handleAddToMyList}
          >
            <span className={styles.plusSign}>+</span>
            <p className={styles.metadata}>
              {isInMyList ? "Remove from My List" : "Add to My List"}
            </p>
          </button>
        </div>

        <div className={styles.metadata}>
          <ul className={styles.list}>
            <li>
              <strong> Rating: </strong>
              {"★".repeat(movie.rating ?? 0)}
            </li>
            <li>
              <strong> Cast: </strong>
              {movie.cast}
            </li>
            <li>
              <strong>Genre:</strong> {genreName}
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
