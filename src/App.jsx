import React from 'react'

import { ThemeProvider } from 'styled-components'
import Router from './shared/Router'
import GlobalStyle from './styled-component/GlobaStyle'
import theme from './styled-component/theme/theme'
// 샘플 폴더는 보고 삭제 부탁드려요 mediaQuery 어떻게 적용 하는지 보여주는 Sample입니다.

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  )
}

export default App
