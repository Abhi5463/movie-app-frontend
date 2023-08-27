import React, { useState, useEffect, useMemo } from 'react';
import { getMovies } from '../api';
import MovieCard from '../components/MovieCard'; 
import './MovieList.css'; 
import debounce from "lodash.debounce";
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setMovies } from '../store/MovieSlice';
import { setUser, clearUser } from '../store/UserSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';


function MovieList() {
  // const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
const [selectedYear, setSelectedYear] = useState('');
const [sortCriteria, setSortCriteria] = useState('title'); 
const [sortOrder, setSortOrder] = useState('asc');

const navigate = useNavigate();
const dispatch = useDispatch();
const userId = useSelector((state)=> state.user.userId);
const movies = useSelector((state)=> state.movie.movies);

useEffect(() => {
  const storedUserData = localStorage.getItem('userData');
  if (storedUserData) {
    const { userId, token } = JSON.parse(storedUserData);
    dispatch(setUser({ userId, token }));
  }
}, [dispatch]);

  const debouncedFetchMovies = useMemo(() => {
    async function fetchMovies(query = '') {
      try {
        const response = await getMovies(query);
        setMovies(response.data);
        dispatch(setMovies(response.data));
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }

    return debounce((query) => fetchMovies(query), 500);
  }, [dispatch]);
  
  console.log("sorting movies by:" + sortCriteria);
  useEffect(() => {
    console.log("useEffect triggered");
    if (!userId) {
      navigate('/login');
      return;
    }

    debouncedFetchMovies(searchQuery);
    return () => {
      debouncedFetchMovies.cancel();
    };
  }, [userId, searchQuery, debouncedFetchMovies, sortCriteria, navigate]);


  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  const handleSort = () => {
    if (sortCriteria === 'title') {
      setSortCriteria('year');
      setSortOrder('asc');
    } else {
      setSortCriteria('title');
      setSortOrder('asc');
    }
  };

  const handleAddMovie= () =>{
  navigate('/add')
  }
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(clearUser());
    localStorage.removeItem('userData'); 
    navigate('/login'); 
  };
  
console.log(movies, "movies");
  return (
    <div className="movie-list-container">
      <div className= "header">
    <h2>Movie List</h2>
    <FontAwesomeIcon style={{ color: 'yellow',  fontSize: '1.5rem', marginRight: '10px' }} onClick={handleLogout} icon={faPowerOff} />
    </div>
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by title"
        value={searchQuery}
        onChange={handleInputChange}
      />
    </div>
  
    <div className="filters">
      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
      >
        <option value="">All Genres</option>
        <option value="Comedy">Comedy</option>
        <option value="Scifi">Scifi</option>
        <option value="Romance">Romance</option>
        <option value="Drama">Drama</option>
      </select>
  
      <input
        type="number"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
        placeholder="Year"
        className="year-input"
      />
    </div>

  
    <div className="buttons">
      <div className="watchlistBtn">
        <button onClick={() => navigate('/watchlist')}>Watchlist</button>
      </div>
      <div className="likedMovies">
        <button onClick={() => navigate('/liked')}>Liked Movies</button>
      </div>
      <button className="sort-button" onClick={handleSort}>
       Sort by {sortCriteria === 'title' ? 'Year' : 'Title'}
   </button>
   <button className="addMovie-button" onClick={handleAddMovie}>
      Add Movie
   </button>
    </div>
  
    <div className="movie-list">
  {movies
    .filter((movie) => {
      if (selectedGenre && movie.genre !== selectedGenre) {
        return false;
      }
      if (selectedYear && movie.year !== parseInt(selectedYear)) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      const aValue = a[sortCriteria];
      const bValue = b[sortCriteria];

      if (sortOrder === 'asc') {
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return aValue.localeCompare(bValue);
        } else {
          return aValue - bValue; // numeric value
        }
      } else {
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return bValue.localeCompare(aValue);
        } else {
          return bValue - aValue;
        }
      }
    })
    .map((movie) => (
      <MovieCard key={movie._id} movie={movie} showBtns={true}/>
    ))}
</div>

  </div>  
  );
}

export default MovieList;
