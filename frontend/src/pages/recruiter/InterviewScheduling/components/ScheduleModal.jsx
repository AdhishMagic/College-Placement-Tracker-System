import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Video, User } from 'lucide-react';

const ScheduleModal = ({ isOpen, onClose, candidate, onConfirm }) => {
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        mode: 'Online',
        interviewer: '',
        notes: '',
    });

    if (!isOpen || !candidate) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm({ ...formData, candidateId: candidate.id });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm transition-opacity">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Schedule Interview
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto">
                    <div className="mb-6 p-4 bg-blue-50/50 rounded-lg border border-blue-100 flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
                            {candidate.name.charAt(0)}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900">{candidate.name}</p>
                            <p className="text-xs text-gray-500">{candidate.email}</p>
                        </div>
                    </div>

                    <form id="schedule-form" onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Date
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Calendar className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                        className="pl-10 block w-full rounded-md border text-gray-900 border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Time
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Clock className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input
                                        type="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        required
                                        className="pl-10 block w-full rounded-md border text-gray-900 border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Interview Mode
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <label className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${formData.mode === 'Online' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                                    <input
                                        type="radio"
                                        name="mode"
                                        value="Online"
                                        checked={formData.mode === 'Online'}
                                        onChange={handleChange}
                                        className="sr-only"
                                    />
                                    <Video className="w-4 h-4 mr-2" />
                                    <span className="text-sm font-medium">Online</span>
                                </label>
                                <label className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${formData.mode === 'Offline' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                                    <input
                                        type="radio"
                                        name="mode"
                                        value="Offline"
                                        checked={formData.mode === 'Offline'}
                                        onChange={handleChange}
                                        className="sr-only"
                                    />
                                    <MapPin className="w-4 h-4 mr-2" />
                                    <span className="text-sm font-medium">Offline</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Interviewer Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="interviewer"
                                    value={formData.interviewer}
                                    onChange={handleChange}
                                    placeholder="Enter interviewer name"
                                    required
                                    className="pl-10 block w-full rounded-md border text-gray-900 border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Notes (Optional)
                            </label>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                rows="3"
                                placeholder="Add any special instructions or technical requirements"
                                className="block w-full rounded-md border text-gray-900 border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end space-x-3 bg-gray-50/50">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="schedule-form"
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        Confirm Schedule
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ScheduleModal;
