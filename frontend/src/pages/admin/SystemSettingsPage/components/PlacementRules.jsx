import React from 'react';
import { useDispatch } from 'react-redux';
import { updateDraft } from '../../../../features/settings/settingsSlice';
import ToggleSwitch from '../../../../components/ui/ToggleSwitch';

const PlacementRules = ({ data, drafts }) => {
    const dispatch = useDispatch();
    const sectionData = drafts?.rules || data?.rules || {};

    const handleChange = (field, value) => {
        dispatch(updateDraft({ section: 'rules', field, value }));
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            <div>
                <h3 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-4">Placement Rules</h3>
                <p className="text-sm text-gray-500 mb-6">Configure platform-wide eligibility constraints and job rules.</p>
            </div>

            <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-gray-100 p-6 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-gray-100">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Default Minimum CGPA</label>
                        <input
                            type="number"
                            step="0.1"
                            value={sectionData.minCgpa || ''}
                            onChange={(e) => handleChange('minCgpa', parseFloat(e.target.value))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-colors"
                            placeholder="e.g. 6.5"
                        />
                        <p className="text-xs text-gray-500">Default CGPA cutoff for new job postings.</p>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Default Backlog Limit</label>
                        <input
                            type="number"
                            value={sectionData.backlogLimit || ''}
                            onChange={(e) => handleChange('backlogLimit', parseInt(e.target.value))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-colors"
                            placeholder="e.g. 0"
                        />
                        <p className="text-xs text-gray-500">Maximum allowed active backlogs.</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                        <ToggleSwitch
                            label="Application Deadline Policy"
                            description="Automatically block applications after the deadline passes."
                            checked={!!sectionData.applicationDeadlinePolicy}
                            onChange={(val) => handleChange('applicationDeadlinePolicy', val)}
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                        <ToggleSwitch
                            label="Auto-close expired jobs"
                            description="Automatically change job status to 'Closed' when deadline passes."
                            checked={!!sectionData.autoCloseJobs}
                            onChange={(val) => handleChange('autoCloseJobs', val)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlacementRules;
