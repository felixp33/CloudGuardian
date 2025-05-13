"use client";

import GitHubLogin from "@/components/auth/GitHubLogin";
import React from "react";

export default function LoginPage() {
	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<div className="flex justify-center">
					<div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
						D
					</div>
				</div>
				<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
					Sign in to DevGuard
				</h2>
				<p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
					Monitor your GitHub repositories for security vulnerabilities and improvements
				</p>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<div className="space-y-6">
						<GitHubLogin />

						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
									Or continue with
								</span>
							</div>
						</div>

						<div>
							<button
								type="button"
								className="w-full flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
							>
								Demo Account
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
