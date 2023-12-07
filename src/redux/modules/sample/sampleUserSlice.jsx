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
  // user의 profile에 들어갈 자기소개입니다.
  intro: '',
  // user의 profile 사진 수정 할 때 사용 할 주소 값입니다. 수정 할 때 기존의 이미지는 삭제 해야 하기 때문입니다.
  profilePhotoURLKey: '',
}

const sampleUser = createSlice({
  name: 'user',
  initialState,
  reducers: {
    sampleUserSignIn(state, { payload }) {
      state.uid = payload.uid
      state.email = payload.email
      state.photoURL =
        payload.photoURL ||
        process.env.PUBLIC_URL +
          '/asset/img/sample/defaultProfileImg/avatar.jpg'
      state.displayName = payload.displayName
    },
    sampleUserSignOut(state) {
      console.log(initialState)
      return initialState
    },
    sampleUserCurrentState(state, { payload }) {
      state.currentUser = payload
    },
    sampleUserUpdateProfile(state, { payload }) {
      state.photoURL = payload.photoURL
      state.profilePhotoURLKey = payload.profilePhotoURLKey
      state.intro = payload.intro
    },
  },
})
export const {
  sampleUserSignIn,
  sampleUserSignOut,
  sampleUserCurrentState,
  sampleUserUpdateProfile,
} = sampleUser.actions
export default sampleUser.reducer
