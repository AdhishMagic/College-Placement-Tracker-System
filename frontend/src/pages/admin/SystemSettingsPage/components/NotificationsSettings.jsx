import React from 'react';
import { useDispatch } from 'react-redux';
import { updateDraft } from '../../../../features/settings/settingsSlice';
import ToggleSwitch from '../../../../components/ui/ToggleSwitch';

const NotificationsSettings = ({ data, drafts }) => {
    const dispatch = useDispatch();
    const sectionData = drafts?.notifications || data?.notifications || {};

    const handleChange = (field, value) => {
        dispatch(updateDraft({ section: 'notifications', field, value }));
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            <div>
                <h3 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-4">Notifications</h3>
                <p className="text-sm text-gray-500 mb-6">Configure platform notification delivery settings.</p>
            </div>

            <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-gray-100 p-6 space-y-6">
                <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-5 border border-gray-100 transition-colors hover:border-blue-100">
                        <ToggleSwitch
                            label="Email Notifications"
                            description="Send email alerts for critical updates and announcements."
                            checked={!!sectionData.email}
                            onChange={(val) => handleChange('email', val)}
                        />
                    </div>
                    <div className="bg-gray-50 rounded-lg p-5 border border-gray-100 transition-colors hover:border-blue-100">
                        <ToggleSwitch
                            label="System Notifications"
                            description="Enable in-app real-time notification alerts."
                            checked={!!sectionData.system}
                            onChange={(val) => handleChange('system', val)}
                        />
                    </div>
                    <div className="bg-gray-50 rounded-lg p-5 border border-gray-100 transition-colors hover:border-blue-100">
                        <ToggleSwitch
                            label="Interview Reminders"
                            description="Automatically send interview reminders 24 hours prior."
                            checked={!!sectionData.reminders}
                            onChange={(val) => handleChange('reminders', val)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationsSettings;
