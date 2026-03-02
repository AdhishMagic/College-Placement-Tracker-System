import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NotificationSummary from '../../../components/notifications/NotificationSummary/NotificationSummary';
import FilterTabs from '../../../components/notifications/FilterTabs/FilterTabs';
import NotificationList from '../../../components/notifications/NotificationList/NotificationList';
import NotificationDetailModal from '../../../components/notifications/NotificationDetailModal/NotificationDetailModal';
import {
    fetchNotifications,
    markAllAsRead,
    markAsRead
} from '../../../redux/slices/notificationSlice';
import { Bell, CheckCircle } from 'lucide-react';

const NotificationsPage = () => {
    const dispatch = useDispatch();
    const {
        items,
        status,
        unreadCount,
        todaysCount,
        alertCount
    } = useSelector((state) => state.notifications);

    const [activeTab, setActiveTab] = useState('All');
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchNotifications());
        }
    }, [status, dispatch]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleMarkAllRead = () => {
        dispatch(markAllAsRead());
    };

    const handleNotificationClick = (notification) => {
        if (!notification.isRead) {
            dispatch(markAsRead(notification.id));
        }
        setSelectedNotification(notification);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedNotification(null);
    };

    // Filter logic
    const filteredNotifications = items.filter((item) => {
        if (activeTab === 'All') return true;
        return item.category === activeTab;
    });

    return (
        <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <Bell className="w-6 h-6 text-blue-600" />
                            Notifications Center
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Stay updated on your applications, interviews, and platform alerts.
                        </p>
                    </div>

                    <button
                        onClick={handleMarkAllRead}
                        disabled={unreadCount === 0}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${unreadCount > 0
                                ? 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 hover:border-blue-300 shadow-sm'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        <CheckCircle className="w-4 h-4" />
                        Mark all as read
                    </button>
                </div>

                {/* Summary Metric Cards */}
                <NotificationSummary
                    unreadCount={unreadCount}
                    todaysCount={todaysCount}
                    alertCount={alertCount}
                />

                {/* Main Content Area: Grid Layout */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[700px]">
                    {/* Header/Filters */}
                    <div className="border-b border-gray-100 p-4 bg-gray-50/50">
                        <FilterTabs
                            activeTab={activeTab}
                            onTabChange={handleTabChange}
                        />
                    </div>

                    {/* List Area */}
                    <div className="flex-1 overflow-y-auto p-2">
                        <NotificationList
                            notifications={filteredNotifications}
                            isLoading={status === 'loading'}
                            onNotificationClick={handleNotificationClick}
                        />
                    </div>
                </div>
            </div>

            {/* Detail Modal */}
            <NotificationDetailModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                notification={selectedNotification}
            />
        </div>
    );
};

export default NotificationsPage;
