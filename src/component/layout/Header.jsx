import React from 'react'
import * as St from '../../styled-component/layout/Header/StHeader'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <St.Header>
      <St.Logo>
        <Link to="/">
          <St.LogoImg src="/assets/images/logo.png" alt="로고" />
        </Link>
      </St.Logo>
      <St.ButtonContainer>
        <Link to="/login">
          <St.Button>로그인</St.Button>
        </Link>
        <Link to="/signup">
          <St.Button>회원가입</St.Button>
        </Link>
        <Link to="/mypage">
          <St.Button>마이페이지</St.Button>
        </Link>
      </St.ButtonContainer>
    </St.Header>
  )
}

export default Header
