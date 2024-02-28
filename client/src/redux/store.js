import { configureStore } from "@reduxjs/toolkit";
import { restaurantsApi } from "./services/restaurantsApi";
import { foodsApi } from "./services/foodsApi";
import { categoriesApi } from "./services/categoriesApi";
import { authApi } from "./services/authApi";
import authReducer from "./slices/authSlice";
import { usersApi } from "./services/usersApi";
import { exercisesApi } from "./services/exercisesApi";
import { recipesApi } from "./services/recipesApi";

const store = configureStore({
  reducer: {
    [restaurantsApi.reducerPath]: restaurantsApi.reducer,
    [foodsApi.reducerPath]: foodsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [exercisesApi.reducerPath]: exercisesApi.reducer,
    [recipesApi.reducerPath]: recipesApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([
      restaurantsApi.middleware,
      foodsApi.middleware,
      categoriesApi.middleware,
      authApi.middleware,
      categoriesApi.middleware,
      usersApi.middleware,
      exercisesApi.middleware,
      recipesApi.middleware
    ]);
  },
});

export default store;
