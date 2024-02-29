import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mailApi = createApi({
  reducerPath: "mailApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    sendRegisterEmail: builder.mutation({
      query: (recipient) => ({
        url: "/mail/register",
        method: "POST",
        body: { recipient },
      }),
    }),
    sendLoginEmail: builder.mutation({
      query: (recipient) => ({
        url: "/mail/login",
        method: "POST",
        body: { recipient },
      }),
    }),
  }),
});

export const {
  useSendRegisterEmailMutation,
  useSendLoginEmailMutation,
} = mailApi;
