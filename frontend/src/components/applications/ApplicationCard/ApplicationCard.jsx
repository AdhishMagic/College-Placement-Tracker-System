/**
 * ApplicationCard
 * Displays a single application with company, job title, package,
 * date, status badge, mini-timeline, and view-details button.
 */
import ApplicationStatusBadge from '../ApplicationStatusBadge/ApplicationStatusBadge';
import HiringTimeline from '../HiringTimeline/HiringTimeline';
import './ApplicationCard.css';

/* ── Icons ── */
const BuildingIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><line x1="8" y1="6" x2="8" y2="6" /><line x1="12" y1="6" x2="12" y2="6" /><line x1="16" y1="6" x2="16" y2="6" /><line x1="8" y1="10" x2="8" y2="10" /><line x1="12" y1="10" x2="12" y2="10" /><line x1="16" y1="10" x2="16" y2="10" /><line x1="8" y1="14" x2="8" y2="14" /><line x1="12" y1="14" x2="12" y2="14" /><line x1="16" y1="14" x2="16" y2="14" />
    </svg>
);

const BriefcaseIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
);

const CurrencyIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
);

const CalendarSmIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

const EyeIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
);

/** Map status → stage key for timeline */
const statusToStage = {
    applied: 'applied',
    shortlisted: 'shortlisted',
    interview_scheduled: 'interview_r1',
    offer_received: 'offer',
    rejected: 'shortlisted',
};

const ApplicationCard = ({ application, onViewDetails }) => {
    const {
        id,
        companyName,
        companyLogo,
        jobTitle,
        package: pkg,
        appliedDate,
        status,
        currentStage,
        completedStages,
    } = application;

    const formattedDate = appliedDate
        ? new Date(appliedDate).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        })
        : '—';

    const stageKey = currentStage || statusToStage[status] || 'applied';

    return (
        <article className="app-card" role="listitem" id={`application-card-${id}`}>
            {/* ── Header ── */}
            <div className="app-card__header">
                <div className="app-card__company">
                    {companyLogo ? (
                        <img src={companyLogo} alt={companyName} className="app-card__logo" />
                    ) : (
                        <div className="app-card__logo-placeholder">
                            <BuildingIcon />
                        </div>
                    )}
                    <div className="app-card__company-info">
                        <h4 className="app-card__company-name">{companyName}</h4>
                        <p className="app-card__job-title">
                            <BriefcaseIcon />
                            {jobTitle}
                        </p>
                    </div>
                </div>
                <ApplicationStatusBadge status={status} size="md" />
            </div>

            {/* ── Meta Row ── */}
            <div className="app-card__meta">
                {pkg && (
                    <span className="app-card__meta-item">
                        <CurrencyIcon />
                        {pkg}
                    </span>
                )}
                <span className="app-card__meta-item">
                    <CalendarSmIcon />
                    {formattedDate}
                </span>
            </div>

            {/* ── Mini Timeline ── */}
            <div className="app-card__timeline">
                <HiringTimeline
                    currentStage={stageKey}
                    rejected={status === 'rejected'}
                    completedAt={completedStages || {}}
                    compact
                />
            </div>

            {/* ── Footer ── */}
            <div className="app-card__footer">
                <button
                    className="app-card__view-btn"
                    onClick={() => onViewDetails(application)}
                    id={`view-details-btn-${id}`}
                    aria-label={`View details for ${companyName} – ${jobTitle}`}
                >
                    <EyeIcon />
                    View Details
                </button>
            </div>
        </article>
    );
};

export default ApplicationCard;
