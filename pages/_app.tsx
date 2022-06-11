import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import dynamic from 'next/dynamic';
import Menu from '../components/Menu';
import { GlobalStyles, lightTheme } from '../style/theme.config';

const LoadData = dynamic(() => import('../components/LoadData'), { ssr: false });

const App = ({ Component, pageProps }) => (
  <>
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <header>
        <Menu />
      </header>
      <main>
        <LoadData>
          <Component {...pageProps} />
        </LoadData>
      </main>
    </ThemeProvider>
  </>
);

App.defaultProps = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.shape({}),
};

App.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.shape({}),
};

export default App;
