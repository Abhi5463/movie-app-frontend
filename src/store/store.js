import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./UserSlice";
import movieReducer from "./MovieSlice";
console.log(userReducer);
export const store = configureStore({
    reducer: {
        user: userReducer,
        movie: movieReducer,
    },
});
