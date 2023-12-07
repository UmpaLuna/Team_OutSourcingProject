import { configureStore } from '@reduxjs/toolkit'
import sampleUser from '../modules/sample/sampleUserSlice'
import loginSlice from '../modules/login/loginSlice'
const store = configureStore({
  reducer: {
    sampleUser,
    loginSlice,
  },
})

export default store
