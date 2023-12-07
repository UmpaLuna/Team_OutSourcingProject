import React from 'react'
import { useDispatch } from 'react-redux'
import { userLogOut } from '../redux/modules/login/loginSlice'
import { auth } from '../API/firebase/firebase.API'
import { useNavigate } from 'react-router-dom'

function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      // Firebase에서 로그아웃
      // 왜 signOut(auth)는 안되나요???
      await auth.signOut()

      // Redux 스토어에서 로그아웃 액션을 디스패치하여 사용자 상태 초기화
      dispatch(userLogOut())
      console.log('로그아웃 성공')
      navigate('/')
    } catch (error) {
      console.error('로그아웃 실패', error.message)
    }
  }

  return (
    <div>
      <div>Home</div>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  )
}

export default Home
