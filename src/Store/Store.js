import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './Slices/UserSlice.js'
import JobSlice from './Slices/JobSlice.js'
import ApplicationSlice from './Slices/ApplicationSlice.js'
export const store = configureStore({
  reducer: {
    user:UserReducer,
    job:JobSlice,
    application:ApplicationSlice
  },
})