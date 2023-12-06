import React from 'react'
import { Outlet } from 'react-router'
import Header from '../component/layout/Header'
import Footer from '../component/layout/Footer'
function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout
