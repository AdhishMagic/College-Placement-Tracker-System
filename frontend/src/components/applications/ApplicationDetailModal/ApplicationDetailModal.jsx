/**
 * ApplicationDetailModal
 * Full-detail overlay for a selected application.
 * Shows company info, job details, full hiring timeline, and interview schedule.
 */
import { useEffect, useRef } from 'react';
import ApplicationStatusBadge from '../ApplicationStatusBadge/ApplicationStatusBadge';
import HiringTimeline from '../HiringTimeline/HiringTimeline';
import './ApplicationDetailModal.css';

/* ── Icons ── */
const CloseIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const MapPinIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
);

const ClockIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
);

const LinkIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
);

const ApplicationDetailModal = ({ application, onClose }) => {
    const overlayRef = useRef(null);
    const panelRef = useRef(null);

    // Close on Escape
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    // Close on overlay click
    const handleOverlayClick = (e) => {
        if (e.target === overlayRef.current) onClose();
    };

    if (!application) return null;

    const {
        companyName,
        companyLogo,
        jobTitle,
        package: pkg,
        location,
        jobType,
        appliedDate,
        status,
        currentStage,
        completedStages,
        interviewSchedule,
        jobDescription,
        offerDetails,
    } = application;

    const stageKey = currentStage || 'applied';
    const formattedApplied = appliedDate
        ? new Date(appliedDate).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
        : '—';

    return (
        <div
            className="app-modal-overlay"
            ref={overlayRef}
            onClick={handleOverlayClick}
            role="dialog"
            aria-modal="true"
            aria-label={`Application details – ${companyName}`}
        >
            <div className="app-modal" ref={panelRef}>
                {/* ── Header ── */}
                <header className="app-modal__header">
                    <div className="app-modal__header-left">
                        {companyLogo ? (
                            <img src={companyLogo} alt={companyName} className="app-modal__logo" />
                        ) : (
                            <div className="app-modal__logo-placeholder">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                                    <path d="M9 22v-4h6v4" />
                                </svg>
                            </div>
                        )}
                        <div>
                            <h2 className="app-modal__company">{companyName}</h2>
                            <p className="app-modal__job">{jobTitle}</p>
                        </div>
                    </div>
                    <button className="app-modal__close" onClick={onClose} aria-label="Close" id="close-application-modal">
                        <CloseIcon />
                    </button>
                </header>

                {/* ── Status + Meta ── */}
                <div className="app-modal__status-bar">
                    <ApplicationStatusBadge status={status} size="lg" />
                    <div className="app-modal__meta-chips">
                        {pkg && (
                            <span className="app-modal__chip">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                </svg>
                                {pkg}
                            </span>
                        )}
                        {location && (
                            <span className="app-modal__chip"><MapPinIcon />{location}</span>
                        )}
                        {jobType && (
                            <span className="app-modal__chip"><ClockIcon />{jobType}</span>
                        )}
                        <span className="app-modal__chip">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            Applied {formattedApplied}
                        </span>
                    </div>
                </div>

                {/* ── Body ── */}
                <div className="app-modal__body">
                    {/* Timeline Section */}
                    <section className="app-modal__section">
                        <h3 className="app-modal__section-title">Hiring Progress</h3>
                        <div className="app-modal__timeline-wrap">
                            <HiringTimeline
                                currentStage={stageKey}
                                rejected={status === 'rejected'}
                                completedAt={completedStages || {}}
                            />
                        </div>
                    </section>

                    {/* Interview Schedule */}
                    {interviewSchedule && interviewSchedule.length > 0 && (
                        <section className="app-modal__section">
                            <h3 className="app-modal__section-title">Interview Schedule</h3>
                            <div className="app-modal__interview-list">
                                {interviewSchedule.map((iv, idx) => (
                                    <div key={idx} className="app-modal__interview-item">
                                        <div className="app-modal__interview-round">
                                            <span className="app-modal__interview-round-num">Round {iv.round || idx + 1}</span>
                                            <span className="app-modal__interview-type">{iv.type || 'Technical'}</span>
                                        </div>
                                        <div className="app-modal__interview-details">
                                            <span className="app-modal__interview-date">
                                                <ClockIcon />
                                                {iv.dateTime
                                                    ? new Date(iv.dateTime).toLocaleString('en-IN', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })
                                                    : 'TBD'}
                                            </span>
                                            {iv.link && (
                                                <a href={iv.link} target="_blank" rel="noopener noreferrer" className="app-modal__interview-link">
                                                    <LinkIcon /> Join Link
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Job Description */}
                    {jobDescription && (
                        <section className="app-modal__section">
                            <h3 className="app-modal__section-title">Job Description</h3>
                            <p className="app-modal__description">{jobDescription}</p>
                        </section>
                    )}

                    {/* Offer Details */}
                    {status === 'offer_received' && offerDetails && (
                        <section className="app-modal__section app-modal__section--offer">
                            <h3 className="app-modal__section-title">🎉 Offer Details</h3>
                            <div className="app-modal__offer-grid">
                                {offerDetails.ctc && (
                                    <div className="app-modal__offer-item">
                                        <span className="app-modal__offer-label">CTC</span>
                                        <span className="app-modal__offer-value">{offerDetails.ctc}</span>
                                    </div>
                                )}
                                {offerDetails.joiningDate && (
                                    <div className="app-modal__offer-item">
                                        <span className="app-modal__offer-label">Joining Date</span>
                                        <span className="app-modal__offer-value">{offerDetails.joiningDate}</span>
                                    </div>
                                )}
                                {offerDetails.role && (
                                    <div className="app-modal__offer-item">
                                        <span className="app-modal__offer-label">Role</span>
                                        <span className="app-modal__offer-value">{offerDetails.role}</span>
                                    </div>
                                )}
                                {offerDetails.location && (
                                    <div className="app-modal__offer-item">
                                        <span className="app-modal__offer-label">Location</span>
                                        <span className="app-modal__offer-value">{offerDetails.location}</span>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApplicationDetailModal;
