import React, { useState } from "react";
import { Change } from "@/types";

interface AppliedChangeItemProps {
	change: Change;
}

export default function AppliedChangeItem({ change }: AppliedChangeItemProps) {
	const [expanded, setExpanded] = useState(false);

	// Get icon and color based on change type
	const getTypeStyles = () => {
		if (change.id.startsWith("auto")) {
			return {
				label: "Auto-fixed",
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
			};
		}
	};

	const typeStyles = getTypeStyles();

	return (
		<div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden mb-4">
			<div className="p-5">
				<div className="flex items-start justify-between">
					<div className="flex items-start space-x-3">
						{/* Type icon */}
						<div className="mt-0.5">{typeStyles.icon}</div>

						<div>
							<div className="flex items-center">
								<h3 className="text-lg font-medium text-white">{change.title}</h3>
								<span className="ml-2 text-xs text-gray-400">• Applied {change.mergeTime}</span>
							</div>

							<div className="mt-1 flex items-center text-sm text-gray-400">
								{change.path && (
									<span className="text-xs font-mono bg-gray-700 px-2 py-0.5 rounded mr-2">{change.path}</span>
								)}
								<span className="text-xs px-2 py-0.5 rounded bg-gray-700">{change.testBranch}</span>
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

				{expanded && (
					<div className="mt-4 space-y-4 pt-4 border-t border-gray-700">
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

						{/* Workflow timeline */}
						<div>
							<h4 className="text-sm font-medium text-white mb-3">Change Timeline</h4>
							<div className="relative pb-8">
								<div className="absolute top-0 bottom-0 left-3 bg-gray-700 w-0.5"></div>

								<div className="relative flex items-center mb-4">
									<div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center z-10">
										<svg
											className="h-3 w-3 text-white"
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
									<div className="ml-4">
										<p className="text-sm font-medium text-white">Committed to test branch</p>
										<p className="text-xs text-gray-400">{change.commitTime}</p>
									</div>
								</div>

								<div className="relative flex items-center mb-4">
									<div className="h-6 w-6 rounded-full bg-yellow-500 flex items-center justify-center z-10">
										<svg
											className="h-3 w-3 text-white"
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
									</div>
									<div className="ml-4">
										<p className="text-sm font-medium text-white">Testing started</p>
										<p className="text-xs text-gray-400">{change.testStartTime}</p>
									</div>
								</div>

								<div className="relative flex items-center mb-4">
									<div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center z-10">
										<svg
											className="h-3 w-3 text-white"
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
									<div className="ml-4">
										<p className="text-sm font-medium text-white">Tests passed</p>
										<p className="text-xs text-gray-400">{change.testEndTime}</p>
									</div>
								</div>

								<div className="relative flex items-center">
									<div className="h-6 w-6 rounded-full bg-purple-500 flex items-center justify-center z-10">
										<svg
											className="h-3 w-3 text-white"
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
									<div className="ml-4">
										<p className="text-sm font-medium text-white">Merged to main branch</p>
										<p className="text-xs text-gray-400">{change.mergeTime}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
