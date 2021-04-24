import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import splitbee from '@splitbee/web';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    splitbee.init();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
