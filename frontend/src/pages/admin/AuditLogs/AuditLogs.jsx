import React, { useState } from 'react';
import { Search, Filter, Download, Activity, Shield, Users, UserCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import AuditLogTable from './components/AuditLogTable';
import AdvancedFilters from './components/AdvancedFilters';
import LogDetailDrawer from './components/LogDetailDrawer';
import StatCard from '../../../components/ui/StatCard/StatCard';
import Button from '../../../components/ui/Button/Button';

// Redux State Assumption:
// const { logs, totalCount, isLoading, filters } = useSelector(state => state.auditLogs);
// const dispatch = useDispatch();

const mockMetrics = {
    totalLogsToday: 1245,
    adminActions: 412,
    recruiterActions: 620,
    studentActions: 213,
};

const AuditLogs = () => {
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
    const [selectedLogId, setSelectedLogId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 25; // derived from totalCount / itemsPerPage

    const handleViewDetails = (logId) => {
        setSelectedLogId(logId);
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 p-6 md:p-8 space-y-6">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <Activity className="w-6 h-6 text-blue-600" />
                        Audit Logs
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Admin / Security & Accountability / System Activity
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="flex items-center gap-2 bg-white hover:bg-slate-50 border-slate-200">
                        <Download className="w-4 h-4" />
                        Export Log Data
                    </Button>
                </div>
            </div>

            {/* Metrics Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total Logs (Today)" value={mockMetrics.totalLogsToday} icon="activity" trend="+12% vs yesterday" />
                <StatCard title="Admin Actions" value={mockMetrics.adminActions} icon="shield" />
                <StatCard title="Recruiter Actions" value={mockMetrics.recruiterActions} icon="briefcase" />
                <StatCard title="Student Actions" value={mockMetrics.studentActions} icon="users" />
            </div>

            {/* Search and Filters Control Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm gap-4">
                <div className="relative w-full sm:w-96">
                    <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search by user name or action..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                    />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Button
                        variant={isFilterPanelOpen ? "primary" : "outline"}
                        onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                        className="flex items-center gap-2 whitespace-nowrap"
                    >
                        <Filter className="w-4 h-4" />
                        Advanced Filters
                        {isFilterPanelOpen && <span className="flex h-2 w-2 rounded-full bg-white ml-1"></span>}
                    </Button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col lg:flex-row gap-6 flex-1 items-start">

                {/* Advanced Filters Panel */}
                {isFilterPanelOpen && (
                    <div className="w-full lg:w-72 flex-shrink-0 animate-in slide-in-from-left-4">
                        <AdvancedFilters onClose={() => setIsFilterPanelOpen(false)} />
                    </div>
                )}

                {/* Audit Log Table Area */}
                <div className="flex-1 w-full bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden min-h-[600px] relative">

                    <AuditLogTable onViewDetails={handleViewDetails} />

                    {/* Pagination */}
                    <div className="mt-auto border-t border-slate-200 p-4 flex items-center justify-between bg-white z-10">
                        <p className="text-sm text-slate-600">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">50</span> of <span className="font-medium">1245</span> entries
                        </p>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                className="p-2"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <div className="text-sm font-medium text-slate-700 px-4">
                                Page {currentPage} of {totalPages}
                            </div>
                            <Button
                                variant="outline"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                className="p-2"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlay: Log Detail Drawer */}
            <LogDetailDrawer
                logId={selectedLogId}
                isOpen={!!selectedLogId}
                onClose={() => setSelectedLogId(null)}
            />
        </div>
    );
};

export default AuditLogs;
