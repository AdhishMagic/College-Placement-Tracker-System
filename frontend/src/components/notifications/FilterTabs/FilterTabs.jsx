import React from 'react';

const FilterTabs = ({ activeTab, onTabChange }) => {
    const tabs = ['All', 'Applications', 'Interviews', 'Offers', 'System'];

    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap ${activeTab === tab
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200 hover:text-gray-900 border border-transparent hover:border-gray-300'
                        }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default FilterTabs;
