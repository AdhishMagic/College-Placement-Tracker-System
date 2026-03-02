import React from 'react';
import { Shield, Eye, Clock } from 'lucide-react';

const mockLogs = [
    {
        id: 'L001',
        timestamp: '2026-03-02 14:32:01',
        userName: 'Admin Sarah',
        userRole: 'admin',
        actionType: 'Approved',
        entityAffected: 'TechCorp Registration',
        description: 'Approved Company Registration',
        ipAddress: '192.168.1.100',
    },
    {
        id: 'L002',
        timestamp: '2026-03-02 14:28:45',
        userName: 'John Doe',
        userRole: 'student',
        actionType: 'Updated',
        entityAffected: 'Student Profile',
        description: 'Verified Student Profile details',
        ipAddress: '14.139.60.10',
    },
    {
        id: 'L003',
        timestamp: '2026-03-02 14:15:22',
        userName: 'Recruiter Mike',
        userRole: 'recruiter',
        actionType: 'Modified',
        entityAffected: 'Job Posting #402',
        description: 'Updated Job Criteria for SDE Role',
        ipAddress: '155.12.33.19',
    },
    {
        id: 'L004',
        timestamp: '2026-03-02 13:58:10',
        userName: 'System',
        userRole: 'admin',
        actionType: 'Automated',
        entityAffected: 'Weekly Backup',
        description: 'System triggered weekly DB snapshot',
        ipAddress: '127.0.0.1',
    },
];

const RoleBadge = ({ role }) => {
    switch (role?.toLowerCase()) {
        case 'admin':
            return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Admin</span>;
        case 'recruiter':
            return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">Recruiter</span>;
        case 'student':
            return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Student</span>;
        default:
            return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">{role}</span>;
    }
};

const AuditLogTable = ({ onViewDetails }) => {
    // Redux assumption: logs, isLoading, error would be passed as props or selected here
    const isLoading = false;
    const logs = mockLogs;

    if (isLoading) {
        return (
            <div className="absolute inset-0 bg-white/50 flex flex-col items-center justify-center z-20">
                <Shield className="w-8 h-8 text-blue-600 animate-pulse mb-4" />
                <p className="text-slate-600 font-medium">Loading secure logs...</p>
                {/* Loading Skeleton */}
                <div className="w-full max-w-4xl mt-6 px-6">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-10 bg-slate-100 rounded-md animate-pulse mb-3"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (!logs || logs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center flex-1 py-16 text-center">
                <div className="bg-slate-50 p-4 rounded-full mb-4">
                    <Shield className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-1">No Logs Found</h3>
                <p className="text-slate-500 max-w-md">No activity logs match your current filters. Adjust your search or filter criteria to see results.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th className="px-6 py-4 font-semibold text-slate-700">Timestamp</th>
                        <th className="px-6 py-4 font-semibold text-slate-700">User Name</th>
                        <th className="px-6 py-4 font-semibold text-slate-700">Role</th>
                        <th className="px-6 py-4 font-semibold text-slate-700">Action Type</th>
                        <th className="px-6 py-4 font-semibold text-slate-700">Entity Affected</th>
                        <th className="px-6 py-4 font-semibold text-slate-700 xl:w-1/3">Description</th>
                        <th className="px-6 py-4 font-semibold text-slate-700">IP Address</th>
                        <th className="px-6 py-4 font-semibold text-slate-700 text-right">Details</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {logs.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-6 py-4 text-slate-600">
                                <span className="flex items-center gap-1.5 font-mono text-xs">
                                    <Clock className="w-3.5 h-3.5" />
                                    {log.timestamp}
                                </span>
                            </td>
                            <td className="px-6 py-4 font-medium text-slate-900">{log.userName}</td>
                            <td className="px-6 py-4"><RoleBadge role={log.userRole} /></td>
                            <td className="px-6 py-4">
                                <span className="font-semibold text-slate-700">
                                    {log.actionType}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-blue-600 font-medium">{log.entityAffected}</td>
                            <td className="px-6 py-4 text-slate-600 truncate max-w-xs xl:max-w-md">
                                {log.description}
                            </td>
                            <td className="px-6 py-4 text-slate-500 font-mono text-xs">{log.ipAddress}</td>
                            <td className="px-6 py-4 text-right">
                                <button
                                    onClick={() => onViewDetails(log.id)}
                                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors inline-flex items-center"
                                    title="View Detailed Log"
                                >
                                    <Eye className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AuditLogTable;
