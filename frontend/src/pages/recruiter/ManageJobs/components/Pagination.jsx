import React from 'react';
import styles from '../ManageJobs.module.css';

const Pagination = ({ pagination, onPageChange }) => {
    const { page, totalPages } = pagination;

    if (totalPages <= 1) return null;

    const handlePrev = () => {
        if (page > 1) onPageChange(page - 1);
    };

    const handleNext = () => {
        if (page < totalPages) onPageChange(page + 1);
    };

    return (
        <div className={styles.pagination}>
            <button
                className={styles.pageBtn}
                disabled={page === 1}
                onClick={handlePrev}
            >
                Previous
            </button>

            {[...Array(totalPages)].map((_, i) => (
                <button
                    key={i + 1}
                    className={`${styles.pageBtn} ${page === i + 1 ? styles.active : ''}`}
                    onClick={() => onPageChange(i + 1)}
                >
                    {i + 1}
                </button>
            ))}

            <button
                className={styles.pageBtn}
                disabled={page === totalPages}
                onClick={handleNext}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
