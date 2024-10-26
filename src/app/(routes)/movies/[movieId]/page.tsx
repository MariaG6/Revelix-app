import React from 'react';

function MovieIDPage({ params }: { params: { movieId: string } }) {
  console.log(params);
  return <div>Página de la Película: {params.movieId}</div>;
}

export default MovieIDPage;