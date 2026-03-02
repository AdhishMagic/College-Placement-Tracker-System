import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilters, setSearchQuery, toggleDynamicFilter, clearAllFilters, setCgpaRange } from '../../../../../features/shortlist/shortlistSlice';
import { Search, Filter, RotateCcw } from 'lucide-react';

const AdvancedFilters = () => {
    const dispatch = useDispatch();
    const filters = useSelector(selectFilters);

    const departments = ['Computer Science', 'Information Technology', 'Electronics'];
    const stages = ['Applied', 'Shortlisted', 'Interview Round 1', 'Rejected'];
    const skillMatchLevels = ['Full', 'Partial', 'Low'];

    const handleSearch = (e) => dispatch(setSearchQuery(e.target.value));

    const handleCheckboxChange = (type, value) => {
        dispatch(toggleDynamicFilter({ type, value }));
    };

    const handleClear = () => {
        dispatch(clearAllFilters());
    };

    const handleCgpaChange = (e) => {
        let value = parseFloat(e.target.value);
        if (isNaN(value)) value = 0;
        dispatch(setCgpaRange([value, 10]));
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-[calc(100vh-8rem)] sticky top-6">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white rounded-t-xl z-10">
                <div className="flex items-center gap-2 text-gray-900 font-semibold">
                    <Filter className="w-4 h-4 text-blue-600" />
                    <span>Refine Candidates</span>
                </div>
                <button
                    onClick={handleClear}
                    className="text-xs font-medium text-gray-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
                >
                    <RotateCcw className="w-3 h-3" /> Clear
                </button>
            </div>

            <div className="p-4 overflow-y-auto hide-scrollbar flex-1">
                {/* Search */}
                <div className="mb-6">
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Search Name or Email</label>
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={filters.searchQuery}
                            onChange={handleSearch}
                            className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                        />
                    </div>
                </div>

                {/* Academic Criteria */}
                <div className="mb-6">
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Academic Criteria</label>

                    <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Min CGPA</span>
                            <span className="font-medium text-gray-900">{filters.cgpaRange[0]}</span>
                        </div>
                        <input
                            type="range"
                            min="0" max="10" step="0.1"
                            value={filters.cgpaRange[0]}
                            onChange={handleCgpaChange}
                            className="w-full accent-blue-600 cursor-pointer"
                        />
                    </div>

                    <div className="space-y-2">
                        <span className="text-sm font-medium text-gray-600 block mb-1">Departments</span>
                        {departments.map(dept => (
                            <label key={dept} className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={filters.department.includes(dept)}
                                    onChange={() => handleCheckboxChange('department', dept)}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{dept}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Application Status */}
                <div className="mb-6">
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Application Pipeline</label>

                    <div className="space-y-2 mb-4">
                        <span className="text-sm font-medium text-gray-600 block mb-1">Skill Match Score</span>
                        {skillMatchLevels.map(level => (
                            <label key={level} className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={filters.skillMatch.includes(level)}
                                    onChange={() => handleCheckboxChange('skillMatch', level)}
                                    className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                                />
                                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{level}</span>
                            </label>
                        ))}
                    </div>

                    <div className="space-y-2">
                        <span className="text-sm font-medium text-gray-600 block mb-1">Current Stage</span>
                        {stages.map(stage => (
                            <label key={stage} className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={filters.stage.includes(stage)}
                                    onChange={() => handleCheckboxChange('stage', stage)}
                                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                />
                                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{stage}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvancedFilters;
