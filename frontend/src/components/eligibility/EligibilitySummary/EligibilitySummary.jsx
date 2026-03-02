/**
 * EligibilitySummary Component
 * Displays KPI stat cards: Total Eligible, Not Eligible, Profile Warning.
 * Edway academic card design with semantic color coding.
 */
import { useSelector } from 'react-redux';
import {
    selectEligibilitySummary,
    selectMissingProfileFields,
} from '../../../features/eligibility/eligibilitySlice';
import './EligibilitySummary.css';

const EligibilitySummary = () => {
    const summary = useSelector(selectEligibilitySummary);
    const missingFields = useSelector(selectMissingProfileFields);

    return (
        <section className="eligibility-summary" aria-label="Eligibility Summary">
            {/* ── Eligible Count ── */}
            <div className="eligibility-summary__card eligibility-summary__card--eligible">
                <div className="eligibility-summary__icon-wrap eligibility-summary__icon-wrap--success">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                </div>
                <div className="eligibility-summary__content">
                    <p className="eligibility-summary__label">Eligible Jobs</p>
                    <h3 className="eligibility-summary__value">{summary.totalEligible}</h3>
                    <p className="eligibility-summary__hint">You meet all criteria</p>
                </div>
            </div>

            {/* ── Not Eligible Count ── */}
            <div className="eligibility-summary__card eligibility-summary__card--not-eligible">
                <div className="eligibility-summary__icon-wrap eligibility-summary__icon-wrap--danger">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                </div>
                <div className="eligibility-summary__content">
                    <p className="eligibility-summary__label">Not Eligible</p>
                    <h3 className="eligibility-summary__value">{summary.totalNotEligible}</h3>
                    <p className="eligibility-summary__hint">Criteria not met</p>
                </div>
            </div>

            {/* ── Profile Completion ── */}
            <div className={`eligibility-summary__card eligibility-summary__card--profile ${summary.profileComplete ? 'eligibility-summary__card--complete' : 'eligibility-summary__card--incomplete'
                }`}>
                <div className={`eligibility-summary__icon-wrap ${summary.profileComplete
                        ? 'eligibility-summary__icon-wrap--success'
                        : 'eligibility-summary__icon-wrap--warning'
                    }`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                </div>
                <div className="eligibility-summary__content">
                    <p className="eligibility-summary__label">Profile Status</p>
                    <h3 className="eligibility-summary__value">{summary.completionPercent}%</h3>
                    <p className="eligibility-summary__hint">
                        {summary.profileComplete
                            ? 'Profile complete'
                            : `${missingFields.length} field${missingFields.length !== 1 ? 's' : ''} missing`}
                    </p>
                </div>
                {!summary.profileComplete && (
                    <div className="eligibility-summary__warning-banner">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                            <line x1="12" y1="9" x2="12" y2="13" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                        <span>Complete your profile to unlock more opportunities</span>
                    </div>
                )}
            </div>
        </section>
    );
};

export default EligibilitySummary;
