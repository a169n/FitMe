import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const recipesApi = createApi({
  reducerPath: "recipesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getRecipesByQuery: builder.query({
      query: (query) => `/recipes?query=${query}`,
      providesTags: ["Recipes"],
    }),
  }),
});

export const {
  // GET /recipe?query=italian+wedding+soup
  useGetRecipesByQueryQuery,
} = recipesApi;
