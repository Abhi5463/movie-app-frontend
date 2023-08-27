import React, { useState, useEffect } from 'react';
import { addMovie, updateMovie, getMovieById } from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import './MovieForm.css';

function MovieForm() {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState({
    title: '',
    genre: '',
    year: '',
    imageUrl: '',
  });

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await getMovieById(movieId);
        setMovieData(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };
    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (movieId) {
        await updateMovie(movieId, movieData);
      } else {
        await addMovie(movieData);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving movie:', error);
    }
  };

  return (
    <div className="movie-form-container">
    <div className="movie-form-card">
      <h2>{movieId ? 'Edit Movie' : 'Add New Movie'}</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={movieData.title}
          onChange={handleInputChange}
          required
        />

        <label>Genre:</label>
        <input
          type="text"
          name="genre"
          value={movieData.genre}
          onChange={handleInputChange}
          required
        />

        <label>Year:</label>
        <input
          type="number"
          name="year"
          value={movieData.year}
          onChange={handleInputChange}
          required
        />

        <label>Image URL:</label>
        <input
          type="text"
          name="imageUrl"
          value={movieData.imageUrl}
          onChange={handleInputChange}
        />

        <button type="submit">
          {movieId ? 'Save Changes' : 'Add Movie'}
        </button>
      </form>
    </div>
    </div>
  );
}

export default MovieForm;
