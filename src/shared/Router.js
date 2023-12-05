import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../page/Home'
import Detail from '../page/Detail'
import Layout from './Layout'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />} />
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
