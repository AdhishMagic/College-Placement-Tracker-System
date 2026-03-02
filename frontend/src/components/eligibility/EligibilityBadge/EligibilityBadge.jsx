/**
 * EligibilityBadge Component
 * Semantic badge for eligibility status.
 *
 * Variants:
 *  - 'eligible'     → Green
 *  - 'not-eligible' → Red
 *  - 'update'       → Yellow / Warning
 */
import './EligibilityBadge.css';

const EligibilityBadge = ({ status = 'eligible', size = 'md', className = '' }) => {
    const labelMap = {
        eligible: 'Eligible',
        'not-eligible': 'Not Eligible',
        update: 'Update Profile',
    };

    const iconMap = {
        eligible: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
            </svg>
        ),
        'not-eligible': (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
        ),
        update: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
        ),
    };

    return (
        <span
            className={`eligibility-badge eligibility-badge--${status} eligibility-badge--${size} ${className}`}
            role="status"
            aria-label={`Eligibility status: ${labelMap[status]}`}
        >
            <span className="eligibility-badge__icon">{iconMap[status]}</span>
            <span className="eligibility-badge__label">{labelMap[status]}</span>
        </span>
    );
};

export default EligibilityBadge;
