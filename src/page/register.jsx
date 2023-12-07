import React, { useState } from 'react'
import * as St from '../styled-component/login/loginStyle'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from '@firebase/auth'
import { auth } from '../API/firebase/firebase.API'
import { userLogIn } from '../redux/modules/login/loginSlice'
import { useDispatch } from 'react-redux'

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const credentialUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      dispatch(
        userLogIn({
          uid: credentialUser.user.uid,
          email: credentialUser.user.email,
          displayName: credentialUser.user.displayName,
          photoURL: credentialUser.user.photoURL,
        })
      )

      alert(`${credentialUser.user.email}님 안녕하세요.`)

      navigate('/')
      console.log('로그인 성공')
    } catch (error) {
      alert('회원가입 실패')
      console.log('회원가입 실패', error.message)
    }
  }

  const handleToLogin = () => {
    navigate('/login')
  }

  return (
    <St.LoginContainer>
      <St.LoginFormContainer>
        <St.LoginTitle>회원가입</St.LoginTitle>
        <St.LoginForm>
          <St.InputBox
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <St.InputBox
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <St.ButtonBox>
            <St.LoginButton onClick={handleSubmit}>회원가입</St.LoginButton>
            <St.JoinButton onClick={handleToLogin}>로그인</St.JoinButton>
          </St.ButtonBox>
        </St.LoginForm>
      </St.LoginFormContainer>
    </St.LoginContainer>
  )
}

export default Register
