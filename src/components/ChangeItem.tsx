import React, { useState } from "react";
import { Change } from "@/types";
import { ShieldIcon, AlertCircleIcon, SparklesIcon, ChevronDownIcon, ChevronUpIcon, ExternalLinkIcon } from "./Icons";
import SimpleCodeBlock from "./CodeBlock";

type ChangeItemProps = {
	change: Change;
	type: "automatic" | "security" | "improvement";
};

export default function ChangeItem({ change, type }: ChangeItemProps) {
	const [expanded, setExpanded] = useState(false);

	// Determine icon and colors based on type
	const getTypeStyles = () => {
		switch (type) {
			case "automatic":
				return {
					icon: <ShieldIcon className="h-5 w-5 text-green-500" />,
					badge: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
					badgeText: "Auto-fixed",
					border: "border-green-100 dark:border-green-900",
				};
			case "security":
				return {
					icon: <AlertCircleIcon className="h-5 w-5 text-red-500" />,
					badge: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
					badgeText: "Security Risk",
					border: "border-red-100 dark:border-red-900",
				};
			case "improvement":
				return {
					icon: <SparklesIcon className="h-5 w-5 text-blue-500" />,
					badge: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
					badgeText: "Improvement",
					border: "border-blue-100 dark:border-blue-900",
				};
			default:
				return {
					icon: <SparklesIcon className="h-5 w-5 text-gray-500" />,
					badge: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
					badgeText: "Change",
					border: "border-gray-100 dark:border-gray-900",
				};
		}
	};

	const styles = getTypeStyles();

	return (
		<div className={`bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden border-l-4 ${styles.border}`}>
			<div className="p-6">
				<div className="flex justify-between items-start">
					<div className="flex items-center space-x-3">
						{styles.icon}
						<span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${styles.badge}`}>
							{styles.badgeText}
						</span>
						{change.severity && (
							<span
								className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
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
						{change.path && (
							<span className="text-xs font-mono bg-gray-100 dark:bg-gray-750 px-2 py-0.5 rounded text-gray-800 dark:text-gray-200">
								{change.path}
							</span>
						)}
					</div>

					<button
						onClick={() => setExpanded(!expanded)}
						className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
					>
						{expanded ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
					</button>
				</div>

				<h3 className="mt-3 text-lg font-semibold text-gray-900 dark:text-white">{change.title}</h3>

				<p className="mt-2 text-gray-600 dark:text-gray-300">{change.description}</p>

				{expanded && (
					<div className="mt-4 space-y-4">
						{change.details && (
							<div>
								<h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Details</h4>
								<div className="text-sm text-gray-600 dark:text-gray-300">{change.details}</div>
							</div>
						)}

						{change.code && (
							<div>
								<h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Code Changes</h4>
								{/* Use SimpleCodeBlock instead of the original pre tag */}
								<SimpleCodeBlock
									code={change.code}
									title={change.path ? `Changes in ${change.path}` : undefined}
								/>
							</div>
						)}

						{change.links && change.links.length > 0 && (
							<div>
								<h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Related Resources</h4>
								<ul className="text-sm space-y-1">
									{change.links.map((link, idx) => (
										<li key={idx}>
											<a
												href={link.url}
												target="_blank"
												rel="noopener noreferrer"
												className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
											>
												<ExternalLinkIcon className="h-4 w-4 mr-1" />
												{link.title}
											</a>
										</li>
									))}
								</ul>
							</div>
						)}

						{type === "security" && (
							<div className="flex justify-end">
								<button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
									Apply Fix
								</button>
							</div>
						)}

						{type === "improvement" && (
							<div className="flex justify-end">
								<button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3">
									Dismiss
								</button>
								<button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
									Review Suggestion
								</button>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
