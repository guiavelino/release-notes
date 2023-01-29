import { IconButton } from '@mui/material';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

import { CategoryProps } from '../../interfaces/Category';

import styles from './styles.module.scss';

interface AnnoucementCardProps {
    title: string;
    description: string;
    cover: string;
    categories: CategoryProps[];
    createdAt: string;
}

export default function AnnoucementCardComponent({
    title,
    description,
    cover,
    categories,
    createdAt
}: AnnoucementCardProps) {
    const i18nShared = useTranslations('Shared');
    const { locale } = useRouter();
    const [showAllDescription, setShowAllDescription] = useState(false);
    const [showReactionsMenu, setShowReactionsMenu] = useState(false);
    const [reactions] = useState([
        { id: 1, icon: <ThumbUpIcon />, isActive: false, reactionCount: 3 },
        { id: 2, icon: <FavoriteIcon />, isActive: false, reactionCount: 2 },
        { id: 3, icon: <ThumbDownIcon />, isActive: false, reactionCount: 0 }
    ]);
    const [reactionCount, setReactionCount] = useState(reactions.map(({ reactionCount }) => reactionCount).reduce((c, l) => c + l));

    const changeReaction = (item) => {
        setReactionCount(item.isActive ? reactionCount - 1 : reactionCount + 1);
        item.reactionCount = item.isActive ? item.reactionCount - 1 : item.reactionCount + 1;
        item.isActive = !item.isActive;
    };

    const viewAllDescription = (e) => {
        setShowAllDescription(true);
        e.target.remove();
    };

    return (
        <article className={styles.card}>
            <header>
                <div>
                    <h1>{title}</h1>
                    <div className={styles.categoryContainer}>
                        {categories.map(({ id, color, name }) => (
                            <span key={id} style={{ color }}>{name}</span>
                        ))}
                    </div>
                </div>
                <span className={styles.createdAt}>
                    {format(new Date(createdAt), 'd MMM, y', { locale: ptBR })}
                </span>
            </header>
            <div className={styles.descriptionContainer}>
                <p className={styles.description} style={{ WebkitLineClamp: showAllDescription ? "inherit" : 2 }}>
                    {description}
                </p>
                <span 
                    tabIndex={0}
                    role="button" 
                    onClick={viewAllDescription} 
                    onKeyDown={viewAllDescription} 
                    className={styles.viewMore}
                >
                    ...{i18nShared('ViewMore', { locale })}
                </span>
            </div>
            <Image src={cover} height={800} width={1200} objectFit="cover" />
            <div className={styles.emojiContainer}>
                <div className={styles.reactionButtonMenu}>
                    <IconButton onClick={() => setShowReactionsMenu(!showReactionsMenu)}>
                        <SentimentSatisfiedAltIcon />
                    </IconButton>
                    {showReactionsMenu && (
                        <div className={styles.reactionsMenu}>
                            {reactions.map(item => (
                                <IconButton 
                                    key={item.id}
                                    onClick={() => {
                                        changeReaction(item);
                                        setShowReactionsMenu(false);
                                    }}
                                    className={item.isActive ? styles.active : ''}
                                >
                                    {item.icon}
                                </IconButton>
                            ))}
                        </div>
                    )}
                </div>
                <div className={styles.reactions}>
                    {reactions.map(item => (
                        item.reactionCount > 0 && (
                            <IconButton 
                                key={item.id}
                                onClick={() => changeReaction(item)}
                                className={item.isActive ? styles.active : ''}
                            >
                                {item.icon}
                            </IconButton>
                        )
                    ))}
                </div>
                <span className={styles.reactionCount}>{reactionCount}</span>
            </div>
        </article>
    );
}
