import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: "user",
    initialState: {
        userId: null,
        token: null,
        likedMovies:[],
        watchlistedMovies:[]
    },
    reducers: {
        setUser: (state, action) => {
            state.userId = action.payload.userId;
            state.token = action.payload.token;
        },
        clearUser: (state, action) => {
            state.userId = null;
            state.token = null;
        },
        likeMovie: (state, action) => {
            const movies = action.payload;
            // console.log("payload is :", movies);
            state.likedMovies = movies;
        },
        watchlistMovies: (state, action) => {
            const movies = action.payload;
            state.watchlistedMovies = movies;
        }
    },
});

export const { setUser, clearUser, likeMovie, watchlistMovies } = userSlice.actions;

export default userSlice.reducer;
