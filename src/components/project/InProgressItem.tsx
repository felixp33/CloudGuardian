// src/components/project/InProgressItem.tsx
import React, { useState } from "react";
import { Change } from "@/types";

// Extended Change type with workflow properties
export interface WorkflowChange extends Change {
	workflowStatus: string;
	testBranch?: string;
	statusStartTime?: string;
}

export default function InProgressItem({ change }: { change: WorkflowChange }) {
	const [expanded, setExpanded] = useState(false);

	// Get current progress status to display the workflow steps
	const getWorkflowStage = () => {
		switch (change.workflowStatus) {
			case "committed":
				return 1; // Committed to test branch
			case "testing":
				return 2; // Testing in progress
			case "tested":
				return 3; // Tests passed
			case "merging":
				return 4; // Merging in progress
			default:
				return 0;
		}
	};

	// Get icon and color based on change type
	const getTypeStyles = () => {
		if (change.id.startsWith("auto")) {
			return {
				label: "Auto-Fix",
				icon: (
					<svg
						className="h-5 w-5 text-green-400"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
						/>
					</svg>
				),
				color: "border-green-800",
			};
		} else if (change.id.startsWith("sec")) {
			return {
				label: "Security Fix",
				icon: (
					<svg
						className="h-5 w-5 text-red-400"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
						/>
					</svg>
				),
				color: "border-red-800",
			};
		} else {
			return {
				label: "Improvement",
				icon: (
					<svg
						className="h-5 w-5 text-blue-400"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
					</svg>
				),
				color: "border-blue-800",
			};
		}
	};

	const typeStyles = getTypeStyles();
	const workflowStage = getWorkflowStage();

	return (
		<div
			className={`bg-gray-800 border border-gray-700 rounded-lg overflow-hidden mb-4 border-l-4 ${typeStyles.color}`}
		>
			<div className="p-5">
				{/* Header section with title and toggle */}
				<div className="flex items-start justify-between">
					<div className="flex items-start space-x-3">
						<div className="mt-0.5">{typeStyles.icon}</div>

						<div>
							<h3 className="text-lg font-medium text-white">{change.title}</h3>
							<div className="mt-1 flex items-center space-x-2 text-sm text-gray-400">
								{change.path && (
									<span className="text-xs font-mono bg-gray-700 px-2 py-0.5 rounded">{change.path}</span>
								)}
								<span>Branch: {change.testBranch || `fix/${change.id.toLowerCase()}`}</span>
								<span>Started: {change.timestamp}</span>
							</div>
						</div>
					</div>

					<button onClick={() => setExpanded(!expanded)} className="text-gray-400 hover:text-white">
						<svg
							className={`h-5 w-5 transition-transform ${expanded ? "transform rotate-180" : ""}`}
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
				</div>

				{/* Workflow status indicator */}
				<div className="mt-4">
					<div className="relative">
						<div className="absolute inset-0 flex items-center" aria-hidden="true">
							<div className="w-full border-t border-gray-700"></div>
						</div>
						<div className="relative flex justify-between">
							{/* Step 1: Committed */}
							<div className="flex flex-col items-center">
								<div
									className={`h-8 w-8 rounded-full flex items-center justify-center ${
										workflowStage >= 1 ? "bg-blue-600" : "bg-gray-700"
									}`}
								>
									<svg
										className={`h-5 w-5 ${workflowStage >= 1 ? "text-white" : "text-gray-500"}`}
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
								</div>
								<span className="mt-2 text-xs text-gray-400">Committed</span>
							</div>

							{/* Step 2: Testing */}
							<div className="flex flex-col items-center">
								<div
									className={`h-8 w-8 rounded-full flex items-center justify-center ${
										workflowStage >= 2 ? "bg-yellow-500" : "bg-gray-700"
									}`}
								>
									{workflowStage === 2 ? (
										<svg
											className="h-5 w-5 text-white animate-spin"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"
											></circle>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											></path>
										</svg>
									) : (
										<svg
											className={`h-5 w-5 ${workflowStage >= 2 ? "text-white" : "text-gray-500"}`}
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
												clipRule="evenodd"
											/>
										</svg>
									)}
								</div>
								<span className="mt-2 text-xs text-gray-400">Testing</span>
							</div>

							{/* Step 3: Tests Passed */}
							<div className="flex flex-col items-center">
								<div
									className={`h-8 w-8 rounded-full flex items-center justify-center ${
										workflowStage >= 3 ? "bg-green-500" : "bg-gray-700"
									}`}
								>
									<svg
										className={`h-5 w-5 ${workflowStage >= 3 ? "text-white" : "text-gray-500"}`}
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
								</div>
								<span className="mt-2 text-xs text-gray-400">Tests Passed</span>
							</div>

							{/* Step 4: Merging */}
							<div className="flex flex-col items-center">
								<div
									className={`h-8 w-8 rounded-full flex items-center justify-center ${
										workflowStage >= 4 ? "bg-purple-500" : "bg-gray-700"
									}`}
								>
									{workflowStage === 4 ? (
										<svg
											className="h-5 w-5 text-white animate-spin"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"
											></circle>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											></path>
										</svg>
									) : (
										<svg
											className={`h-5 w-5 ${workflowStage >= 4 ? "text-white" : "text-gray-500"}`}
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
												clipRule="evenodd"
											/>
										</svg>
									)}
								</div>
								<span className="mt-2 text-xs text-gray-400">Merging</span>
							</div>
						</div>
					</div>
				</div>

				{/* Expanded details */}
				{expanded && (
					<div className="mt-4 pt-4 border-t border-gray-700 space-y-4">
						<p className="text-gray-300">{change.description}</p>

						{change.details && (
							<div>
								<h4 className="text-sm font-medium text-white mb-2">Details</h4>
								<div className="text-sm text-gray-300">{change.details}</div>
							</div>
						)}

						{change.code && (
							<div>
								<h4 className="text-sm font-medium text-white mb-2">Code Changes</h4>
								<pre className="bg-gray-900 p-3 rounded-md text-xs text-gray-300 overflow-x-auto">
									<code>{change.code}</code>
								</pre>
							</div>
						)}

						{change.workflowStatus !== "merging" && (
							<div className="flex justify-end">
								<button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
									{workflowStage === 1
										? "Start Tests"
										: workflowStage === 2
										? "Cancel Testing"
										: workflowStage === 3
										? "Merge to Main"
										: "View Details"}
								</button>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
