// src/components/project/NewsAlertItem.tsx
import React, { useState } from "react";
import { Change } from "@/types";

interface NewsAlertItemProps {
	change: Change;
	onAction: (changeId: string) => void;
	onDismiss: (changeId: string) => void;
}

export default function NewsAlertItem({ change, onAction, onDismiss }: NewsAlertItemProps) {
	const [expanded, setExpanded] = useState(false);

	// Get type information based on change ID
	const getTypeInfo = () => {
		if (change.id.startsWith("auto")) {
			return {
				type: "Auto-Fix",
				icon: (
					<svg
						className="h-5 w-5 text-green-500"
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
				badge: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
				badgeText: "Auto-Fix Available",
				borderColor: "border-green-500",
				actionText: "Apply Fix",
			};
		} else if (change.id.startsWith("sec")) {
			return {
				type: "Security",
				icon: (
					<svg
						className="h-5 w-5 text-red-500"
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
				badge: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
				badgeText: "Security Risk",
				borderColor: "border-red-500",
				actionText: "Fix Security Issue",
			};
		} else {
			return {
				type: "Improvement",
				icon: (
					<svg
						className="h-5 w-5 text-blue-500"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
					</svg>
				),
				badge: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
				badgeText: "Improvement",
				borderColor: "border-blue-500",
				actionText: "Apply Improvement",
			};
		}
	};

	const typeInfo = getTypeInfo();

	return (
		<div
			className={`bg-gray-800 border border-gray-700 rounded-lg overflow-hidden border-l-4 ${typeInfo.borderColor}`}
		>
			<div className="p-5">
				<div className="flex justify-between items-start">
					<div className="flex items-start space-x-3">
						<div className="mt-0.5">{typeInfo.icon}</div>

						<div>
							<div className="flex items-center flex-wrap gap-2">
								<h3 className="text-lg font-medium text-white">{change.title}</h3>
								<span
									className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeInfo.badge}`}
								>
									{typeInfo.badgeText}
								</span>

								{change.severity && (
									<span
										className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
											change.severity === "High"
												? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
												: change.severity === "Medium"
												? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
												: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
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

						<div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
							<button
								onClick={() => onDismiss(change.id)}
								className="px-3 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600"
							>
								Dismiss
							</button>

							<button
								onClick={() => onAction(change.id)}
								className="px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
							>
								{typeInfo.actionText}
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
