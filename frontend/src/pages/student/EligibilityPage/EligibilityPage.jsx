/**
 * EligibilityPage
 * Student Eligibility Status Page — Main orchestrator.
 *
 * Sections:
 *  1. Page Header with refresh & last-updated
 *  2. Summary KPI Cards (Eligible / Not Eligible / Profile Completion)
 *  3. Filter Bar (Tabs + Search + Company + Sort)
 *  4. Job Card Grid (Eligible or Not Eligible based on active tab)
 *  5. Pagination
 *  6. Loading & Empty states
 */
import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchEligibility,
    refreshEligibility,
    selectEligibilityLoading,
    selectEligibilityRefreshing,
    selectEligibilityError,
    selectActiveTab,
    selectFilteredJobs,
    selectLastUpdated,
    selectProfileComplete,
    selectMissingProfileFields,
} from '../../features/eligibility/eligibilitySlice';

// Components
import EligibilitySummary from '../../components/eligibility/EligibilitySummary/EligibilitySummary';
import EligibilityFilterBar from '../../components/eligibility/EligibilityFilterBar/EligibilityFilterBar';
import EligibleJobCard from '../../components/eligibility/EligibleJobCard/EligibleJobCard';
import NotEligibleJobCard from '../../components/eligibility/NotEligibleJobCard/NotEligibleJobCard';
import Pagination from '../../components/eligibility/Pagination/Pagination';
import EligibilitySkeletons from '../../components/eligibility/EligibilitySkeletons/EligibilitySkeletons';
import EligibilityEmptyState from '../../components/eligibility/EligibilityEmptyState/EligibilityEmptyState';

import './EligibilityPage.css';

const EligibilityPage = () => {
    const dispatch = useDispatch();

    // ── Selectors ──
    const loading = useSelector(selectEligibilityLoading);
    const refreshing = useSelector(selectEligibilityRefreshing);
    const error = useSelector(selectEligibilityError);
    const activeTab = useSelector(selectActiveTab);
    const { jobs, totalFiltered, totalPages, currentPage } = useSelector(selectFilteredJobs);
    const lastUpdated = useSelector(selectLastUpdated);
    const profileComplete = useSelector(selectProfileComplete);
    const missingFields = useSelector(selectMissingProfileFields);

    // ── Fetch on mount ──
    useEffect(() => {
        dispatch(fetchEligibility());
    }, [dispatch]);

    // ── Handlers ──
    const handleRefresh = useCallback(() => {
        dispatch(refreshEligibility());
    }, [dispatch]);

    const handleApply = useCallback((jobId) => {
        // Placeholder: integrate with applyToJob thunk from jobsSlice
        console.log('Apply to job:', jobId);
    }, []);

    // ── Format last updated ──
    const formattedLastUpdated = lastUpdated
        ? new Date(lastUpdated).toLocaleString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
        : null;

    // ── Loading State ──
    if (loading) {
        return (
            <div className="eligibility-page">
                <div className="eligibility-page__container">
                    <EligibilitySkeletons count={6} />
                </div>
            </div>
        );
    }

    // ── Error State ──
    if (error) {
        return (
            <div className="eligibility-page">
                <div className="eligibility-page__container">
                    <EligibilityEmptyState type="error" />
                </div>
            </div>
        );
    }

    return (
        <div className="eligibility-page">
            <div className="eligibility-page__container">
                {/* ── Page Header ── */}
                <header className="eligibility-page__header">
                    <div className="eligibility-page__header-left">
                        <h1 className="eligibility-page__title">Eligibility Status</h1>
                        <p className="eligibility-page__subtitle">
                            Review which placement opportunities match your profile
                        </p>
                    </div>
                    <div className="eligibility-page__header-right">
                        {formattedLastUpdated && (
                            <span className="eligibility-page__last-updated">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                                Updated {formattedLastUpdated}
                            </span>
                        )}
                        <button
                            className={`eligibility-page__refresh-btn ${refreshing ? 'eligibility-page__refresh-btn--spinning' : ''}`}
                            onClick={handleRefresh}
                            disabled={refreshing}
                            id="refresh-eligibility-btn"
                            aria-label="Refresh eligibility data"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="23 4 23 10 17 10" />
                                <polyline points="1 20 1 14 7 14" />
                                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                            </svg>
                            {refreshing ? 'Refreshing...' : 'Refresh'}
                        </button>
                    </div>
                </header>

                {/* ── Profile Incomplete Warning ── */}
                {!profileComplete && (
                    <div className="eligibility-page__profile-warning">
                        <div className="eligibility-page__profile-warning-content">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                                <line x1="12" y1="9" x2="12" y2="13" />
                                <line x1="12" y1="17" x2="12.01" y2="17" />
                            </svg>
                            <div>
                                <strong>Profile Incomplete</strong>
                                <p>
                                    Complete your profile to see all eligible opportunities.
                                    Missing: {missingFields.join(', ')}
                                </p>
                            </div>
                        </div>
                        <a href="/student/profile" className="eligibility-page__profile-warning-link">
                            Complete Profile →
                        </a>
                    </div>
                )}

                {/* ── Summary Cards ── */}
                <EligibilitySummary />

                {/* ── Filter Bar ── */}
                <EligibilityFilterBar />

                {/* ── Results Count ── */}
                {jobs.length > 0 && (
                    <p className="eligibility-page__results-count">
                        Showing <strong>{jobs.length}</strong> of <strong>{totalFiltered}</strong>{' '}
                        {activeTab === 'eligible' ? 'eligible' : 'not eligible'} jobs
                    </p>
                )}

                {/* ── Job Cards Grid ── */}
                {jobs.length > 0 ? (
                    <div className="eligibility-page__grid" role="list" aria-label={`${activeTab === 'eligible' ? 'Eligible' : 'Not Eligible'} jobs`}>
                        {activeTab === 'eligible'
                            ? jobs.map((job) => (
                                <EligibleJobCard
                                    key={job.id}
                                    job={job}
                                    onApply={handleApply}
                                />
                            ))
                            : jobs.map((job) => (
                                <NotEligibleJobCard key={job.id} job={job} />
                            ))}
                    </div>
                ) : (
                    <EligibilityEmptyState type="no_results" />
                )}

                {/* ── Pagination ── */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalFiltered={totalFiltered}
                />
            </div>
        </div>
    );
};

export default EligibilityPage;
