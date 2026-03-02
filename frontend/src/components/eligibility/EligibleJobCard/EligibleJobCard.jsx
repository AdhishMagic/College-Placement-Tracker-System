/**
 * EligibleJobCard Component
 * Displays a single eligible job with company, package, location,
 * eligibility badge, and Apply button.
 */
import EligibilityBadge from '../EligibilityBadge/EligibilityBadge';
import './EligibleJobCard.css';

const EligibleJobCard = ({ job, onApply }) => {
    const {
        id,
        title,
        companyName,
        companyLogo,
        packageLPA,
        location,
        department,
        postedDate,
        deadline,
        jobType,
        applicationStatus, // 'not_applied' | 'applied' | 'shortlisted'
    } = job;

    const formattedDate = postedDate
        ? new Date(postedDate).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        })
        : '—';

    const deadlineDate = deadline
        ? new Date(deadline).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        })
        : null;

    const isApplied = applicationStatus === 'applied' || applicationStatus === 'shortlisted';

    return (
        <article className="eligible-job-card" id={`job-card-${id}`}>
            {/* ── Header ── */}
            <div className="eligible-job-card__header">
                <div className="eligible-job-card__company-info">
                    <div className="eligible-job-card__logo">
                        {companyLogo ? (
                            <img src={companyLogo} alt={`${companyName} logo`} />
                        ) : (
                            <span className="eligible-job-card__logo-fallback">
                                {companyName?.charAt(0)?.toUpperCase() || 'C'}
                            </span>
                        )}
                    </div>
                    <div>
                        <h4 className="eligible-job-card__title">{title}</h4>
                        <p className="eligible-job-card__company">{companyName}</p>
                    </div>
                </div>
                <EligibilityBadge status="eligible" size="sm" />
            </div>

            {/* ── Details Grid ── */}
            <div className="eligible-job-card__details">
                <div className="eligible-job-card__detail-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="1" x2="12" y2="23" />
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                    <span className="eligible-job-card__detail-value">
                        {packageLPA ? `₹${packageLPA} LPA` : 'Not Disclosed'}
                    </span>
                </div>
                <div className="eligible-job-card__detail-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span className="eligible-job-card__detail-value">{location || 'Remote'}</span>
                </div>
                {jobType && (
                    <div className="eligible-job-card__detail-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                        </svg>
                        <span className="eligible-job-card__detail-value">{jobType}</span>
                    </div>
                )}
                {department && (
                    <div className="eligible-job-card__detail-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                        </svg>
                        <span className="eligible-job-card__detail-value">{department}</span>
                    </div>
                )}
            </div>

            {/* ── Footer ── */}
            <div className="eligible-job-card__footer">
                <div className="eligible-job-card__meta">
                    <span className="eligible-job-card__posted">Posted {formattedDate}</span>
                    {deadlineDate && (
                        <span className="eligible-job-card__deadline">
                            Deadline: {deadlineDate}
                        </span>
                    )}
                </div>
                <button
                    className={`eligible-job-card__apply-btn ${isApplied ? 'eligible-job-card__apply-btn--applied' : ''}`}
                    onClick={() => !isApplied && onApply?.(id)}
                    disabled={isApplied}
                    id={`apply-btn-${id}`}
                >
                    {isApplied ? (
                        <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            {applicationStatus === 'shortlisted' ? 'Shortlisted' : 'Applied'}
                        </>
                    ) : (
                        <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13" />
                                <polygon points="22 2 15 22 11 13 2 9 22 2" />
                            </svg>
                            Apply Now
                        </>
                    )}
                </button>
            </div>
        </article>
    );
};

export default EligibleJobCard;
