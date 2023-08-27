import axios from 'axios';

const api = axios.create({
  baseURL: 'https://movie-app-backend-m4zk.onrender.com/api', 
});

const user = axios.create({
  baseURL: 'https://movie-app-backend-m4zk.onrender.com/user',
})

export const getMovies = (query) => api.get('/movies', { params: { query } });
export const getMovieById = (id) => api.get(`/movies/${id}`);
export const addMovie = (movieData) => api.post('/movies', movieData);
export const updateMovie = (id, movieData) => api.put(`/movies/${id}`, movieData);
export const deleteMovie = (id) => api.delete(`/movies/${id}`);
export const loginUser = (email, password) => user.post('/signIn', { email, password });
export const registerUser = (username, email, password) => user.post('/create-user', { username, email, password });
export const likeMovie = (userId, movieId) => user.post(`/like/${movieId}`, { userId, movieId });
export const addToWatchList = (userId, movieId) => user.post(`/watchlist/${movieId}`, { userId, movieId });
export const getWatchlist = (userId) => user.get(`/watchlist/${userId}`);
export const getLikedMovies = (userId) => user.get(`/liked-movies/${userId}`);

