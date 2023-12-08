import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

function SampleKakao() {
  const kakaoMapRef = useRef()
  const [map, setMap] = useState(null)
  const [markers, setMarkers] = useState(null)
  const [info, setInfo] = useState(null)
  const { kakao } = window
  const [coords, setCoords] = useState({
    lat: null,
    lng: null,
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

    // 문제점이 48line의 kaka.maps.load가 2번 실행 되서 지도가 2개가 생성이 된다. 그리하여 map만 조건문 처리 하면 안된다. 왜 그런지는 나중에 알아보자... ㅜㅜ 이유 : - kakaoMapScript.onload 비동기적 실행을 하기에 언제 그 안에 있는 setMap같은 것들이 다시 triger가 될지 모르기때문이다.
    // 그래서 coords 조건문을 넣어줌
    if (!coords.lat & !coords.lng) return
    const kakaoMapScript = document.createElement('script')
    kakaoMapScript.async = true
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.REACT_APP_KAKAO_MAP_JAVASCRIPT_KEY}&libraries=services,clusterer`

    document.head.appendChild(kakaoMapScript)

    kakaoMapScript.onload = function (e) {
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
        // 생성한 카카오 지도를 setMap에 넣어준이유는 전역적으로 내가 조작하려고 -> 검색하고 맵을 이동시키고 싶으면 이미 생성된 map에 위치값만 바꿔주면 되잖슴!!
        setMap(map)
        // 만들어진 marker를 넣어줌 위 setMap에 map넣어준 이유와 같음
        setMarkers(marker)
        // 만들어진 infowindow를 setInfo에 넣어줌 이유는 동일함
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
      // console로 찍어봄 ZERO_RESULT라고 뜨더라
      if (status === 'ZERO_RESULT') return alert('찾을수가 없어요')
      if (status === kakao.maps.services.Status.OK) {
        setCoords(new kakao.maps.LatLng(result[0].y, result[0].x))
        markers.setMap(null)
        info.close()
      }
    })
  }
  useEffect(() => {
    if (map === null) return
    console.log('검색시:', '???')
    console.log(coords)
    // 처음에는 const newMap =  kakao.maps.Map() 새롭게 생성해주려고 했었는데, 그럴 필요가 없는것 같다. 이미 처음 fetch 작업을 할 때  kakaoMapRef로 등록하고, 맵 객체를 map이라는 state에 넣어주어 검색 시 map의 Center만 바꿔주면 될거 같아서 이다.
    // 기존 마커 제거 - 계속 떠있더라. 만들어진 marker 객체를 사라지게 해주는 마법임
    markers.setMap(null)
    // 그리고 다시 새롭게 만들어 줘야함

    // 그리고 만들어주면 뭐하냐 map에다가 붙여줘야지
    map.setCenter(coords)

    const marker = new kakao.maps.Marker({})
    const info = new kakao.maps.InfoWindow({
      content: '어딜까욤',
      position: coords,
    })
    // info.setPosition(coords)
    marker.setMap(map)
    marker.setPosition(coords)
    // info.open을 map과 marker에 올리고 싶으면 marker의 position부터 정해줘야 함 아니면 뻑남 궁금하면 marker의 setPosition하는 줄과 바꿔보셈
    info.open(map, marker)
    console.log(info)
    // 만들어진  marker info는, 나중에 검색 또하면 지워주고 다시 그려줘야 하므로
    setInfo(info)
    setMarkers(marker)
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
