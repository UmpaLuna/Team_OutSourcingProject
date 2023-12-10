import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../API/firebase/firebase.API'
function SampleReactQuery() {
  // react-query를 이용해서 데이터들을 일딴 계속 불러와 보자
  const [test, setTest] = useState()
  const getPostsOnFirebase = async (number) => {
    console.log('ssssssssss')
    const q = query(
      collection(db, 'data'),

      where('completed', 'array-contain', 'true')
    )
    const querySnapshot = await getDocs(q)
    console.log(querySnapshot)
    let arr = []
    querySnapshot.forEach((doc) => {
      // 가져온 모든 문서들을 확인
      console.log(doc.id, ' => ', doc.data())
      arr.push(doc.data())
    })
    console.log(arr)
  }
  useEffect(() => {
    getPostsOnFirebase()
  }, [])

  return <div>SampleReactQuery</div>
}

export default SampleReactQuery
//  일딴 등록 한번 해줍니다.
//   const postFirebase = async () => {
//     try {
//       const posts = await getData()
//       const obj = { posts: posts }

//       // 데이터는 setDoc과 addDoc으로 추가해 줄 수 있다. 두 함수의 차이점은, setDoc의 경우 ID를 직접 지정할 수 있으나, addDoc은 아이디가 자동으로 생성 된다는 것이다.
//       await setDoc(doc(db, 'data', 'posts'), obj)
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   useEffect(() => {
//     postFirebase()
//   }, [])
// const getData = async () => {
//       const res = await axios.get('https://jsonplaceholder.typicode.com/todos')
//       return res.data
//     }
