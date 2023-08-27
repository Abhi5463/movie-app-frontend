import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieById } from '../api';
import './MovieDetails.css'; // Import the CSS file

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await getMovieById(id);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    }

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details-container">
      <h2 className="movie-details-title">Movie Details</h2>
      <h3 className="movie-details-info">Title: {movie.title}</h3>
      <p className="movie-details-info">Genre: {movie.genre}</p>
      <p className="movie-details-info">Year: {movie.year}</p>
      {movie.imageUrl && <img className="movie-details-image" src={movie.imageUrl} alt={movie.title} />}
      <div className="movie-details-text">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at risus in purus mattis aliquet. Cras nec
          commodo purus, nec efficitur turpis. Fusce hendrerit bibendum mi non fringilla. Sed sed diam turpis.
          Suspendisse dictum ante eu est ultricies, eu iaculis purus dictum. Nulla facilisi. Vestibulum ut purus eu
          ex volutpat auctor. Donec sit amet tincidunt tortor. Duis et metus eget libero pulvinar suscipit a eget
          justo. Sed nec justo quis arcu varius feugiat. Aliquam erat volutpat.
        </p>
        </div>
    </div>
  );
}

export default MovieDetails;
