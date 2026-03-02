import React, { useEffect } from 'react';
import { X, Clock, User, Shield, Activity, Globe, Monitor, FileJson } from 'lucide-react';

const mockLogDetail = {
    id: 'L003',
    timestamp: '2026-03-02 14:15:22',
    userName: 'Recruiter Mike',
    userRole: 'recruiter',
    actionType: 'Modified',
    entityAffected: 'Job Posting #402',
    description: 'Updated Job Criteria for SDE Role',
    ipAddress: '155.12.33.19',
    browserContext: 'Chrome 122.0.0.0 on Windows 11',
    sessionId: 'sess_99a8b7c6d5',
    diff: {
        oldValue: {
            minCGPA: 7.0,
            allowBacklogs: false,
            branches: ['Computer Science', 'Information Technology'],
        },
        newValue: {
            minCGPA: 6.5,
            allowBacklogs: true,
            branches: ['Computer Science', 'Information Technology', 'Electronics'],
        }
    }
};

const LogDetailDrawer = ({ logId, isOpen, onClose }) => {
    // Redux assumption: Fetch full log detail if not already populated
    // const { currentLog, isLoading } = useSelector(state => state.auditLogs)
    // useEffect(() => { if (logId) dispatch(fetchLogDetail(logId)) }, [logId])

    const log = mockLogDetail; // replace with actual selector later

    // Handle body scroll locking
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-sm transition-opacity">
            <div className="w-full max-w-xl h-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 translate-x-0">

                {/* Drawer Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 bg-white">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <Activity className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Log Details</h2>
                            <p className="text-sm text-slate-500 font-mono mt-0.5">ID: {logId || log.id}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        aria-label="Close details"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Drawer Body - Scrollable */}
                <div className="flex-1 overflow-y-auto px-6 py-6 bg-slate-50/50 space-y-6">

                    {/* Primary Info Card */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                        <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-2 mb-4">Event Snapshot</h3>

                        <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                            <div>
                                <span className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
                                    <Clock className="w-3.5 h-3.5" /> Timestamp
                                </span>
                                <span className="text-sm font-medium text-slate-900">{log.timestamp}</span>
                            </div>
                            <div>
                                <span className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
                                    <Shield className="w-3.5 h-3.5" /> Action Type
                                </span>
                                <span className="inline-flex px-2.5 py-1 rounded text-xs font-semibold bg-blue-50 text-blue-700">
                                    {log.actionType}
                                </span>
                            </div>
                            <div className="col-span-2">
                                <span className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
                                    <Activity className="w-3.5 h-3.5" /> Entity Affected
                                </span>
                                <span className="text-sm font-medium text-slate-900">{log.entityAffected}</span>
                            </div>
                            <div className="col-span-2 bg-slate-50 rounded-lg p-3 border border-slate-100 mt-2">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Full Description</span>
                                <p className="text-sm text-slate-700">{log.description}</p>
                            </div>
                        </div>
                    </div>

                    {/* Data Payload diff */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                        <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
                            <FileJson className="w-5 h-5 text-slate-500" />
                            Data Changes
                        </h3>

                        {log.diff ? (
                            <div className="space-y-4">
                                <div>
                                    <span className="inline-block bg-red-50 text-red-700 border border-red-100 px-2 py-0.5 rounded text-xs font-bold mb-2">Previous Value</span>
                                    <pre className="bg-slate-900 text-slate-300 p-4 rounded-lg text-xs font-mono overflow-auto border border-slate-800">
                                        {JSON.stringify(log.diff.oldValue, null, 2)}
                                    </pre>
                                </div>
                                <div className="flex justify-center -my-2 relative z-10">
                                    <div className="bg-white p-1 rounded-full border border-slate-200 shadow-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 rotate-90"><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></svg>
                                    </div>
                                </div>
                                <div>
                                    <span className="inline-block bg-green-50 text-green-700 border border-green-100 px-2 py-0.5 rounded text-xs font-bold mb-2">New Value</span>
                                    <pre className="bg-slate-900 text-green-400 p-4 rounded-lg text-xs font-mono overflow-auto border border-slate-800">
                                        {JSON.stringify(log.diff.newValue, null, 2)}
                                    </pre>
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-slate-500 italic text-center py-4 bg-slate-50 rounded-lg">No state diff available for this event.</p>
                        )}
                    </div>

                    {/* Context & Metadata section */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                        <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-2 mb-4">Origin Context</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 pb-4 border-b border-slate-100">
                                <div className="p-2 bg-slate-100 rounded-lg mt-0.5"><User className="w-4 h-4 text-slate-600" /></div>
                                <div>
                                    <span className="text-xs text-slate-500 block">Initiated By</span>
                                    <p className="text-sm font-medium text-slate-900">{log.userName} <span className="text-slate-400 mx-1">•</span> <span className="text-slate-600 capitalize text-xs">{log.userRole}</span></p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 pb-4 border-b border-slate-100">
                                <div className="p-2 bg-slate-100 rounded-lg mt-0.5"><Globe className="w-4 h-4 text-slate-600" /></div>
                                <div>
                                    <span className="text-xs text-slate-500 block">Network (IP Address)</span>
                                    <p className="text-sm font-mono text-slate-900">{log.ipAddress}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 pb-4 border-b border-slate-100">
                                <div className="p-2 bg-slate-100 rounded-lg mt-0.5"><Monitor className="w-4 h-4 text-slate-600" /></div>
                                <div>
                                    <span className="text-xs text-slate-500 block">Browser / User Agent</span>
                                    <p className="text-sm text-slate-900">{log.browserContext}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-slate-100 rounded-lg mt-0.5"><Shield className="w-4 h-4 text-slate-600" /></div>
                                <div>
                                    <span className="text-xs text-slate-500 block">Session Tracker</span>
                                    <p className="text-sm font-mono text-slate-900">{log.sessionId}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LogDetailDrawer;
