import '../styles/globals.scss';

const MyApp = ({ Component, pageProps }) => {
  return (
    <main className="app">
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp;