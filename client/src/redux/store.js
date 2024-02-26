import { configureStore } from "@reduxjs/toolkit";
import { restaurantsApi } from "./services/restaurantsApi";
import { foodsApi } from "./services/foodsApi";
import { categoriesApi } from "./services/categoriesApi";
import { authApi } from "./services/authApi";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    [restaurantsApi.reducerPath]: restaurantsApi.reducer,
    [foodsApi.reducerPath]: foodsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([
      restaurantsApi.middleware,
      foodsApi.middleware,
      categoriesApi.middleware,
      authApi.middleware,
      categoriesApi.middleware,
    ]);
  },
});

export default store;
