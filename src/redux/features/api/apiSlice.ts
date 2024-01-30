import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { BASEURL } from "../../fileToBeDeleted"

export const apiSlice = createApi({
  reducerPath:"api",
  baseQuery:fetchBaseQuery({
    baseUrl:BASEURL // have to create it in env file
  }),
  endpoints:(builder) => ({})
})

export const {} = apiSlice