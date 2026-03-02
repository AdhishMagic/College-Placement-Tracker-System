import React from 'react';
import NotificationItem from '../NotificationItem/NotificationItem';
import EmptyState from '../EmptyState/EmptyState';
import LoadingSkeleton from '../LoadingSkeleton/LoadingSkeleton';

const NotificationList = ({ notifications, isLoading, onNotificationClick }) => {
    if (isLoading) {
        return <LoadingSkeleton count={5} />;
    }

    if (!notifications || notifications.length === 0) {
        return <EmptyState />;
    }

    return (
        <div className="space-y-2 py-2">
            {notifications.map((notification) => (
                <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onClick={() => onNotificationClick(notification)}
                />
            ))}
        </div>
    );
};

export default NotificationList;
