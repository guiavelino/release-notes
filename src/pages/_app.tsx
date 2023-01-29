import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'styled-components';
import { NextIntlProvider } from 'next-intl';

import { AuthProvider } from '../context/AuthContext';
import LayoutDefault from '../components/Layout/Default';
import { GlobalProvider } from '../context/GlobalContext';
import Globals from '../styles/globals';

import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  const { events } = useRouter();

  const customErrorFunction = () => {
    return false;
  };

  useEffect(() => {
    const start = () => setLoading(true);
    const end = async () => setLoading(false);
    events.on('routeChangeStart', start);
    events.on('routeChangeComplete', end);
    events.on('routeChangeError', end);
    return () => {
      events.off('routeChangeStart', start);
      events.off('routeChangeComplete', end);
      events.off('routeChangeError', end);
    };
  }, []);

  return (
    <GlobalProvider>
      <AuthProvider>
        <NextIntlProvider
          onError={customErrorFunction}
          locale="pt-BR"
          formats={{
            dateTime: {
              short: {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              },
            },
          }}
          messages={pageProps.messages}
          now={new Date(pageProps.now)}
          timeZone="America/Sao_Paulo"
        >
          <LayoutDefault>
            <Component isLoading={loading} {...pageProps} />
          </LayoutDefault>
        </NextIntlProvider>
      </AuthProvider>
    </GlobalProvider>
  );
}

export default MyApp;
