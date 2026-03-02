import React from 'react';
import { Users, UserCheck, BriefcaseBusiness, CalendarDays, ListFilter } from 'lucide-react';

const tabs = [
    { id: 'round1', label: 'Round 1', icon: Users, count: 42 },
    { id: 'round2', label: 'Round 2', icon: UserCheck, count: 18 },
    { id: 'hr', label: 'HR Round', icon: BriefcaseBusiness, count: 5 },
];

const InterviewTabs = ({ activeTab, onTabChange, viewMode, onViewModeChange }) => {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 bg-white px-2 sm:px-6 py-2 rounded-t-xl overflow-hidden shadow-sm">
            {/* Stage Tabs */}
            <div className="flex overflow-x-auto w-full sm:w-auto scrollbar-hide mb-4 sm:mb-0 space-x-1">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`flex items-center space-x-2 px-4 py-3 border-b-2 text-sm font-medium transition-colors whitespace-nowrap
                                ${isActive ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        >
                            <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                            <span>{tab.label}</span>
                            <span className={`ml-2 py-0.5 px-2 rounded-full text-xs
                                ${isActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}
                            >
                                {tab.count}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* View Toggles */}
            <div className="flex items-center space-x-3 w-full sm:w-auto mt-2 sm:mt-0 px-2 sm:px-0 border-t sm:border-t-0 border-gray-100 pt-3 sm:pt-0">
                <div className="flex items-center bg-gray-100 p-1 rounded-lg">
                    <button
                        onClick={() => onViewModeChange('list')}
                        className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-shadow
                            ${viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <ListFilter className="w-4 h-4 mr-2" />
                        List View
                    </button>
                    <button
                        onClick={() => onViewModeChange('calendar')}
                        className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-shadow
                            ${viewMode === 'calendar' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <CalendarDays className="w-4 h-4 mr-2" />
                        Calendar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InterviewTabs;
