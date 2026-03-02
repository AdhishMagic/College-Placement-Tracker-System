import React from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock } from 'lucide-react';

const CalendarView = ({ schedule }) => {
    // Placeholder implementation for Calendar View
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <h3 className="text-lg font-semibold text-gray-900">November 2026</h3>
                    <div className="flex items-center bg-gray-100 rounded-lg p-1">
                        <button className="px-3 py-1.5 text-sm font-medium bg-white text-gray-900 rounded-md shadow-sm">Week</button>
                        <button className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-md transition-colors">Month</button>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="h-[500px] border border-gray-200 rounded-lg bg-gray-50/50 flex flex-col items-center justify-center text-center p-8">
                <CalendarIcon className="w-16 h-16 text-blue-200 mb-4" />
                <h4 className="text-xl font-medium text-gray-800 mb-2">Calendar Component Placeholder</h4>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                    A full calendar component (like FullCalendar or react-big-calendar) will be integrated here, displaying scheduled interviews for the selected view.
                </p>
                <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                    <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-start space-x-3">
                        <div className="mt-0.5 mt bg-blue-100 p-1.5 rounded-md">
                            <Clock className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="text-left">
                            <p className="text-xs font-semibold text-gray-900">10:00 AM</p>
                            <p className="text-xs text-gray-500 truncate w-32">John Doe - UI/UX</p>
                            <span className="inline-block mt-1 px-1.5 py-0.5 text-[10px] font-medium bg-blue-50 text-blue-700 rounded border border-blue-100">
                                Scheduled
                            </span>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-start space-x-3 opacity-60">
                        <div className="mt-0.5 mt bg-green-100 p-1.5 rounded-md">
                            <Clock className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="text-left">
                            <p className="text-xs font-semibold text-gray-900">11:30 AM</p>
                            <p className="text-xs text-gray-500 truncate w-32">Jane Smith - Dev</p>
                            <span className="inline-block mt-1 px-1.5 py-0.5 text-[10px] font-medium bg-green-50 text-green-700 rounded border border-green-100">
                                Completed
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarView;
