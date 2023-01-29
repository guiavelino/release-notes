import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { Button } from '@mui/material';

import styles from './styles.module.scss';

export default function LoginPage() {
  const i18nShared = useTranslations('Shared');
  const { locale } = useRouter();

  return (
    <div className={styles.page}>
      <div className={styles.panel}>
        <h1>{ i18nShared('Login', { locale }).toString() }</h1>
        <form>
          <input type="email" placeholder={ i18nShared('Email', { locale }).toString() } />
          <input type="password" placeholder={ i18nShared('Password', { locale }).toString() } />
          <Button>
            { i18nShared('Submit', { locale }).toString() }
          </Button>
        </form>
        <Link href="/forgot-password">
          { i18nShared('ForgotYourPassword', { locale }).toString() }
        </Link>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: {
        ...require(`../../../i18n/${locale}.json`)
      }
    }
  };
};
