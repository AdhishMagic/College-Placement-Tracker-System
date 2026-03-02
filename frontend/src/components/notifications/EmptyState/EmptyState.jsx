import React from 'react';
import { BellOff } from 'lucide-react';

const EmptyState = () => {
    return (
        <div className="flex flex-col items-center justify-center p-12 h-full min-h-[400px] text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100 shadow-inner">
                <BellOff className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications yet</h3>
            <p className="text-gray-500 max-w-sm">
                You're all caught up! When there are updates about your applications, interviews, or offers, they will appear here.
            </p>
        </div>
    );
};

export default EmptyState;
