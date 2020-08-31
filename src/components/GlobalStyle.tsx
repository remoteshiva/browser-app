import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
    /* for debug
    * {
        outline: 1px solid red !important;
    } */
    html {
        min-height: 100%;
    }

    body {
        margin: 0;
        padding: 0;
        background: white;
        font-family: Lato, Sans-Serif;
        min-height: 100%;
    }
`;

export default GlobalStyle