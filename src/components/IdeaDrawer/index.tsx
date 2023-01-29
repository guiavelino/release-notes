import { forwardRef, useImperativeHandle, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, AvatarGroup, IconButton } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import TextEditorComponent from '../TextEditor';
import { IdeaProps } from '../../interfaces/Idea';

import styles from './styles.module.scss';

interface IdeaDrawerProps {
    idea: IdeaProps;
}

function IdeaDrawerComponent({ idea }: IdeaDrawerProps, ref) {
    const i18nShared = useTranslations('Shared');
    const { locale } = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [comments, setComments] = useState(idea.comments.map(c => ({ ...c, textEditorIsOpen: false })));

    const open = () => {
        setIsOpen(true);
    }

    const close = () => {
        setIsOpen(false);
    };

    useImperativeHandle(ref, () => ({ open }));


    // const getDate = (createdAt) => {
    //     const currentDate = new Date();
    //     const commentDate = new Date(createdAt);

    //     const subDate = sub(currentDate, {
    //         years: commentDate.getFullYear(),
    //         seconds: commentDate.getSeconds(),
    //         months: commentDate.getMonth(),
    //         hours: commentDate.getHours(),
    //         minutes: commentDate.getMinutes(),
    //         days: commentDate.getDate() 
    //     });
    // };

    const toggleTextEditor = (comment) => {
        setComments(comments.map(item => {
            item.textEditorIsOpen = item.id === comment.id ? !item.textEditorIsOpen : item.textEditorIsOpen;

            return item;
        }));
    }

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
            <div className={styles.ideaContent}>
                <button type="button" className={styles.voteCountContainer}>
                    <ArrowDropUpIcon className={styles.icon} />
                    {idea.voteCount}
                </button>
                <section>
                    <h2 className={styles.title}>{idea.title}</h2>
                    <p className={styles.description}>{idea.description}</p>
                    <div className={styles.firstSectionInfo}>
                        <span className={styles.authorName}>{idea.author.name}</span>
                        <span className={styles.separator} />
                        <span>{format(new Date(idea.createdAt), 'd MMM', { locale: ptBR })}</span>
                        <AvatarGroup total={idea.voteCount} className={styles.avatarGroup}>
                            <Avatar>G</Avatar>
                            <Avatar>B</Avatar>
                            <Avatar>E</Avatar>
                        </AvatarGroup>
                    </div>
                    <div className={styles.secondSectionInfo}>
                        {idea.topics.map(({ id, name }) => (
                            <span key={id} className={styles.topicItem}>#{name}</span>
                        ))}
                        <span className={styles.statusContainer} style={{ color: idea.status.color }}>
                            {idea.status.name}
                        </span>
                    </div>
                </section>
            </div>
            <TextEditorComponent 
                buttonText={i18nShared("AddComment", { locale }).toString()}
                className={styles.textEditor}
            />
            {comments.map(comment => (
                <article key={comment.id} className={styles.commentCard}>
                    <Avatar>G</Avatar>
                    <div className={styles.commentContainer}>
                        <span className={styles.authorName}>{comment.author.name}</span>
                        <span className={styles.content}>{comment.content}</span>
                        <div className={styles.infoSection}>
                            <span className={styles.separator} />
                            <span>10</span>
                            <span>{i18nShared('DaysAgo', { locale }).toString()}</span>
                            <span className={styles.reply} onClick={() => toggleTextEditor(comment)}>
                                {i18nShared('Reply', { locale }).toString()}
                            </span>
                        </div>
                        {comment.textEditorIsOpen && (
                            <TextEditorComponent 
                                buttonText={i18nShared("Reply", { locale }).toString()}
                                className={styles.textEditor}
                            />
                        )}
                    </div>
                </article>
            ))}
        </Drawer>
    );
}

export default forwardRef(IdeaDrawerComponent);