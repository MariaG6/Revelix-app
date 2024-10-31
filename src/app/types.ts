export interface LayoutContextProps {
  showNavbarAndFooter: boolean;
}

export interface User {
  id: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface AuthLayoutProps {
  children: React.ReactNode;
}

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

export interface Genre {
  genres: { id: string, name: string }[];
}

export interface GenreSelectorProps {
  genres: Genre[];
}