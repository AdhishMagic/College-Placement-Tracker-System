/**
 * ApplicationSkeletons
 * Shimmering loading placeholders mirroring the ApplicationCard grid layout.
 */
import './ApplicationSkeletons.css';

const ApplicationSkeletons = ({ count = 6 }) => {
    return (
        <div className="app-skeletons" role="status" aria-label="Loading applications" aria-busy="true">
            {Array.from({ length: count }).map((_, idx) => (
                <div key={idx} className="app-skeleton-card">
                    {/* Header: Logo + Info + Badge */}
                    <div className="app-skeleton-card__header">
                        <div className="app-skeleton-card__logo" />
                        <div className="app-skeleton-card__info">
                            <div className="app-skeleton-card__text app-skeleton-card__text--lg" />
                            <div className="app-skeleton-card__text app-skeleton-card__text--sm" />
                        </div>
                        <div className="app-skeleton-card__badge" />
                    </div>

                    {/* Meta Row */}
                    <div className="app-skeleton-card__meta">
                        <div className="app-skeleton-card__chip" />
                        <div className="app-skeleton-card__chip" />
                    </div>

                    {/* Timeline */}
                    <div className="app-skeleton-card__timeline">
                        <div className="app-skeleton-card__step" />
                        <div className="app-skeleton-card__step" />
                        <div className="app-skeleton-card__step" />
                    </div>

                    {/* Footer Button */}
                    <div className="app-skeleton-card__footer">
                        <div className="app-skeleton-card__btn" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ApplicationSkeletons;
