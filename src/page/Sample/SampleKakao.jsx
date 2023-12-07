import React, { useEffect, useRef, useState } from 'react'
function SampleKakao() {
  const kakaoMapRef = useRef()
  const [currentLocation, setCurrentLocation] = useState()

  useEffect(() => {
    const kakaoMapScript = document.createElement('script')
    kakaoMapScript.async = true
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_JAVASCRIPT_KEY}&autoload=false`
    document.head.appendChild(kakaoMapScript)
    kakaoMapScript.addEventListener('load', () => {
      const options = {
        // center: { lat: 33.450701, lng: 126.570667 }, 객체로 그냥 넣어주면 안됩니다.;;

        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      }
      window.kakao.maps.load(() => {
        new window.kakao.maps.Map(kakaoMapRef, options)
      })
    })
  }, [])
  return <div ref={kakaoMapRef}></div>
}

export default SampleKakao
