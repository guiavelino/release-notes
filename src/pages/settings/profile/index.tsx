import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { Container, Avatar } from '@mui/material';

import SettingsSideBarComponent from '../../../components/SettingsSidebar';
import PageLayoutWithSideBarComponent from '../../../components/PageLayoutWithSideBar';

import styles from './styles.module.scss';

export default function ProfilePage() {
  const i18nShared = useTranslations('Shared');
  const { locale } = useRouter();

  return (
    <>
      <SettingsSideBarComponent />
      <PageLayoutWithSideBarComponent>
        <Container maxWidth="md" className={styles.page} disableGutters>
          <header>
            <h1>{i18nShared('ProfileSettings', { locale }).toString()}</h1>
            <p>{i18nShared('ManageYourPersonalAccountSettings', { locale }).toString()}</p>
            <Avatar className={styles.avatarContainer}>G</Avatar>
          </header>
          <form>
            <input type="text" placeholder={ i18nShared('Name', { locale }).toString() } />
            <input type="email" placeholder={ i18nShared('Email', { locale }).toString() } />
          </form>
        </Container>
      </PageLayoutWithSideBarComponent>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: {
        ...require(`../../../../i18n/${locale}.json`)
      }
    }
  };
};
