/**
 * EligibilitySkeletons Component
 * Loading state with skeleton cards mimicking the job card layout.
 */
import './EligibilitySkeletons.css';

const SkeletonCard = () => (
    <div className="eligibility-skeleton-card">
        <div className="eligibility-skeleton-card__header">
            <div className="eligibility-skeleton__circle" />
            <div className="eligibility-skeleton-card__header-text">
                <div className="eligibility-skeleton__bar eligibility-skeleton__bar--title" />
                <div className="eligibility-skeleton__bar eligibility-skeleton__bar--subtitle" />
            </div>
            <div className="eligibility-skeleton__badge" />
        </div>
        <div className="eligibility-skeleton-card__details">
            <div className="eligibility-skeleton__bar eligibility-skeleton__bar--detail" />
            <div className="eligibility-skeleton__bar eligibility-skeleton__bar--detail" />
            <div className="eligibility-skeleton__bar eligibility-skeleton__bar--detail" />
            <div className="eligibility-skeleton__bar eligibility-skeleton__bar--detail" />
        </div>
        <div className="eligibility-skeleton-card__footer">
            <div className="eligibility-skeleton__bar eligibility-skeleton__bar--meta" />
            <div className="eligibility-skeleton__bar eligibility-skeleton__bar--button" />
        </div>
    </div>
);

const SummarySkeleton = () => (
    <div className="eligibility-skeleton-summary">
        {[1, 2, 3].map((i) => (
            <div key={i} className="eligibility-skeleton-summary__card">
                <div className="eligibility-skeleton__circle eligibility-skeleton__circle--lg" />
                <div className="eligibility-skeleton-summary__content">
                    <div className="eligibility-skeleton__bar eligibility-skeleton__bar--label" />
                    <div className="eligibility-skeleton__bar eligibility-skeleton__bar--value" />
                    <div className="eligibility-skeleton__bar eligibility-skeleton__bar--hint" />
                </div>
            </div>
        ))}
    </div>
);

const EligibilitySkeletons = ({ count = 6 }) => (
    <div className="eligibility-skeletons">
        <SummarySkeleton />
        <div className="eligibility-skeleton-filter">
            <div className="eligibility-skeleton__bar eligibility-skeleton__bar--tab-strip" />
            <div className="eligibility-skeleton__bar eligibility-skeleton__bar--search" />
        </div>
        <div className="eligibility-skeletons__grid">
            {Array.from({ length: count }).map((_, idx) => (
                <SkeletonCard key={idx} />
            ))}
        </div>
    </div>
);

export default EligibilitySkeletons;
