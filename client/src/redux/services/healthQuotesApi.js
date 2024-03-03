import {
  createApi,
  fetchBaseQuery
} from "@reduxjs/toolkit/query/react";

export const healthQuotesApi = createApi({
  reducerPath: "healthQuotesApi",
  baseQuery: fetchBaseQuery({
      baseUrl: "http://localhost:3000"
  }),
  endpoints: (builder) => ({
      getHealthQuotes: builder.query({
          query: () => ({
              url: `/health-quotes`,
          }),
          providesTags: ["HealthQuotes"],
      }),
  }),
});

export const {
  useGetHealthQuotesQuery,
} = healthQuotesApi;