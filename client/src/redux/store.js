import { configureStore } from "@reduxjs/toolkit";
import { restaurantsApi } from "./services/restaurantsApi";
import { foodsApi } from "./services/foodsApi";
import { categoriesApi } from "./services/categoriesApi";

const store = configureStore({
  reducer: {
    [restaurantsApi.reducerPath]: restaurantsApi.reducer,
    [foodsApi.reducerPath]: foodsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([
      restaurantsApi.middleware,
      foodsApi.middleware,
      categoriesApi.middleware
    ]);
  },
});

export default store;
