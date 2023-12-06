import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

function SampleNavigate() {
  return (
    <>
      <StSample>
        <Link to="login">SampleLogin</Link>
        <Link to="home">SampleHome</Link>
        <Link to="detail/:id">SampleDetail</Link>
        <Link to="profile">SampleProfile</Link>
        <Link to="kakaoMap">SampleKaKaoMap</Link>
      </StSample>
      <Outlet />
    </>
  )
}

const StSample = styled.div`
  height: 100px;
  display: flex;
  width: 100%;
  color: #fff;
  font-size: 18px;
  gap: 20px;
  justify-content: center;
  a {
    color: #000;
    padding: 8px;
    border: 1px solid red;
    align-self: center;
  }
  ${({ theme }) => theme.mediaQuery.md`
        background-color: red;
      `}
  ${({ theme }) => theme.mediaQuery.lg`
        background-color: pink;
      `};
`

export default SampleNavigate
