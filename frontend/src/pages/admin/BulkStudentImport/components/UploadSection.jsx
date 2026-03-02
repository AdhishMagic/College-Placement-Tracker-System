import React, { useCallback, useState } from 'react';
import { UploadCloud, File, AlertCircle } from 'lucide-react';

const UploadSection = ({ onFileSelect }) => {
    const [isDragActive, setIsDragActive] = useState(false);
    const [error, setError] = useState('');

    const handleDragEnter = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        setError('');

        const files = e.dataTransfer.files;
        validateAndProcessFile(files[0]);
    }, []);

    const handleChange = (e) => {
        setError('');
        validateAndProcessFile(e.target.files[0]);
    };

    const validateAndProcessFile = (file) => {
        if (!file) return;

        // Check type
        if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
            setError('Please upload a valid CSV file.');
            return;
        }

        // Check size (e.g., max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            setError('File size exceeds the 10MB limit.');
            return;
        }

        onFileSelect(file);
    };

    return (
        <div className="p-8 md:p-12">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold text-slate-800">Upload CSV Data</h2>
                    <p className="text-slate-500 mt-2 text-sm">Download our template to ensure correct formatting before upload.</p>
                </div>

                <div
                    className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center transition-all cursor-pointer
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-400'}`}
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('csv-upload').click()}
                >
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                        <UploadCloud size={32} className={`transition-colors ${isDragActive ? 'text-blue-600' : 'text-slate-400'}`} />
                    </div>
                    <p className="text-slate-700 font-medium text-lg mb-1">
                        Drag & drop your file here
                    </p>
                    <p className="text-slate-500 text-sm mb-6">
                        or click to browse your computer
                    </p>

                    <input
                        type="file"
                        id="csv-upload"
                        accept=".csv"
                        className="hidden"
                        onChange={handleChange}
                    />

                    <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg shadow-sm hover:bg-slate-50 transition-colors">
                        Browse Files
                    </button>
                </div>

                {error && (
                    <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 text-sm border border-red-100">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                <div className="mt-8 flex items-center pl-2 border-l-4 border-blue-500 bg-blue-50/50 p-3 rounded-r-lg">
                    <div className="flex-1">
                        <h4 className="text-sm font-medium text-blue-900">Need the CSV Template?</h4>
                        <p className="text-xs text-blue-700/80 mt-0.5">Includes all required columns for student data.</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium px-3 py-1.5 rounded bg-white shadow-sm border border-blue-100">
                        Download sample.csv
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadSection;
