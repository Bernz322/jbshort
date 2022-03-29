import { createGlobalStyle } from "styled-components/macro";
import fonts from './fonts';
import variables from './variables';

export const lightTheme = {
    body: "#ffffff",
    color: "#282828",
    p: "#535353",
    maroon: "#761F14",
}

export const darkTheme = {
    body: "#212121",
    color: "#ffffff",
    p: "#ffffff",
    maroon: "#c60f1d"
}

export const GlobalStyles = createGlobalStyle`
    ${fonts};
    ${variables};

    html{
        box-sizing: border-box;
    }

    *, *:before, *:after{
        box-sizing: inherit;
        margin:0;
        padding:0;
    }


    body{
        margin: 0;
        padding: 0;
        width: 100%;
        max-width: 100%;
        min-height: 100vh;
        overflow-x: hidden;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        background-color: ${(props) => props.theme.body};
        color: ${(props) => props.theme.color};
        font-family: var(--font);
        font-size: var(--fz-md);
        transition: all 0.7s ease;
    }

    a{
        text-decoration: none;
    }
    p{
        margin-bottom: 10px;
    }
`