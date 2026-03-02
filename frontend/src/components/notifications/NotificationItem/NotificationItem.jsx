import React from 'react';
import {
    FileText,
    Calendar,
    Award,
    AlertCircle,
    Bell,
    ChevronRight
} from 'lucide-react';
import StatusIndicator from '../StatusIndicator/StatusIndicator';
import { formatDistanceToNow } from 'date-fns';

const NotificationItem = ({ notification, onClick }) => {
    const getIconConfig = (type) => {
        switch (type) {
            case 'Application Shortlisted':
                return { icon: <FileText className="w-5 h-5 text-blue-600" />, bg: 'bg-blue-100' };
            case 'Interview Scheduled':
                return { icon: <Calendar className="w-5 h-5 text-purple-600" />, bg: 'bg-purple-100' };
            case 'Offer Released':
                return { icon: <Award className="w-5 h-5 text-emerald-600" />, bg: 'bg-emerald-100' };
            case 'Profile Incomplete':
                return { icon: <AlertCircle className="w-5 h-5 text-amber-600" />, bg: 'bg-amber-100' };
            default:
                return { icon: <Bell className="w-5 h-5 text-gray-600" />, bg: 'bg-gray-100' };
        }
    };

    const { icon, bg } = getIconConfig(notification.type);

    // Safely format timestamp using date-fns or fallback
    const formattedTime = notification.timestamp
        ? formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })
        : 'Just now';

    return (
        <div
            onClick={onClick}
            className={`group relative flex items-start gap-4 p-4 rounded-xl border transition-all duration-200 cursor-pointer ${notification.isRead
                    ? 'bg-white border-transparent hover:border-gray-200 hover:shadow-sm'
                    : 'bg-blue-50/30 border-blue-100 hover:border-blue-200 hover:shadow-md'
                }`}
        >
            {/* Icon */}
            <div className={`p-3 rounded-full shrink-0 ${bg}`}>
                {icon}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pt-1">
                <div className="flex justify-between items-start gap-2">
                    <h4 className={`text-sm font-semibold truncate ${notification.isRead ? 'text-gray-700' : 'text-gray-900'
                        }`}>
                        {notification.title}
                    </h4>
                    <span className="text-xs text-gray-400 whitespace-nowrap pt-0.5">
                        {formattedTime}
                    </span>
                </div>

                <p className={`text-sm mt-1 line-clamp-2 ${notification.isRead ? 'text-gray-500' : 'text-gray-600 font-medium'
                    }`}>
                    {notification.description}
                </p>

                {/* Action Link Placeholder */}
                {notification.actionText && (
                    <div className="mt-3 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                        {notification.actionText}
                        <ChevronRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
                    </div>
                )}
            </div>

            {/* Status Dot */}
            <div className="flex items-center h-full justify-center px-1 pt-2 align-top">
                <StatusIndicator isRead={notification.isRead} />
            </div>
        </div>
    );
};

export default NotificationItem;
