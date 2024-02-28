import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const exercisesApi = createApi({
  reducerPath: "exercisesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getExercisesByMuscle: builder.query({
      query: (muscle) => ({
        url: `/exercises`,
        params: { muscle },
      }),
      providesTags: ["Exercises"],
    }),
  }),
});

export const {
  // GET /exercises?muscle=biceps
  useGetExercisesByMuscleQuery,
} = exercisesApi;
