import React from 'react';
import { Upload, CheckCircle, XCircle } from 'lucide-react';

const ImportProgress = ({ status, onReset }) => {
    if (status === 'importing') {
        return (
            <div className="p-16 text-center h-[500px] flex flex-col items-center justify-center">
                <div className="relative w-24 h-24 mb-6">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="48"
                            cy="48"
                            r="44"
                            className="stroke-current text-slate-100"
                            strokeWidth="8"
                            fill="transparent"
                        />
                        <circle
                            cx="48"
                            cy="48"
                            r="44"
                            className="stroke-current text-blue-600 transition-all duration-1000"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray="276"
                            strokeDashoffset="100" // Simulated progress
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center font-semibold text-blue-700">
                        64%
                    </div>
                </div>
                <h3 className="text-2xl font-semibold text-slate-800">Importing Data...</h3>
                <p className="text-slate-500 mt-2 max-w-sm">Please wait while we securely insert the records into the database. Do not close this window.</p>
            </div>
        );
    }

    return (
        <div className="p-16 text-center h-[500px] flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-sm border border-green-200">
                <CheckCircle className="text-green-600" size={40} />
            </div>

            <h3 className="text-2xl font-bold text-slate-800">Import Successful</h3>
            <p className="text-slate-500 mt-2 mb-8 text-lg">
                Successfully mapped and inserted <span className="font-semibold text-slate-700">3</span> records. 2 records were skipped due to formatting errors.
            </p>

            <div className="flex gap-4">
                <button
                    onClick={onReset}
                    className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition-colors"
                >
                    View Student Records
                </button>
                <button
                    onClick={onReset}
                    className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg shadow-sm hover:bg-slate-50 transition-colors"
                >
                    Import Another Array
                </button>
            </div>
        </div>
    );
};

export default ImportProgress;
