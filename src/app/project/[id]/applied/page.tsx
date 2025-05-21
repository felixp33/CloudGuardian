// src/app/project/[id]/applied/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { MockProjects } from "@/lib/mock-data";
import AppliedChangeItem, { AppliedChange } from "@/components/project/AppliedChangeItem";

export default function AppliedChangesPage() {
	const params = useParams();
	const projectId = params?.id as string;

	// Find the current project
	const project = MockProjects.find((p) => p.id === projectId);

	// State for applied changes
	const [appliedChanges, setAppliedChanges] = useState<AppliedChange[]>([]);

	useEffect(() => {
		if (project) {
			// Create some mock applied changes
			const mockAppliedChanges: AppliedChange[] = [
				// Mock an auto-fixed change
				{
					...project.automaticChanges[0],
					workflowStatus: "merged",
					testBranch: `fix/${project.automaticChanges[0].id.toLowerCase()}-${Math.floor(Math.random() * 1000)}`,
					commitTime: "09:15",
					testStartTime: "09:17",
					testEndTime: "09:45",
					mergeTime: "10:00",
				},
				// Mock a security fix
				...(project.securityRecommendations.length > 0
					? [
							{
								...project.securityRecommendations[0],
								workflowStatus: "merged",
								testBranch: `fix/${project.securityRecommendations[0].id.toLowerCase()}-${Math.floor(
									Math.random() * 1000
								)}`,
								commitTime: "10:30",
								testStartTime: "10:32",
								testEndTime: "11:00",
								mergeTime: "11:15",
							},
					  ]
					: []),
				// Mock an improvement
				...(project.improvementSuggestions.length > 0
					? [
							{
								...project.improvementSuggestions[0],
								workflowStatus: "merged",
								testBranch: `fix/${project.improvementSuggestions[0].id.toLowerCase()}-${Math.floor(
									Math.random() * 1000
								)}`,
								commitTime: "13:45",
								testStartTime: "13:47",
								testEndTime: "14:15",
								mergeTime: "14:30",
							},
					  ]
					: []),
			];

			setAppliedChanges(mockAppliedChanges);
		}
	}, [project]);

	if (!project) {
		return <div className="p-4 text-white">Project not found</div>;
	}

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold text-white">Applied Changes</h2>

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
				</div>
			</div>

			{appliedChanges.length > 0 ? (
				<div className="space-y-4">
					{appliedChanges.map((change) => (
						<AppliedChangeItem key={change.id} change={change} />
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
							d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
						/>
					</svg>
					<h3 className="mt-2 text-lg font-medium text-white">No applied changes yet</h3>
					<p className="mt-1 text-sm text-gray-400">
						Changes that have been successfully merged will appear here.
					</p>
				</div>
			)}
		</div>
	);
}
