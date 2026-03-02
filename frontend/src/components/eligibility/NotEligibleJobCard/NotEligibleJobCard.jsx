/**
 * NotEligibleJobCard Component
 * Displays a job the student is NOT eligible for,
 * including missing criteria and improvement suggestions.
 */
import EligibilityBadge from '../EligibilityBadge/EligibilityBadge';
import MissingCriteria from '../MissingCriteria/MissingCriteria';
import './NotEligibleJobCard.css';

const NotEligibleJobCard = ({ job }) => {
    const {
        id,
        title,
        companyName,
        companyLogo,
        packageLPA,
        location,
        postedDate,
        missingCriteria = [],
        suggestions = [],
    } = job;

    const formattedDate = postedDate
        ? new Date(postedDate).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        })
        : '—';

    return (
        <article className="not-eligible-job-card" id={`job-card-ne-${id}`}>
            {/* ── Header ── */}
            <div className="not-eligible-job-card__header">
                <div className="not-eligible-job-card__company-info">
                    <div className="not-eligible-job-card__logo">
                        {companyLogo ? (
                            <img src={companyLogo} alt={`${companyName} logo`} />
                        ) : (
                            <span className="not-eligible-job-card__logo-fallback">
                                {companyName?.charAt(0)?.toUpperCase() || 'C'}
                            </span>
                        )}
                    </div>
                    <div>
                        <h4 className="not-eligible-job-card__title">{title}</h4>
                        <p className="not-eligible-job-card__company">{companyName}</p>
                    </div>
                </div>
                <EligibilityBadge status="not-eligible" size="sm" />
            </div>

            {/* ── Quick Info ── */}
            <div className="not-eligible-job-card__quick-info">
                <span className="not-eligible-job-card__info-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="1" x2="12" y2="23" />
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                    {packageLPA ? `₹${packageLPA} LPA` : 'Not Disclosed'}
                </span>
                <span className="not-eligible-job-card__info-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                    </svg>
                    {location || 'Remote'}
                </span>
                <span className="not-eligible-job-card__info-item not-eligible-job-card__info-item--date">
                    Posted {formattedDate}
                </span>
            </div>

            {/* ── Missing Criteria ── */}
            {missingCriteria.length > 0 && (
                <MissingCriteria criteria={missingCriteria} />
            )}

            {/* ── Improvement Suggestions ── */}
            {suggestions.length > 0 && (
                <div className="not-eligible-job-card__suggestions">
                    <h5 className="not-eligible-job-card__suggestions-title">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                        How to Improve
                    </h5>
                    <ul className="not-eligible-job-card__suggestion-list">
                        {suggestions.map((suggestion, idx) => (
                            <li key={idx} className="not-eligible-job-card__suggestion-item">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </article>
    );
};

export default NotEligibleJobCard;
