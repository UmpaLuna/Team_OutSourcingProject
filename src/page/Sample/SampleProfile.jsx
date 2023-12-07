import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { updateProfile } from 'firebase/auth'
import { uuidv4 } from '@firebase/util'
import { auth, storage } from '../../API/firebase/firebase.API'
import { sampleUserUpdateProfile } from '../../redux/modules/sample/sampleUserSlice'
function SampleProfile() {
  const [modal, setModal] = useState(false)
  return (
    <StContainer>
      {!modal ? (
        <SampleUserProfile setModal={setModal} />
      ) : (
        <SampleModal setModal={setModal} />
      )}
    </StContainer>
  )
}

export default SampleProfile

const SampleUserProfile = ({ setModal }) => {
  const sampleUser = useSelector((state) => state.sampleUser)
  return (
    <StDiv>
      <div>
        <img
          src={
            process.env.PUBLIC_URL +
            '/asset/img/sample/defaultProfileImg/avatar.jpg'
          }
          alt=""
        />
      </div>
      <p>닉네임 : {sampleUser.displayName}</p>
      <p>이메일 : {sampleUser.email}</p>
      <p>자기소개 : {sampleUser.intro || '없네요'}</p>
      <button onClick={() => setModal(true)}>수정하기</button>
    </StDiv>
  )
}

const SampleModal = ({ setModal }) => {
  const inputRef = useRef({})
  const sampleUser = useSelector((state) => state.sampleUser)
  const defaultImg =
    sampleUser.photoURL ||
    process.env.PUBLIC_URL + '/asset/img/sample/defaultProfileImg/avatar.jpg'
  const [previewImg, setPreviewImg] = useState()
  const imgRef = useRef()
  const [uploadImage, setUploadImage] = useState()
  const [progress, setProgress] = useState()
  const dispatch = useDispatch()
  // div를 누르면 input file이 클릭됩니다.
  const handleImageClick = () => {
    imgRef.current.click()
  }
  // 이미지 미리보기 입니다.
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    const preview = URL.createObjectURL(file)
    setPreviewImg(preview)
    setUploadImage(file)
  }
  // 이미지 미리보기 취소입니다.
  const handleRemovePreviewImage = () => {
    setPreviewImg(defaultImg)
    setUploadImage(null)
  }

  // firebase 기존이미지 삭제 하기
  const deletePreProfileImageOnStorage = async () => {
    // user에게 photoURLKey가 없다면 함수 종료 하자 - 처음 프로필 등록하는 거니까
    if (!sampleUser.profilePhotoURLKey) return
    try {
      const desertRef = ref(
        storage,
        `profileImage/${sampleUser.email}/${sampleUser.profilePhotoURLKey}`
      )
      await deleteObject(desertRef)
      console.log('삭제완료')
    } catch (error) {
      throw new Error('이전 이미지 삭제하다가 나버린', error)
    }
  }

  // 프로필 사진 Storage에 올리기
  const uploadProfileImageonStorage = async () => {
    try {
      // 나중에 삭제 할 때 사용 하려고 입니다.
      const profilePhotoURLKey = uuidv4()
      // 그냥 메타데이터 입니다.
      const metaData = {
        contentType: uploadImage.type,
      }
      const storageRef = ref(
        storage,
        `profileImage/${sampleUser.email}/${profilePhotoURLKey}`
      )
      const UploadTask = uploadBytesResumable(storageRef, uploadImage, metaData)
      UploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setProgress(progress)
        },
        (error) => {
          throw new Error(error)
        },
        () => {
          const downLoadUrl = getDownloadURL(UploadTask.snapshot.ref)
          return { downLoadUrl, profilePhotoURLKey }
        }
      )
    } catch (error) {
      throw new Error('프로필이미지 업로드 하다가', error)
    }
  }

  // profile수정 함수입니다.
  const updateProfileOnFireBase = async (photoURL) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: inputRef.current.displayName.value,
        photoURL,
      })
    } catch (error) {
      throw new Error('profileUpdate하다가 뜬', error)
    }
  }

  // 이미지 삭제, 이미지 업로드 후 다운받기, profile 수정하기를 통합하고, dispatch로 user Redux에 dispatch 해줍니다.

  const allInOneWithFirebaseAndUserRedux = async () => {
    try {
      await deletePreProfileImageOnStorage()
      const { downLoadUrl, profilePhotoURLKey } =
        await uploadProfileImageonStorage()
      await updateProfileOnFireBase(downLoadUrl)
      dispatch(
        sampleUserUpdateProfile({
          photoURL: downLoadUrl,
          profilePhotoURLKey,
          intro: inputRef.current.intro.value,
        })
      )
    } catch (error) {
      console.log(error)
    }
  }
  // modal창 띄우면 자동 포커스 입니다.
  useEffect(() => {
    inputRef.current.displayName.focus()
  }, [])

  return (
    <StModal>
      <div>
        {/* 이미지 */}
        <div onClick={handleImageClick}>
          <img src={previewImg || defaultImg} alt="" />

          <input
            type="file"
            ref={imgRef}
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>
        {/* 이미지 ENd */}
        <p>이메일 : {sampleUser.email}</p>
        <p>
          닉네임 :{' '}
          <input
            type="text"
            ref={(props) => (inputRef.current.displayName = props)}
          />
        </p>
        <p>
          자기소개 :{' '}
          <input
            type="text"
            ref={(props) => (inputRef.current.intro = props)}
          />
        </p>
        <p>UPload is {progress}% 입니당</p>
        <button onClick={allInOneWithFirebaseAndUserRedux}>저장하기</button>
        <button onClick={handleRemovePreviewImage}>이미지 취소하기</button>
        <button onClick={() => setModal(false)}>모달 지우기</button>
      </div>
    </StModal>
  )
}

const StContainer = styled.div`
  display: grid;
  place-content: center center;
  min-height: 100vh;
  position: relative;
  gap: 10px;
`
const StDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
  border: 1px solid ${({ theme: { Color } }) => Color.primary};
  padding: 20px;
  border-radius: 12px;
  > div {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  p {
    padding: 10px 0;
    border: 1px solid orange;
    border-radius: 12px;
  }

  button {
    padding: 10px;
    border: 1px solid pink;

    &:hover {
      transition: all 0.3s;
      background-color: pink;
      color: #fff;
    }
  }
`
const StModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.651);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  text-align: center;
  border: 1px solid ${({ theme: { Color } }) => Color.primary};
  padding: 20px;
  border-radius: 12px;
  > div {
    display: flex;
    flex-direction: column;
    gap: 20px;

    div {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      overflow: hidden;
      border: 1px solid black;

      img {
        width: 100%;
        object-fit: cover;
      }
    }

    p {
      padding: 10px 0;
      border: 1px solid orange;
      border-radius: 12px;
    }

    button {
      padding: 10px;
      border: 1px solid pink;

      &:hover {
        transition: all 0.3s;
        background-color: pink;
        color: #fff;
      }
    }
  }
  input {
    padding: 10px;
    z-index: 99;
  }
`
