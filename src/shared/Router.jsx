import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Detail from '../page/Detail'
import Home from '../page/Home'
import Layout from '../page/Layout'
import Login from '../page/Login'
import Profile from '../page/Profile'
import Register from '../page/Register'
import SampleDetail from '../page/Sample/SampleDetail'
import SampleHome from '../page/Sample/SampleHome'
import SampleInfinityScroll from '../page/Sample/SampleInfinityScroll'
import SampleInfinityScrollYoung from '../page/Sample/SampleInfinityScroll_young'
import SampleKakao from '../page/Sample/SampleKakao'
import SampleLogin from '../page/Sample/SampleLogin'
import SampleNavigate from '../page/Sample/SampleNavigate'
import SampleProfile from '../page/Sample/SampleProfile'
import SampleReactQuery from '../page/Sample/SampleReactQuery'
import Survey from '../page/Survey'

// Page는 일단 6개이다.
// Layout, Home, Detail,Login, Survey, Profile

// Survey는 modal이 아닌 페이지로 뺐습니다. 이유는 모달로서 부가정보를 수집하는 목적이 아닌
// Survey를 통해서 메인에게 정보를 전달하고 그것을 주 UI의 재료로 사용하려고 page로 뺐습니다.

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/survey" element={<Survey />} />
        </Route>

        {/* Sample 주소 */}
        <Route path="/sample" element={<SampleNavigate />}>
          <Route path="Home" element={<SampleHome />} />
          <Route path="login" element={<SampleLogin />} />
          <Route path="profile" element={<SampleProfile />} />
          <Route path="detail/:id" element={<SampleDetail />} />
          <Route path="kakaoMap" element={<SampleKakao />} />
          <Route path="infinityScroll" element={<SampleInfinityScroll />} />
          <Route path="reactQuery" element={<SampleReactQuery />} />
          <Route path="tutor" element={<SampleInfinityScrollYoung />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
