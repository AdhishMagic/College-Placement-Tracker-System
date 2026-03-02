import React from 'react';
import { useDispatch } from 'react-redux';
import { updateDraft } from '../../../../features/settings/settingsSlice';

const AcademicYear = ({ data, drafts }) => {
    const dispatch = useDispatch();
    const sectionData = drafts?.academicYear || data?.academicYear || {};

    const handleChange = (field, value) => {
        dispatch(updateDraft({ section: 'academicYear', field, value }));
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            <div>
                <h3 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-4">Academic Year</h3>
                <p className="text-sm text-gray-500 mb-6">Manage tracking data cycles for placement sessions.</p>
            </div>

            <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-gray-100 p-6 space-y-8">
                <div className="space-y-4 max-w-sm">
                    <label className="text-sm font-medium text-gray-700">Current Academic Year</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={sectionData.currentYear || ''}
                            onChange={(e) => handleChange('currentYear', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-colors"
                            placeholder="e.g. 2026-2027"
                        />
                    </div>
                </div>

                <div className="space-y-4 max-w-sm pb-2">
                    <label className="text-sm font-medium text-gray-700">Placement Cycle Status</label>
                    <div className="flex gap-4 items-center">
                        <select
                            value={sectionData.cycleStatus || 'Open'}
                            onChange={(e) => handleChange('cycleStatus', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-colors bg-white hover:bg-gray-50 cursor-pointer shadow-sm"
                        >
                            <option value="Open">Active (Open)</option>
                            <option value="Closed">Inactive (Closed)</option>
                            <option value="Archived">Archived</option>
                        </select>
                    </div>
                    {sectionData.cycleStatus === 'Archived' && (
                        <p className="text-xs text-red-500 font-medium mt-2">Warning: Archiving stops all active placement activities for this cycle.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AcademicYear;
