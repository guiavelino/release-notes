import { ReactNode } from 'react';

import styles from './styles.module.scss';

interface StatusCardProps {
    children: ReactNode;
    title: string;
    markerColor: string;
    quantityOfItems: number;
}

export default function StatusCardComponent({ 
    children, 
    title, 
    markerColor, 
    quantityOfItems 
}: StatusCardProps) {
    return (
        <article className={styles.card}>
            <header className={styles.header}>
                <span className={styles.markerColor} style={{ borderColor: markerColor }} />
                <h3>{title}</h3>
                <span className={styles.quantityOfItemsContainer}>({quantityOfItems})</span>
            </header>
            {children}
        </article>
    );
}