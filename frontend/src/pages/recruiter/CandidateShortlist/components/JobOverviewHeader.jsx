import React from 'react';
import { useSelector } from 'react-redux';
import { selectJobOverview } from '../../../../../features/shortlist/shortlistSlice';
import { Users, BookOpen, AlertCircle } from 'lucide-react';

const JobOverviewHeader = () => {
    const jobOverview = useSelector(selectJobOverview);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 col-span-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{jobOverview.title}</h1>
                    <p className="text-sm text-gray-500 mt-1">ID: {jobOverview.id} • Campus Recruitment 2026</p>
                </div>

                <div className="flex gap-6">
                    <div className="flex flex-col items-center p-3 bg-blue-50/50 rounded-lg">
                        <div className="flex items-center gap-2 text-blue-600 mb-1">
                            <Users className="w-5 h-5" />
                            <span className="font-semibold text-lg">{jobOverview.totalApplicants}</span>
                        </div>
                        <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Total Applicants</span>
                    </div>

                    <div className="hidden md:flex flex-col justify-center border-l border-gray-100 pl-6 h-12">
                        <div className="flex items-center gap-2 text-gray-700 mb-1">
                            <AlertCircle className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-medium">Eligibility Baseline</span>
                        </div>
                        <div className="text-sm text-gray-600 flex gap-3">
                            <span>Min CGPA: <strong className="text-gray-900">{jobOverview.eligibilityCriteria.minCgpa}</strong></span>
                            <span>Max Backlogs: <strong className="text-gray-900">{jobOverview.eligibilityCriteria.maxBacklogs}</strong></span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2 items-center">
                <span className="text-sm text-gray-500 font-medium flex items-center gap-1"><BookOpen className="w-4 h-4" /> Key Skills Required:</span>
                {jobOverview.eligibilityCriteria.requiredSkills.map(skill => (
                    <span key={skill} className="px-2.5 py-1 bg-gray-100/80 text-gray-700 text-xs font-medium rounded-md">
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default JobOverviewHeader;
