import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, X, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import UploadSection from './components/UploadSection';
import PreviewTable from './components/PreviewTable';
import ImportProgress from './components/ImportProgress';

const steps = [
    { id: 1, title: 'Upload Data', icon: Upload },
    { id: 2, title: 'Validate & Preview', icon: FileText },
    { id: 3, title: 'Confirm Import', icon: CheckCircle },
];

const BulkStudentImport = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [file, setFile] = useState(null);

    // Simulated Redux State for demonstration
    const [importStatus, setImportStatus] = useState('idle'); // 'idle' | 'validating' | 'ready' | 'importing' | 'success'

    const handleFileSelect = (selectedFile) => {
        setFile(selectedFile);
        // Move to validate step
        setCurrentStep(2);
        setImportStatus('validating');
        // Simulate validation
        setTimeout(() => {
            setImportStatus('ready');
        }, 1500);
    };

    const startImport = () => {
        setCurrentStep(3);
        setImportStatus('importing');
        setTimeout(() => {
            setImportStatus('success');
        }, 3000);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto w-full min-h-screen bg-slate-50">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-slate-900">Bulk Student Import</h1>
                <p className="text-slate-500 mt-1">Upload and validate student data securely via CSV.</p>
            </div>

            {/* Stepper */}
            <div className="mb-8">
                <div className="flex items-center justify-between relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 rounded-full z-0"></div>
                    <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 rounded-full z-0 transition-all duration-300"
                        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                    ></div>

                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const isCompleted = currentStep > step.id;
                        const isActive = currentStep === step.id;
                        return (
                            <div key={step.id} className="relative z-10 flex flex-col items-center group">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${isActive ? 'bg-blue-600 border-blue-600 text-white' : isCompleted ? 'bg-white border-blue-600 text-blue-600' : 'bg-white border-slate-300 text-slate-400'}`}>
                                    {isCompleted ? <Check size={18} strokeWidth={3} /> : <Icon size={18} />}
                                </div>
                                <span className={`mt-2 text-sm font-medium ${isActive ? 'text-blue-700' : isCompleted ? 'text-slate-700' : 'text-slate-400'}`}>
                                    {step.title}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {currentStep === 1 && (
                    <UploadSection onFileSelect={handleFileSelect} />
                )}

                {currentStep === 2 && (
                    <PreviewTable
                        status={importStatus}
                        onBack={() => { setCurrentStep(1); setFile(null); }}
                        onConfirm={startImport}
                    />
                )}

                {currentStep === 3 && (
                    <ImportProgress status={importStatus} onReset={() => setCurrentStep(1)} />
                )}
            </div>
        </div>
    );
};

export default BulkStudentImport;
