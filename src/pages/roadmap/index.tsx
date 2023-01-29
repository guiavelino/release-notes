import { GetServerSideProps } from 'next';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { Container } from '@mui/material';

import { IdeaProps } from '../../interfaces/Idea';
import { StatusProps } from '../../interfaces/Status';
import { TopicProps } from '../../interfaces/Topic';
import { IdeaRepository } from '../../repositories/IdeaRepository';
import { StatusRepository } from '../../repositories/StatusRepository';
import { TopicRepository } from '../../repositories/TopicRepository';
import StatusCardComponent from '../../components/StatusCard';
import IdeaCardComponent from '../../components/IdeaCard';
import FilterButtonComponent from '../../components/FilterButton';
import SideBarComponent from '../../components/SideBar';
import { GlobalContext } from '../../context/GlobalContext';

import styles from './styles.module.scss';

interface ServerProps {
  ideas: IdeaProps[];
  status: StatusProps[];
  topics: TopicProps[];
}

interface RoadmapPageProps {
  serverProps: ServerProps;
}

export default function RoadMapPage({ serverProps }: RoadmapPageProps) {
  const i18nShared = useTranslations('Shared');
  const { locale } = useRouter();
  const { isDesktop } = useContext(GlobalContext);
  const [ideas] = useState(serverProps.ideas);
  const [status] = useState(serverProps.status);
  const [topics, setTopics] = useState(serverProps.topics);

  return (
    <>
      {!isDesktop && (<SideBarComponent showPagesLink />)}
      <Container maxWidth="xl" className={styles.page}>
        <header className={styles.headerContainer}>
          <h1>{ i18nShared('Roadmap', { locale }).toString() }</h1>
          <FilterButtonComponent 
            placeholder={i18nShared('FilterByTopic', { locale }).toString()}
            topics={topics} 
            setTopics={setTopics}
          />
        </header>
        <section className={styles.board}>
          {status.map(({ id: statusId, name, color }) => (
            <StatusCardComponent
              key={statusId}
              title={name}
              markerColor={color}
              quantityOfItems={ideas.filter(({ status }) => status.id === statusId).length}
            >
              {ideas.map(({ id, title, topics, voteCount, status }) => {
                return statusId === status.id && (
                  <IdeaCardComponent key={id} title={title} topics={topics} voteCount={voteCount} />
                )
              })}
            </StatusCardComponent>
          ))}
        </section>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      serverProps: {
        ideas: await IdeaRepository.getAll(),
        status: await StatusRepository.getAll(),
        topics: await TopicRepository.getAll()
      },
      messages: {
        ...require(`../../../i18n/${locale}.json`)
      }
    }
  };
};
