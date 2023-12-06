import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: false,
  //user의 고유아이디
  uid: '',
  // user의 nickName
  displayName: null,
  // user의 이메일 또는 이메일로 로그인 할 때 사용하는 email
  email: '',
  // user의 profile사진 입니다.
  photoURL: null,
}

const sampleUser = createSlice({
  name: 'user',
  initialState,
  reducers: {
    sampleUserSignIn(state, { payload }) {
      state.uid = payload.uid
      state.email = payload.email
      state.photoURL = payload.photoURL
      state.displayName = payload.displayName
    },
    sampleUserSignOut(state) {
      console.log(initialState)
      return initialState
    },
    sampleUserCurrentState(state, { payload }) {
      state.currentUser = payload
    },
  },
})
export const { sampleUserSignIn, sampleUserSignOut, sampleUserCurrentState } =
  sampleUser.actions
export default sampleUser.reducer
