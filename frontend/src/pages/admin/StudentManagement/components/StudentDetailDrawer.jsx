import React from 'react';
import { X, Mail, Phone, MapPin, Download, ExternalLink, CheckCircle, ShieldAlert } from 'lucide-react';

const StudentDetailDrawer = ({ isOpen, studentId, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Overlay Backdrop */}
            <div
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Drawer Panel */}
            <div className="relative w-full md:w-[450px] max-w-full bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">

                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 tracking-tight">Student Profile</h2>
                        <p className="text-sm text-slate-500 font-medium">ID: {studentId || '120392'}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 bg-white text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-all border border-slate-200 shadow-sm shadow-slate-200/50"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">

                    {/* Identity Section */}
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-blue-100 flex items-center justify-center rounded-2xl text-blue-600 font-bold text-3xl shadow-sm border border-blue-200/50">
                            A
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 leading-tight">Aarav Patel</h3>
                            <p className="text-sm font-medium text-slate-500 mb-1">B.Tech in Computer Science</p>
                            <div className="flex items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200 shadow-sm shadow-green-100/50">
                                    <CheckCircle className="w-3 h-3" /> Confirmed
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Verification Blocks */}
                    <div className="grid grid-cols-2 gap-3 mb-2">
                        <button className="flex flex-col items-center justify-center p-3 rounded-xl border border-green-200 bg-green-50 text-green-700 hover:bg-green-100 transition focus:ring-2 focus:ring-green-400">
                            <CheckCircle className="w-6 h-6 mb-2 text-green-600" />
                            <span className="text-sm font-semibold">Verify Profile</span>
                        </button>
                        <button className="flex flex-col items-center justify-center p-3 rounded-xl border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition focus:ring-2 focus:ring-red-400">
                            <ShieldAlert className="w-6 h-6 mb-2 text-red-600" />
                            <span className="text-sm font-semibold">Block User</span>
                        </button>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl text-center shadow-sm">
                            <p className="text-xs text-slate-500 font-medium mb-1">CGPA</p>
                            <p className="text-lg font-bold text-slate-800 tracking-tight">9.2</p>
                        </div>
                        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl text-center shadow-sm">
                            <p className="text-xs text-slate-500 font-medium mb-1">Backlogs</p>
                            <p className="text-lg font-bold text-green-600 tracking-tight">0</p>
                        </div>
                        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl text-center shadow-sm">
                            <p className="text-xs text-slate-500 font-medium mb-1">Applications</p>
                            <p className="text-lg font-bold text-blue-600 tracking-tight">14</p>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">Contact Details</h4>

                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-slate-50 rounded-lg shrink-0 border border-slate-100 text-slate-400">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-medium">Email Address</p>
                                    <p className="text-sm text-slate-800 font-medium">aarav.p@edway.edu</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-slate-50 rounded-lg shrink-0 border border-slate-100 text-slate-400">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-medium">Phone Number</p>
                                    <p className="text-sm text-slate-800 font-medium">+91 98765 43210</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-slate-50 rounded-lg shrink-0 border border-slate-100 text-slate-400">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-medium">Location</p>
                                    <p className="text-sm text-slate-800 font-medium">New Delhi, DL</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Academic Resume */}
                    <div className="space-y-4 pt-2">
                        <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">Resume & Docs</h4>

                        <div className="flex items-center justify-between p-3 border border-slate-200 rounded-xl bg-white shadow-sm hover:border-blue-300 transition-colors group cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center border border-red-100">
                                    <span className="font-bold text-xs">PDF</span>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">Aarav_Resume_2024.pdf</p>
                                    <p className="text-xs text-slate-500">Updated 2 days ago • 1.2 MB</p>
                                </div>
                            </div>
                            <button className="text-slate-400 hover:text-blue-600 p-2 transition-colors">
                                <Download className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                </div>

                {/* Footer Action */}
                <div className="p-4 border-t border-slate-100 bg-slate-50">
                    <button className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-white border border-slate-200 shadow-sm rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all focus:ring-2 focus:ring-blue-500">
                        View Full Academic Record
                        <ExternalLink className="w-4 h-4" />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default StudentDetailDrawer;
