import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { Button, Divider, ListItemButton, ListItemText, Collapse, List, Container } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

import { IdeaProps } from '../../interfaces/Idea';
import { StatusProps } from '../../interfaces/Status';
import { TopicProps } from '../../interfaces/Topic';
import { IdeaRepository } from '../../repositories/IdeaRepository';
import { StatusRepository } from '../../repositories/StatusRepository';
import { TopicRepository } from '../../repositories/TopicRepository';
import SideBarComponent from '../../components/SideBar';
import FilterButtonComponent from '../../components/FilterButton';
import BigIdeaCardComponent from '../../components/BigIdeaCard';
import PageLayoutWithSideBarComponent from '../../components/PageLayoutWithSideBar';
import SubmitIdeaDrawerComponent from '../../components/SubmitIdeaDrawer';

import styles from './styles.module.scss';

interface ServerProps {
  ideas: IdeaProps[];
  status: StatusProps[];
  topics: TopicProps[];
}

interface IdeasPageProps {
  serverProps: ServerProps;
}

export default function IdeasPage({ serverProps }: IdeasPageProps) {
  const i18nShared = useTranslations('Shared');
  const { locale } = useRouter();
  const [ideas] = useState(serverProps.ideas);
  const [status, setStatus] = useState(serverProps.status);
  const [topics, setTopics] = useState(serverProps.topics);
  const [collapse, setCollapse] = useState({ statuses: true, topics: true });
  const filterButtonRef = useRef(null);
  const submitIdeaDrawerRef = useRef(null);
  const [select, setSelect] = useState("0");

  const getStatusData = (statusId: number) => (status.filter(({ id }) => (id === statusId))[0]);

  return (
    <>
      <SideBarComponent className={styles.sideBar} showPagesLink>
        <List component="nav" className={styles.list}>
          <ListItemButton 
            onClick={() => setCollapse({ ...collapse, statuses: !collapse.statuses })}
            className={styles.collapseButton}
            disableRipple
          >
            <ListItemText className={styles.title} primary={i18nShared('Statuses', { locale }).toString()} />
            {collapse.statuses ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </ListItemButton>
          <Collapse in={collapse.statuses} timeout="auto" unmountOnExit>
            {status.map(item => (
              <List key={item.id} component="div" disablePadding>
                <ListItemButton 
                  onClick={() => filterButtonRef.current.filterByStatus(item)}
                  className={`${styles.listItemButton} ${item.markedByFilter && styles.active}`}
                >
                  <span className={styles.markerColor} style={{ borderColor: item.color }} />
                  <ListItemText className={styles.text} primary={item.name} />
                  {item.markedByFilter && (
                    <div className={styles.iconContainer}>
                      <CloseIcon className={styles.icon} />
                    </div>
                  )}
                </ListItemButton>
              </List>
            ))}
          </Collapse>
        </List>
        <List component="nav" className={styles.list}>
          <ListItemButton 
            onClick={() => setCollapse({ ...collapse, topics: !collapse.topics })}
            className={styles.collapseButton}
            disableRipple
          >
            <ListItemText className={styles.title} primary={i18nShared('Topics', { locale }).toString()} />
            {collapse.topics ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </ListItemButton>
          <Collapse in={collapse.topics} timeout="auto" unmountOnExit>
            {topics.map(item => (
              <List key={item.id} component="div" disablePadding>
                <ListItemButton 
                  onClick={() => filterButtonRef.current.filterByTopic(item)}
                  className={`${styles.listItemButton} ${item.markedByFilter && styles.active}`}
                >
                  <span className={styles.tag}>#</span>
                  <ListItemText className={styles.text} primary={item.name} />
                  {item.markedByFilter && (
                    <div className={styles.iconContainer}>
                      <CloseIcon className={styles.icon} />
                    </div>
                  )}
                </ListItemButton>
              </List>
            ))}
          </Collapse>
        </List>
      </SideBarComponent>
      <PageLayoutWithSideBarComponent>
        <Container maxWidth="md" className={styles.page} disableGutters>
          <header>
            <div>
              <h1>{i18nShared('Ideas', { locale }).toString()}</h1>
              <Button startIcon={<AddIcon />} color="inherit" onClick={() => submitIdeaDrawerRef.current.open()}>
                {i18nShared('SubmitIdea', { locale }).toString()}
              </Button>
            </div>
            <div>
              <select value={select} onChange={({ target: { value } }) => setSelect(value)}>
                <option value="0">{i18nShared('Trending', { locale }).toString()}</option>
                <option value="1">{i18nShared('LatestIdeas', { locale }).toString()}</option>
                <option value="2">{i18nShared('TopRated', { locale }).toString()}</option>
              </select>
              <FilterButtonComponent 
                placeholder={i18nShared('FilterByStatusOrTopic', { locale }).toString()}
                topics={topics} 
                setTopics={setTopics}
                status={status}
                setStatus={setStatus}
                ref={filterButtonRef}
              />
            </div>
          </header>
          <Divider />
          {
            ideas.map(({ id, title, description, author, topics, status, comments, voteCount, commentCount, createdAt }) => (
              <BigIdeaCardComponent
                key={id}
                id={id}
                title={title}
                description={description} 
                author={author}
                topics={topics}
                status={getStatusData(status.id)}
                comments={comments}
                voteCount={voteCount} 
                commentCount={commentCount} 
                createdAt={createdAt}
              />
            ))
          }
        </Container>
      </PageLayoutWithSideBarComponent>
      <SubmitIdeaDrawerComponent topics={topics} ref={submitIdeaDrawerRef} />
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
