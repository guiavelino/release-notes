import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: ${(props) => props.theme.text.fontFamily};
        font-size: 1.6rem;
        line-height: 1.6;
    }

    h1, h2, h3, h4, h5, h6, p {
        font-family:  ${(props) => props.theme.text.fontFamily};
        margin: 0rem;
        padding: 0rem;
    }

    a {
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    :root {
        --primary-color: ${(props) => props.theme.colors.primaryColor};
        --secondary-color: ${(props) => props.theme.colors.secondaryColor};
    }
`;
