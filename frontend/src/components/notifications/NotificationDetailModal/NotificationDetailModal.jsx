import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

const NotificationDetailModal = ({ isOpen, onClose, notification }) => {
    if (!isOpen || !notification) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all animate-in zoom-in-95 duration-200 border border-gray-100">

                {/* Header */}
                <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="text-lg font-semibold text-gray-900">Notification Details</h3>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                    <div>
                        <span className="inline-block px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full mb-3">
                            {notification.category}
                        </span>
                        <h4 className="text-xl font-bold text-gray-900 leading-tight">
                            {notification.title}
                        </h4>
                        <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                            {notification.timestamp && format(new Date(notification.timestamp), 'PPP at p')}
                        </p>
                    </div>

                    <div className="dividing-border border-t border-gray-100 pt-4">
                        <p className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {notification.description}
                        </p>
                    </div>
                </div>

                {/* Footer actions */}
                <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
                    >
                        Close
                    </button>

                    {notification.actionLink && (
                        <a
                            href={notification.actionLink}
                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 transition-colors gap-2"
                        >
                            {notification.actionText || 'View Details'}
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationDetailModal;
