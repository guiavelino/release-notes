import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { Container, Divider } from '@mui/material';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

import SettingsSideBarComponent from '../../../components/SettingsSidebar';
import PageLayoutWithSideBarComponent from '../../../components/PageLayoutWithSideBar';

import styles from './styles.module.scss';

export default function NotificationsPage() {
  const i18nShared = useTranslations('Shared');
  const { locale } = useRouter();
  const [configs, setConfigs] = useState([
    { id: 1, name: "Lorem", isActive: true },
    { id: 2, name: "Lorem", isActive: true },
    { id: 3, name: "Lorem", isActive: true },
    { id: 4, name: "Lorem", isActive: true },
    { id: 5, name: "Lorem", isActive: false },
    { id: 6, name: "Lorem", isActive: false },
    { id: 7, name: "Lorem", isActive: false },
    { id: 8, name: "Lorem", isActive: true },
    { id: 9, name: "Lorem", isActive: true },
    { id: 10, name: "Lorem", isActive: false }
  ]);
  
  const handleChange = (item) => {
    setConfigs(configs.map(config => {
      config.isActive = config.id === item.id ? !config.isActive : config.isActive;
      
      return config;
    }))
  };

  return (
    <>
      <SettingsSideBarComponent />
      <PageLayoutWithSideBarComponent>
        <Container maxWidth="md" className={styles.page} disableGutters>
          <header>
            <h1>{i18nShared('Notifications', { locale }).toString()}</h1>
            <p>{i18nShared('KeepYourInboxUnderControl', { locale }).toString()}</p>
          </header>
          <main>
            {configs.map(config => (
              <FormControlLabel
                key={config.id}
                control={<Switch checked={config.isActive} onChange={() => handleChange(config)} />}
                value={config.id}
                label={config.name}
                labelPlacement="start"
              />
            ))}
            <Divider />
          </main>
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
