import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { Button } from '@mui/material';

import styles from './styles.module.scss';

export default function SignUpPage() {
  const i18nShared = useTranslations('Shared');
  const { locale } = useRouter();

  return (
    <div className={styles.page}>
      <div className={styles.panel}>
        <h1>{ i18nShared('Welcome', { locale }).toString() }</h1>
        <p>{ i18nShared('SignUpBelowToStartGivingFeedback', { locale }).toString() }</p>
        <form>
          <input type="email" placeholder={ i18nShared('Email', { locale }).toString() } />
          <input type="text" placeholder={ i18nShared('FullName', { locale }).toString() } />
          <input type="password" placeholder={ i18nShared('Password', { locale }).toString() } />
          <Button>{ i18nShared('Submit', { locale }).toString() }</Button>
        </form>
        <p>{ i18nShared('YouAgreeToOurTermsOfServiceAndPrivacyPolicyListedBelow', { locale }).toString() }</p>
        <div className={styles.linkContainer}>
          <Link href="/terms-of-service">
            { i18nShared('ServiceTerms', { locale }).toString() }
          </Link>
          <span className={styles.separator} />
          <Link href="/privacy-policy">
            { i18nShared('PrivacyPolicy', { locale }).toString() }
          </Link> 
        </div>
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
