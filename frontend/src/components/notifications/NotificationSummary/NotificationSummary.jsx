import React from 'react';
import { Mail, Calendar, AlertTriangle } from 'lucide-react';

const NotificationSummary = ({ unreadCount, todaysCount, alertCount }) => {
    const summaryCards = [
        {
            title: 'Unread Notifications',
            value: unreadCount,
            icon: <Mail className="w-5 h-5 text-blue-500" />,
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-700',
            borderColor: 'border-blue-100',
        },
        {
            title: 'Today\'s Updates',
            value: todaysCount,
            icon: <Calendar className="w-5 h-5 text-emerald-500" />,
            bgColor: 'bg-emerald-50',
            textColor: 'text-emerald-700',
            borderColor: 'border-emerald-100',
        },
        {
            title: 'System Alerts',
            value: alertCount,
            icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
            bgColor: 'bg-amber-50',
            textColor: 'text-amber-700',
            borderColor: 'border-amber-100',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {summaryCards.map((card, index) => (
                <div
                    key={index}
                    className={`flex items-center p-4 rounded-xl border ${card.borderColor} bg-white shadow-sm hover:shadow-md transition-shadow duration-200`}
                >
                    <div className={`p-3 rounded-lg ${card.bgColor} mr-4`}>
                        {card.icon}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">{card.title}</p>
                        <h3 className={`text-2xl font-bold ${card.textColor}`}>{card.value}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NotificationSummary;
