// Propiedades del contexto de diseño

export interface LayoutContextProps {
  showNavbarAndFooter: boolean;
}

// Información del usuario

export interface User {
  id: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

// Información de películas

export interface MovieData {
  highlighted: boolean;
  rating: number | null;
  poster: string;
  cast: string;
  thumbnail: string;
  description: string;
  id: string;
  genre: string;
  availableDate: string;
  title: string;
}

export interface MoviesRowProps {
  title: string;
  movies: MovieData[];
}

export interface FetchMoviesResult {
  available: MovieData[];
  comingSoon: MovieData[];
}

// Información de géneros

export interface Genres {
  genres: { id: string; name: string }[];
}
export interface Genre {
  id: string;
  name: string;
}

export interface GenreSelectorProps {
  genres: Genre[];
}
