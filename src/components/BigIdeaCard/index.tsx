import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale'
import { useContext, useRef } from 'react';
import { useRouter } from 'next/router';

import { IdeaProps } from '../../interfaces/Idea';
import { AuthContext } from '../../context/AuthContext';
import IdeaDrawerComponent from '../IdeaDrawer';

import styles from './styles.module.scss';

export default function BigIdeaCardComponent({ 
    id,
    title, 
    description,
    author,
    topics,
    status,
    comments,
    voteCount,
    commentCount,
    createdAt
}: IdeaProps) {
    const { isAuthenticated } = useContext(AuthContext);
    const { push } = useRouter();
    const ideaDrawerRef = useRef(null);
    const idea = {
        id,
        title, 
        description,
        author,
        topics,
        status,
        comments,
        voteCount,
        commentCount,
        createdAt
    };

    const toggleVote = () => {
        if (!isAuthenticated) push('/login');
    };

    return (
        <>
            <div 
                tabIndex={0}
                role="button" 
                onClick={() => ideaDrawerRef.current.open()} 
                onKeyDown={() => ideaDrawerRef.current.open()}
                className={styles.card} 
            >
                <button type="button" className={styles.voteCountContainer} onClick={() => toggleVote()}>
                    <ArrowDropUpIcon className={styles.icon} />
                    {voteCount}
                </button>
                <section className={styles.cardContentContainer}>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.description}>{description}</p>
                    <section className={styles.infoContainer}>
                        <div>
                            <span className={styles.authorName}>{author.name}</span>
                            <span className={styles.separator} />
                            <span>{format(new Date(createdAt), 'd MMM', { locale: ptBR })}</span>
                            {topics.map(({ id, name }) => <span key={id} className={styles.topicItem}>#{name}</span>)}
                        </div>
                        <span className={styles.statusContainer} style={{ color: status.color }}>
                            {status.name}
                        </span>
                        <ModeCommentOutlinedIcon className={styles.icon} />
                        <span>{commentCount}</span>
                    </section>
                </section>
            </div>
            <IdeaDrawerComponent ref={ideaDrawerRef} idea={idea} />
        </>
    );
}
