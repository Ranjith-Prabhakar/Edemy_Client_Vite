import {configureStore} from "@reduxjs/toolkit"
import { apiSlice } from './features/api/apiSlice'

export const store = configureStore({
  reducer:{
[apiSlice.reducerPath] : apiSlice.reducer // instead of exporting slice.reducer from api slice , it does here
  },
  devTools:false,
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware)
}) 
