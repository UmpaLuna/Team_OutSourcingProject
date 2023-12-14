import { QueryClient, QueryClientProvider } from 'react-query'
import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
const queryClient = new QueryClient()
function SampleNavigate() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <StSample>
          <Link to="login">SampleLogin</Link>
          <Link to="home">SampleHome</Link>
          <Link to="detail/:id">SampleDetail</Link>
          <Link to="profile">SampleProfile</Link>
          <Link to="kakaoMap">SampleKaKaoMap</Link>
          <Link to="infinityScroll">Sample무한스크롤</Link>
          <Link to="reactQuery">Sample무한스크롤을 React Query로</Link>
          <Link to="tutor">튜터님</Link>
        </StSample>
        <Outlet />
      </QueryClientProvider>
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
