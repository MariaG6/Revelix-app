"use client";
import { useEffect, useState } from "react";
import { MovieData, Genre } from "@/app/types";
import MovieSlider from "./MovieSlider";
import GenreSelector from "./GenreSelector";
import MoviesRow from "./MoviesRow";
import {
  fetchMovies,
  fetchGenres,
  classifyMoviesByGenre,
  fetchHighlightedMovies,
  getMyList,
  findMoviesByIds,
} from "@/api/movies";
import styles from "./HomeClient.module.css";
import Loading from "../Loading";
import { useRouter } from "next/navigation";

export default function HomeClient() {
  const [highlightedMovies, setHighlightedMovies] = useState<MovieData[]>([]);
  const [availableMovies, setAvailableMovies] = useState<MovieData[]>([]);
  const [comingSoonMovies, setComingSoonMovies] = useState<MovieData[]>([]);
  const [myList, setMyList] = useState<string[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        // Solicitudes a la API
        const [
          { available, comingSoon },
          genresData,
          highlightedMoviesData,
          myListData,
        ] = await Promise.all([
          fetchMovies(),
          fetchGenres(),
          fetchHighlightedMovies(),
          getMyList(),
        ]);
        // Establecer valores en los estados
        setAvailableMovies(available);
        setComingSoonMovies(comingSoon);
        setGenres(genresData);
        setHighlightedMovies(highlightedMoviesData);
        setMyList(myListData.myList);

        setLoading(false); // Cambiar el estado de carga
      } catch (error) {
        // Manejo de errores
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
        router.push("/login"); // Redirige al usuario a la página de inicio de sesión
      }
    };

    loadData(); // Llama a la función para cargar los datos
  }, []); // Ejecuta el efecto solo una vez al montar el componente

  // Muestra componente Loading
  if (loading) {
    return <Loading />;
  }

  // Clasifica las películas por género
  const moviesByGenre = classifyMoviesByGenre(availableMovies);

  // Encuentra las películas en la lista del usuario
  const myListMovies = findMoviesByIds(
    [...availableMovies, ...comingSoonMovies],
    myList
  );

  return (
    <div className={styles.homeClientContainer}>
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <MovieSlider title="Highlighted movies" movies={highlightedMovies} />  {/* Componente películas destacadas */}
          <GenreSelector genres={genres} /> {/* Componente para seleccionar géneros */}
          {genres.map((genre) => {
            const genreMovies = moviesByGenre[genre.id] || [];
            if (genreMovies.length === 0) return null;
            return ( 
              // Componente para mostrar las películas por género
              <MoviesRow
                key={genre.id}
                title={genre.name}
                movies={genreMovies}
              />
            );
          })}
          <MoviesRow title="Coming soon" movies={comingSoonMovies} /> {/* Componente para mostrar la lista de películas coming son */}
          <MoviesRow title="My List" movies={myListMovies.movies} /> {/* Componente para mostrar la lista de películas del usuario */}
        </>
      )}
    </div>
  );
}
