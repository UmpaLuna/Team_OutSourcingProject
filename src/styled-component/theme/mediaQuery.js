import styled, { css } from 'styled-components'

const breakPoints = {
  sm: 576, //  576<= sm
  md: 768, // 768 <= md
  lg: 1200, // 1200 <= lg
}

const mediaQuery = Object.entries(breakPoints).reduce((acc, [key, value]) => {
  acc[key] = (...arg) => css`
    @media (min-width: ${value}px) {
      ${css(...arg)}// ...arg로 해도 되는데 왜그런걸까??
    }
  `
  return acc
}, {})

export default mediaQuery
