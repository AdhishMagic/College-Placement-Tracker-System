import React from 'react';
import { useDispatch } from 'react-redux';
import { updateDraft } from '../../../../features/settings/settingsSlice';
import ToggleSwitch from '../../../../components/ui/ToggleSwitch';

const SecuritySettings = ({ data, drafts }) => {
    const dispatch = useDispatch();
    const sectionData = drafts?.security || data?.security || {};

    const handleChange = (field, value) => {
        dispatch(updateDraft({ section: 'security', field, value }));
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            <div>
                <h3 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-4">Security</h3>
                <p className="text-sm text-gray-500 mb-6">Manage authentication and session policies.</p>
            </div>

            <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-gray-100 p-6 space-y-8">
                <div className="space-y-6 pb-6 border-b border-gray-100">
                    <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                        <ToggleSwitch
                            label="Enforce Strict Password Policy"
                            description="Require numbers, mixed case, and symbols for all new passwords."
                            checked={!!sectionData.passwordPolicy}
                            onChange={(val) => handleChange('passwordPolicy', val)}
                        />
                    </div>
                </div>

                <div className="space-y-4 pb-6 border-b border-gray-100 max-w-md">
                    <label className="text-sm font-medium text-gray-700">Session Timeout (Minutes)</label>
                    <div className="flex items-center gap-4">
                        <select
                            value={sectionData.sessionTimeout || 30}
                            onChange={(e) => handleChange('sessionTimeout', parseInt(e.target.value))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-colors bg-white shadow-sm"
                        >
                            <option value={15}>15 Minutes</option>
                            <option value={30}>30 Minutes</option>
                            <option value={60}>1 Hour</option>
                            <option value={120}>2 Hours</option>
                        </select>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Automatically log out inactive users.</p>
                </div>

                <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-5 border border-gray-100 opacity-90">
                        <ToggleSwitch
                            label="Two-Factor Authentication (2FA)"
                            description="Enable mandatory 2FA for administrative accounts. (Requires Integration)"
                            checked={!!sectionData.twoFactorAuth}
                            onChange={(val) => handleChange('twoFactorAuth', val)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecuritySettings;
