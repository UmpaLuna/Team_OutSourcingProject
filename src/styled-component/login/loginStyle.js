import styled from 'styled-components'

export const LoginContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
  margin: 100px auto;
`

export const LoginFormContainer = styled.div`
  margin: 0 auto;
  height: 500px;
  width: 450px;
`

export const LoginForm = styled.form`
  display: block;
  margin-top: 100px;
  height: 310px;
  text-align: center;
`

export const InputBox = styled.input`
  display: block;
  width: 70%;
  outline: none;
  border: none;
  border-bottom: 1px solid #7d7d7d;
  margin: 5px auto;
  padding: 5px;
  font-size: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  text-align: left;
  line-height: 1.5;
`

export const LoginButton = styled.button`
  width: 70%;
  height: 30px;
  outline: 0;
  background: none;
  background-color: #ea3267;
  border-radius: 15px;
  color: white;
  font-weight: bold;
  font-size: 14px;
  padding: 4px 12px 5px 12px;
  -webkit-transition: all 0.1s ease-out;
  transition: all 0.1s ease-out;

  &:hover {
    border: 1px solid #ea3267;
    color: #ea3267;
    background-color: white;
  }
`

export const JoinButton = styled.button`
  margin-top: 10px;
  width: 70%;
  height: 30px;
  outline: 0;
  background: none;
  background-color: #ea3267;
  border-radius: 15px;
  color: white;
  font-weight: bold;
  font-size: 14px;
  padding: 4px 12px 5px 12px;
  -webkit-transition: all 0.1s ease-out;
  transition: all 0.1s ease-out;

  &:hover {
    border: 1px solid #ea3267;
    color: #ea3267;
    background-color: white;
  }
`

export const LoginTitle = styled.h1`
  font-size: 2em;
  margin-top: 20px;
  padding: 20px;
  text-align: center;
`

export const SocialButtonDiv = styled.div`
  margin: 20px auto;
  width: 250px;

  cursor: pointer;
  display: flex;
  justify-content: space-evenly;
`

export const SocialImg = styled.img`
  width: 60px;
  height: 60px;
`
export const ButtonBox = styled.div`
  margin-top: 20px;
`
