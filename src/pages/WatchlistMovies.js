import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWatchlist } from '../api'; 
import MovieCard from '../components/MovieCard';
import { watchlistMovies as watchlistMoviesAction } from '../store/UserSlice';

function WatchlistMovies() {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.userId);

  useEffect(() => {
    async function fetchWatchlistMovies() {
      try {
        const response = await getWatchlist(userId);
        dispatch(watchlistMoviesAction(response.data.watchlist));
      } catch (error) {
        console.error('Error fetching watchlist movies:', error);
      }
    }
    fetchWatchlistMovies();
  }, [userId, dispatch]);
const watchlistedMovies = useSelector(state => state.user.watchlistedMovies);
console.log('Watchlist', watchlistedMovies);
  return (
    <div className="movie-list-container">
      <h2>Watchlist Movies</h2>
      <div className="movie-list">
        {watchlistedMovies?.map(movie => (
          <MovieCard key={movie._id} movie={movie} showBtns={false}/>
        ))}
      </div>
    </div>
  );
}

export default WatchlistMovies;
