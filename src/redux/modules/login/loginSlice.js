import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: false,
  uid: '',
  displayName: null,
  email: '',
  photoURL: null,
  profileIntro: '',
  profilePhotoURLKey: '',
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogIn(state, { payload }) {
      state.uid = payload.uid
      state.email = payload.email
      state.photoURL =
        payload.photoURL ||
        process.env.PUBLIC_URL + '/asset/img/login/profileDefaultImg.jpeg'
      state.displayName = payload.displayName
    },

    userLogOut(state) {
      return initialState
    },

    userCurrentState(state, { payload }) {
      state.currentUser = payload
    },
  },
})

export const { userLogIn, userLogOut, userCurrentState } = user.actions
export default user.reducer
