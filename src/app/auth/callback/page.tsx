"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import RepoSelector from "@/components/auth/RepoSelector";

// Separated component that uses useSearchParams
function CallbackContent() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	// Import useSearchParams dynamically inside the component to avoid the error
	useEffect(() => {
		async function handleCallback() {
			try {
				// Mock API call for demo purposes
				setTimeout(() => {
					setLoading(false);
				}, 1000);
			} catch (err) {
				setError("Authentication failed. Please try again.");
				setLoading(false);
			}
		}

		handleCallback();
	}, []);

	if (loading) {
		return <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>;
	}

	if (error) {
		return (
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
				<button
					onClick={() => router.push("/login")}
					className="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
				>
					Try Again
				</button>
			</div>
		);
	}

	return <RepoSelector />;
}

export default function GitHubCallback() {
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
					Choose which repositories you want CloudGuardian to monitor
				</p>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
				<div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<Suspense
						fallback={
							<div className="flex justify-center items-center py-12">
								<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
							</div>
						}
					>
						<CallbackContent />
					</Suspense>
				</div>
			</div>
		</div>
	);
}
