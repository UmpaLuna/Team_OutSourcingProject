import React, { useState, useEffect } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
function SampleHome() {
  const { kakao } = window
  console.log(Map)
  // 현재 위치 받아오기
  const [currentPosition, setCurrentPosition] = useState()
  const getLocation = (position) =>
    setCurrentPosition({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    })
  const failedGetLocation = (error) =>
    console.log('현재 위치받아오기 실패의 원인은 :', error)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getLocation, failedGetLocation)
  }, [])

  // 주소 검색하면 마커까지 나오게 하기;
  return (
    <>
      <input type="text" />
      {currentPosition && (
        <Map
          center={{
            lat: currentPosition.latitude,
            lng: currentPosition.longitude,
          }} // 지도의 중심 좌표
          style={{ width: '800px', height: '600px' }} // 지도 크기
          level={3} // 지도 확대 레벨
        >
          <MapMarker // 마커를 생성합니다
            position={{
              // 마커가 표시될 위치입니다
              lat: currentPosition.latitude,
              lng: currentPosition.longitude,
            }}
          >
            {/* Marker에 텍스트 표시하고 싶으면 children 안에 컴포넌트 || div를 넣으면 간단합니다. */}
            <div>현재 나의 위치</div>
          </MapMarker>
        </Map>
      )}
    </>
  )
}

export default SampleHome
