import React from 'react';
import { MoviesRowProps } from '@/app/types';
import styles from './MoviesRow.module.css';
import Image from 'next/image';
import { normalizeTitle } from '@/api/movies';

const MoviesRow: React.FC<MoviesRowProps> = ({ title, movies }) => {
  return (
    <div className={styles.moviesRowContainer}>
      <h2 className={styles.rowTitle}>{title}</h2> {/* Título de la fila de películas */}
      <div className={styles.moviesRow}>  {/* Contenedor de la fila de películas */}
        {movies.map(movie => (
          <a key={movie.title} href={`/movies/${normalizeTitle(movie.title)}`} className={styles.movieThumbnail}>
            <Image src={movie.thumbnail} alt={movie.title} width={261} height={386} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default MoviesRow;