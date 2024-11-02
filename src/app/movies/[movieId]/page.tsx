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
import { FaStar, FaPlus, FaCheck } from "react-icons/fa";

const MoviePage = () => {
  const params = useParams();
  const movieName = params.movieId;
  const [movie, setMovie] = useState<MovieData | null>(null);
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

        // Solicitudes a la API
        const [{ available, comingSoon }, genres, myList] = await Promise.all([
          fetchMovies(),
          fetchGenres(),
          getMyList()
        ]);

        const allMovies = [...available, ...comingSoon];
        const movieData = allMovies.find( // Encontrar película por su título
          (movie: MovieData) => normalizeTitle(movie.title) === movieName
        );
        // Establecer valores en los estados
        setMovie(movieData || null);
        setGenres(genres);
        setComingSoonMovies(comingSoon);
        setMyList(myList)

        if (movieData) {
          const genreMovieTitle = // Encontrar el nombre del género de la película
            genres.find((genre) => genre.id === movieData.genre)?.name ||
            "Unknown";
          setGenreName(genreMovieTitle);

          // Verificar si la película está en la lista del usuario
          const arrayList = myList.myList || [];
          const responseList = arrayList.includes(movieData.id);
          setIsInMyList(responseList)
        }

        setLoading(false); // Cambiar el estado de carga
      } catch (error) { // Manejo de errores
        console.error("Error fetching data:", error);
        console.log("Failed to fetch data. Please try again later.");
        setLoading(false);
      }
    };

    loadData();  // Llama a la función para cargar los datos
  }, [movieName]); // Ejecuta el efecto cuando cambia el movieName

  // Agregar película a la lista del usuario
  const handleAddToMyList = async () => {
    if (movie) {
      try {
        const updatedMyList = await addToMyList(movie.id);
        setMyList(updatedMyList);

        // Verificar si la película está en la lista del usuario
        const arrayList = updatedMyList.myList || [];
        const responseList = arrayList.includes(movie.id);
        setIsInMyList(responseList)

      } catch (error) {
        console.error("Error adding movie to MyList:", error);
      }
    }
  };

  // Eliminar película de la lista del usuario
  const handleRemoveFromMyList = async () => {
    if (movie) {
      try {
        const updatedMyList = await removeFromMyList(movie.id);
        setMyList(updatedMyList);

        // Verificar si la película está en la lista del usuario
        const arrayList = updatedMyList.myList || [];
        const responseList = arrayList.includes(movie.id);
        setIsInMyList(responseList)
      } catch (error) {
        console.error("Error removing movie from MyList:", error);
      }
    }
  };

    // Muestra componente Loading
  if (loading) {
    return <Loading />;
  }

  // Mensaje de película no encontrada
  if (!movie) {
    return <div className={styles.noMoviesMessage}>Movie not found</div>; 
  }

  // Verifica si la película es coming soon
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
            <span className={styles.plusSign}>{isInMyList ? <FaStar color="var(--background-color-purple)" /> : <FaPlus />}</span>
            <p className={styles.metadata}>
              {isInMyList ? "Remove from My List" : "Add to My List"} 
            </p>
          </button>
        </div>

        <div className={styles.metadata}>
          <ul className={styles.list}>
            <li>
              <strong> Rating: </strong>
              {Array.from({ length: movie.rating ?? 0 }).map((_, index) => (
                <FaStar key={index} color="gold" />
              ))}
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
