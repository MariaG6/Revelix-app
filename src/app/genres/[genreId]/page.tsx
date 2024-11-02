'use client'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MovieData, Genre } from '@/app/types';
import MovieSlider from '@/components/Home/MovieSlider';
import MoviesRow from '@/components/Home/MoviesRow';
import { fetchGenres, fetchMovies, fetchHighlightedMovies, getMyList, findMoviesByIds  } from '@/api/movies';
import styles from '@/components/Home/HomeClient.module.css';
import Loading from '@/components/Loading';
import GenreSelector from '@/components/Home/GenreSelector';

const GenrePage = () => {
  const { genreId } = useParams();
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [highlightedMovies, setHighlightedMovies] = useState<MovieData[]>([]);
  const [comingSoonMovies, setComingSoonMovies] = useState<MovieData[]>([]);
  const [availableMovies, setAvailableMovies] = useState<MovieData[]>([]);
  const [myList, setMyList] = useState<string[]>([])
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!genreId) return;

        // Solicitudes a la API
        const [{ available, comingSoon }, genresData, highlightedMoviesData, myListData] = await Promise.all([
          fetchMovies(),
          fetchGenres(),
          fetchHighlightedMovies(),
          getMyList()
        ]);
        // Función para encontrar películas por sus IDs
        const moviesData = available.filter((movie: MovieData) => movie.genre === genreId);
        // Establecer valores en los estados
        setMovies(moviesData);
        setGenres(genresData);
        setComingSoonMovies(comingSoon);
        setHighlightedMovies(highlightedMoviesData);
        setAvailableMovies(available);
        setMyList(myListData.myList);

        setLoading(false); // Cambiar el estado de carga
      } catch (error) { // Manejo de errores
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
        setLoading(false); 
      }
    };

    loadData(); // Llama a la función para cargar los datos
  }, [genreId]); // Ejecuta el efecto cuando cambia el ID del género

  // Muestra componente Loading
  if (loading) {
    return <Loading />;
  }
  // Establece el nombre del género de la page
  const genreName = genres.find(genre => genre.id === genreId)?.name || 'Movies';
   // Encuentra las películas en la lista del usuario
  const myListMovies = findMoviesByIds([...availableMovies, ...comingSoonMovies], myList);

  return (
    <div className={styles.homeClientContainer}>
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <MovieSlider title='Highlighted Movies' movies={highlightedMovies} />
          <GenreSelector genres={genres} />
          {movies.length > 0 ? (
            <MoviesRow title={genreName} movies={movies} />
          ) : (
            <div className={styles.noMoviesMessage}>
            {genreName}{" "}
            movies not available now, check out coming soon.
          </div>
        )}
      </>
    )}
    <MoviesRow title="Coming Soon" movies={comingSoonMovies} />
    <MoviesRow title="My List" movies={myListMovies.movies} />
    </div>
  );
};

export default GenrePage;