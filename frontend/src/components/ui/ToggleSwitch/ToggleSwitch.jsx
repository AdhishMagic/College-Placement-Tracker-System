import React from 'react';

const ToggleSwitch = ({ label, description, checked, onChange, disabled = false }) => {
    return (
        <label className={`flex items-start justify-between cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <div className="flex flex-col flex-1 pr-6">
                <span className="text-sm font-medium text-gray-900">{label}</span>
                {description && (
                    <span className="text-sm text-gray-500 mt-1">{description}</span>
                )}
            </div>
            <div className="relative">
                <input
                    type="checkbox"
                    className="sr-only"
                    checked={checked}
                    onChange={(e) => {
                        if (!disabled) {
                            onChange(e.target.checked);
                        }
                    }}
                    disabled={disabled}
                />
                <div
                    className={`block w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${checked ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                ></div>
                <div
                    className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'
                        }`}
                ></div>
            </div>
        </label>
    );
};

export default ToggleSwitch;
