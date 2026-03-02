import React from 'react';
import { MoreVertical, CheckCircle, XCircle, Eye, AlertCircle } from 'lucide-react';

const mockStudents = [
    { id: '1', name: 'Aarav Patel', email: 'aarav.p@edway.edu', dp: 'CSE', cgpa: 9.2, backlogs: 0, pStatus: 'Placed', vStatus: 'Verified' },
    { id: '2', name: 'Riya Sharma', email: 'riya.s@edway.edu', dp: 'ECE', cgpa: 8.5, backlogs: 1, pStatus: 'Eligible', vStatus: 'Pending' },
    { id: '3', name: 'Karan Singh', email: 'karan.s@edway.edu', dp: 'MECH', cgpa: 6.8, backlogs: 2, pStatus: 'Not Eligible', vStatus: 'Blocked' },
    { id: '4', name: 'Ananya Gupta', email: 'ananya.g@edway.edu', dp: 'CSE', cgpa: 8.9, backlogs: 0, pStatus: 'Pending', vStatus: 'Verified' },
    { id: '5', name: 'Vikram Mehta', email: 'vikram.m@edway.edu', dp: 'CIVIL', cgpa: 7.4, backlogs: 0, pStatus: 'Eligible', vStatus: 'Verified' },
];

const StatusBadge = ({ type, status }) => {
    let style = '';
    if (type === 'placement') {
        if (status === 'Placed') style = 'bg-green-100 text-green-800 border-green-200';
        if (status === 'Eligible') style = 'bg-blue-100 text-blue-800 border-blue-200';
        if (status === 'Pending') style = 'bg-yellow-100 text-yellow-800 border-yellow-200';
        if (status === 'Not Eligible') style = 'bg-red-100 text-red-800 border-red-200';
    } else if (type === 'verification') {
        if (status === 'Verified') style = 'bg-green-100 text-green-800 border-green-200';
        if (status === 'Pending') style = 'bg-slate-100 text-slate-800 border-slate-200';
        if (status === 'Blocked') style = 'bg-red-100 text-red-800 border-red-200';
    }

    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${style} flex w-max items-center gap-1.5`}>
            {status === 'Verified' && <CheckCircle className="w-3 h-3" />}
            {status === 'Blocked' && <XCircle className="w-3 h-3" />}
            {status === 'Not Eligible' && <AlertCircle className="w-3 h-3" />}
            {status}
        </span>
    );
};

const StudentTable = ({ selectedIds, onSelectAll, onSelectStudent, onViewStudent }) => {
    const allSelected = selectedIds.length === mockStudents.length;

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
                {/* Sticky Header */}
                <thead className="bg-slate-50 text-slate-600 uppercase text-xs font-semibold border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                    <tr>
                        <th className="px-6 py-4 w-12">
                            <input
                                type="checkbox"
                                checked={allSelected}
                                onChange={(e) => onSelectAll(e.target.checked)}
                                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                            />
                        </th>
                        <th className="px-6 py-4">Student</th>
                        <th className="px-6 py-4">Department</th>
                        <th className="px-6 py-4">CGPA</th>
                        <th className="px-6 py-4">Backlogs</th>
                        <th className="px-6 py-4">Placement Status</th>
                        <th className="px-6 py-4">Verification</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {mockStudents.map((student) => {
                        const isSelected = selectedIds.includes(student.id);
                        return (
                            <tr
                                key={student.id}
                                className={`hover:bg-slate-50 transition-colors ${isSelected ? 'bg-blue-50/50' : 'bg-white'}`}
                            >
                                <td className="px-6 py-4">
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => onSelectStudent(student.id)}
                                        className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                                            {student.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-800">{student.name}</p>
                                            <p className="text-xs text-slate-500">{student.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-600 font-medium">{student.dp}</td>
                                <td className="px-6 py-4 text-slate-800 font-semibold">{student.cgpa}</td>
                                <td className="px-6 py-4 text-slate-600">
                                    {student.backlogs === 0 ? (
                                        <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs border border-green-100">0</span>
                                    ) : (
                                        <span className="text-red-600 bg-red-50 px-2 py-0.5 rounded text-xs border border-red-100">{student.backlogs}</span>
                                    )}
                                </td>
                                <td className="px-6 py-4"><StatusBadge type="placement" status={student.pStatus} /></td>
                                <td className="px-6 py-4"><StatusBadge type="verification" status={student.vStatus} /></td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-3 text-slate-400">
                                        <button
                                            className="hover:text-blue-600 transition-colors p-1"
                                            title="View Student"
                                            onClick={() => onViewStudent(student.id)}
                                        >
                                            <Eye className="w-5 h-5" />
                                        </button>
                                        <button className="hover:text-slate-800 transition-colors p-1" title="More Actions">
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default StudentTable;
