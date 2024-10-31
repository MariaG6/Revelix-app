'use client'
import React, { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import styles from './MoviePage.module.css';
import { MovieData } from '../../types';

function MovieIDPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<MovieData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (movieId) {
      const fetchMovie = async () => {
        try {
          const res = await fetch(`/api/movies/${movieId}`);
          const data: MovieData = await res.json();
          setMovie(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching movie:', error);
          setLoading(false);
        }
      };

      fetchMovie();
    }
  }, [movieId]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!movie) {
    return <div className={styles.error}>Movie not found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header} style={{ backgroundImage: `url(${movie.thumbnail})` }}>
        <div className={styles.buttons}>
          <a href='#' className={`${styles.button} ${styles.buttonTrailer}`} target="_blank" rel="noopener noreferrer">Trailer</a>
          <a href={`/play/${movie.id}`} className={`${styles.button} ${styles.buttonPlay}`}>Play</a>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.addToList}>
          <span>+</span> Add to my list
        </div>
         {'★'.repeat(movie.rating ?? 0)}</div>
        <div className={styles.metadata}>Cast: {movie.cast} | Genre: {movie.genre}</div>
        <div className={styles.title}>{movie.title}</div>
        <div className={styles.description}>{movie.description}</div>
      </div>
  );
}

export default MovieIDPage;