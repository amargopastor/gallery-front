import { SWRConfig } from 'swr';
import PropTypes from 'prop-types';
import Menu from '../components/Menu';
import { fetcher } from '../lib/fetcher';

const App = ({ Component, pageProps }) => (
  <SWRConfig value={{ refreshInterval: 3000, fetcher }}>
    <header>
      <Menu />
    </header>
    <main>
      <Component {...pageProps} />
    </main>
  </SWRConfig>
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
