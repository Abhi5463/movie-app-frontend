import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieList from './pages/MovieList';
import MovieDetails from './pages/MovieDetails';
import MovieForm from './pages/MovieForm';
import Login from './pages/Login';
import Register from './pages/Register';
import WatchlistMovies from './pages/WatchlistMovies';
import LikedMovies from './pages/LikedMovies';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MovieList/>} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/add/:movieId" element={<MovieForm />} />
          <Route path="/add" element={<MovieForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/watchlist" element={<WatchlistMovies />} />
          <Route path="/liked" element={<LikedMovies />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
