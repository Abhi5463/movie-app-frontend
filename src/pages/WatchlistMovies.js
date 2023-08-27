import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getWatchlist } from '../api'; 
import MovieCard from '../components/MovieCard';

function WatchlistMovies() {
  const userId = useSelector(state => state.user.userId);
//   const token = useSelector(state => state.user.token);
  const [watchlistMovies, setWatchlistMovies] = useState([]);

  useEffect(() => {
    async function fetchWatchlistMovies() {
      try {
        const response = await getWatchlist(userId);
        console.log(response);
        setWatchlistMovies(response.data.watchlist);
      } catch (error) {
        console.error('Error fetching watchlist movies:', error);
      }
    }

    fetchWatchlistMovies();
  }, [userId]);
console.log('Watchlist', watchlistMovies);
  return (
    <div className="movie-list-container">
      <h2>Watchlist Movies</h2>
      <div className="movie-list">
        {watchlistMovies?.map(movie => (
          <MovieCard key={movie._id} movie={movie} showBtns={false}/>
        ))}
      </div>
    </div>
  );
}

export default WatchlistMovies;
