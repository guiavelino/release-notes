import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { Container, Divider } from '@mui/material';

import styles from './styles.module.scss';

export default function TermsOfServicePage() {
  const i18nShared = useTranslations('Shared');
  const { locale } = useRouter();

  return (
    <div className={styles.page}>
      <Container maxWidth="md" className={styles.container}>
        <h1>{ i18nShared('ServiceTerms', { locale }).toString() }</h1>
        <h3>1. Lorem Ipsum</h3>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text 
          ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        </p>
        <h3>2. Lorem Ipsum</h3>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text 
          ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        </p>
        <h3>3. Lorem Ipsum</h3>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text 
          ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        </p>
        <Divider light />
        <Link href='/signup'>{ i18nShared('ComeBack', { locale }).toString() }</Link>
      </Container>
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
