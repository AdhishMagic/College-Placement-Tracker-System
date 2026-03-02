import React, { useState } from 'react';
import { Calendar, Bell, Search, Filter } from 'lucide-react';
import InterviewTabs from './components/InterviewTabs';
import InterviewTable from './components/InterviewTable';
import ScheduleModal from './components/ScheduleModal';
import CalendarView from './components/CalendarView';

// Mock Data for demonstration since we are not connecting to real backend
const MOCK_CANDIDATES = {
    round1: [
        { id: '1', name: 'Alice Smith', email: 'alice.smith@university.edu', date: '2026-11-15', time: '10:00 AM', mode: 'Online', interviewer: 'John Tech Header', status: 'Scheduled' },
        { id: '2', name: 'Bob Johnson', email: 'bob.j@university.edu', date: null, time: null, mode: null, interviewer: null, status: 'Pending' },
        { id: '3', name: 'Carol White', email: 'carol.w@university.edu', date: '2026-11-16', time: '02:00 PM', mode: 'Offline', interviewer: 'Sarah Dev Lead', status: 'Completed' },
        { id: '4', name: 'David Lee', email: 'david.l@university.edu', date: '2026-11-17', time: '11:30 AM', mode: 'Online', interviewer: 'Mike Design', status: 'Cancelled' }
    ],
    round2: [
        { id: '5', name: 'Eve Davis', email: 'eve.d@university.edu', date: null, time: null, mode: null, interviewer: null, status: 'Pending' }
    ],
    hr: []
};

const InterviewScheduling = () => {
    // Component State
    const [activeTab, setActiveTab] = useState('round1');
    const [viewMode, setViewMode] = useState('list'); // 'list' | 'calendar'
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Handlers
    const handleScheduleClick = (candidate) => {
        setSelectedCandidate(candidate);
        setIsModalOpen(true);
    };

    const handleConfirmSchedule = (scheduleData) => {
        console.log('Scheduling data:', scheduleData);
        // Redux action dispatch would happen here: dispatch(scheduleInterview(scheduleData));
        setIsModalOpen(false);
        setSelectedCandidate(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCandidate(null);
    };

    // Derived Data
    const currentCandidates = MOCK_CANDIDATES[activeTab] || [];
    const filteredCandidates = currentCandidates.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Max container width acting as a dashboard boundary */}
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">

                {/* Breadcrumb / Top Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center text-sm font-medium text-gray-500 mb-2">
                        <span className="hover:text-blue-600 cursor-pointer">Dashboard</span>
                        <span className="mx-2">/</span>
                        <span className="hover:text-blue-600 cursor-pointer">Manage Jobs</span>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900 cursor-default">Interview Scheduling</span>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Notification indicator placeholder */}
                        <div className="relative p-2 bg-white rounded-full shadow-sm hover:shadow border border-gray-100 cursor-pointer">
                            <Bell className="w-5 h-5 text-gray-600" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white"></span>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors shadow-blue-500/30">
                            Create Interview Slot
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">

                    {/* Header Details */}
                    <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-1">Software Engineer Intern</h1>
                            <div className="flex items-center text-sm text-gray-500 space-x-4 mt-2">
                                <span className="flex items-center"><Calendar className="w-4 h-4 mr-1.5 text-gray-400" /> Drive: Nov 2026</span>
                                <span className="flex items-center text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md font-medium border border-blue-100">65 Shortlisted</span>
                            </div>
                        </div>

                        {/* Search & Action Bar within Card context */}
                        <div className="flex items-center w-full sm:w-auto space-x-3">
                            <div className="relative w-full sm:w-64">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search candidates..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 shadow-sm text-sm font-medium transition-colors">
                                <Filter className="w-4 h-4 mr-2 text-gray-500" />
                                Filters
                            </button>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <InterviewTabs
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                        viewMode={viewMode}
                        onViewModeChange={setViewMode}
                    />

                    {/* Dynamic View Body */}
                    <div className="p-6 bg-[#F8FAFC] rounded-b-xl min-h-[500px]">
                        {viewMode === 'list' ? (
                            <InterviewTable
                                candidates={filteredCandidates}
                                onSchedule={handleScheduleClick}
                            />
                        ) : (
                            <CalendarView schedule={filteredCandidates} />
                        )}
                    </div>

                </div>

            </div>

            {/* Modals */}
            <ScheduleModal
                isOpen={isModalOpen}
                candidate={selectedCandidate}
                onClose={handleCloseModal}
                onConfirm={handleConfirmSchedule}
            />

        </div>
    );
};

export default InterviewScheduling;
