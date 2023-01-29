import { forwardRef, useImperativeHandle, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';

import { TopicProps } from '../../interfaces/Topic';

import styles from './styles.module.scss';

interface SubmitIdeaDrawerProps {
    topics: TopicProps[];
}

function SubmitIdeaDrawerComponent({ topics }: SubmitIdeaDrawerProps, ref) {
    const i18nShared = useTranslations('Shared');
    const { locale } = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [topicsList, setTopicsList] = useState(topics);

    const open = () => {
        setIsOpen(true);
    };

    const close = () => {
        setIsOpen(false);
    };

    const toggleTopic = (topic: TopicProps) => {
        const countTopicsMarked = topicsList.filter(item => topic.id !== item.id && item.markedByFilter).length;
        
        if (countTopicsMarked < 3) {
            setTopicsList(
                topicsList.map(item => {
                    item.markedByFilter = item.id === topic.id ? !item.markedByFilter : item.markedByFilter;
                    return item;
                })
            );
        } 
    };

    useImperativeHandle(ref, () => ({ open }));

    return (
        <Drawer 
            anchor="right" 
            open={isOpen} 
            onClose={close}
            className={styles.drawer}
        >
            <IconButton onClick={close} className={styles.closeButton}>
                <CloseIcon />
            </IconButton>
            <h2>{i18nShared('TellUsYourIdea', { locale }).toString()}</h2>
            <form>
                <input type="text" placeholder={i18nShared('OneSentenceThatSummarisesYourIdea', { locale }).toString()} />
                <textarea placeholder={i18nShared('WhyYourIdeaIsUsefulWhoWouldBenefitAndHowItShouldWork', { locale }).toString()} />
                <div>
                    <p>{i18nShared('ChooseUpTo3TopicsForThisIdea', { locale }).toString()}</p>
                    {topicsList.map(topic => (
                        <Button 
                            key={topic.id} 
                            className={`${styles.topicButton} ${topic.markedByFilter && styles.active}`} 
                            onClick={() => toggleTopic(topic)}
                            color="inherit"
                        >
                            {topic.name}
                        </Button>
                    ))}
                </div>
                <Button className={styles.submitButton} color="inherit">
                    {i18nShared('SubmitIdea', { locale }).toString()}
                </Button>
            </form>
        </Drawer>
    );
}

export default forwardRef(SubmitIdeaDrawerComponent);