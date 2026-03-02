import React from 'react';

const LoadingSkeleton = ({ count = 5 }) => {
    return (
        <div className="space-y-4 p-4 animate-pulse">
            {[...Array(count)].map((_, i) => (
                <div key={i} className="flex gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                    <div className="w-12 h-12 bg-gray-200 rounded-full shrink-0"></div>
                    <div className="flex-1 space-y-3 py-1">
                        <div className="flex justify-between items-start">
                            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                            <div className="h-3 bg-gray-200 rounded w-16"></div>
                        </div>
                        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                        <div className="h-3 bg-gray-200 rounded w-24 mt-4"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LoadingSkeleton;
