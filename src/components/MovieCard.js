import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieCard.css'; 
import {deleteMovie as deleteMovieApi, addToWatchList } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faHeart, faEdit, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';
// import { likeMovie as likeMovieAction } from "../store/UserSlice";
import {useSelector, useDispatch} from 'react-redux';
import { likeMovie } from '../api'; 
import { deleteMovie as deleteMovieAction } from '../store/MovieSlice'; 

function MovieCard({ movie, showBtns }) {
  const [liked, setLiked] = useState(false);
  const [toWatch, setToWatch] = useState(false);
  const navigate = useNavigate();
  const userId = useSelector(state => state.user.userId);
  const dispatch = useDispatch();
  const handleCardClick = () => {
    navigate(`/movies/${movie._id}`);
  };
  // console.log(`Movie ${movie.title}: ${liked}`);
  const handleAddToWatchlist = async (movieId) => {
    try {
    setToWatch(true);
    await addToWatchList(userId, movieId);
    } catch (error) {
      console.error('Error adding to watchlist:', error);
    }
  };

  const handleLikeMovie = async (movieId) => {
    try {
     setLiked(true);
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
      await deleteMovieApi(movie._id);
      dispatch(deleteMovieAction(movie._id));
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const likedMovies = useSelector(state =>state.user.likedMovies);
  const watchlistedMovies = useSelector(state =>state.user.watchlistedMovies);
  console.log("redux user: ", useSelector(state => state.user));
  useEffect(()=> {
    if (Array.isArray(likedMovies)){
     const isLiked = likedMovies.some(mv => mv._id === movie._id);
     setLiked(isLiked);
    }
  },[likedMovies, movie._id]);

  useEffect(()=> {
    if (Array.isArray(watchlistedMovies)){
     const inWatchlist = watchlistedMovies.some(mv => mv._id === movie._id);
     setToWatch(inWatchlist);
    }
  },[watchlistedMovies, movie._id]);


  return (
<div className="movie-card" onClick={handleCardClick}>
  {movie.imageUrl && <img src={movie.imageUrl} alt={movie.title} />}

  <div className="movie-details">
    <h3 className="movie-title">{movie.title}</h3>
    <p className="movie-genre">Genre: {movie.genre}</p>
    <p className="movie-year">Year: {movie.year}</p>
  </div>

{ showBtns && <div className="movie-actions">
{toWatch ? (
      <FontAwesomeIcon
        icon={faCheck}
        className="action-icon"
        style={{ color: 'green', fontSize: '1.5rem', marginRight: '10px' }}
        // onClick={(e) => {
        //   e.stopPropagation();
        //   handleRemoveFromWatchlist(movie._id); // Implement this function to remove from watchlist
        // }}
      />
     ) : (
      <FontAwesomeIcon
        icon={faPlus}
        className="action-icon"
        style={{ color: 'yellow', fontSize: '1.5rem', marginRight: '10px' }}
        onClick={(e) => {
          e.stopPropagation();
          handleAddToWatchlist(movie._id);
        }}
      />
  )}
    {liked ? (
      <FontAwesomeIcon
        icon={faHeart}
        className="action-icon"
        style={{ color: 'red', fontSize: '1.5rem', marginRight: '10px' }}
      />
    ) : (
      <FontAwesomeIcon
        icon={faHeart}
        className="action-icon"
        style={{ color: 'yellow', fontSize: '1.5rem', marginRight: '10px' }}
        onClick={(e) => {
          e.stopPropagation();
          handleLikeMovie(movie._id);
        }}
      />
    )}
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
