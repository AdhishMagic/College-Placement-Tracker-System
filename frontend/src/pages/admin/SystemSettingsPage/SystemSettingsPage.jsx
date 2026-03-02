import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiCheckCircle } from 'react-icons/fi';
import {
    fetchSettings,
    saveSettings,
    resetDrafts,
    clearSuccessMessage,
    selectOriginalSettings,
    selectSettingsLoading,
    selectSettingsSaving,
    selectSettingsError,
    selectSettingsSuccess,
    selectHasDraftChanges,
} from '../../../features/settings/settingsSlice';

import SettingsSidebar from './components/SettingsSidebar';
import GeneralSettings from './components/GeneralSettings';
import PlacementRules from './components/PlacementRules';
import NotificationsSettings from './components/NotificationsSettings';
import SecuritySettings from './components/SecuritySettings';
import UserRoles from './components/UserRoles';
import AcademicYear from './components/AcademicYear';

const SystemSettingsPage = () => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('general');

    const drafts = useSelector((state) => state.settings.drafts);
    const data = useSelector(selectOriginalSettings);
    const isLoading = useSelector(selectSettingsLoading);
    const isSaving = useSelector(selectSettingsSaving);
    const error = useSelector(selectSettingsError);
    const successMessage = useSelector(selectSettingsSuccess);
    const hasDraftChanges = useSelector(selectHasDraftChanges);

    useEffect(() => {
        dispatch(fetchSettings());
    }, [dispatch]);

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                dispatch(clearSuccessMessage());
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage, dispatch]);

    const handleSave = () => {
        if (drafts) {
            dispatch(saveSettings(drafts));
        }
    };

    const handleCancel = () => {
        dispatch(resetDrafts());
    };

    const renderActiveTab = () => {
        if (isLoading && !data) {
            return (
                <div className="flex justify-center items-center h-full min-h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            );
        }

        switch (activeTab) {
            case 'general':
                return <GeneralSettings data={data} drafts={drafts} />;
            case 'rules':
                return <PlacementRules data={data} drafts={drafts} />;
            case 'notifications':
                return <NotificationsSettings data={data} drafts={drafts} />;
            case 'security':
                return <SecuritySettings data={data} drafts={drafts} />;
            case 'roles':
                return <UserRoles data={data} />;
            case 'academic':
                return <AcademicYear data={data} drafts={drafts} />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pt-4">
            {/* Success Banner */}
            {successMessage && (
                <div className="fixed top-20 right-8 z-50 animate-in slide-in-from-top-4 duration-300">
                    <div className="bg-green-50 text-green-800 border-l-4 border-green-500 rounded-r shadow-lg pr-4 py-3 pl-3 flex items-center gap-3">
                        <FiCheckCircle size={20} className="text-green-500" />
                        <div>
                            <p className="font-medium text-sm">Success</p>
                            <p className="text-xs text-green-700">{successMessage}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-4">
                <div className="flex flex-col md:flex-row gap-6 lg:gap-8 h-[calc(100vh-140px)]">
                    {/* Sidebar / Left Navigation */}
                    <div className="md:w-64 lg:w-72 flex-shrink-0 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] rounded-xl overflow-hidden hidden md:block border border-gray-100 h-full overflow-y-auto custom-scrollbar">
                        <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />
                    </div>

                    {/* Mobile Navigation Dropdown */}
                    <div className="md:hidden">
                        <select
                            value={activeTab}
                            onChange={(e) => setActiveTab(e.target.value)}
                            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 shadow-sm"
                        >
                            <option value="general">General Settings</option>
                            <option value="rules">Placement Rules</option>
                            <option value="notifications">Notifications</option>
                            <option value="roles">User Roles & Permissions</option>
                            <option value="security">Security</option>
                            <option value="academic">Academic Year</option>
                        </select>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 flex flex-col bg-transparent overflow-hidden">
                        <div className="flex-1 overflow-y-auto px-1 pb-24 custom-scrollbar">
                            {error && (
                                <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-100">
                                    <p className="text-sm">{error}</p>
                                </div>
                            )}
                            {renderActiveTab()}
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Bar - Fixed Bottom (Only visible if changes made) */}
            <div
                className={`fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] px-6 py-4 flex justify-end gap-4 transition-transform duration-300 ease-in-out ${hasDraftChanges ? 'translate-y-0' : 'translate-y-full'
                    }`}
                style={{ zIndex: 40 }}
            >
                <div className="max-w-7xl mx-auto w-full flex justify-end gap-4 px-4 sm:px-6 lg:px-8">
                    <button
                        onClick={handleCancel}
                        disabled={isSaving}
                        className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                        Cancel Changes
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-5 py-2.5 flex items-center gap-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-100 disabled:opacity-50 min-w-[140px] justify-center"
                    >
                        {isSaving ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                Saving...
                            </>
                        ) : (
                            'Save Changes'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SystemSettingsPage;
