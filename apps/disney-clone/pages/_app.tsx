import '../styles/globals.scss';

const MyApp = ({ Component, pageProps }) => {
  return (
    <main className="main-app">
      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;
