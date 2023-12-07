import React, { useEffect, useRef } from 'react'
function SampleKakao() {
  const kakaoMapRef = useRef()
  const { kakao } = window
  useEffect(() => {
    // script를 생성해줍니다.
    const kakaoMapScript = document.createElement('script')
    // 비동기와의 통신이기에 true로
    kakaoMapScript.async = true
    // kakao에서 받은 JAVASCRIPT APIKey를 넣어주자
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_JAVASCRIPT_KEY}&autoload=false`
    // HMTL의 head 부분에 붙여줍니다.
    document.head.appendChild(kakaoMapScript)

    // 스크립트를 load 이벤트일때 kakao map을 생성해줍니다.
    // center: { lat: 33.450701, lng: 126.570667 }, 객체로 그냥 넣어주면 안됩니다.;; 에러뜸

    kakaoMapScript.onload = () => {
      kakao.maps.load(() => {
        const options = {
          center: new kakao.maps.LatLng(33.450701, 126.570667), // 초기 중심 좌표 (위도, 경도)
          level: 3, // 지도 확대 레벨
        }
        new kakao.maps.Map(kakaoMapRef.current, options)
      })
    }
  }, [])
  return (
    <div ref={kakaoMapRef} style={{ width: '400px', height: '300px' }}></div>
  )
}

export default SampleKakao
