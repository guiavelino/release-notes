import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { Button } from '@mui/material';

import styles from './styles.module.scss';

export default function ForgotPasswordPage() {
  const i18nShared = useTranslations('Shared');
  const { locale } = useRouter();

  return (
    <div className={styles.page}>
      <div className={styles.panel}>
        <h1>{ i18nShared('ForgotPassword', { locale }).toString() }</h1>
        <p>{ i18nShared('EnterYourEmailToReceivePasswordResetInstructions', { locale }).toString() }</p>
        <form>
          <input type="email" placeholder={ i18nShared('Email', { locale }).toString() } />
          <Button>
            { i18nShared('Submit', { locale }).toString() }
          </Button>
        </form>
        <Link href="/login">
          { i18nShared('BackToLogin', { locale }).toString() }
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
