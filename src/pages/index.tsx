import { GetServerSideProps } from 'next';
import type { AppProps } from 'next/app';

import styles from '../styles/home.module.scss';

type PageProps = {
  isLoading: boolean;
};

export default function App({
  Component,
  pageProps,
  isLoading,
}: AppProps & PageProps) {
  return (
    <section className={styles.container}>
      <h1>Release notes v1</h1>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/ideas',
      permanent: false
    }
  };
};
