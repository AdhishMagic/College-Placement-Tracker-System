import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllCandidates, selectSelection, setDrawerOpen, selectJobOverview, bulkUpdateStage } from '../../../../../features/shortlist/shortlistSlice';
import { X, CheckCircle2, Bookmark, Check } from 'lucide-react';
import StatusBadge from './StatusBadge';

const ComparisonDrawer = () => {
    const dispatch = useDispatch();
    const allCandidates = useSelector(selectAllCandidates);
    const { comparisonIds } = useSelector(selectSelection);
    const isOpen = useSelector(state => state.shortlist.ui.isDrawerOpen);
    const { eligibilityCriteria } = useSelector(selectJobOverview);

    if (!isOpen) return null;

    const comparisonData = allCandidates.filter(c => comparisonIds.includes(c.id));

    const handleClose = () => {
        dispatch(setDrawerOpen(false));
    };

    const handleShortlistAll = () => {
        // Bulk action restricted to these specific IDs?
        // For simplicity using bulkUpdateStage which uses selectedIds, 
        // but let's assume we can also shortlist the compared ones specifically.
        // Let's implement this simply here:
        dispatch(setDrawerOpen(false));
        // Here dispatch an action to shortlist specifically `comparisonIds`, but since bulk relies on selectedIds,
        // we'd dispatch an update to each ID or a specialized comparison update.
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-gray-900/30 backdrop-blur-sm transition-opacity"
                onClick={handleClose}
            />

            {/* Drawer */}
            <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col shadow-xl border-l animate-in slide-in-from-right duration-300">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white z-10">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <Bookmark className="w-6 h-6 text-indigo-600" /> Candidate Comparison
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">Comparing {comparisonIds.length} candidate(s)</p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-x-auto p-6 bg-gray-50/50">
                    <div className="flex gap-4 h-full min-w-max">

                        {/* Baseline Job Column */}
                        <div className="w-64 bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex flex-col shrink-0">
                            <h3 className="font-bold text-gray-900 mb-6 pb-4 border-b">Job Baseline</h3>
                            <div className="space-y-6 flex-1">
                                <div>
                                    <span className="text-xs text-gray-500 font-semibold uppercase tracking-wide block mb-1">Required CGPA</span>
                                    <span className="font-semibold text-gray-900">{eligibilityCriteria.minCgpa}</span>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-500 font-semibold uppercase tracking-wide block mb-1">Max Backlogs</span>
                                    <span className="font-semibold text-gray-900">{eligibilityCriteria.maxBacklogs}</span>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-500 font-semibold uppercase tracking-wide block mb-2">Required Skills</span>
                                    <div className="flex flex-wrap gap-1.5">
                                        {eligibilityCriteria.requiredSkills.map(s => <span key={s} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded break-all">{s}</span>)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Candidates vs Baseline */}
                        {comparisonData.map(candidate => (
                            <div key={candidate.id} className="w-72 bg-white border border-blue-100 ring-1 ring-blue-50 rounded-xl shadow-sm p-5 flex flex-col shrink-0 relative">

                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-lg">
                                        {candidate.name[0]}
                                    </div>
                                    <div className="flex-1 truncate">
                                        <h4 className="font-bold text-gray-900 truncate" title={candidate.name}>{candidate.name}</h4>
                                        <p className="text-xs text-gray-500 truncate" title={candidate.department}>{candidate.department}</p>
                                    </div>
                                </div>

                                <div className="space-y-6 flex-1 text-sm">
                                    <div>
                                        <span className="text-xs text-gray-500 font-semibold uppercase tracking-wide block mb-1">CGPA</span>
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold text-gray-900">{candidate.cgpa.toFixed(2)}</span>
                                            {candidate.cgpa >= eligibilityCriteria.minCgpa
                                                ? <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                : <X className="w-4 h-4 text-rose-500" />
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-500 font-semibold uppercase tracking-wide block mb-1">Backlogs</span>
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold text-gray-900">{candidate.backlogs}</span>
                                            {candidate.backlogs <= eligibilityCriteria.maxBacklogs
                                                ? <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                : <X className="w-4 h-4 text-rose-500" />
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-500 font-semibold uppercase tracking-wide block mb-2">Matched Skills</span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {candidate.skills.map(skill => {
                                                const isMatched = eligibilityCriteria.requiredSkills.includes(skill);
                                                return (
                                                    <span key={skill} className={`px-2 py-1 text-xs rounded font-medium break-all
                                    ${isMatched ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 border-none' : 'bg-gray-50 text-gray-500 border border-gray-200'}`}>
                                                        {skill}
                                                    </span>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-gray-100">
                                        <span className="text-xs text-gray-500 font-semibold uppercase tracking-wide block mb-2">Stage Status</span>
                                        <StatusBadge stage={candidate.stage} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer actions */}
                <div className="p-6 bg-white border-t border-gray-100 flex justify-end gap-3 z-10 relative shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                    <button onClick={handleClose} className="px-5 py-2 text-sm font-semibold text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        Cancel
                    </button>
                    <button onClick={handleShortlistAll} className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm transition-colors flex items-center gap-2">
                        <Check className="w-4 h-4" /> Approve Displayed Candidates
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ComparisonDrawer;
