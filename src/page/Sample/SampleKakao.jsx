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
  const selectRef = useRef()

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
        // 배열로 담아주자 그래야 여러개 검색 할 때 삭제 수정 할 때 용이함
        const markerArray = []
        const infoArray = []
        markerArray.push(marker)
        infoArray.push(infowindow)
        // 생성한 카카오 지도를 setMap에 넣어준이유는 전역적으로 내가 조작하려고 -> 검색하고 맵을 이동시키고 싶으면 이미 생성된 map에 위치값만 바꿔주면 되잖슴!!
        setMap(map)
        // 만들어진 marker를 넣어줌 위 setMap에 map넣어준 이유와 같음
        setMarkers([...markerArray])
        // 만들어진 infowindow를 setInfo에 넣어줌 이유는 동일함
        setInfo([...infoArray])
      })
    }
  }, [map, coords])

  // input창에 주소 keyword 등을 검색하면, 뾰로롱 하고 해당 지도의 위치가 바뀌고, 마커등록하기
  const inputRef = useRef()
  const [keyWord, setKeyWord] = useState('')
  // input창에 도로,지번 주소로 검색할 수 있으므로,
  const onClickFindGeoLocation = () => {
    if (!inputRef.current.value || inputRef.current.value.trim() === '')
      return alert('검색창좀 사용하고 찾아보자')
    const geocoder = new window.kakao.maps.services.Geocoder()
    geocoder.addressSearch(inputRef.current.value, (result, status) => {
      // console로 찍어봄 ZERO_RESULT라고 뜨더라
      if (status === 'ZERO_RESULT') return setKeyWord(inputRef.current.value)
      if (status === kakao.maps.services.Status.OK) {
        console.log(result)
        //region_1depth_name: "서울"

        setCoords(new kakao.maps.LatLng(result[0].y, result[0].x))
        setKeyWord(result[0].address_name)
      }
    })
  }
  // 주소 검색 했을 때 나오는 useEffect 입니다.
  useEffect(() => {
    if (map === null) return

    // 처음에는 const newMap =  kakao.maps.Map() 새롭게 생성해주려고 했었는데, 그럴 필요가 없는것 같다. 이미 처음 fetch 작업을 할 때  kakaoMapRef로 등록하고, 맵 객체를 map이라는 state에 넣어주어 검색 시 map의 Center만 바꿔주면 될거 같아서 이다.
    // 기존 마커 제거 - 계속 떠있더라. 만들어진 marker 객체를 사라지게 해주는 마법임
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null)
      info[i].close()
    }
    // 그리고 다시 새롭게 만들어 줘야함

    // 다시 그려줄 지도의 위치를 조정합니다.
    map.setCenter(coords)

    const marker = new kakao.maps.Marker({
      position: coords,
    })

    const infowindow = new kakao.maps.InfoWindow({
      content: keyWord,
      position: coords,
    })
    marker.setMap(map)
    infowindow.open(map, marker)

    // 나중을 위해서
    const markerArray = []
    markerArray.push(marker)
    const infoArray = []
    infoArray.push(infowindow)
    // 만들어진  marker info는, 나중에 검색 또하면 지워주고 다시 그려줘야 하므로
    setInfo(infoArray)
    setMarkers(markerArray)
  }, [coords])

  /*

   주소를 입력 시 Status가 ZERO_RESUTL 라면 keyword로 검색을 실시 합니다.
   */
  useEffect(() => {
    // keword가 처음 렌더링시 빈값이므로 API 요청 수행 하지 않음;
    if (!keyWord || keyWord.trim() === '' || !map) return
    if (!keyWord.replace(/^\s+|\s+$/g, ''))
      return alert('제대로 검색좀 해주세요')
    const ps = new kakao.maps.services.Places()
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null)
      info[i].close()
    }
    const option = {
      category_group_code: selectRef.current.value,
    }
    ps.keywordSearch(
      keyWord,
      (data, status) => {
        console.log(status)
        if (status === 'ZERO_RESULT') return alert('찾을 수 없어요')
        // 찾은 장소들이 있다면 이전 marker와 info는 먼저 지워주고

        const markerArray = []
        const infoArray = []
        const bounds = new kakao.maps.LatLngBounds()
        const newImageSrc =
          'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png'
        console.log(data)
        data.forEach((item, idx) => {
          const marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(item.y, item.x),
            content: item.place_name,
          })
          const infoWindow = new kakao.maps.InfoWindow({
            position: new kakao.maps.LatLng(item.y, item.x),
            content: item.place_name,
            // map: map,
          })
          setMakerEvent(marker)
          markerArray.push(marker)
          // infoArray.push(infoWindow)
          bounds.extend(new kakao.maps.LatLng(item.y, item.x))
        })

        // marker를 만들었으니
        map.setBounds(bounds)
        setMarkers(markerArray)
        setInfo(infoArray)
      },
      option
    )
  }, [keyWord])
  const test = () => {}
  const setMakerEvent = (marker) => {
    console.log(marker)
    kakao.maps.event.addListener(marker, 'click', function (mouseEvent) {
      console.log(marker.getPosition())
      map.setCenter(marker.getPosition())
      map.setLevel(5)
    })
  }
  return (
    <Div>
      <select
        name="category"
        defaultValue="전체"
        ref={selectRef}
        onChange={test}
        AD5
      >
        <option value="FD6">맛집</option>
        <option value="AD5">숙소</option>
        <option value="CT1">문화</option>
        <option value="CE7">카페</option>
      </select>
      <form action="" onClick={(e) => e.preventDefault()}>
        <input type="text" ref={inputRef} />
        <button onClick={onClickFindGeoLocation}>검색하기</button>
      </form>
      <div ref={kakaoMapRef} style={{ width: '400px', height: '300px' }} />
    </Div>
  )
}

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
