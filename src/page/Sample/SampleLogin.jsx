import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from '@firebase/auth'
import { auth } from '../../API/firebase/firebase.API'
import {
  sampleUserCurrentState,
  sampleUserSignIn,
  sampleUserSignOut,
} from '../../redux/modules/sample/sampleUserSlice'

function SampleLogin() {
  const [changeLogin, setChangeLogin] = useState('')
  const sampleUser = useSelector((state) => state.sampleUser)
  console.log(sampleUser)
  const dispatch = useDispatch()
  // 로그아웃 함수입니다.
  const onClickUserSignOut = async () => {
    // firebase에서 로그아웃해주기
    await signOut(auth)
    // user라는 전역state 초기화 해주기입니다.

    dispatch(sampleUserSignOut())
  }
  return (
    <>
      <Container>
        {changeLogin === '회원가입' ? (
          <SignUp setChangeLogin={setChangeLogin} />
        ) : (
          <SignIn />
        )}
        <div style={{ display: 'flex', gap: '20px' }}>
          <button
            onClick={() => setChangeLogin('로그인')}
            style={{
              backgroundColor: changeLogin === '로그인' ? 'blue' : null,
            }}
          >
            로그인 모달이 보이게 하기
          </button>
          <button
            onClick={() => setChangeLogin('회원가입')}
            style={{
              backgroundColor: changeLogin === '회원가입' ? 'orange' : null,
            }}
          >
            회원가입 모달이 보이게 하기
          </button>
          <button
            onClick={() => {
              setChangeLogin('로그아웃')
              onClickUserSignOut()
            }}
            style={{
              backgroundColor: changeLogin === '로그아웃' ? 'orange' : null,
            }}
          >
            로그아웃 하기
          </button>
        </div>
        <DivConfirmUser>
          <p> 현재</p>
          {sampleUser.email ? (
            <div>{`${sampleUser.email} 접속중`} </div>
          ) : (
            <div>'없습니다.'</div>
          )}
        </DivConfirmUser>
      </Container>
    </>
  )
}

export default SampleLogin

// 회원가입 컴포넌트
const SignUp = ({ setChangeLogin }) => {
  const signUpRef = useRef({})

  // 회원가입함수
  const onClickCreateUserWithEmail = async (userInfo) => {
    try {
      const credentialUser = await createUserWithEmailAndPassword(
        auth,
        userInfo.email.value,
        userInfo.password.value
      )
      // 회원가입 후  로그인 모달로 바꿔주려고 넣었습니다.
      setChangeLogin('로그인')
      alert(`${credentialUser.user.email}님 환영합니다.`)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>회원가입</div>
      <div>
        이메일 :
        <input type="text" ref={(email) => (signUpRef.current.email = email)} />
      </div>
      <div>
        비밀번호 :
        <input
          type="password"
          ref={(password) => (signUpRef.current.password = password)}
        />
      </div>
      <button onClick={() => onClickCreateUserWithEmail(signUpRef.current)}>
        회원가입 버튼
      </button>
    </form>
  )
}

// Login 컴포넌트
const SignIn = () => {
  const signRef = useRef({})
  const dispatch = useDispatch()
  const sampleUser = useSelector((state) => state.sampleUser)
  const onClickSignIn = async (userInfo) => {
    if (sampleUser.currentUser) return alert('이미 로그인 되어있어요')
    try {
      const validUser = await signInWithEmailAndPassword(
        auth,
        userInfo.email.value,
        userInfo.password.value
      )
      // state 변경이 있어야 아래의 useEffect안에 onAuthStateChanged를 사용하여
      // user의 정보를 넣어주어 state변경하려고요!!
      dispatch(sampleUserCurrentState(true))
      console.log(validUser)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (credential) => {
      if (credential) {
        const validatedUserInfo = {
          uid: credential.uid,
          displayName: credential.displayName || credential.email,
          email: credential.email,
          photoURL: credential.photoURL,
        }

        dispatch(sampleUserSignIn(validatedUserInfo))
      }
    })
  }, [sampleUser, dispatch])
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>로그인</div>
      <div>
        이메일 :
        <input type="text" ref={(email) => (signRef.current.email = email)} />
      </div>
      <div>
        비밀번호 :
        <input
          type="password"
          ref={(password) => (signRef.current.password = password)}
        />
      </div>
      <button onClick={() => onClickSignIn(signRef.current)}>
        로그인 버튼
      </button>
    </form>
  )
}
const Container = styled.div`
  display: grid;
  place-content: center center;
  min-height: 100vh;

  form {
    padding: 20px;
    width: 320px;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    > :first-child {
      width: 200px;
      border: 1px solid black;
      text-align: center;
      padding: 10px;
    }

    input {
      margin-left: 8px;
      padding: 8px;
    }
  }
  button {
    margin: 10px;
    width: 120px;
    height: 30px;
    border: 1px solid black;
    text-align: center;
    &:hover {
      background-color: #000;
      color: #fff;
    }
  }
`

const DivConfirmUser = styled.div`
  font-size: 24px;
  color: orange;
`
