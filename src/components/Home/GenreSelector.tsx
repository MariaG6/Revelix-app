import React from "react";
import styles from "./GenreSelector.module.css";
import { GenreSelectorProps } from "@/app/types";
import { useRouter } from "next/navigation";

const GenreSelector: React.FC<GenreSelectorProps> = ({ genres }) => {
  const router = useRouter();

  // Función para manejar la selección de un género
  const handleGenreSelect = (genreId: string) => {
    router.push(`/genres/${genreId}`);
  };

  return (
    <div className={styles.genreSelector}>
      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => handleGenreSelect(genre.id)}
          className={styles.genreButton}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default GenreSelector;
