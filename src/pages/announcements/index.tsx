import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { useContext, useRef, useState } from 'react';
import { Divider, Container } from '@mui/material';

import { CategoryProps } from '../../interfaces/Category';
import { GlobalContext } from '../../context/GlobalContext';
import { CategoryRepository } from '../../repositories/CategoryRepository';
import SideBarComponent from '../../components/SideBar';
import FilterButtonComponent from '../../components/FilterButton';
import AnnoucementCardComponent from '../../components/AnnoucementCard';
import { AnnoucementRepository } from '../../repositories/AnnoucementRepository';
import { AnnoucementProps } from '../../interfaces/Annoucement';

import styles from './styles.module.scss';

interface ServerProps {
  categories: CategoryProps[];
  annoucements: AnnoucementProps[];
}

interface AnnoucementsPageProps {
  serverProps: ServerProps;
}

export default function AnnoucementsPage({ serverProps }: AnnoucementsPageProps) {
  const i18nShared = useTranslations('Shared');
  const { locale } = useRouter();
  const { isDesktop } = useContext(GlobalContext);
  const filterButtonRef = useRef(null);
  const [categories, setCategories] = useState(serverProps.categories);
  const [annoucements] = useState(serverProps.annoucements);

  return (
    <>
      {!isDesktop && (<SideBarComponent showPagesLink />)}
      <Container maxWidth="md" className={styles.page} disableGutters>
        <header>
          <h1>{i18nShared('ReleaseNotes', { locale }).toString()}</h1>
          <FilterButtonComponent 
            placeholder={i18nShared('FilterByCategory', { locale }).toString()}
            categories={categories} 
            setCategories={setCategories}
            ref={filterButtonRef}
          />
        </header>
        <Divider />
        {annoucements.map(({ id, title, description, cover, categories, createdAt }) => (
          <AnnoucementCardComponent
            key={id}
            title={title}
            description={description}
            cover={cover}
            categories={categories}
            createdAt={createdAt}
          />
        ))}
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      serverProps: {
        annoucements: await AnnoucementRepository.getAll(),
        categories: await CategoryRepository.getAll()
      },
      messages: {
        ...require(`../../../i18n/${locale}.json`)
      }
    }
  };
};
