"use client";

import React, { useState, useEffect } from "react";
import { Change } from "@/types";
import { MockProjects } from "@/lib/mock-data";
import NewsItem from "@/components/project/NewsItem";
import { useParams, useRouter } from "next/navigation";

export default function NewsPage() {
	const params = useParams();
	const router = useRouter();
	const projectId = params?.id as string;

	// Find the current project
	const project = MockProjects.find((p) => p.id === projectId);

	// State for news items
	const [newsItems, setNewsItems] = useState<Change[]>([]);

	useEffect(() => {
		if (project) {
			// Combine all changes and set their status to "idle" for news feed
			const allChanges: Change[] = [
				...project.automaticChanges.map((change) => ({
					...change,
					workflowStatus: "idle",
				})),
				...project.securityRecommendations.map((change) => ({
					...change,
					workflowStatus: "idle",
				})),
				...project.improvementSuggestions.map((change) => ({
					...change,
					workflowStatus: "idle",
				})),
			];

			setNewsItems(allChanges);
		}
	}, [project]);

	// Handler to start the workflow process
	const handleStatusChange = (changeId: string, newStatus: string) => {
		// Update the news item with the new status
		setNewsItems((prevItems) =>
			prevItems.map((item) =>
				item.id === changeId
					? {
							...item,
							workflowStatus: newStatus,
							testBranch: `fix/${item.id.toLowerCase()}-${Math.floor(Math.random() * 1000)}`,
							commitTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
					  }
					: item
			)
		);

		// Navigate to the in-progress page after a small delay
		setTimeout(() => {
			router.push(`/project/${projectId}/in-progress`);
		}, 800);
	};

	// Handler to dismiss a news item
	const handleDismiss = (changeId: string) => {
		setNewsItems((prevItems) => prevItems.filter((item) => item.id !== changeId));
	};

	if (!project) {
		return <div className="p-4 text-white">Project not found</div>;
	}

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold text-white">News & Alerts</h2>

				<div className="flex space-x-2">
					<button className="inline-flex items-center px-3 py-2 border border-gray-700 rounded-md text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700">
						<svg
							className="mr-2 h-4 w-4"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
								clipRule="evenodd"
							/>
						</svg>
						Filter
					</button>

					<button
						className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
						onClick={() => newsItems.forEach((item) => handleStatusChange(item.id, "committed"))}
					>
						<svg
							className="mr-2 h-4 w-4"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clipRule="evenodd"
							/>
						</svg>
						Apply All Fixes
					</button>
				</div>
			</div>

			{newsItems.length > 0 ? (
				<div className="space-y-4">
					{newsItems.map((change) => (
						<NewsItem
							key={change.id}
							change={change}
							onStatusChange={handleStatusChange}
							onDismiss={handleDismiss}
						/>
					))}
				</div>
			) : (
				<div className="text-center py-16 bg-gray-800 rounded-lg">
					<svg
						className="mx-auto h-12 w-12 text-gray-400"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
					</svg>
					<h3 className="mt-2 text-lg font-medium text-white">All caught up!</h3>
					<p className="mt-1 text-sm text-gray-400">
						There are no new alerts or recommendations for this project.
					</p>
					<button
						onClick={() => router.push(`/project/${projectId}/in-progress`)}
						className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
					>
						View In-Progress Changes
					</button>
				</div>
			)}
		</div>
	);
}
