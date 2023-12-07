import { initializeApp } from 'firebase/app'
import { getAuth } from '@firebase/auth'
import { getStorage } from '@firebase/storage'
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// user정보를 담고있습니다. - firebase와 통신 했을 때 로그인 되어있으면 auth.currentUser가 객체 형태로 담겨져 있고 로그인이 안되어있으면 null 값입니다.
export const auth = getAuth(app)

// 이미지 저장하려고 storage를 불러왔습니다.
export const storage = getStorage(app)

// db안에 storage에 등록한 이미지 저장 주소와 text 등을 string으로 담고있는 Cloud firebase 입니다.
export const db = getFirestore(app)
