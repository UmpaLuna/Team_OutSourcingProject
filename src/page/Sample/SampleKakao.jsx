import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

function SampleKakao() {
  const kakaoMapRef = useRef()
  const [map, setMap] = useState(null)
  const [markers, setMarkers] = useState(null)
  const [info, setInfo] = useState(null)
  const { kakao } = window
  const [coords, setCoords] = useState({
    lat: 37.566498652285,
    lng: 126.99209745028,
  })

  const getUserCurrentLocation = (pos) =>
    setCoords((prev) => ({
      ...prev,
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
    }))

  // 사용자가 허락 안해주면 기본 설정 좌표
  const failedUserCurrentLocation = () => console.log('안타깝군요')
  // 자동 함수 실행시켜주자 useEffect안에서 - 그런데 머부터 실행이 될까?>
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      getUserCurrentLocation,
      failedUserCurrentLocation
    )
  }, [])

  // 처음 kakaoMAp 생성되는 useEffect입니다.
  useEffect(() => {
    if (map) return

    const kakaoMapScript = document.createElement('script')
    kakaoMapScript.async = true
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.REACT_APP_KAKAO_MAP_JAVASCRIPT_KEY}&libraries=services,clusterer`

    document.head.appendChild(kakaoMapScript)
    kakaoMapScript.onload = () => {
      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(coords.lat, coords.lng),
          level: 3,
        }

        const map = new window.kakao.maps.Map(kakaoMapRef.current, options)
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(coords.lat, coords.lng),
          map: map,
        })
        const infowindow = new window.kakao.maps.InfoWindow({
          content: '혹시 지금 위치입니까?.',
          position: new window.kakao.maps.LatLng(coords.lat, coords.lng),
        })
        infowindow.open(map, marker)
        setMap(map)
        setMarkers(marker)
        setInfo(infowindow)
      })
    }
  }, [map, coords])
  // input창에 주소 keyword 등을 검색하면, 뾰로롱 하고 해당 지도의 위치가 바뀌고, 마커등록하기
  const inputRef = useRef()
  const [keyWord, setKeyWord] = useState('')

  const [search, setSearch] = useState(false)
  // input창에 도로,지번 주소로 검색할 수 있으므로,
  const onClickFindGeoLocation = () => {
    if (!inputRef.current.value || inputRef.current.value.trim() === '')
      return alert('똑디쓰셈')
    const geocoder = new window.kakao.maps.services.Geocoder()
    geocoder.addressSearch(inputRef.current.value, (result, status) => {
      //
      if (status === 'ZERO_RESULT') return alert('찾을수가 없어요')
      if (status === kakao.maps.services.Status.OK) {
        setCoords(new kakao.maps.LatLng(result[0].y, result[0].x))
        markers.setMap(null)
        info.close()
      }
    })
  }
  console.log(coords)
  useEffect(() => {
    if (map === null) return
    // 처음에는 const newMap =  kakao.maps.Map() 새롭게 생성해주려고 했었는데, 그럴 필요가 없는것 같다. 이미 처음 fetch 작업을 할 때  kakaoMapRef로 등록하고, 맵 객체를 map이라는 state에 넣어주어 검색 시 map의 Center만 바꿔주면 될거 같아서 이다.
    map.setCenter(coords)

    const marker = new kakao.maps.Marker({})
    marker.setMap(map)
    marker.setPosition(coords)
  }, [coords])
  return (
    <Div>
      <form action="" onClick={(e) => e.preventDefault()}>
        <input type="text" ref={inputRef} />
        <button onClick={onClickFindGeoLocation}>검색하기</button>
      </form>
      <div ref={kakaoMapRef} style={{ width: '400px', height: '300px' }}></div>
    </Div>
  )
}
// if (!keyword.replace(/^\s+|\s+$/g, '')) {
//   alert('키워드를 입력해주세요!');
//   return false;
// }
export default SampleKakao

const Div = styled.div`
  display: grid;
  place-content: center center;
  height: 100vh;
  gap: 20px;
  input {
    padding: 10px;
  }
`
