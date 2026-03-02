/**
 * ApplicationStatusBadge
 * Color-coded pill badge indicating application status.
 *
 * Variants (maps to status values):
 *   applied            → Blue
 *   shortlisted        → Yellow / Amber
 *   interview_scheduled→ Purple
 *   offer_received     → Green
 *   rejected           → Red
 */
import './ApplicationStatusBadge.css';

const STATUS_CONFIG = {
    applied: { label: 'Applied', className: 'badge--applied' },
    shortlisted: { label: 'Shortlisted', className: 'badge--shortlisted' },
    interview_scheduled: { label: 'Interview Scheduled', className: 'badge--interview' },
    offer_received: { label: 'Offer Received', className: 'badge--offer' },
    rejected: { label: 'Rejected', className: 'badge--rejected' },
};

const ApplicationStatusBadge = ({ status, size = 'md', className = '' }) => {
    const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.applied;
    return (
        <span
            className={`app-status-badge ${cfg.className} app-status-badge--${size} ${className}`}
            role="status"
            aria-label={`Status: ${cfg.label}`}
        >
            <span className="app-status-badge__dot" />
            {cfg.label}
        </span>
    );
};

export default ApplicationStatusBadge;
