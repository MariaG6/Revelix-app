import React from 'react';
import Slider from 'react-slick';
import styles from './MovieSlider.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MovieSlider({ movies }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings} className={styles.slider}>
      {movies.map(movie => (
        <div key={movie.id} className={styles.slide} style={{ backgroundImage: `url(${movie.poster})` }}>
          <div className={styles.content}>
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <button onClick={() => window.location.href = `/movies/${movie.id}`}>View Movie</button>
          </div>
        </div>
      ))}
    </Slider>
  );
}