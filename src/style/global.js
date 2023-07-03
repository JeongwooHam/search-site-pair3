import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}
    *{
        box-sizing: border-box;
        list-style: none;
    }
    html ::-webkit-scrollbar {
        display: none;
    }
    body{
        background-color: #ECDBF4;
    }
    button {
        border: none;
    }
`;

export default GlobalStyles;
