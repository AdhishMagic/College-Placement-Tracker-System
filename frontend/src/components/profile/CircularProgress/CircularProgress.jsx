import { useEffect, useState } from 'react';
import styles from './CircularProgress.module.css';

/**
 * CircularProgress Component
 * Animated circular progress indicator for profile completion.
 *
 * @param {number} percentage - 0–100
 * @param {number} size - Diameter in px (default: 120)
 * @param {number} strokeWidth - Ring thickness (default: 8)
 * @param {string} label - Label text below number
 */
const CircularProgress = ({
    percentage = 0,
    size = 120,
    strokeWidth = 8,
    label = 'Complete',
    className = '',
}) => {
    const [animatedValue, setAnimatedValue] = useState(0);
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (animatedValue / 100) * circumference;

    // Determine color based on percentage
    const getColor = (pct) => {
        if (pct >= 80) return 'var(--color-success-500)';
        if (pct >= 50) return 'var(--color-primary-500)';
        if (pct >= 25) return 'var(--color-warning-500)';
        return 'var(--color-danger-500)';
    };

    const getTrailColor = (pct) => {
        if (pct >= 80) return 'var(--color-success-100)';
        if (pct >= 50) return 'var(--color-primary-100)';
        if (pct >= 25) return 'var(--color-warning-100)';
        return 'var(--color-danger-100)';
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedValue(percentage);
        }, 100);
        return () => clearTimeout(timer);
    }, [percentage]);

    return (
        <div className={`${styles.container} ${className}`}>
            <div className={styles.ring} style={{ width: size, height: size }}>
                <svg width={size} height={size} className={styles.svg}>
                    {/* Background circle */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke={getTrailColor(percentage)}
                        strokeWidth={strokeWidth}
                    />
                    {/* Progress arc */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke={getColor(percentage)}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        className={styles.progressArc}
                        transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    />
                </svg>
                <div className={styles.center}>
                    <span className={styles.number} style={{ color: getColor(percentage) }}>
                        {Math.round(animatedValue)}%
                    </span>
                </div>
            </div>
            <span className={styles.label}>{label}</span>
        </div>
    );
};

export default CircularProgress;
