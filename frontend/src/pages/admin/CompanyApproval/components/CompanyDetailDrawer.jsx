import React from 'react';
import { X, Building, Mail, Phone, ExternalLink, MapPin, FileText, CheckCircle, XCircle } from 'lucide-react';
import Button from '../../../../components/ui/Button/Button';

// Mock company detailed data
const mockCompanyDetails = {
    id: 'comp_1',
    name: 'TechCorp UI',
    industry: 'Software Development',
    status: 'Pending',
    description: 'Leading provider of enterprise UI solutions for global Fortune 500 companies.',
    website: 'https://techcorp.ui',
    address: '123 Tech Park, Innovation Valley, San Francisco, CA',
    contacts: {
        primaryName: 'Sarah Jenkins',
        primaryEmail: 'hr@techcorp.ui',
        primaryPhone: '+1 (555) 123-4567'
    },
    hiringPreferences: ['Software Engineering', 'UI/UX Design', 'Product Management'],
    documents: [
        { name: 'Company_Registration_Certificate.pdf', url: '#' },
        { name: 'Tax_Compliance_2026.pdf', url: '#' }
    ]
};

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

const CompanyDetailDrawer = ({ isOpen, companyId, onClose, onApprove, onReject }) => {
    if (!isOpen) return null;

    // Typically fetch by companyId here, using mock for visual
    const details = mockCompanyDetails;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right">
                <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 hidden sm:flex">
                            <Building className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 leading-tight">
                                {details.name}
                            </h2>
                            <div className="text-sm text-slate-500 mt-0.5">Registration Details</div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto align-top">
                    {/* Header Info */}
                    <div className="p-6 border-b border-slate-100 space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-slate-500">Status</span>
                            <StatusBadge status={details.status} />
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 text-sm">
                                <Building className="w-4 h-4 text-slate-400 mt-0.5" />
                                <div>
                                    <p className="font-medium text-slate-700">Industry</p>
                                    <p className="text-slate-600">{details.industry}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 text-sm">
                                <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                                <div>
                                    <p className="font-medium text-slate-700">Location</p>
                                    <p className="text-slate-600 leading-relaxed">{details.address}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 text-sm">
                                <ExternalLink className="w-4 h-4 text-slate-400 mt-0.5" />
                                <div>
                                    <p className="font-medium text-slate-700">Website</p>
                                    <a href={details.website} className="text-blue-600 hover:underline">{details.website}</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="p-6 border-b border-slate-100">
                        <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">Primary Contact</h3>
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                            <div className="font-medium text-slate-800 mb-2">{details.contacts.primaryName}</div>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-slate-600">
                                    <Mail className="w-4 h-4 text-slate-400" />
                                    {details.contacts.primaryEmail}
                                </div>
                                <div className="flex items-center gap-2 text-slate-600">
                                    <Phone className="w-4 h-4 text-slate-400" />
                                    {details.contacts.primaryPhone}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hiring Preferences */}
                    <div className="p-6 border-b border-slate-100">
                        <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">Hiring Preferences</h3>
                        <div className="flex flex-wrap gap-2">
                            {details.hiringPreferences.map((pref, idx) => (
                                <span key={idx} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-100">
                                    {pref}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Uploaded Documents */}
                    <div className="p-6">
                        <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">Uploaded Documents</h3>
                        <div className="space-y-3">
                            {details.documents.map((doc, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/30 transition-colors group cursor-pointer">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="p-2 bg-blue-50 text-blue-600 rounded">
                                            <FileText className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm font-medium text-slate-700 truncate">{doc.name}</span>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-slate-200 bg-slate-50 flex gap-3 shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)]">
                    <Button variant="outline" className="flex-1 justify-center gap-2 text-rose-600 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200" onClick={onReject}>
                        <XCircle className="w-4 h-4" />
                        Reject
                    </Button>
                    <Button variant="primary" className="flex-1 justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={onApprove}>
                        <CheckCircle className="w-4 h-4" />
                        Approve
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CompanyDetailDrawer;
