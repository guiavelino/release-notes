import { TopicProps } from '../../interfaces/Topic';

import styles from './styles.module.scss';

interface IdeaCardProps {
    title: string;
    topics: TopicProps[];
    voteCount: number;
}

export default function IdeaCardComponent({ title, topics, voteCount }: IdeaCardProps) {
    return (
        <article className={styles.card}>
            <section className={styles.cardContainer}>
                <div className={styles.voteCountContainer}>{voteCount}</div>
                <h2 className={styles.title}>{title}</h2>
            </section>
            <section className={styles.topicsContainer}>
                { topics.map(({ id, name }) => <span key={id}>#{name}</span>) }
            </section>
        </article>
    );
}