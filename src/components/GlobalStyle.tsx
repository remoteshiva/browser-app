import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  /* for debug */
  /* * {
      outline: 1px solid red !important;
  } */

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    border: 0;
    box-sizing: border-box;
  }
  *:focus {
    outline: 0 !important;
    box-shadow: none;
  }
  button {
    cursor: pointer;
    outline:none !important;
    &:focus {
      outline:none !important;
    }
  }img{
    display: inline;
  }
`

export default GlobalStyle
