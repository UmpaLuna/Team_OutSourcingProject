import { configureStore } from '@reduxjs/toolkit'
import sampleUser from '../modules/sample/sampleUserSlice'
const store = configureStore({
  reducer: {
    user: sampleUser,
  },
})

export default store
