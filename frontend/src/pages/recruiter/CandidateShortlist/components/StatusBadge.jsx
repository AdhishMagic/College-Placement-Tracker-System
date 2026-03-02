import React from 'react';

const StatusBadge = ({ stage }) => {
    const getBadgeStye = (stageString) => {
        switch (stageString) {
            case 'Applied': return 'bg-gray-100 text-gray-700';
            case 'Shortlisted': return 'bg-blue-50 text-blue-700';
            case 'Interview Round 1': return 'bg-indigo-50 text-indigo-700';
            case 'Interview Round 2': return 'bg-purple-50 text-purple-700';
            case 'Offer': return 'bg-emerald-50 text-emerald-700';
            case 'Rejected': return 'bg-rose-50 text-rose-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getBadgeStye(stage)}`}>
            {stage}
        </span>
    );
};

export default StatusBadge;
