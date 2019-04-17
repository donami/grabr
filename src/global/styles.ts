/* tslint:disable no-unused-expression */

// Global styles

/*
  By default, this file does two things:

  1. Importing `styles.global.scss` will tell Webpack to generate a `main.css`
   which is automatically included along with our SSR / initial HTML. This
   is for processing CSS through the SASS/LESS -> PostCSS pipeline.

  2. It exports a <GlobalStyles /> component which is used by @components/root.tsx
   to add global styles to the React render.
/*

// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */
import { createGlobalStyle } from '@/lib/styledComponents';

/* Local */

// Import global SASS styles that you want to be rendered into the
// resulting `main.css` file included with the initial render. If you don't
// want a CSS file to be generated, you can comment out this line
import './styles.global.scss';

// ----------------------------------------------------------------------------

// Inject Styled-Components output onto the page. You can add global styles to
// the template tags below, and will be picked up in @components/root.tsx
export const GlobalStyles = createGlobalStyle`
  body {
    color: ${props => props.theme.colors.text};
  }

  a {
    color: ${props => props.theme.colors.brand};
  }

  /* ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
  }

  ::-webkit-scrollbar {
    width: 6px;
    background-color: #F5F5F5;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #000000;
  } */

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
  }

  ::-webkit-scrollbar {
    width: 10px;
    background-color: #F5F5F5;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #f7498e;
    background-image: -webkit-gradient(linear, 0 0, 0 100%,
                      color-stop(.5, rgba(255, 255, 255, .2)),
                      color-stop(.5, transparent), to(transparent));
  }
`;
