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

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userSignIn(state, { payload }) {
      state.uid = payload.uid
      state.email = payload.email
      state.photoURL =
        payload.photoURL ||
        process.env.PUBLIC_URL + '/img/defaultProfileImg/avatar.jpg'
      // displayName값이 없으면 email로 대체 합니다.
      state.displayName = payload.displayName || payload.email
    },
    userSignOut(state) {
      console.log(initialState)
      return initialState
    },
    userCurrentState(state, { payload }) {
      state.currentUser = payload
    },
  },
})
export const { userSignIn, userSignOut, userCurrentState } = user.actions
export default user.reducer
