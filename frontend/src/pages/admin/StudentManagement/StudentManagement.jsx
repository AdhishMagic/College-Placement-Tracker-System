import React, { useState } from 'react';
import { Search, Filter, Download, ChevronLeft, ChevronRight, CheckCircle, XCircle } from 'lucide-react';
import styles from './StudentManagement.module.css';
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
        <div className={styles.container}>
            {/* HEADER LAYER */}
            <div className={styles.headerLayer}>
                <div>
                    <h1 className={styles.pageTitle}>Student Management</h1>
                    <p className={styles.breadcrumb}>Admin / Students</p>
                </div>
                <Button variant="outline">
                    <Download className="w-4 h-4" style={{ marginRight: '8px', display: 'inline' }} />
                    Export All Data
                </Button>
            </div>

            {/* METRICS LAYER */}
            <div className={styles.metricsGrid}>
                <StatCard title="Total Students" value={mockMetrics.total} icon="users" />
                <StatCard title="Verified Students" value={mockMetrics.verified} icon="check-circle" trend="+12%" />
                <StatCard title="Placed Students" value={mockMetrics.placed} icon="briefcase" trend="+5%" />
                <StatCard title="Pending Verification" value={mockMetrics.pendingVerification} icon="clock" trend="-3%" />
            </div>

            {/* CONTROL BAR LAYER */}
            <div className={styles.controlBar}>
                <div className={styles.searchContainer}>
                    <Search className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        className={styles.searchInput}
                    />
                </div>

                <div className={styles.actionsContainer}>
                    {selectedStudentIds.length > 0 && (
                        <div className={styles.bulkActions}>
                            <span className={styles.bulkText}>{selectedStudentIds.length} Selected</span>
                            <div className={styles.bulkDivider}></div>
                            <button className={`${styles.actionIconBtn} ${styles.success}`} title="Bulk Verify">
                                <CheckCircle className="w-4 h-4" />
                            </button>
                            <button className={`${styles.actionIconBtn} ${styles.danger}`} title="Bulk Block">
                                <XCircle className="w-4 h-4" />
                            </button>
                            <button className={`${styles.actionIconBtn} ${styles.neutral}`} title="Export Selected">
                                <Download className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    <Button
                        variant={isFilterPanelOpen ? "primary" : "outline"}
                        onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                    >
                        <Filter className="w-4 h-4" style={{ marginRight: '8px', display: 'inline' }} />
                        Filters
                    </Button>
                </div>
            </div>

            {/* MAIN CONTENT LAYER */}
            <div className={styles.mainContent}>
                {/* Advanced Filter Panel */}
                {isFilterPanelOpen && (
                    <div className={styles.filterPanelWrapper}>
                        <StudentFilterPanel onClose={() => setIsFilterPanelOpen(false)} />
                    </div>
                )}

                {/* Data Table Area */}
                <div className={styles.tableArea}>
                    <StudentTable
                        selectedIds={selectedStudentIds}
                        onSelectAll={handleSelectAll}
                        onSelectStudent={handleSelectStudent}
                        onViewStudent={(id) => setSelectedStudentForDrawer(id)}
                    />

                    {/* Pagination Structure */}
                    <div className={styles.pagination}>
                        <p className={styles.paginationText}>
                            Showing <strong>1</strong> to <strong>50</strong> of <strong>5120</strong> entries
                        </p>
                        <div className={styles.paginationControls}>
                            <Button
                                variant="outline"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <div className={styles.paginationCurrent}>
                                Page {currentPage} of {totalPages}
                            </div>
                            <Button
                                variant="outline"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
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
