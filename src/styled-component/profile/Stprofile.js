import styled from 'styled-components'

export const MyPageContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
`

export const UserInfo = styled.div`
  margin-bottom: 20px;
`

export const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`

export const Nickname = styled.span`
  font-size: 18px;
  font-weight: bold;
`

export const LogoutButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: #ea3267;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d81b60;
  }
`
