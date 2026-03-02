import React from 'react';
import styles from './SharedComponents.module.css';

const SectionCard = ({ title, number, subtitle, children }) => {
    return (
        <div className={styles.sectionCard}>
            <div className={styles.cardHeader}>
                <div className={styles.titleWrapper}>
                    {number && <div className={styles.numberBadge}>{number}</div>}
                    <h2 className={styles.cardTitle}>{title}</h2>
                </div>
                {subtitle && <p className={styles.cardSubtitle}>{subtitle}</p>}
            </div>
            <div className={styles.cardBody}>
                {children}
            </div>
        </div>
    );
};

export default SectionCard;
