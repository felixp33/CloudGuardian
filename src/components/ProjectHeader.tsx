import React from "react";
import { Project } from "@/types";
import { GitHubIcon, BranchIcon, CommitIcon } from "./Icons";

type ProjectHeaderProps = {
	project: Project;
};

export default function ProjectHeader({ project }: ProjectHeaderProps) {
	const totalIssues =
		project.automaticChanges.length + project.securityRecommendations.length + project.improvementSuggestions.length;

	return (
		<div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
			<div className="flex flex-col md:flex-row md:items-center justify-between">
				<div className="flex items-center mb-4 md:mb-0">
					<div className="h-16 w-16 rounded flex items-center justify-center bg-gray-100 dark:bg-gray-700 mr-4">
						{project.icon || <GitHubIcon className="h-10 w-10" />}
					</div>
					<div>
						<h1 className="text-2xl font-bold text-gray-900 dark:text-white">{project.name}</h1>
						<div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
							<a
								href={project.repoUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center hover:text-gray-700 dark:hover:text-gray-300"
							>
								<GitHubIcon className="h-4 w-4 mr-1" />
								<span>{project.owner}/</span>
								<span className="font-medium">{project.name}</span>
							</a>
						</div>
					</div>
				</div>

				<div className="flex space-x-4">
					<a
						href={project.repoUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						View on GitHub
					</a>

					<button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
						Apply All Fixes
					</button>
				</div>
			</div>

			<div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="bg-gray-50 dark:bg-gray-750 rounded-lg p-4">
					<div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Repository Stats</div>
					<div className="flex space-x-6">
						<div className="flex items-center">
							<BranchIcon className="h-5 w-5 text-gray-400 mr-1" />
							<span className="text-sm font-medium">{project.branchCount || 3} branches</span>
						</div>
						<div className="flex items-center">
							<CommitIcon className="h-5 w-5 text-gray-400 mr-1" />
							<span className="text-sm font-medium">{project.commitCount || 127} commits</span>
						</div>
					</div>
				</div>

				<div className="bg-gray-50 dark:bg-gray-750 rounded-lg p-4">
					<div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Last Activity</div>
					<div className="text-sm font-medium">{project.lastActivity || "New web build 3d ago"}</div>
					<div className="text-xs text-gray-500 mt-1">{project.lastUpdated}</div>
				</div>

				<div className="bg-gray-50 dark:bg-gray-750 rounded-lg p-4">
					<div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Issues Overview</div>
					<div className="flex space-x-6">
						<div className="flex flex-col">
							<span className="text-lg font-semibold text-red-600 dark:text-red-400">
								{project.securityRecommendations.length}
							</span>
							<span className="text-xs text-gray-500">Security</span>
						</div>
						<div className="flex flex-col">
							<span className="text-lg font-semibold text-green-600 dark:text-green-400">
								{project.automaticChanges.length}
							</span>
							<span className="text-xs text-gray-500">Auto-fixed</span>
						</div>
						<div className="flex flex-col">
							<span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
								{project.improvementSuggestions.length}
							</span>
							<span className="text-xs text-gray-500">Improvements</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
