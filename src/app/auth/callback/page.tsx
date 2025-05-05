"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import RepoSelector from "@/conponents/auth/RepoSelector";

export default function GitHubCallback() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		// In a real app, we would exchange the code for an access token
		const code = searchParams?.get("code");

		if (!code) {
			setError("No authorization code received from GitHub");
			setLoading(false);
			return;
		}

		// Simulate API call to exchange code for token
		setTimeout(() => {
			console.log("Exchanged code for token");
			setLoading(false);
			// In a real app, we would store the token and redirect
		}, 1000);
	}, [searchParams]);

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
				<h2 className="text-center text-xl font-medium text-gray-900 dark:text-white">
					Authenticating with GitHub...
				</h2>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="text-red-500 text-center mb-4">
					<svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<h2 className="text-xl font-medium mt-2">Authentication Error</h2>
					<p className="mt-1">{error}</p>
				</div>
				<button
					onClick={() => router.push("/login")}
					className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
				>
					Try Again
				</button>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-xl">
				<div className="flex justify-center">
					<div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
						D
					</div>
				</div>
				<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
					Select Repositories
				</h2>
				<p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
					Choose which repositories you want DevGuard to monitor
				</p>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
				<div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<RepoSelector />
				</div>
			</div>
		</div>
	);
}
