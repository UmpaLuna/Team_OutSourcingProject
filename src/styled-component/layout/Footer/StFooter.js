import styled from 'styled-components'

export const FooterContainer = styled.footer`
  background-color: #ea3267;
  padding: 20px;
  color: white;
  position: fixed;
  bottom: 0;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.sm};
`

export const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`

export const ContactInfo = styled.div`
  line-height: 1.5em;
  flex-basis: 50%;
  ${({ theme }) => theme.mediaQuery.md`
     flex-basis: 100%;
    margin-bottom: 20px;
   `}/* @media (max-width: 768px) {
    flex-basis: 100%;
    margin-bottom: 20px;
  } */
`

export const ContactTitle = styled.h3`
  margin-bottom: 10px;
`

export const Address = styled.p`
  margin-bottom: 5px;
`

export const LegalInfo = styled.div`
  line-height: 1.5em;
  flex-basis: 50%;
  text-align: right;
  @media (max-width: 768px) {
    flex-basis: 100%;
    text-align: left;
  }
`

export const Copyright = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  margin-top: 10px;
`
