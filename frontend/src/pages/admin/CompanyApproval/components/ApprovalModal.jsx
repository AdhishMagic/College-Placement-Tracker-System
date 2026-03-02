import React, { useState } from 'react';
import { AlertCircle, AlertTriangle, X } from 'lucide-react';
import Button from '../../../../components/ui/Button/Button';

const ApprovalModal = ({ isOpen, type, onClose, onConfirm }) => {
    const [reason, setReason] = useState('');

    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm(reason);
        setReason('');
    };

    const isReject = type === 'reject';

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl p-6 m-4 animate-in zoom-in-95">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col items-center text-center space-y-4 pt-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isReject ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
                        {isReject ? <AlertTriangle className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-slate-900">
                            {isReject ? 'Reject Company Registration' : 'Approve Company Registration'}
                        </h3>
                        <p className="text-sm text-slate-500 mt-2">
                            {isReject
                                ? 'Are you sure you want to reject this company? This action will notify the company contact.'
                                : 'Are you sure you want to approve this company? They will gain access to the recruitment platform.'}
                        </p>
                    </div>

                    {isReject && (
                        <div className="w-full text-left space-y-2 mt-4">
                            <label className="text-sm font-medium text-slate-700">Reason for Rejection *</label>
                            <textarea
                                className="w-full p-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none resize-none"
                                rows="3"
                                placeholder="Please provide a reason to the company..."
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            ></textarea>
                        </div>
                    )}

                    <div className="flex w-full gap-3 pt-6">
                        <Button variant="outline" className="flex-1" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            className={`flex-1 text-white ${isReject ? 'bg-rose-600 hover:bg-rose-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}
                            onClick={handleConfirm}
                            disabled={isReject && !reason.trim()}
                        >
                            {isReject ? 'Confirm Reject' : 'Confirm Approve'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApprovalModal;
