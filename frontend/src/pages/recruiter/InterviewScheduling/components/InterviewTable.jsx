import React from 'react';
import InterviewStatusBadge from './InterviewStatusBadge';
import { Calendar, Clock, MapPin, Video, MoreVertical } from 'lucide-react';

const InterviewTable = ({ candidates, onSchedule }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#F8FAFC]">
                        <tr>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Candidate
                            </th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Date & Time
                            </th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Mode & Details
                            </th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Interviewer
                            </th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {candidates && candidates.length > 0 ? (
                            candidates.map((candidate) => (
                                <tr key={candidate.id} className="hover:bg-blue-50/30 transition-colors duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                                                    {candidate.name.charAt(0)}
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-semibold text-gray-900">{candidate.name}</div>
                                                <div className="text-xs text-gray-500">{candidate.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {candidate.date ? (
                                            <div className="flex flex-col space-y-1">
                                                <div className="flex items-center text-sm text-gray-700">
                                                    <Calendar className="w-4 h-4 mr-1.5 text-gray-400" />
                                                    {candidate.date}
                                                </div>
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <Clock className="w-4 h-4 mr-1.5 text-gray-400" />
                                                    {candidate.time}
                                                </div>
                                            </div>
                                        ) : (
                                            <span className="text-sm text-gray-400 italic">Not scheduled</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {candidate.date ? (
                                            <div className="flex items-center text-sm text-gray-700">
                                                {candidate.mode === 'Online' ? (
                                                    <Video className="w-4 h-4 mr-1.5 text-blue-500" />
                                                ) : (
                                                    <MapPin className="w-4 h-4 mr-1.5 text-blue-500" />
                                                )}
                                                {candidate.mode}
                                            </div>
                                        ) : (
                                            <span className="text-sm text-gray-400">-</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {candidate.interviewer || <span className="text-gray-400">-</span>}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <InterviewStatusBadge status={candidate.status} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end space-x-3">
                                            {candidate.status === 'Pending' ? (
                                                <button
                                                    onClick={() => onSchedule(candidate)}
                                                    className="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors"
                                                >
                                                    Schedule
                                                </button>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => onSchedule(candidate)}
                                                        className="text-gray-600 hover:text-blue-600 transition-colors"
                                                    >
                                                        Reschedule
                                                    </button>
                                                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                                                        Cancel
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                    <div className="flex flex-col items-center justify-center">
                                        <Calendar className="w-12 h-12 text-gray-300 mb-3" />
                                        <p className="text-base font-medium text-gray-900">No candidates found</p>
                                        <p className="text-sm text-gray-500 mt-1">There are no candidates in this stage yet.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InterviewTable;
