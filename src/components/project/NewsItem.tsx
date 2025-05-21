import React, { useState } from "react";
import { Change } from "@/types";
import WorkflowStatus from "@/components/ui/WorkflowStatus";

interface NewsItemProps {
	change: Change;
	onStatusChange?: (changeId: string, newStatus: string) => void;
	onDismiss?: (changeId: string) => void;
}

export default function NewsItem({ change, onStatusChange, onDismiss }: NewsItemProps) {
	const [expanded, setExpanded] = useState(false);

	// Handle workflow action buttons
	const handleCommit = () => {
		if (onStatusChange) {
			// Create a simulated test branch name
			const testBranch = `fix/${change.id.toLowerCase()}-${Math.floor(Math.random() * 1000)}`;

			// Update with commit details
			onStatusChange(change.id, "committed");
		}
	};

	const handleDismiss = () => {
		if (onDismiss) {
			onDismiss(change.id);
		}
	};

	// Get icon and color based on severity or change type
	const getTypeStyles = () => {
		if (change.id.startsWith("auto")) {
			return {
				icon: (
					<svg
						className="h-5 w-5"
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
				badge: "bg-green-900 text-green-200",
				badgeText: "Auto-Fixed",
				border: "border-green-800",
			};
		} else if (change.id.startsWith("sec")) {
			return {
				icon: (
					<svg
						className="h-5 w-5"
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
				badge: "bg-red-900 text-red-200",
				badgeText: "Security Risk",
				border: "border-red-800",
			};
		} else {
			return {
				icon: (
					<svg
						className="h-5 w-5"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
					</svg>
				),
				badge: "bg-blue-900 text-blue-200",
				badgeText: "Improvement",
				border: "border-blue-800",
			};
		}
	};

	const typeStyles = getTypeStyles();

	return (
		<div
			className={`bg-gray-800 border border-gray-700 rounded-lg overflow-hidden mb-4 border-l-4 ${typeStyles.border}`}
		>
			<div className="p-5">
				<div className="flex items-start justify-between">
					<div className="flex items-start space-x-3">
						{/* Type icon */}
						<div className="text-blue-400 mt-0.5">{typeStyles.icon}</div>

						<div className="flex-1">
							<div className="flex items-center flex-wrap">
								<h3 className="text-lg font-medium text-white mr-2">{change.title}</h3>
								<span className={`px-2 py-0.5 text-xs rounded-full ${typeStyles.badge}`}>
									{typeStyles.badgeText}
								</span>

								{change.severity && (
									<span
										className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
											change.severity === "High"
												? "bg-red-900 text-red-200"
												: change.severity === "Medium"
												? "bg-yellow-900 text-yellow-200"
												: "bg-blue-900 text-blue-200"
										}`}
									>
										{change.severity}
									</span>
								)}
							</div>

							<div className="mt-1 flex items-center text-sm text-gray-400">
								{change.path && (
									<span className="text-xs font-mono bg-gray-700 px-2 py-0.5 rounded mr-2">{change.path}</span>
								)}
								<span>{change.timestamp}</span>
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

				<p className="mt-2 text-gray-300">{change.description}</p>

				{expanded && (
					<div className="mt-4 space-y-4">
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

						{change.links && change.links.length > 0 && (
							<div>
								<h4 className="text-sm font-medium text-white mb-2">Related Resources</h4>
								<ul className="text-sm space-y-1">
									{change.links.map((link, idx) => (
										<li key={idx}>
											<a
												href={link.url}
												target="_blank"
												rel="noopener noreferrer"
												className="text-blue-400 hover:underline flex items-center"
											>
												<svg
													className="h-4 w-4 mr-1"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
													<path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
												</svg>
												{link.title}
											</a>
										</li>
									))}
								</ul>
							</div>
						)}

						{/* Action buttons */}
						<div className="flex justify-end pt-4 border-t border-gray-700">
							<button
								onClick={handleDismiss}
								className="inline-flex items-center px-3 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600 mr-3"
							>
								Dismiss
							</button>

							{change.id.startsWith("auto") ? (
								<button
									onClick={handleCommit}
									className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
								>
									Apply Fix
								</button>
							) : change.id.startsWith("sec") ? (
								<button
									onClick={handleCommit}
									className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
								>
									Fix Security Issue
								</button>
							) : (
								<button
									onClick={handleCommit}
									className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
								>
									Apply Improvement
								</button>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
