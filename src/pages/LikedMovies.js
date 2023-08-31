import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from '../components/MovieCard';
import { getLikedMovies } from '../api';
import { likeMovie as likeMovieAction } from '../store/UserSlice';

function LikedMovies() {
  const dispatch = useDispatch();
  const userId = useSelector((state)=> state.user.userId);
  useEffect(() => {
    console.log("use effect was triggered!!!!!!!!!!!!!!!!")
    async function fetchLikedMovies() {
      try {
        const response = await getLikedMovies(userId);
        dispatch(likeMovieAction(response.data.likedMovies));
      } catch (error) {
        console.error('Error fetching liked movies:', error);
      }
    }
    fetchLikedMovies();
  }, [userId, dispatch]);
const likedMovies = useSelector(state => state.user.likedMovies);
// console.log('liked', likedMovies);
  return (
    <div className="movie-list-container">
      <h2>Liked Movies</h2>
      <div className="movie-list">
        {likedMovies?.map(movie => (
          <MovieCard key={movie._id} movie={movie} showBtns={false}/>
        ))}
      </div>
    </div>
  );
}

export default LikedMovies;
