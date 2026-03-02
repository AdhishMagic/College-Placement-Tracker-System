import React, { useState } from 'react';
import { X, SlidersHorizontal, Calendar, Activity, ChevronDown } from 'lucide-react';
import Button from '../../../../components/ui/Button/Button';

// Mock options
const roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'recruiter', label: 'Recruiter' },
    { value: 'student', label: 'Student' },
    { value: 'system', label: 'System' },
];

const actionOptions = [
    { value: 'Created', label: 'Created' },
    { value: 'Updated', label: 'Updated' },
    { value: 'Deleted', label: 'Deleted' },
    { value: 'Approved', label: 'Approved' },
    { value: 'Rejected', label: 'Rejected' },
    { value: 'Verified', label: 'Verified' },
    { value: 'Authentication', label: 'Auth Events' },
];

const AdvancedFilters = ({ onClose }) => {
    // Redux Filter state assumption
    // const filters = useSelector(state => state.auditLogs.filters)
    // const dispatch = useDispatch()

    const [selectedRoles, setSelectedRoles] = useState([]);
    const [selectedActions, setSelectedActions] = useState([]);
    const [dateRange, setDateRange] = useState({ start: '', end: '' });

    const toggleSelection = (setter, selectedItems, value) => {
        if (selectedItems.includes(value)) {
            setter(selectedItems.filter(item => item !== value));
        } else {
            setter([...selectedItems, value]);
        }
    };

    const handleApply = () => {
        // dispatch(setFilters({roles: selectedRoles, actions: selectedActions, dates: dateRange}))
        console.log('Filters Applied', { selectedRoles, selectedActions, dateRange });
        onClose();
    };

    const handleReset = () => {
        setSelectedRoles([]);
        setSelectedActions([]);
        setDateRange({ start: '', end: '' });
    };

    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col h-full overflow-hidden">
            {/* Filter Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5 text-slate-700" />
                    <h3 className="font-semibold text-slate-800">Advanced Filters</h3>
                </div>
                <button
                    onClick={onClose}
                    className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            {/* Filter Body */}
            <div className="p-4 flex-1 overflow-y-auto space-y-6">

                {/* Date Range Filter */}
                <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-600" /> Date Range
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <span className="text-xs text-slate-500 mb-1 block">From</span>
                            <input
                                type="date"
                                value={dateRange.start}
                                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                                className="w-full text-sm py-2 px-3 border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500 outline-none text-slate-700"
                            />
                        </div>
                        <div>
                            <span className="text-xs text-slate-500 mb-1 block">To</span>
                            <input
                                type="date"
                                value={dateRange.end}
                                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                                className="w-full text-sm py-2 px-3 border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500 outline-none text-slate-700"
                            />
                        </div>
                    </div>
                </div>

                {/* Role Filter */}
                <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                        User Role
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {roleOptions.map((role) => (
                            <button
                                key={role.value}
                                onClick={() => toggleSelection(setSelectedRoles, selectedRoles, role.value)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${selectedRoles.includes(role.value)
                                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                                    }`}
                            >
                                {role.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Action Type Filter */}
                <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-green-600" /> Action Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {actionOptions.map((action) => (
                            <label
                                key={action.value}
                                className="flex items-center gap-2 p-2 border border-slate-100 rounded-md hover:bg-slate-50 cursor-pointer transition-colors"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedActions.includes(action.value)}
                                    onChange={() => toggleSelection(setSelectedActions, selectedActions, action.value)}
                                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                                />
                                <span className="text-sm text-slate-700">{action.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* Filter Actions */}
            <div className="p-4 border-t border-slate-200 bg-white grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={handleReset} className="w-full">
                    Reset
                </Button>
                <Button onClick={handleApply} className="w-full">
                    Apply Filters
                </Button>
            </div>
        </div>
    );
};

export default AdvancedFilters;
