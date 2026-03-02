import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAll, selectSelection, bulkUpdateStage } from '../../../../../features/shortlist/shortlistSlice';
import CandidateRow from './CandidateRow';
import { CheckSquare } from 'lucide-react';

const CandidateTable = ({ candidates }) => {
    const dispatch = useDispatch();
    const selection = useSelector(selectSelection);
    const totalCandidates = candidates.length;
    const isAllSelected = totalCandidates > 0 && selection.selectedIds.length === totalCandidates;
    const isIndeterminate = selection.selectedIds.length > 0 && !isAllSelected;

    const handleSelectAll = () => {
        dispatch(selectAll(!isAllSelected));
    };

    const handleBulkAction = (actionType) => {
        if (actionType === 'shortlist') {
            dispatch(bulkUpdateStage('Shortlisted'));
        } else if (actionType === 'reject') {
            dispatch(bulkUpdateStage('Rejected'));
        }
    };

    if (totalCandidates === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-400">
                    <CheckSquare className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">No candidates match your filters</h3>
                <p className="text-gray-500 max-w-sm mx-auto text-sm">Try expanding your search criteria or removing some filters to see more applicants.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">

            {/* Bulk Actions Toolbar - Only show when items are selected */}
            {selection.selectedIds.length > 0 && (
                <div className="bg-blue-50/50 p-3 border-b border-blue-100 flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-800">
                        {selection.selectedIds.length} candidate(s) selected
                    </span>
                    <div className="flex gap-2">
                        <button onClick={() => handleBulkAction('reject')} className="px-3 py-1.5 text-sm font-medium text-rose-700 bg-white border border-rose-200 rounded-lg hover:bg-rose-50 shadow-sm transition-colors">
                            Reject Selected
                        </button>
                        <button onClick={() => handleBulkAction('shortlist')} className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm transition-colors">
                            Shortlist Selected
                        </button>
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50/80 text-gray-500 text-xs uppercase tracking-wider font-semibold border-b border-gray-200">
                        <tr>
                            <th className="p-4 w-12 text-center">
                                <input
                                    type="checkbox"
                                    checked={isAllSelected}
                                    ref={input => {
                                        if (input) input.indeterminate = isIndeterminate;
                                    }}
                                    onChange={handleSelectAll}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                />
                            </th>
                            <th className="p-4">Candidate</th>
                            <th className="p-4 hidden sm:table-cell">Department</th>
                            <th className="p-4">CGPA</th>
                            <th className="p-4 hidden lg:table-cell">Skill Match</th>
                            <th className="p-4 hidden md:table-cell text-center">Backlogs</th>
                            <th className="p-4 hidden xl:table-cell">App Date</th>
                            <th className="p-4">Stage</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {candidates.map(candidate => (
                            <CandidateRow key={candidate.id} candidate={candidate} />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer (Mocked visually) */}
            <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                <span>Showing 1 to {candidates.length} of {candidates.length} candidates</span>
                <div className="flex gap-1">
                    <button className="px-3 py-1 border border-gray-200 rounded text-gray-400 cursor-not-allowed">Prevent</button>
                    <button className="px-3 py-1 border border-blue-500 bg-blue-50 text-blue-600 font-medium rounded">1</button>
                    <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 text-gray-700">2</button>
                    <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 text-gray-700">Next</button>
                </div>
            </div>
        </div>
    );
};

export default CandidateTable;
