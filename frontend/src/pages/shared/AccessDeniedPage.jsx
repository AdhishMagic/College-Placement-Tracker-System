import React from 'react';
import { useNavigate } from 'react-router-dom';

const AccessDeniedPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl shadow-blue-900/5 dark:shadow-none border border-red-50 dark:border-red-900/20">

                {/* Lock Icon */}
                <div className="flex justify-center">
                    <div className="h-24 w-24 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center shadow-inner">
                        <svg
                            className="h-12 w-12 text-red-500 dark:text-red-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                </div>

                {/* Main Content */}
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white pb-2">
                        Access Denied
                    </h2>
                    <div className="w-16 h-1 bg-red-500 rounded-full mx-auto my-4 opacity-50"></div>

                    <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                        You do not have permission to access this page.
                    </p>

                    {/* Detailed explanation for role mismatch */}
                    <div className="mt-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            This section is restricted to specific roles. Please ensure you are logged into the correct account.
                            If you believe this is an error, contact your administrator.
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-8 flex flex-col space-y-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    >
                        Go Back
                    </button>
                    <button
                        onClick={() => navigate('/login')}
                        className="w-full flex justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccessDeniedPage;
