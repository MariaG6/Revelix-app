"use client";

import { useEffect, useState } from "react";
import { MovieData } from "@/app/types";
import MovieSlider from "./MovieSlider";
import { getJwtToken } from "@/api/auth/route";

export default function HomeClient() {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = getJwtToken();

        const res = await fetch("/api/movies", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        const data: MovieData[] = await res.json();

        // Movies highlighted = true
        const highlightedMovies = data.filter(movie => movie.highlighted);
        setMovies(highlightedMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Failed to fetch movies. Please try again later.");
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <MovieSlider movies={movies} />
        </>
      )}
    </div>
  );
}