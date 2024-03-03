import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/users",
      }),
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
      }),
    }),
    getUserEmailByUsername: builder.query({
      query: (username) => ({
        url: "/user/email",
        method: "POST",
        body: { username },
      }),
    }),
    createUser: builder.mutation({
      query: (newUser) => ({
        url: "/user",
        method: "POST",
        body: newUser,
      }),
    }),
    updateUserById: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `/user/${id}`,
        method: "PUT",
        body: updates,
      }),
    }),
    deleteUserById: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
    }),
    searchUsers: builder.query({
      query: (searchString) => ({
        url: "/users/search",
        params: { searchString },
      }),
    }),
    makeUserAdminById: builder.mutation({
      query: (id) => ({
        url: `/user/${id}/make-admin`,
        method: "PUT",
      }),
    }),
    removeUserAdminById: builder.mutation({
      query: (id) => ({
        url: `/user/${id}/remove-admin`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserEmailByUsernameQuery,
  useLazyGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserByIdMutation,
  useDeleteUserByIdMutation,
  useSearchUsersQuery,
  useMakeUserAdminByIdMutation,
  useRemoveUserAdminByIdMutation,
} = usersApi;
