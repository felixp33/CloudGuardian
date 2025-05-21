// src/app/project/[id]/in-progress/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Change } from "@/types";
import { MockProjects } from "@/lib/mock-data";
import { useParams, useRouter } from "next/navigation";
import InProgressItem, { WorkflowChange } from "@/components/project/InProgressItem";

export default function InProgressPage() {
	const params = useParams();
	const router = useRouter();
	const projectId = params?.id as string;

	// Find the current project
	const project = MockProjects.find((p) => p.id === projectId);

	// State for in-progress changes
	const [inProgressChanges, setInProgressChanges] = useState<WorkflowChange[]>([]);

	useEffect(() => {
		if (project) {
			// In a real app, this would fetch real in-progress changes
			// For demo, create some mock in-progress changes based on project data

			// Generate test branch names
			const generateTestBranch = (id: string) => {
				return `fix/${id.toLowerCase()}-${Math.floor(Math.random() * 1000)}`;
			};

			// Create mock in-progress changes
			const mockChanges: WorkflowChange[] = [
				// Simulate a security fix in testing
				...(project.securityRecommendations.length > 0
					? [
							{
								...project.securityRecommendations[0],
								workflowStatus: "testing",
								testBranch: generateTestBranch(project.securityRecommendations[0].id),
								statusStartTime: new Date().toISOString(),
							},
					  ]
					: []),

				// Simulate an improvement that has passed tests
				...(project.improvementSuggestions.length > 0
					? [
							{
								...project.improvementSuggestions[0],
								workflowStatus: "tested",
								testBranch: generateTestBranch(project.improvementSuggestions[0].id),
								statusStartTime: new Date().toISOString(),
							},
					  ]
					: []),

				// Simulate an auto-fix being committed
				...(project.automaticChanges.length > 0
					? [
							{
								...project.automaticChanges[0],
								workflowStatus: "committed",
								testBranch: generateTestBranch(project.automaticChanges[0].id),
								statusStartTime: new Date().toISOString(),
							},
					  ]
					: []),
			];

			setInProgressChanges(mockChanges);
		}
	}, [project]);

	if (!project) {
		return <div className="p-4 text-white">Project not found</div>;
	}

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold text-white">In Progress Changes</h2>

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
						onClick={() => router.push(`/project/${projectId}`)}
						className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
					>
						View News &amp; Alerts
					</button>
				</div>
			</div>

			{inProgressChanges.length > 0 ? (
				<div className="space-y-4">
					{inProgressChanges.map((change) => (
						<InProgressItem key={change.id} change={change} />
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
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<h3 className="mt-2 text-lg font-medium text-white">No changes in progress</h3>
					<p className="mt-1 text-sm text-gray-400">
						There are currently no changes being applied to this project.
					</p>
					<button
						onClick={() => router.push(`/project/${projectId}`)}
						className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
					>
						View News &amp; Alerts
					</button>
				</div>
			)}
		</div>
	);
}
