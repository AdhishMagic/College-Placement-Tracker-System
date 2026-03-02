import React from 'react';

const StatusIndicator = ({ isRead }) => {
    return (
        <div
            className={`w-2 h-2 rounded-full transition-colors duration-300 mt-1 shadow-sm ${isRead ? 'bg-gray-300 ring-4 ring-gray-100' : 'bg-blue-600 ring-4 ring-blue-100 animate-pulse'
                }`}
            aria-label={isRead ? 'Read notification' : 'Unread notification'}
        />
    );
};

export default StatusIndicator;
