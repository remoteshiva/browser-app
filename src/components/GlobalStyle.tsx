import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    /* for debug */
    /* * {
        outline: 1px solid red !important;
    } */
    html {
        min-height: 100%;
    }

    body {
        margin: 0;
        padding: 0;
        font-family: Lato, Sans-Serif;
        display: flex;
        min-height: 100vh;
        flex-direction: column;
    }
`;

export default GlobalStyle