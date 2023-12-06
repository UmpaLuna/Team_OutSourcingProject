import React, { useEffect, useRef, useState } from 'react'
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

function SampleKakao() {
  //   const [loading, error] = useKakaoLoader()
  const [currentPosition, setCurrentPosition] = useState()
  const { kakao } = window
  const [info, setInfo] = useState()
  const [markers, setMarkers] = useState([])
  const [map, setMap] = useState()
  const searchInputRef = useRef('')
  const [changeView, setChangeView] = useState(false)
  const onClickSearchLocations = () => setChangeView(true)

  const getLocation = (position) =>
    setCurrentPosition({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    })
  const failedGetLocation = (error) =>
    console.log('현재 위치받아오기 실패의 원인은 :', error)
  useEffect(() => {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(getLocation, failedGetLocation)
    console.log('현재좌표', currentPosition)

    if (currentPosition) {
      const markerPosition = new kakao.maps.LatLng(
        currentPosition.lat,
        currentPosition.lng
      )

      const marker = new kakao.maps.Marker({
        map: map,
        position: markerPosition,
      })
      const infoWindow = new kakao.maps.InfoWindow({
        content: '여기가 우리집일까?',
      })

      infoWindow.open(map, marker)
      kakao.maps.event.addListener(
        marker,
        'click',
        makeOffListener(map, marker, infoWindow)
      )
    }
  }, [map])
  // 여러개의 인포윈도우에 등록 할 시, 클로저로 만들지 않으면 마지막 info에만 등록되게 됩니다.
  //   kakao.maps.event.addListener(
  //       marker,
  //       'mouseover',
  //       makeOverListener(map, marker, infoWindow)
  //     )
  //     kakao.maps.event.addListener(
  //       marker,
  //       'mouseout',
  //       makeOutListener(infoWindow)
  //     )
  // 인포윈도우를 닫는 클로저를 만드는 함수입니다
  function makeOutListener(infowindow) {
    return function () {
      infowindow.close()
    }
  }
  // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
  function makeOverListener(map, marker, infowindow) {
    return function () {
      infowindow.open(map, marker)
    }
  }
  function makeOffListener(map, marker, infowindow) {
    return () => {
      marker.setMap(null)
      infowindow.close(map, marker)
    }
  }

  // 검색하면 불러오기
  useEffect(() => {
    console.log('dep')
    if (!changeView) return
    if (!map) return
    console.log(map)
    const ps = new kakao.maps.services.Places()
    // options를 keywordSearch의 콜백함수의 3번째 인자로 넣을 수 있습니다.
    const options = {
      category_group_code: 'FD6', // (FD6,음식점) , (AD5,숙박) (CE7,카페),(AT4,관광명소) , (CT1, 문화시설)
      page: 2, // 2페이지의 검색 결과를 받는다.
    }
    ps.keywordSearch(
      searchInputRef.current.value,
      (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          const bounds = new kakao.maps.LatLngBounds()
          let markers = []
          for (var i = 0; i < data.length; i++) {
            // @ts-ignore
            markers.push({
              position: {
                lat: data[i].y,
                lng: data[i].x,
              },
              place_name: data[i].place_name,
              category_group_code: data[i].category_group_code,
              road_address_name: data[i].road_address_name,
              place_url: data[i].place_url, // 바로가기 url로 하면 좋을듯
              category_group_name: data[i].category_group_name,
              address_name: data[i].address_name,
              phone: data[i].phone,
              id: data[i].id,
            })
            // @ts-ignore
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
          }
          setMarkers(markers)

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          map.setBounds(bounds)

          setChangeView(false)
          setCurrentPosition({
            lat: map.getCenter().getLat(),
            lng: map.getCenter().getLng(),
          })
        }
      }
    )
  }, [changeView])
  console.log(map)
  return (
    <>
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <input type="text" ref={searchInputRef} />
        <button onClick={onClickSearchLocations}>검색</button>
      </form>
      {currentPosition && (
        <Map // 로드뷰를 표시할 Container
          center={currentPosition}
          style={{
            width: '500px',
            height: '350px',
          }}
          level={3}
          onCreate={setMap}
        >
          {markers.map((marker) => (
            <MapMarker
              key={`${marker.place_name},${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
              onClick={() => {
                setInfo(marker)
                setCurrentPosition({
                  lat: marker.position.lat,
                  lng: marker.position.lng,
                })
              }}
            >
              {info && info.place_name === marker.place_name && (
                <div
                  style={{ color: '#000', padding: '8px', textAlign: 'center' }}
                  onClick={(e) => {
                    console.log(e.target.textContent)
                  }}
                >
                  {marker.place_name}
                </div>
              )}
            </MapMarker>
          ))}
        </Map>
      )}

      {markers.map((marker) => {
        console.log(marker)
        return (
          <StDiv>
            <h2>장소의 지번 주소 :{marker?.address_name}</h2>
            <h2>카테고리별 이름 : {marker?.category_group_name}</h2>
            <h2>장소의 번호 : {marker?.phone}</h2>
            <h2>장소의 도로명 주소 : {marker?.road_address_name}</h2>

            <h2>카테고리별 코드 : {marker?.category_group_code}</h2>
            <h2>카카오에 등록된 장소의 고유 아이디 : {marker?.id}</h2>
            <h2>lat-위치: lat {marker?.position.lat}</h2>
            <h2>lng-위치 : lng {marker?.position.lng}</h2>
            {/* 링크누르면 페이지로 갑니다. */}
            <Link to={marker?.place_url} target="_blank">
              {marker?.place_url}
            </Link>
          </StDiv>
        )
      })}
    </>
  )
}

export default SampleKakao

const StDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
  padding: 20px;
  border: 1px solid red;
`
