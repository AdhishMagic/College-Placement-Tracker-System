import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';

const UserRoles = ({ data }) => {
    const roles = data?.roles || {};

    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            <div>
                <h3 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-4">User Roles & Permissions</h3>
                <p className="text-sm text-gray-500 mb-6">Review permissions granted to various platform roles. (Read-only)</p>
            </div>

            <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-gray-100 p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Admin Role */}
                    <div className="border border-blue-100 rounded-xl overflow-hidden shadow-sm">
                        <div className="bg-blue-50 px-4 py-3 border-b border-blue-100">
                            <h4 className="font-semibold text-blue-900">Administrator</h4>
                            <p className="text-xs text-blue-600 mt-1">Full system access</p>
                        </div>
                        <ul className="p-4 space-y-3">
                            {(roles.admin || []).map((perm, idx) => (
                                <li key={`admin-${idx}`} className="flex items-center text-sm text-gray-700">
                                    <FiCheckCircle className="text-green-500 mr-2 flex-shrink-0" size={16} />
                                    <span>{perm}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Recruiter Role */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                            <h4 className="font-semibold text-gray-900">Recruiter</h4>
                            <p className="text-xs text-gray-500 mt-1">Manage jobs and candidates</p>
                        </div>
                        <ul className="p-4 space-y-3">
                            {(roles.recruiter || []).map((perm, idx) => (
                                <li key={`recruiter-${idx}`} className="flex items-center text-sm text-gray-700">
                                    <FiCheckCircle className="text-green-500 mr-2 flex-shrink-0" size={16} />
                                    <span>{perm}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Student Role */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                            <h4 className="font-semibold text-gray-900">Student</h4>
                            <p className="text-xs text-gray-500 mt-1">Job applications & profile</p>
                        </div>
                        <ul className="p-4 space-y-3">
                            {(roles.student || []).map((perm, idx) => (
                                <li key={`student-${idx}`} className="flex items-center text-sm text-gray-700">
                                    <FiCheckCircle className="text-green-500 mr-2 flex-shrink-0" size={16} />
                                    <span>{perm}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserRoles;
