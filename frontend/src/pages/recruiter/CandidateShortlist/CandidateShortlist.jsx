import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredCandidates } from '../../../../features/shortlist/shortlistSlice';

import JobOverviewHeader from './components/JobOverviewHeader';
import StageProgressIndicator from './components/StageProgressIndicator';
import AdvancedFilters from './components/AdvancedFilters';
import CandidateTable from './components/CandidateTable';
import ComparisonDrawer from './components/ComparisonDrawer';

const CandidateShortlist = () => {
    const filteredCandidates = useSelector(selectFilteredCandidates);

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Max container width acting as a dashboard boundary */}
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">

                {/* Breadcrumb / Top Header */}
                <div className="flex items-center text-sm font-medium text-gray-500 mb-2">
                    <span className="hover:text-blue-600 cursor-pointer">Dashboard</span>
                    <span className="mx-2">/</span>
                    <span className="hover:text-blue-600 cursor-pointer">Manage Jobs</span>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900 cursor-default">Shortlist Candidates</span>
                </div>

                <div className="grid grid-cols-12 gap-6">
                    <JobOverviewHeader />
                    <StageProgressIndicator />

                    <div className="col-span-12 lg:col-span-3 hidden md:block">
                        <AdvancedFilters />
                    </div>

                    <div className="col-span-12 lg:col-span-9">
                        <CandidateTable candidates={filteredCandidates} />
                    </div>
                </div>
            </div>

            <ComparisonDrawer />
        </div>
    );
};

export default CandidateShortlist;
