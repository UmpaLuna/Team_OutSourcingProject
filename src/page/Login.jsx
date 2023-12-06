import React, { useState } from 'react'
// import { auth } from '../API/firebase/firebase.API'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      // await auth.signInWithEmailAndPassword(email, password)
      console.log('로그인 성공')
    } catch (error) {
      console.error('로그인 실패', error.message)
    }
  }

  return (
    <div>
      <h1>Login Page</h1>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
    </div>
  )
}

export default Login
