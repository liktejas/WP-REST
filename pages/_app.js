import '../styles/globals.css'
import { useEffect } from 'react'
import("bootstrap/dist/css/bootstrap.min.css");

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min");
  }, [])
  return <Component {...pageProps} />
}

export default MyApp
