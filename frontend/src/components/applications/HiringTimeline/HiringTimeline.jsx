/**
 * HiringTimeline
 * Vertical step indicator showing hiring progress per application.
 *
 * Props:
 *   stages      – array of { key, label, icon }
 *   currentStage– string key of active / latest stage
 *   rejected    – boolean, if true the last completed step turns red
 *   completedAt – optional map { stageKey: dateString } for timestamps
 */
import './HiringTimeline.css';

/* ── Icon map (inline SVGs) ── */
const iconMap = {
    send: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
    ),
    'check-circle': (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    ),
    users: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    ),
    'user-check': (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><polyline points="17 11 19 13 23 9" />
        </svg>
    ),
    award: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
        </svg>
    ),
    'x-circle': (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
        </svg>
    ),
};

const CheckIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const DEFAULT_STAGES = [
    { key: 'applied', label: 'Applied', icon: 'send' },
    { key: 'shortlisted', label: 'Shortlisted', icon: 'check-circle' },
    { key: 'interview_r1', label: 'Interview Round 1', icon: 'users' },
    { key: 'interview_r2', label: 'Interview Round 2', icon: 'user-check' },
    { key: 'offer', label: 'Offer', icon: 'award' },
];

/* ── Helpers ── */
const getStageIndex = (stages, key) => stages.findIndex((s) => s.key === key);

const HiringTimeline = ({
    stages = DEFAULT_STAGES,
    currentStage = 'applied',
    rejected = false,
    completedAt = {},
    compact = false,
}) => {
    const currentIdx = getStageIndex(stages, currentStage);

    // If rejected, add a "Rejected" step after the current
    const allStages = rejected
        ? [
            ...stages.slice(0, currentIdx + 1),
            { key: 'rejected', label: 'Rejected', icon: 'x-circle' },
        ]
        : stages;

    const activeIdx = rejected ? currentIdx + 1 : currentIdx;

    return (
        <div className={`hiring-timeline ${compact ? 'hiring-timeline--compact' : ''}`} role="list" aria-label="Hiring stages">
            {allStages.map((stage, idx) => {
                const isCompleted = idx < activeIdx;
                const isActive = idx === activeIdx;
                const isPending = idx > activeIdx;
                const isRejected = stage.key === 'rejected';

                let stateClass = 'hiring-timeline__step--pending';
                if (isCompleted) stateClass = 'hiring-timeline__step--completed';
                if (isActive && !isRejected) stateClass = 'hiring-timeline__step--active';
                if (isRejected) stateClass = 'hiring-timeline__step--rejected';

                return (
                    <div
                        key={stage.key}
                        className={`hiring-timeline__step ${stateClass}`}
                        role="listitem"
                        aria-current={isActive ? 'step' : undefined}
                    >
                        {/* Connector line (not on first) */}
                        {idx > 0 && (
                            <div className={`hiring-timeline__connector ${isCompleted || isActive || isRejected ? 'hiring-timeline__connector--filled' : ''} ${isRejected ? 'hiring-timeline__connector--rejected' : ''}`} />
                        )}

                        {/* Node */}
                        <div className="hiring-timeline__node">
                            {isCompleted ? (
                                <CheckIcon />
                            ) : (
                                iconMap[stage.icon] || <span className="hiring-timeline__step-num">{idx + 1}</span>
                            )}
                        </div>

                        {/* Label + date */}
                        <div className="hiring-timeline__label-wrap">
                            <span className="hiring-timeline__label">{stage.label}</span>
                            {completedAt[stage.key] && (
                                <span className="hiring-timeline__date">
                                    {new Date(completedAt[stage.key]).toLocaleDateString('en-IN', {
                                        day: 'numeric',
                                        month: 'short',
                                    })}
                                </span>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default HiringTimeline;
