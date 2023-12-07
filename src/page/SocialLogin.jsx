import React from 'react'
import * as St from '../styled-component/login/loginStyle'
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth'
import { useState } from 'react'
import { auth } from '../API/firebase/firebase.API'

const SocialLogin = () => {
  //   const [userData, setUserData] = useState(null)

  //   export const googleLogin= () => {
  //     const provider = new firebase.auth.GoogleAuthProvider();
  //     return auth.signInWithPopup(provider);
  //   }
  return (
    <St.SocialButtonDiv>
      <button>
        <figure>
          <St.SocialImg src="/asset/img/login/google.svg" />
        </figure>
      </button>

      <button>
        <figure>
          <St.SocialImg src="/asset/img/login/github.svg" />
        </figure>
      </button>
    </St.SocialButtonDiv>
  )
}

export default SocialLogin
