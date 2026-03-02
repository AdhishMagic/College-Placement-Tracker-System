import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, AlertCircle, CheckCircle2, AlertTriangle, ArrowLeft, ArrowRight } from 'lucide-react';

const mockData = [
    { id: 1, name: 'Aarav Sharma', email: 'aarav.s@college.edu', dept: 'CSE', cgpa: '8.5', backlogs: 0, isValid: true, errors: [] },
    { id: 2, name: 'Priya Patel', email: 'priya_p@college', dept: 'ECE', cgpa: '7.9', backlogs: 1, isValid: false, errors: ['Invalid email format'] },
    { id: 3, name: 'Rahul Verma', email: 'rahul.v@college.edu', dept: 'ME', cgpa: '9.2', backlogs: 0, isValid: true, errors: [] },
    { id: 4, name: 'Neha Gupta', email: 'neha.g@college.edu', dept: 'IT', cgpa: '11.5', backlogs: 0, isValid: false, errors: ['CGPA must be between 0 and 10'] },
    { id: 5, name: 'Karan Singh', email: 'karan.s@college.edu', dept: 'CE', cgpa: '6.8', backlogs: 'Two', isValid: false, errors: ['Backlogs must be a number'] },
];

const PreviewTable = ({ status, onBack, onConfirm }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;
    const totalPages = Math.ceil(mockData.length / rowsPerPage);

    const totalRecords = mockData.length;
    const validRecords = mockData.filter(d => d.isValid).length;
    const invalidRecords = totalRecords - validRecords;

    if (status === 'validating') {
        return (
            <div className="p-12 text-center h-[500px] flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <h3 className="text-xl font-medium text-slate-800">Validating Data...</h3>
                <p className="text-slate-500 mt-2">Checking formats, required fields, and preventing duplicates.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-slate-50 p-6 md:p-8">
            {/* Summary Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500">Total Records</p>
                        <p className="text-2xl font-bold text-slate-800 mt-1">{totalRecords}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                        <FileText size={20} />
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-green-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500">Valid Records</p>
                        <p className="text-2xl font-bold text-green-600 mt-1">{validRecords}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <CheckCircle2 size={20} />
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-red-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500">Invalid Records</p>
                        <p className="text-2xl font-bold text-red-600 mt-1">{invalidRecords}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                        <AlertTriangle size={20} />
                    </div>
                </div>
            </div>

            {invalidRecords > 0 && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3 items-start">
                    <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                        <h4 className="text-red-800 font-medium text-sm">Action Required: Invalid Rows Detected</h4>
                        <p className="text-red-600 text-sm mt-1">
                            There are {invalidRecords} rows with errors. You can proceed, but only valid rows will be imported. Alternatively, you can upload a corrected file.
                        </p>
                    </div>
                </div>
            )}

            {/* Table Section */}
            <div className="bg-white border flex flex-col flex-1 border-slate-200 rounded-xl shadow-sm overflow-hidden mb-6">
                <div className="px-5 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
                    <h3 className="font-medium text-slate-800">Preview Data ({mockData.length})</h3>
                    <div className="flex gap-2 text-sm text-slate-500">
                        Showing Page {currentPage} of {totalPages}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                            <tr>
                                <th className="px-5 py-3 font-medium">Student Name</th>
                                <th className="px-5 py-3 font-medium">Email Address</th>
                                <th className="px-5 py-3 font-medium">Department</th>
                                <th className="px-5 py-3 font-medium text-right">CGPA</th>
                                <th className="px-5 py-3 font-medium text-right">Backlogs</th>
                                <th className="px-5 py-3 font-medium text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {mockData.map((row) => (
                                <tr key={row.id} className={`${!row.isValid ? 'bg-red-50/50' : 'hover:bg-slate-50'}`}>
                                    <td className="px-5 py-4 font-medium text-slate-800">{row.name}</td>
                                    <td className="px-5 py-4 text-slate-600">{row.email}</td>
                                    <td className="px-5 py-4 text-slate-600">{row.dept}</td>
                                    <td className="px-5 py-4 text-slate-600 text-right">{row.cgpa}</td>
                                    <td className="px-5 py-4 text-slate-600 text-right">{row.backlogs}</td>
                                    <td className="px-5 py-4">
                                        <div className="flex justify-center items-center">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${row.isValid
                                                    ? 'bg-green-50 text-green-700 border-green-200'
                                                    : 'bg-red-50 text-red-700 border-red-200'
                                                }`}>
                                                {row.isValid ? 'Valid' : 'Invalid'}
                                                {!row.isValid && (
                                                    <div className="relative group cursor-pointer inline-flex">
                                                        <AlertCircle size={14} className="text-red-500" />
                                                        <div className="absolute right-0 top-full mt-2 w-max max-w-xs bg-slate-800 text-white text-xs rounded py-1.5 px-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none shadow-xl">
                                                            {row.errors.join(', ')}
                                                        </div>
                                                    </div>
                                                )}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-5 py-3 border-t border-slate-200 flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                        Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, totalRecords)} of {totalRecords} entries
                    </span>
                    <div className="flex gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => p - 1)}
                            className="px-3 py-1.5 border border-slate-300 rounded-md bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                        >
                            <ChevronLeft size={16} /> Prev
                        </button>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(p => p + 1)}
                            className="px-3 py-1.5 border border-slate-300 rounded-md bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                        >
                            Next <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Action Bar */}
            <div className="flex justify-between items-center bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <button
                    onClick={onBack}
                    className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm"
                >
                    <ArrowLeft size={16} />
                    Upload New File
                </button>
                <div className="flex flex-col items-end gap-1">
                    <button
                        onClick={onConfirm}
                        className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm"
                    >
                        Confirm Import
                        <ArrowRight size={16} />
                    </button>
                    <span className="text-xs text-slate-500 mr-1">Only 3 valid records will be imported</span>
                </div>
            </div>
        </div>
    );
};

export default PreviewTable;
