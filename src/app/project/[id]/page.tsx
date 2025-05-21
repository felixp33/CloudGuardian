// src/app/project/[id]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { MockProjects } from "@/lib/mock-data";
import { Change } from "@/types";
import NewsAlertItem from "@/components/project/NewsAlertItem";

export default function NewsAlertsPage() {
	const router = useRouter();
	const params = useParams();
	const projectId = params?.id as string;

	// Find the current project
	const project = MockProjects.find((p) => p.id === projectId);

	// State for filters
	const [activeFilter, setActiveFilter] = useState<"all" | "security" | "auto" | "improvement">("all");

	// State for alerts
	const [newsItems, setNewsItems] = useState<Change[]>([]);

	useEffect(() => {
		if (project) {
			// Combine all alerts from the project
			const allAlerts: Change[] = [
				...project.securityRecommendations,
				...project.automaticChanges,
				...project.improvementSuggestions,
			];

			setNewsItems(allAlerts);
		}
	}, [project]);

	// Apply filters to news items
	const filteredNewsItems = newsItems.filter((item) => {
		if (activeFilter === "all") return true;
		if (activeFilter === "security" && item.id.startsWith("sec")) return true;
		if (activeFilter === "auto" && item.id.startsWith("auto")) return true;
		if (activeFilter === "improvement" && item.id.startsWith("imp")) return true;
		return false;
	});

	// Handler for starting the workflow process (moving to in-progress)
	const handleStartWorkflow = (changeId: string) => {
		// In a real app, this would move the item to In Progress state in the backend
		// For now, we'll just redirect to the in-progress page
		router.push(`/project/${projectId}/in-progress`);
	};

	// Handler to dismiss an alert
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
					<div className="relative">
						<select
							className="bg-gray-800 border border-gray-700 text-white rounded-md px-4 py-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={activeFilter}
							onChange={(e) => setActiveFilter(e.target.value as any)}
						>
							<option value="all">All Alerts</option>
							<option value="security">Security Issues</option>
							<option value="auto">Auto-fix Issues</option>
							<option value="improvement">Improvements</option>
						</select>
						<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
							<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
							</svg>
						</div>
					</div>

					<button
						onClick={() => {
							// Apply all fixes at once would move all items to in-progress
							router.push(`/project/${projectId}/in-progress`);
						}}
						className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
					>
						Apply All Fixes
					</button>
				</div>
			</div>

			{/* Summary section */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
				<div className="bg-gray-800 rounded-lg p-4">
					<div className="text-sm font-medium text-gray-400 mb-1">Security Issues</div>
					<div className="flex items-baseline">
						<span className="text-2xl font-semibold text-red-500">{project.securityRecommendations.length}</span>
						{project.securityRecommendations.length > 0 && (
							<span className="ml-2 text-xs text-gray-400">
								{project.securityRecommendations.filter((r) => r.severity === "High").length} high priority
							</span>
						)}
					</div>
				</div>

				<div className="bg-gray-800 rounded-lg p-4">
					<div className="text-sm font-medium text-gray-400 mb-1">Auto-fixes</div>
					<div className="flex items-baseline">
						<span className="text-2xl font-semibold text-green-500">{project.automaticChanges.length}</span>
						{project.automaticChanges.length > 0 && (
							<span className="ml-2 text-xs text-gray-400">Ready to apply</span>
						)}
					</div>
				</div>

				<div className="bg-gray-800 rounded-lg p-4">
					<div className="text-sm font-medium text-gray-400 mb-1">Improvements</div>
					<div className="flex items-baseline">
						<span className="text-2xl font-semibold text-blue-500">{project.improvementSuggestions.length}</span>
						{project.improvementSuggestions.length > 0 && (
							<span className="ml-2 text-xs text-gray-400">Performance & code quality</span>
						)}
					</div>
				</div>
			</div>

			{filteredNewsItems.length > 0 ? (
				<div className="space-y-4">
					{filteredNewsItems.map((change) => (
						<NewsAlertItem
							key={change.id}
							change={change}
							onAction={handleStartWorkflow}
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
						{activeFilter === "all"
							? "There are no new alerts or recommendations for this project."
							: `No ${
									activeFilter === "security"
										? "security issues"
										: activeFilter === "auto"
										? "auto-fix issues"
										: "improvements"
							  } found.`}
					</p>
					<button
						onClick={() => setActiveFilter("all")}
						className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
					>
						{activeFilter === "all" ? "View In-Progress Changes" : "Show All Alerts"}
					</button>
				</div>
			)}
		</div>
	);
}
