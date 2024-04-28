import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const messagesApi = createApi({
  reducerPath: "messageApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (token) => ({
        url: "/messages",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Messages"],
    }),
    createMessage: builder.mutation({
      query: ({ body, token }) => ({
        url: "/messages",
        method: "POST",
        body: body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Messages"],
    }),
    clearMessages: builder.mutation({
      query: () => ({
        url: "/messages",
        method: "DELETE",
      }),
      invalidatesTags: ["Messages"],
    }),
  }),
  tagTypes: ["Messages"],
});

export const {
  useGetMessagesQuery,
  useLazyGetMessagesQuery,
  useCreateMessageMutation,
  useClearMessagesMutation,
} = messagesApi;
