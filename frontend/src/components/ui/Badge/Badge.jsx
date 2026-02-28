import React from 'react';
import PropTypes from 'prop-types';
import styles from './Badge.module.css';

const Badge = ({ children, variant = 'primary', size = 'md', className = '' }) => {
    return (
        <span className={`${styles.badge} ${styles[variant]} ${styles[size]} ${className}`}>
            {children}
        </span>
    );
};

Badge.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    className: PropTypes.string,
};

export default Badge;
