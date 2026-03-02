import React from 'react';

const statusStyles = {
    Scheduled: 'bg-blue-50 text-blue-700 border-blue-200',
    Completed: 'bg-green-50 text-green-700 border-green-200',
    Cancelled: 'bg-red-50 text-red-700 border-red-200',
    Pending: 'bg-gray-50 text-gray-700 border-gray-200',
};

const InterviewStatusBadge = ({ status }) => {
    const style = statusStyles[status] || statusStyles.Pending;

    return (
        <span className={`px-2.5 py-1 text-xs font-medium border rounded-full ${style}`}>
            {status}
        </span>
    );
};

export default InterviewStatusBadge;
