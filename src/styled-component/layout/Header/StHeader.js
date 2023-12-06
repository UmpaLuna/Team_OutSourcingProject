import styled from 'styled-components'

// export const Header = styled.header`
//   /* ${(props) => props.theme.fontSize.xl} */
//   /* font-size: ${(props) => props.theme.fontSize.xl}; */
//   font-size: ${({ theme }) => theme.fontSize.xl};
//   ${({ theme }) => theme.mediaQuery.md`
//     font-size: ${({ theme }) => theme.fontSize.md};
//   `}
// `
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ccc;
`

export const Logo = styled.div`
  flex: 1;
`

export const LogoImg = styled.img`
  max-width: 80px;
`

export const ButtonContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`

export const Button = styled.button`
  margin-left: 1rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  text-decoration: none;
  font-weight: 600;
  color: ${({ theme }) => theme.Color.primary};
  &:hover {
    color: #fcd2eb; /* 호버 시 적용될 색상 */
  }
`
