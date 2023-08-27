import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getLikedMovies } from '../api'; 
import MovieCard from '../components/MovieCard';

function LikedMovies() {
  const userId = useSelector(state => state.user.userId);
//   const token = useSelector(state => state.user.token);
  const [likedMovies, setLikedMovies] = useState([]);

  useEffect(() => {
    async function fetchLikedMovies() {
      try {
        const response = await getLikedMovies(userId);
        console.log(response);
        setLikedMovies(response.data.likedMovies);
      } catch (error) {
        console.error('Error fetching liked movies:', error);
      }
    }

    fetchLikedMovies();
  }, [userId]);
console.log('liked', likedMovies);
  return (
    <div className="movie-list-container">
      <h2>Liked Movies</h2>
      <div className="movie-list">
        {likedMovies.map(movie => (
          <MovieCard key={movie._id} movie={movie} showBtns={false}/>
        ))}
      </div>
    </div>
  );
}

export default LikedMovies;
