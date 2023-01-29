/* eslint-disable @typescript-eslint/no-empty-function */
 
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import HeaderComponent from '../../Header';
import Globals from '../../../styles/globals';

import styles from './styles.module.scss';

type LayoutDefaultProps = {
  children: React.ReactNode;
};

export default function LayoutDefault({ children }: LayoutDefaultProps) {

  const [loadingtheme, setLoadingtheme] = useState(true);
  const [hostname, setHostname] = useState('');

  // Default theme
  const [theme, setTheme] = useState({
    colors: {
      primaryColor: '#344767',
      secondaryColor: '#ffffff',
      colorBrightness: 400,
    },
    text: {
      fontFamily: 'Roboto, sans-serif',
    },
  });

  useEffect(() => {
    setHostname(window.location.hostname);
    return () => {}
  }, [])


  useEffect(() => {
    setHostname(window.location.hostname);

    if (hostname === 'trocafone.releasenotes.app') {
      setTheme({
        colors: {
          primaryColor: '#ef793ae8',
          secondaryColor: '#ffffff',
          colorBrightness: 400,
        },
        text: {
          fontFamily: 'Roboto, sans-serif',
        },
      });
    }
    else if (hostname === 'recrutai.releasenotes.app') {
      setTheme({
        colors: {
          primaryColor: '#e91e63',
          secondaryColor: '#ffffff',
          colorBrightness: 400,
        },
        text: {
          fontFamily: 'Roboto, sans-serif',
        },
      });
    }

    setLoadingtheme(false)

    return () => {}
  }, [hostname])

  if (loadingtheme) { return <div>Loading...</div> }

  return (
    <ThemeProvider theme={theme}>
      <Globals />
      <HeaderComponent />
      <section className={styles.layoutContainer}>
        <article className={styles.childrenContainer}>{children}</article>
      </section>
    </ThemeProvider>
  );
}
