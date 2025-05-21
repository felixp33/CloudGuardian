// src/components/ui/WorkflowStatus.tsx
import React from "react";

type WorkflowStatusType = "committed" | "testing" | "tested" | "merging" | "merged";

interface WorkflowStatusProps {
	status: WorkflowStatusType;
	className?: string;
	showLabel?: boolean;
}

export default function WorkflowStatus({ status, className = "", showLabel = true }: WorkflowStatusProps) {
	const getStatusStyles = () => {
		switch (status) {
			case "committed":
				return {
					bg: "bg-blue-600",
					icon: (
						<svg
							className="h-4 w-4 text-white"
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
					),
					label: "Committed",
				};
			case "testing":
				return {
					bg: "bg-yellow-500",
					icon: (
						<svg
							className="h-4 w-4 text-white animate-spin"
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
					),
					label: "Testing",
				};
			case "tested":
				return {
					bg: "bg-green-500",
					icon: (
						<svg
							className="h-4 w-4 text-white"
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
					),
					label: "Tested",
				};
			case "merging":
				return {
					bg: "bg-purple-500",
					icon: (
						<svg
							className="h-4 w-4 text-white animate-spin"
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
					),
					label: "Merging",
				};
			case "merged":
				return {
					bg: "bg-indigo-600",
					icon: (
						<svg
							className="h-4 w-4 text-white"
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
					),
					label: "Merged",
				};
			default:
				return {
					bg: "bg-gray-500",
					icon: (
						<svg
							className="h-4 w-4 text-white"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
								clipRule="evenodd"
							/>
						</svg>
					),
					label: "Unknown",
				};
		}
	};

	const styles = getStatusStyles();

	return (
		<div className={`flex items-center ${className}`}>
			<div className={`h-6 w-6 rounded-full flex items-center justify-center ${styles.bg}`}>{styles.icon}</div>
			{showLabel && <span className="ml-2 text-sm font-medium text-gray-300">{styles.label}</span>}
		</div>
	);
}
