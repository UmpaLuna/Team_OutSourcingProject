import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../page/Home'
import Detail from '../page/Detail'
import Layout from '../page/Layout'
import Login from '../page/Login'
import Survey from '../page/Survey'
import Sample from '../page/Sample/Sample'

// Page는 일단 5개이다.
// Layout, Home, Detail,Login, Survey

// Survey는 modal이 아닌 페이지로 뺐습니다. 이유는 모달로서 부가정보를 수집하는 목적이 아닌
// Survey를 통해서 메인에게 정보를 전달하고 그것을 주 UI의 재료로 사용하려고 page로 뺐습니다.

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/login" element={<Login />} />

          {/* 효창님이 멋지게 처리할거라 신지떼이루요 */}
          <Route path="/survey" element={<Survey />} />
        </Route>

        <Route path="/sample" element={<Sample />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
