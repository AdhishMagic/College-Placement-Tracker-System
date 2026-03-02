import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

const StudentFilterPanel = ({ onClose }) => {
    const [cgpaRange, setCgpaRange] = useState(0);

    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 h-full flex flex-col">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
                <h3 className="font-semibold text-slate-800 text-lg">Advanced Filters</h3>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition" title="Close Panel">
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {/* Department Filter */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Department</label>
                    <div className="relative">
                        <select className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">All Departments</option>
                            <option value="CSE">Computer Science</option>
                            <option value="ECE">Electronics</option>
                            <option value="MECH">Mechanical</option>
                            <option value="CIVIL">Civil</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                </div>

                {/* CGPA Slider */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-slate-700">Minimum CGPA</label>
                        <span className="text-sm font-bold text-blue-600">{cgpaRange}</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.1"
                        value={cgpaRange}
                        onChange={(e) => setCgpaRange(e.target.value)}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400">
                        <span>0</span>
                        <span>10</span>
                    </div>
                </div>

                {/* Placement Status */}
                <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-700">Placement Status</label>
                    <div className="space-y-2">
                        {['Placed', 'Eligible', 'Pending', 'Not Eligible'].map(status => (
                            <label key={status} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                                <input type="checkbox" className="rounded text-blue-600 border-slate-300 focus:ring-blue-500 w-4 h-4 cursor-pointer" />
                                {status}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Verification Status */}
                <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-700">Verification Status</label>
                    <div className="space-y-2">
                        {['Verified', 'Pending', 'Blocked'].map(status => (
                            <label key={status} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                                <input type="checkbox" className="rounded text-blue-600 border-slate-300 focus:ring-blue-500 w-4 h-4 cursor-pointer" />
                                {status}
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <div className="pt-5 border-t border-slate-100 mt-4 flex gap-3">
                <button className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors">
                    Reset
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm shadow-blue-500/30 transition-colors">
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

export default StudentFilterPanel;
