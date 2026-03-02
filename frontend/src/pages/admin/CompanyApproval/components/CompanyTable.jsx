import React from 'react';
import { MoreVertical, CheckCircle, XCircle, Eye } from 'lucide-react';

const mockCompanies = [
    {
        id: 'comp_1',
        name: 'TechCorp UI',
        industry: 'Software Development',
        registrationDate: '12 Oct, 2026',
        contactEmail: 'hr@techcorp.ui',
        status: 'Pending'
    },
    {
        id: 'comp_2',
        name: 'Edway Global',
        industry: 'Education Technology',
        registrationDate: '10 Oct, 2026',
        contactEmail: 'talent@edway.org',
        status: 'Approved'
    },
    {
        id: 'comp_3',
        name: 'Alpha Systems',
        industry: 'FinTech',
        registrationDate: '09 Oct, 2026',
        contactEmail: 'careers@alphasys.com',
        status: 'Rejected'
    },
    {
        id: 'comp_4',
        name: 'Nexus Analytics',
        industry: 'Data Science',
        registrationDate: '15 Oct, 2026',
        contactEmail: 'join@nexus.io',
        status: 'Pending'
    }
];

const StatusBadge = ({ status }) => {
    let colorClass = '';

    switch (status) {
        case 'Approved':
            colorClass = 'bg-emerald-100 text-emerald-700 border-emerald-200';
            break;
        case 'Rejected':
            colorClass = 'bg-rose-100 text-rose-700 border-rose-200';
            break;
        case 'Pending':
            colorClass = 'bg-amber-100 text-amber-700 border-amber-200';
            break;
        default:
            colorClass = 'bg-slate-100 text-slate-700 border-slate-200';
    }

    return (
        <span className={`px-2.5 py-1 text-xs font-semibold border rounded-full ${colorClass}`}>
            {status}
        </span>
    );
};

const CompanyTable = ({ selectedIds, onSelectAll, onSelectCompany, onAction }) => {
    const isAllSelected = mockCompanies.length > 0 && selectedIds.length === mockCompanies.length;

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                        <th className="p-4 w-12 text-center">
                            <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                checked={isAllSelected}
                                onChange={(e) => onSelectAll(e.target.checked)}
                            />
                        </th>
                        <th className="p-4 font-medium">Company Name</th>
                        <th className="p-4 font-medium">Industry</th>
                        <th className="p-4 font-medium hidden md:table-cell">Registration Date</th>
                        <th className="p-4 font-medium hidden lg:table-cell">Contact Email</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {mockCompanies.map((company) => (
                        <tr
                            key={company.id}
                            className={`hover:bg-slate-50 transition-colors ${selectedIds.includes(company.id) ? 'bg-blue-50/50' : ''}`}
                        >
                            <td className="p-4 text-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                    checked={selectedIds.includes(company.id)}
                                    onChange={() => onSelectCompany(company.id)}
                                />
                            </td>
                            <td className="p-4">
                                <div className="font-semibold text-slate-900">{company.name}</div>
                            </td>
                            <td className="p-4 text-slate-600 text-sm">
                                {company.industry}
                            </td>
                            <td className="p-4 text-slate-500 text-sm hidden md:table-cell">
                                {company.registrationDate}
                            </td>
                            <td className="p-4 text-slate-600 text-sm hidden lg:table-cell">
                                {company.contactEmail}
                            </td>
                            <td className="p-4">
                                <StatusBadge status={company.status} />
                            </td>
                            <td className="p-4 text-right">
                                <div className="flex justify-end gap-2">
                                    <button
                                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="View Details"
                                        onClick={() => onAction('view', company.id)}
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    {company.status === 'Pending' && (
                                        <>
                                            <button
                                                className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                                title="Approve"
                                                onClick={() => onAction('approve', company.id)}
                                            >
                                                <CheckCircle className="w-4 h-4" />
                                            </button>
                                            <button
                                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                                title="Reject"
                                                onClick={() => onAction('reject', company.id)}
                                            >
                                                <XCircle className="w-4 h-4" />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CompanyTable;
