import React from 'react';
import {
    FiSettings,
    FiShield,
    FiBell,
    FiUsers,
    FiLock,
    FiCalendar
} from 'react-icons/fi';

const SettingsSidebar = ({ activeTab, onTabChange }) => {
    const tabs = [
        { id: 'general', label: 'General Settings', icon: FiSettings },
        { id: 'rules', label: 'Placement Rules', icon: FiShield },
        { id: 'notifications', label: 'Notifications', icon: FiBell },
        { id: 'roles', label: 'User Roles & Permissions', icon: FiUsers },
        { id: 'security', label: 'Security', icon: FiLock },
        { id: 'academic', label: 'Academic Year', icon: FiCalendar },
    ];

    return (
        <div className="w-full h-full bg-white border-r border-gray-200">
            <div className="p-6 pb-2">
                <h2 className="text-xl font-bold text-gray-900">System Settings</h2>
                <p className="text-sm text-gray-500 mt-1">Manage platform configuration</p>
            </div>
            <nav className="flex flex-col gap-1 p-4">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150 ${isActive
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <span className={isActive ? 'text-blue-600' : 'text-gray-400'}>
                                <Icon size={18} />
                            </span>
                            {tab.label}
                            {isActive && (
                                <span className="absolute left-0 w-1 h-8 bg-blue-600 rounded-r-md" aria-hidden="true" />
                            )}
                        </button>
                    );
                })}
            </nav>
        </div>
    );
};

export default SettingsSidebar;
