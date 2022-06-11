import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  body: '#FFFFFF',
  text: '#000000',
  main: '#E65100',
  accent: '#963F27',
  accentColor: '',
  secondary: '',
  secondaryColor: '',
  dullColor: '',
  ternary: '',
  codeColor: '',
};

export const GlobalStyles = createGlobalStyle<{theme:typeof lightTheme}>`
* {
   box-sizing: border-box;
}
body {
   margin: 0;
   padding: 0;
   min-height: 100vh;
   background: ${({ theme }) => theme.body};
   color: ${({ theme }) => theme.text};
   font-family: "Open Sans", sans-serif;
   font-size: clamp(1rem, 2.5vw, 2rem));
   font-weight: 400;
   font-style: normal;
   transition: all 0.50s linear;

}
main {
   display: flex;
   justify-content: center;
   align-items: center;
}
input, textarea, button {font-family: inherit}`;
