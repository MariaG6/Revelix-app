import React, { useState } from "react";
import styles from "./GenreSelector.module.css";

const GenreSelector: React.FC<GenreSelectorProps> = ({ genres, movies }) => {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const handleGenreClick = (genreId: string) => {
    setSelectedGenre(genreId);
  };

  const filteredMovies = selectedGenre
    ? movies.filter((movie) => movie.genre === selectedGenre)
    : [];

  return (
    <div className={styles.container}>
      <div className={styles.genreBtn}>
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleGenreClick(genre.id)}
            className={selectedGenre === genre.id ? "active" : ""}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreSelector;
