import React from "react";
import Slider from "react-slick";
import { MoviesRowProps } from "@/app/types";
import styles from "./MovieSlider.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { normalizeTitle } from "@/api/movies";

const MovieSlider: React.FC<MoviesRowProps> = ({ movies }) => {
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  focusOnSelect: false, 
};

   // Función para acortar la descripción de la película
  const shortDescription = (description: string, maxLength: number) => {
    if (description.length <= maxLength) return description;
    const shorted = description.substr(
      0,
      description.lastIndexOf(" ", maxLength)
    );
    return `${shorted}...`;
  };

  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id} className={styles.slide}>
            <div
              className={styles.content}
              style={{ backgroundImage: `url(${movie.poster})` }}
            >
              <div className={styles.overlay}>
                <h2 className={styles.title}>{movie.title}</h2> {/* Título */}
                <p className={styles.description}> 
                  {shortDescription(movie.description, 165)}  {/* Descripción corta */}
                </p>
                 {/* Botón para descubrir más */}
                  <button 
                    className={styles.button}
                    onClick={() =>
                      (window.location.href = `/movies/${normalizeTitle(
                        movie.title
                      )}`)
                    }
                  >
                   Discover
                  </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MovieSlider;
