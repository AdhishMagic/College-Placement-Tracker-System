import React from 'react';
import { X } from 'lucide-react';
import Button from '../../../../components/ui/Button/Button';

const CompanyFilterPanel = ({ onClose }) => {
    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm h-[500px] flex flex-col">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
                <h3 className="font-semibold text-slate-800">Advanced Filters</h3>
                <button
                    onClick={onClose}
                    className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Status Filter */}
                <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-700">Approval Status</label>
                    <div className="space-y-2">
                        {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
                            <label key={status} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                                    defaultChecked={status === 'Pending'}
                                />
                                <span className="text-sm text-slate-600">{status}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Industry Filter */}
                <div className="space-y-3 border-t border-slate-100 pt-5">
                    <label className="text-sm font-medium text-slate-700">Industry</label>
                    <select className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-slate-700 bg-white">
                        <option value="">All Industries</option>
                        <option value="IT">IT / Software</option>
                        <option value="Finance">Finance / Banking</option>
                        <option value="Consulting">Consulting</option>
                        <option value="Manufacturing">Manufacturing</option>
                    </select>
                </div>

                {/* Date Filter */}
                <div className="space-y-3 border-t border-slate-100 pt-5">
                    <label className="text-sm font-medium text-slate-700">Registration Date Range</label>
                    <div className="flex gap-2">
                        <input
                            type="date"
                            className="w-full p-2 border border-slate-200 rounded-lg text-sm text-slate-600 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        <span className="text-slate-400 self-center">-</span>
                        <input
                            type="date"
                            className="w-full p-2 border border-slate-200 rounded-lg text-sm text-slate-600 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex gap-3">
                <Button variant="outline" className="flex-1" onClick={onClose}>
                    Reset
                </Button>
                <Button variant="primary" className="flex-1" onClick={onClose}>
                    Apply
                </Button>
            </div>
        </div>
    );
};

export default CompanyFilterPanel;
