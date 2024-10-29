import React, { useState } from "react";
import styles from "./GenreSelector.module.css";
import { GenreSelectorProps } from "@/app/types";

const GenreSelector: React.FC<GenreSelectorProps> = ({ genres }) => {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const handleGenreClick = (genreId: string) => {
    setSelectedGenre(genreId);
  };

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
