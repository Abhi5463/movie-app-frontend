import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieCard.css'; 
import {deleteMovie as deleteMovieApi, addToWatchList, likeMovie } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faHeart, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
// import { deleteMovie } from "../store/MovieSlice";
import {useSelector, useDispatch} from 'react-redux';
// import {  } from '../api'; 
import { deleteMovie as deleteMovieAction } from '../store/MovieSlice'; 

function MovieCard({ movie, showBtns }) {
  const navigate = useNavigate();
  const userId = useSelector(state => state.user.userId);
  const dispatch = useDispatch();
  const handleCardClick = () => {
    navigate(`/movies/${movie._id}`);
  };

  const handleAddToWatchlist = async (movieId) => {
    try {
    await addToWatchList(userId, movieId);
    } catch (error) {
      console.error('Error adding to watchlist:', error);
    }
  };

  const handleLikeMovie = async (movieId) => {
    try {
     await likeMovie(userId, movieId);
    } catch (error) {
      console.error('Error liking the movie:', error);
    }
  };

  const handleEditMovie = () => {
    navigate(`/add/${movie._id}`);
  };
  
  
  
  const handleDeleteMovie = async () => {
    try {
      // Delete movie from API
      await deleteMovieApi(movie._id);
  
      // Update movies in Redux store
      dispatch(deleteMovieAction(movie._id));
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };
  

  return (
<div className="movie-card" onClick={handleCardClick}>
  {movie.imageUrl && <img src={movie.imageUrl} alt={movie.title} />}

  <div className="movie-details">
    <h3 className="movie-title">{movie.title}</h3>
    <p className="movie-genre">Genre: {movie.genre}</p>
    <p className="movie-year">Year: {movie.year}</p>
  </div>

{ showBtns && <div className="movie-actions">
  <FontAwesomeIcon
          icon={faPlus}
          className="action-icon"
          style={{ color: 'yellow',  fontSize: '1.5rem', marginRight: '10px' }}
          onClick={(e) => {
            e.stopPropagation();
            handleAddToWatchlist(movie._id);
          }}
        />
        <FontAwesomeIcon
          icon={faHeart}
          className="action-icon"
          style={{ color: 'yellow',  fontSize: '1.5rem', marginRight: '10px' }}
          onClick={(e) => {
            e.stopPropagation();
            handleLikeMovie(movie._id);
          }}
        />
        <FontAwesomeIcon
          icon={faEdit}
          className="action-icon"
          style={{ color: 'yellow',  fontSize: '1.5rem', marginRight: '10px' }}
          onClick={(e) => {
            e.stopPropagation();
            handleEditMovie(movie._id);
          }}
        />
        <FontAwesomeIcon
          icon={faTrash}
          className="action-icon"
          style={{ color: 'yellow',  fontSize: '1.5rem' }}
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteMovie(movie._id);
          }}
        />

  </div>}
</div>
  );
}

export default MovieCard;
