import React from 'react';
import { useSelector } from 'react-redux';
import { selectJobOverview } from '../../../../../features/shortlist/shortlistSlice';
import { ChevronRight } from 'lucide-react';

const StageProgressIndicator = () => {
    const { stageMetrics } = useSelector(selectJobOverview);

    const stages = [
        { key: 'applied', label: 'Applied', count: stageMetrics.applied },
        { key: 'shortlisted', label: 'Shortlisted', count: stageMetrics.shortlisted },
        { key: 'interview_1', label: 'Interview 1', count: stageMetrics.interview_1 },
        { key: 'interview_2', label: 'Interview 2', count: stageMetrics.interview_2 },
        { key: 'offer', label: 'Offer', count: stageMetrics.offer },
    ];

    return (
        <div className="col-span-12 py-2 overflow-x-auto hide-scrollbar">
            <div className="flex items-center min-w-max gap-2">
                {stages.map((stage, index) => (
                    <React.Fragment key={stage.key}>
                        <div className={`flex flex-col px-4 py-2 rounded-lg border bg-white shadow-sm
                ${index === 1 ? 'border-blue-200 ring-1 ring-blue-50' : 'border-gray-100'}`}
                        >
                            <span className={`text-xs font-semibold uppercase tracking-wider 
                 ${index === 1 ? 'text-blue-600' : 'text-gray-500'}`}>
                                {stage.label}
                            </span>
                            <span className="text-xl font-bold text-gray-900 mt-0.5">{stage.count}</span>
                        </div>

                        {index < stages.length - 1 && (
                            <div className="flex items-center justify-center text-gray-300 w-6">
                                <ChevronRight className="w-5 h-5" />
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default StageProgressIndicator;
