import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateDraft } from '../../../../features/settings/settingsSlice';

const GeneralSettings = ({ data, drafts }) => {
    const dispatch = useDispatch();
    const sectionData = drafts?.general || data?.general || {};

    const [logoHover, setLogoHover] = useState(false);

    const handleChange = (field, value) => {
        dispatch(updateDraft({ section: 'general', field, value }));
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            <div>
                <h3 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-4">General Settings</h3>
                <p className="text-sm text-gray-500 mb-6">Manage platform identity and primary contact details.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Platform Name</label>
                        <input
                            type="text"
                            value={sectionData.platformName || ''}
                            onChange={(e) => handleChange('platformName', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-colors"
                            placeholder="Enter platform name"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Admin Contact Email</label>
                        <input
                            type="email"
                            value={sectionData.contactEmail || ''}
                            onChange={(e) => handleChange('contactEmail', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-colors"
                            placeholder="admin@college.edu"
                        />
                    </div>
                </div>

                <div className="space-y-2 max-w-md">
                    <label className="text-sm font-medium text-gray-700">Default Currency</label>
                    <select
                        value={sectionData.currency || ''}
                        onChange={(e) => handleChange('currency', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-colors bg-white"
                    >
                        <option value="INR">Indian Rupee (INR)</option>
                        <option value="USD">US Dollar (USD)</option>
                        <option value="EUR">Euro (EUR)</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Platform Logo</label>
                    <div
                        className={`mt-2 flex justify-center rounded-lg border-2 border-dashed px-6 py-10 transition-colors ${logoHover ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
                            }`}
                        onMouseEnter={() => setLogoHover(true)}
                        onMouseLeave={() => setLogoHover(false)}
                    >
                        <div className="text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                            </svg>
                            <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                                <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer rounded-md font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                                >
                                    <span>Upload a file</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-500">PNG, JPG, GIF up to 5MB</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeneralSettings;
