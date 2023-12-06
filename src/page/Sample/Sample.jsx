import styled from 'styled-components'

// mediaQuery 적용 어떻게 하는지 보고 파일 삭제 부탁드려요
function Sample() {
  return <StSample>샘플입니다. 화면을 줄였다 늘려보세요</StSample>
}

const StSample = styled.div`
  background-color: black;
  height: 400px;
  width: 100%;
  color: #fff;
  display: grid;
  place-content: center center;
  font-size: 40px;

  ${({ theme }) => theme.mediaQuery.md`
        background-color: red;
      `}
  ${({ theme }) => theme.mediaQuery.lg`
        background-color: pink;
      `};
`

export default Sample
