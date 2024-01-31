// all the api`s are placed here
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // react specific rtk query

export const apiSlice = createApi({
  reducerPath: "api", // it is default even we dont provide it, it wont affect us
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASEURL, // have to create it in env file
    //
    // tagTypes:['todos'] //add the name of one to be  cached
  }),
  endpoints: (builder) => ({
    // here we provide api end points
  }),
});

export const {} = apiSlice;
