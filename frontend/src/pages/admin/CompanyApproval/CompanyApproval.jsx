import React, { useState } from 'react';
import { Search, Filter, Download, ChevronLeft, ChevronRight, Building, CheckCircle, XCircle, Clock } from 'lucide-react';
import CompanyTable from './components/CompanyTable';
import CompanyFilterPanel from './components/CompanyFilterPanel';
import CompanyDetailDrawer from './components/CompanyDetailDrawer';
import ApprovalModal from './components/ApprovalModal';
import StatCard from '../../../components/ui/StatCard/StatCard';
import Button from '../../../components/ui/Button/Button';

// Mock summary metrics
const mockMetrics = {
    total: 145,
    pending: 12,
    approved: 128,
    rejected: 5,
};

const CompanyApproval = () => {
    const [selectedCompanyIds, setSelectedCompanyIds] = useState([]);
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
    const [selectedCompanyId, setSelectedCompanyId] = useState(null);
    const [approvalModalConfig, setApprovalModalConfig] = useState({ isOpen: false, type: null, companyId: null });

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 15;

    // Handlers
    const handleSelectAll = (isAllSelected) => {
        if (isAllSelected) {
            setSelectedCompanyIds(['comp_1', 'comp_2', 'comp_3']); // Mock IDs for current page
        } else {
            setSelectedCompanyIds([]);
        }
    };

    const handleSelectCompany = (id) => {
        setSelectedCompanyIds((prev) =>
            prev.includes(id) ? prev.filter((cId) => cId !== id) : [...prev, id]
        );
    };

    const handleAction = (type, companyId) => {
        if (type === 'view') {
            setSelectedCompanyId(companyId);
        } else if (type === 'approve' || type === 'reject') {
            setApprovalModalConfig({ isOpen: true, type, companyId });
        }
    };

    const handleConfirmAction = (reason) => {
        // Logic to dispatch Redux action to approve/reject
        console.log(`Action: ${approvalModalConfig.type}, Company ID: ${approvalModalConfig.companyId}, Reason: ${reason}`);
        setApprovalModalConfig({ isOpen: false, type: null, companyId: null });
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 p-6 md:p-8 space-y-6">
            {/* HEADER LAYER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Company Approvals</h1>
                    <p className="text-sm text-slate-500">Admin / Company Management</p>
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export Report
                </Button>
            </div>

            {/* METRICS LAYER */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total Registrations" value={mockMetrics.total} icon="briefcase" />
                <StatCard title="Pending Approvals" value={mockMetrics.pending} icon="clock" trend="+2 new" />
                <StatCard title="Approved Companies" value={mockMetrics.approved} icon="check-circle" />
                <StatCard title="Rejected" value={mockMetrics.rejected} icon="x-circle" />
            </div>

            {/* CONTROL BAR LAYER */}
            <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm gap-4">
                <div className="relative w-full sm:w-96">
                    <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search company name, domain..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                    />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    {selectedCompanyIds.length > 0 && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg animate-in fade-in slide-in-from-bottom-2">
                            <span className="text-sm font-medium text-blue-700">{selectedCompanyIds.length} Selected</span>
                            <div className="h-4 w-px bg-blue-200 mx-1"></div>
                            <button className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors" title="Bulk Approve">
                                <CheckCircle className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors" title="Bulk Reject">
                                <XCircle className="w-4 h-4" />
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
                        <CompanyFilterPanel onClose={() => setIsFilterPanelOpen(false)} />
                    </div>
                )}

                {/* Data Table Area */}
                <div className="flex-1 w-full bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden min-h-[500px]">
                    <CompanyTable
                        selectedIds={selectedCompanyIds}
                        onSelectAll={handleSelectAll}
                        onSelectCompany={handleSelectCompany}
                        onAction={handleAction}
                    />

                    {/* Pagination Structure */}
                    <div className="mt-auto border-t border-slate-200 p-4 flex items-center justify-between bg-slate-50">
                        <p className="text-sm text-slate-600">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of <span className="font-medium">{mockMetrics.total}</span> entries
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

            {/* OVERLAY LAYER - Drawer and Modal */}
            <CompanyDetailDrawer
                isOpen={!!selectedCompanyId}
                companyId={selectedCompanyId}
                onClose={() => setSelectedCompanyId(null)}
                onApprove={() => handleAction('approve', selectedCompanyId)}
                onReject={() => handleAction('reject', selectedCompanyId)}
            />

            <ApprovalModal
                isOpen={approvalModalConfig.isOpen}
                type={approvalModalConfig.type}
                onClose={() => setApprovalModalConfig({ isOpen: false, type: null, companyId: null })}
                onConfirm={handleConfirmAction}
            />
        </div>
    );
};

export default CompanyApproval;
