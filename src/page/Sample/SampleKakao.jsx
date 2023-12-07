import React, { useEffect, useRef, useState } from 'react'
function SampleKakao() {
  const kakaoMapRef = useRef()
  const [map, setMap] = useState(null)
  const [coords, setCoords] = useState({
    lat: 37.566498652285,
    lng: 126.99209745028,
  })

  // 사용자 위치정보 허용했을 경우 해당 위도/경도 설정 - Geolocation은 navigator.geolocation을 통해 접근하고, 사용자가 허가할 경우 현재 장치에서 GPS, Wifi 등 사용 가능한 최선의 방법으로 위치를 알아낸다.
  // position은 navigator.geolocation.getCurrentPosition을 실행 시킬때 숨겨져있는 argu
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
    console.log(1)
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

    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_JAVASCRIPT_KEY}&autoload=false`

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
          // map은 45번라인 생성해준 map이고, 만들었으면 어디다가 보여줄건디;; 만들어준 map에다 보여줄거잖아 맞아?
          map: map,
        })
        setMap(map)
      })
    }
  }, [map])
  return (
    <div ref={kakaoMapRef} style={{ width: '400px', height: '300px' }}></div>
  )
}

export default SampleKakao
