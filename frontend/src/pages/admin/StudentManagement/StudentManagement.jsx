import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, ChevronLeft, ChevronRight, CheckCircle, XCircle } from 'lucide-react';
import StudentTable from './components/StudentTable';
import StudentFilterPanel from './components/StudentFilterPanel';
import StudentDetailDrawer from './components/StudentDetailDrawer';
import StatCard from '../../../components/ui/StatCard/StatCard';
import Button from '../../../components/ui/Button/Button';

// Mock data to simulate 5000+ students loaded via pagination
const mockMetrics = {
    total: 5120,
    verified: 4800,
    placed: 2100,
    pendingVerification: 320,
};

const StudentManagement = () => {
    const [selectedStudentIds, setSelectedStudentIds] = useState([]);
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
    const [selectedStudentForDrawer, setSelectedStudentForDrawer] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 100;

    // Handlers
    const handleSelectAll = (isAllSelected) => {
        // Logic to select all current page IDs or clear
        if (isAllSelected) {
            setSelectedStudentIds(['1', '2', '3']); // Mock IDs
        } else {
            setSelectedStudentIds([]);
        }
    };

    const handleSelectStudent = (id) => {
        setSelectedStudentIds((prev) =>
            prev.includes(id) ? prev.filter((sId) => sId !== id) : [...prev, id]
        );
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 p-6 md:p-8 space-y-6">
            {/* HEADER LAYER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Student Management</h1>
                    <p className="text-sm text-slate-500">Admin / Students</p>
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export All Data
                </Button>
            </div>

            {/* METRICS LAYER */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total Students" value={mockMetrics.total} icon="users" />
                <StatCard title="Verified Students" value={mockMetrics.verified} icon="check-circle" trend="+12%" />
                <StatCard title="Placed Students" value={mockMetrics.placed} icon="briefcase" trend="+5%" />
                <StatCard title="Pending Verification" value={mockMetrics.pendingVerification} icon="clock" trend="-3%" />
            </div>

            {/* CONTROL BAR LAYER */}
            <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm gap-4">
                <div className="relative w-full sm:w-96">
                    <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                    />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    {selectedStudentIds.length > 0 && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg animate-in fade-in slide-in-from-bottom-2">
                            <span className="text-sm font-medium text-blue-700">{selectedStudentIds.length} Selected</span>
                            <div className="h-4 w-px bg-blue-200 mx-1"></div>
                            <button className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors" title="Bulk Verify">
                                <CheckCircle className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors" title="Bulk Block">
                                <XCircle className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-slate-600 hover:bg-slate-200 rounded transition-colors" title="Export Selected">
                                <Download className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    <Button
                        variant={isFilterPanelOpen ? "primary" : "outline"}
                        onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                        className="flex items-center gap-2 whitespace-nowrap"
                    >
                        <Filter className="w-4 h-4" />
                        Filters
                    </Button>
                </div>
            </div>

            {/* MAIN CONTENT LAYER */}
            <div className="flex flex-col lg:flex-row gap-6 flex-1 items-start">
                {/* Advanced Filter Panel */}
                {isFilterPanelOpen && (
                    <div className="w-full lg:w-72 flex-shrink-0 animate-in slide-in-from-left-4">
                        <StudentFilterPanel onClose={() => setIsFilterPanelOpen(false)} />
                    </div>
                )}

                {/* Data Table Area */}
                <div className="flex-1 w-full bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden min-h-[500px]">
                    <StudentTable
                        selectedIds={selectedStudentIds}
                        onSelectAll={handleSelectAll}
                        onSelectStudent={handleSelectStudent}
                        onViewStudent={(id) => setSelectedStudentForDrawer(id)}
                    />

                    {/* Pagination Structure */}
                    <div className="mt-auto border-t border-slate-200 p-4 flex items-center justify-between bg-slate-50">
                        <p className="text-sm text-slate-600">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">50</span> of <span className="font-medium">5120</span> entries
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

            {/* OVERLAY LAYER - Drawer structure */}
            <StudentDetailDrawer
                isOpen={!!selectedStudentForDrawer}
                studentId={selectedStudentForDrawer}
                onClose={() => setSelectedStudentForDrawer(null)}
            />

        </div>
    );
};

export default StudentManagement;
