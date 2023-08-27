import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movies: [],
  },
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    addMovie: (state, action) => {
      state.movies.push(action.payload);
    },
    editMovie: (state, action) => {
      const { id, updatedMovie } = action.payload;
      const index = state.movies.findIndex(movie => movie._id === id);
      if (index !== -1) {
        state.movies[index] = { ...state.movies[index], ...updatedMovie };
      }
    },
    deleteMovie: (state, action) => {
      const id = action.payload;
      state.movies = state.movies.filter(movie => movie._id !== id);
    },
  },
});

export const { setMovies, addMovie, editMovie, deleteMovie } = movieSlice.actions;

export default movieSlice.reducer;
