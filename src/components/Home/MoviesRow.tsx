import React from 'react';
import { MoviesRowProps } from '@/app/types';
import styles from './MoviesRow.module.css';
import Image from 'next/image';

const MoviesRow: React.FC<MoviesRowProps> = ({ title, movies }) => {
  return (
    <div className={styles.moviesRowContainer}>
      <h2 className={styles.rowTitle}>{title}</h2>
      <div className={styles.moviesRow}>
        {movies.map(movie => (
          <a key={movie.id} href={`/movies/${movie.id}`} className={styles.movieThumbnail}>
            <Image src={movie.thumbnail} alt={movie.title} width={261} height={386} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default MoviesRow;
