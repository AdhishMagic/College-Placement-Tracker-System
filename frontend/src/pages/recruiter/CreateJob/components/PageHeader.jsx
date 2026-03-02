import React from 'react';
import styles from './SharedComponents.module.css';

const PageHeader = ({ title, breadcrumbs }) => {
    return (
        <div className={styles.pageHeader}>
            <div className={styles.breadcrumbs}>
                {breadcrumbs.map((crumb, idx) => (
                    <span key={idx} className={styles.crumb}>
                        {crumb}
                        {idx !== breadcrumbs.length - 1 && <span className={styles.chevron}>{'>'}</span>}
                    </span>
                ))}
            </div>
            <h1 className={styles.pageTitle}>{title}</h1>
        </div>
    );
};

export default PageHeader;
