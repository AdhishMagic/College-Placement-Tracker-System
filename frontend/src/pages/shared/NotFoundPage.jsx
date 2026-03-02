import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
            <div className="max-w-max w-full text-center">
                <main className="sm:flex justify-center items-center h-full">
                    <p className="text-4xl font-extrabold text-blue-600 sm:text-5xl lg:text-9xl dark:text-blue-500 opacity-90 drop-shadow-sm">404</p>
                    <div className="sm:ml-6 sm:border-l sm:border-gray-200 dark:sm:border-gray-700 sm:pl-6">
                        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-5xl mt-2 sm:mt-0 text-left">
                            Page not found
                        </h1>
                        <p className="mt-4 text-base text-gray-500 dark:text-gray-400 text-left max-w-sm">
                            The page you are looking for does not exist or has been moved. Check the URL and try again.
                        </p>
                        <div className="mt-6 flex space-x-3 sm:border-transparent sm:pl-0 flex-col sm:flex-row gap-4 sm:gap-0">
                            <button
                                onClick={() => navigate('/')}
                                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 w-full sm:w-auto"
                            >
                                Back to Dashboard
                            </button>
                            <button
                                onClick={() => navigate(-1)}
                                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 w-full sm:w-auto"
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                </main>

                {/* Placeholder for an Illustration */}
                <div className="mt-16 w-full flex justify-center opacity-60">
                    <svg className="w-64 h-64 text-gray-300 dark:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
