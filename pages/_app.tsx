import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import Menu from '../components/Menu';

const LoadData = dynamic(() => import('../components/LoadData'), { ssr: false });

const App = ({ Component, pageProps }) => (
  <>
    <header>
      <Menu />
    </header>
    <main>
      <LoadData>
        <Component {...pageProps} />
      </LoadData>
    </main>
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
