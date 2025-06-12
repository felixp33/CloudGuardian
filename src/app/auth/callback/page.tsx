"use client";

import RepoSelector from "@/components/auth/RepoSelector";
import React from "react";

export default function GitHubCallback() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-xl">
                <div className="flex justify-center">
                    <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">D</div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">Select Repositories</h2>
                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">Choose which repositories you want CloudGuardian to monitor</p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
                <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <RepoSelector />
                </div>
            </div>
        </div>
    );
}
