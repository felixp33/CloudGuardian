import React from "react";
import Link from "next/link";
import { GitHubIcon, AlertCircleIcon, ShieldIcon, SparklesIcon } from "./Icons";
import { Project } from "@/types";

type ProjectCardProps = {
	project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
	const {
		id,
		name,
		url,
		owner,
		repoUrl,
		lastUpdated,
		automaticChanges,
		securityRecommendations,
		improvementSuggestions,
	} = project;

	// Total notifications count
	const totalNotifications = automaticChanges.length + securityRecommendations.length + improvementSuggestions.length;

	// Determine status color based on security recommendations
	const getStatusColor = () => {
		if (securityRecommendations.length > 0) return "text-red-500";
		if (automaticChanges.length > 0) return "text-yellow-500";
		return "text-green-500";
	};

	return (
		<Link href={`/projects/${id}`}>
			<div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow overflow-hidden">
				<div className="p-5">
					<div className="flex items-start justify-between mb-4">
						<div className="flex items-center">
							<div className="h-10 w-10 rounded flex items-center justify-center bg-gray-100 dark:bg-gray-700 mr-3">
								{project.icon || <GitHubIcon className="h-6 w-6" />}
							</div>
							<div>
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
								<div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
									<span>{owner}/</span>
									<span className="font-medium">{name}</span>
								</div>
							</div>
						</div>

						<div className={`text-2xl font-bold ${getStatusColor()}`}>
							{totalNotifications > 0 ? totalNotifications : ""}
						</div>
					</div>

					<div className="flex space-x-3 mb-4">
						{automaticChanges.length > 0 && (
							<div className="flex items-center text-xs font-medium">
								<ShieldIcon className="h-4 w-4 mr-1 text-green-500" />
								<span>{automaticChanges.length}</span>
							</div>
						)}

						{securityRecommendations.length > 0 && (
							<div className="flex items-center text-xs font-medium">
								<AlertCircleIcon className="h-4 w-4 mr-1 text-red-500" />
								<span>{securityRecommendations.length}</span>
							</div>
						)}

						{improvementSuggestions.length > 0 && (
							<div className="flex items-center text-xs font-medium">
								<SparklesIcon className="h-4 w-4 mr-1 text-blue-500" />
								<span>{improvementSuggestions.length}</span>
							</div>
						)}
					</div>

					{totalNotifications > 0 ? (
						<p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
							{securityRecommendations.length > 0
								? securityRecommendations[0].title
								: automaticChanges.length > 0
								? automaticChanges[0].title
								: improvementSuggestions[0].title}
						</p>
					) : (
						<p className="text-sm text-gray-500 dark:text-gray-400">No issues detected</p>
					)}
				</div>

				<div className="bg-gray-50 dark:bg-gray-750 px-5 py-3 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
					Last updated {lastUpdated}
				</div>
			</div>
		</Link>
	);
}
