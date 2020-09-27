import { createGlobalStyle } from 'styled-components';

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
    outline: none !important;
  }
  html, body, #root {
    height: 100%;
  }
  body {
    font-family: Lato, Sans-Serif;
    display: flex;
    flex-direction: column;
    -webkit-font-smoothing: antialiased;
  }
  button {
    cursor: pointer;
  }img{
    display: inline;
  }
`;

export default GlobalStyle