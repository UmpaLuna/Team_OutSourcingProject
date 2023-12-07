import { configureStore } from '@reduxjs/toolkit'
import sampleUser from '../modules/sample/sampleUserSlice'
const store = configureStore({
  reducer: {
    sampleUser,
  },
})

export default store
