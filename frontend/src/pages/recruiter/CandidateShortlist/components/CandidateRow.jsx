import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MoreHorizontal, Check, X, FileText, Mail, Eye } from 'lucide-react';
import { toggleSelection, toggleComparison, selectSelection, updateCandidateStage, selectJobOverview } from '../../../../../features/shortlist/shortlistSlice';
import StatusBadge from './StatusBadge';
import SkillsMatchBadge from './SkillsMatchBadge';

const CandidateRow = ({ candidate }) => {
    const dispatch = useDispatch();
    const selection = useSelector(selectSelection);
    const isSelected = selection.selectedIds.includes(candidate.id);
    const isComparing = selection.comparisonIds.includes(candidate.id);
    const { eligibilityCriteria } = useSelector(selectJobOverview);

    const [menuOpen, setMenuOpen] = useState(false);

    // Derive initial avatar colors based on name length or generic
    const initials = candidate.name.split(' ').map(n => n[0]).join('').substring(0, 2);

    const handleCheckboxChange = () => {
        dispatch(toggleSelection(candidate.id));
    };

    const hasBacklogsIssue = candidate.backlogs > eligibilityCriteria.maxBacklogs;

    return (
        <tr className="hover:bg-blue-50/30 transition-colors group relative border-b border-gray-100 last:border-0 relative">
            <td className="p-4 w-12 text-center">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                />
            </td>
            <td className="p-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center flex-shrink-0">
                        {initials}
                    </div>
                    <div>
                        <div className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{candidate.name}</div>
                        <div className="text-xs text-gray-500">{candidate.email}</div>
                    </div>
                </div>
            </td>
            <td className="p-4 text-gray-600 text-sm hidden sm:table-cell">{candidate.department}</td>
            <td className="p-4 font-medium text-gray-900">{candidate.cgpa.toFixed(2)}</td>
            <td className="p-4 hidden lg:table-cell">
                <SkillsMatchBadge
                    matchLevel={candidate.matchLevel}
                    count={candidate.skillsCount}
                    total={candidate.totalSkillsRequired}
                />
            </td>
            <td className="p-4 hidden md:table-cell text-center">
                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${hasBacklogsIssue ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                    {candidate.backlogs}
                </span>
            </td>
            <td className="p-4 hidden xl:table-cell text-gray-500 text-sm">{candidate.applicationDate}</td>
            <td className="p-4"><StatusBadge stage={candidate.stage} /></td>

            {/* Actions */}
            <td className="p-4 text-right">
                <div className="relative inline-flex items-center gap-2">

                    {/* Quick Actions (visible on hover) */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-center gap-1 bg-white shadow-sm border border-gray-100 rounded-lg p-1 absolute right-full mr-2 z-10">
                        <button
                            onClick={() => dispatch(updateCandidateStage({ id: candidate.id, newStage: 'Shortlisted' }))}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Shortlist">
                            <Check className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => dispatch(updateCandidateStage({ id: candidate.id, newStage: 'Rejected' }))}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md transition-colors" title="Reject">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Overflow Menu */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors relative"
                    >
                        <MoreHorizontal className="w-5 h-5" />
                    </button>

                    {menuOpen && (
                        <div className="absolute right-0 top-10 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50 text-left">
                            <div className="py-1">
                                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 flex items-center gap-2">
                                    <Eye className="w-4 h-4" /> View Profile
                                </button>
                                <button
                                    onClick={() => {
                                        dispatch(toggleComparison(candidate.id));
                                        setMenuOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2
                           ${isComparing ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                                >
                                    <FileText className="w-4 h-4" /> {isComparing ? 'Remove from Compare' : 'Add to Comparison'}
                                </button>
                                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 flex items-center gap-2">
                                    <Mail className="w-4 h-4" /> Message Candidate
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                {menuOpen && <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)}></div>}
            </td>
        </tr>
    );
};

export default CandidateRow;
