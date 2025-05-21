"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { MockProjects } from "@/lib/mock-data";

// Simple stat card component
const StatCard = ({
	title,
	value,
	description,
	className,
}: {
	title: string;
	value: string | number;
	description?: string;
	className?: string;
}) => {
	return (
		<div className={`bg-gray-800 rounded-lg p-6 ${className || ""}`}>
			<h3 className="text-lg font-medium text-gray-300">{title}</h3>
			<div className="mt-2 flex items-baseline">
				<p className="text-3xl font-semibold text-white">{value}</p>
			</div>
			{description && <p className="mt-1 text-sm text-gray-400">{description}</p>}
		</div>
	);
};

// Issue resolution timeline component
const ResolutionTimeline = ({ changes }: { changes: any[] }) => {
	return (
		<div className="bg-gray-800 rounded-lg p-6">
			<h3 className="text-lg font-medium text-white mb-4">Recent Resolutions</h3>
			<div className="relative">
				<div className="absolute top-0 left-3 bottom-0 w-0.5 bg-gray-700"></div>
				<div className="space-y-8">
					{changes.map((change, index) => (
						<div key={index} className="relative pl-8">
							<div className="absolute left-0 top-1">
								<div
									className={`h-6 w-6 rounded-full flex items-center justify-center ${
										change.type === "security"
											? "bg-red-500"
											: change.type === "auto"
											? "bg-green-500"
											: "bg-blue-500"
									}`}
								>
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
							</div>
							<div>
								<h4 className="text-md font-medium text-white">{change.title}</h4>
								<p className="mt-1 text-sm text-gray-400">
									{change.type === "security"
										? "Security issue resolved"
										: change.type === "auto"
										? "Automatically fixed"
										: "Improvement applied"}
								</p>
								<p className="mt-1 text-xs text-gray-500">
									{change.timeAgo} • {change.resolution}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default function StatisticsPage() {
	const params = useParams();
	const projectId = params?.id as string;

	// Find the current project
	const project = MockProjects.find((p) => p.id === projectId);

	// Mock data for statistics
	const [stats, setStats] = useState({
		securityScore: 85,
		issuesResolved: 0,
		avgResolutionTime: "2.5 days",
		openIssues: 0,
		criticalIssues: 0,
	});

	// Mock data for recent resolutions
	const [recentResolutions, setRecentResolutions] = useState<any[]>([]);

	useEffect(() => {
		if (project) {
			// Calculate stats from project data
			const totalIssues =
				project.automaticChanges.length +
				project.securityRecommendations.length +
				project.improvementSuggestions.length;

			const resolvedIssues = Math.floor(Math.random() * 15) + 5; // Random number between 5-20

			setStats({
				securityScore: 100 - project.securityRecommendations.length * 7, // Lower score based on security issues
				issuesResolved: resolvedIssues,
				avgResolutionTime: `${(Math.random() * 3 + 1).toFixed(1)} days`,
				openIssues: totalIssues,
				criticalIssues: project.securityRecommendations.filter((i) => i.severity === "High").length,
			});

			// Generate mock resolution history
			const mockResolutions = [
				{
					title: "Updated vulnerable dependencies",
					type: "auto",
					timeAgo: "3 days ago",
					resolution: "Auto-fixed and merged",
				},
				{
					title: "Fixed SQL injection vulnerability",
					type: "security",
					timeAgo: "1 week ago",
					resolution: "Manually verified and merged",
				},
				{
					title: "Implemented data caching with SWR",
					type: "improvement",
					timeAgo: "2 weeks ago",
					resolution: "Reviewed and applied",
				},
				{
					title: "Fixed Cross-Site Scripting vulnerability",
					type: "security",
					timeAgo: "3 weeks ago",
					resolution: "Automatically fixed and verified",
				},
				{
					title: "Added rate limiting to API endpoints",
					type: "improvement",
					timeAgo: "1 month ago",
					resolution: "Applied and tested",
				},
			];

			setRecentResolutions(mockResolutions);
		}
	}, [project]);

	if (!project) {
		return <div className="p-4 text-white">Project not found</div>;
	}

	return (
		<div>
			<h2 className="text-2xl font-bold text-white mb-6">Project Statistics</h2>

			{/* Security score meter */}
			<div className="bg-gray-800 rounded-lg p-6 mb-6">
				<div className="flex justify-between items-center mb-2">
					<h3 className="text-lg font-medium text-white">Security Score</h3>
					<span
						className={`text-xl font-bold ${
							stats.securityScore >= 80
								? "text-green-500"
								: stats.securityScore >= 60
								? "text-yellow-500"
								: "text-red-500"
						}`}
					>
						{stats.securityScore}/100
					</span>
				</div>
				<div className="w-full bg-gray-700 rounded-full h-4">
					<div
						className={`h-4 rounded-full ${
							stats.securityScore >= 80
								? "bg-green-500"
								: stats.securityScore >= 60
								? "bg-yellow-500"
								: "bg-red-500"
						}`}
						style={{ width: `${stats.securityScore}%` }}
					></div>
				</div>
				<div className="mt-2 text-sm text-gray-400">
					{stats.securityScore >= 80
						? "Good security practices in place"
						: stats.securityScore >= 60
						? "Room for security improvements"
						: "Critical security issues need attention"}
				</div>
			</div>

			{/* Statistics grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
				<StatCard title="Issues Resolved" value={stats.issuesResolved} description="Last 30 days" />
				<StatCard
					title="Avg. Resolution Time"
					value={stats.avgResolutionTime}
					description="From detection to merge"
				/>
				<StatCard
					title="Open Issues"
					value={stats.openIssues}
					description="Requiring attention"
					className={stats.openIssues > 0 ? "border-l-4 border-yellow-500" : ""}
				/>
				<StatCard
					title="Critical Issues"
					value={stats.criticalIssues}
					description="High severity"
					className={stats.criticalIssues > 0 ? "border-l-4 border-red-500" : ""}
				/>
			</div>

			{/* Issue types breakdown */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
				<div className="bg-gray-800 rounded-lg p-6">
					<h3 className="text-lg font-medium text-white mb-4">Issue Types</h3>
					<div className="space-y-4">
						<div>
							<div className="flex justify-between items-center mb-1">
								<div className="flex items-center">
									<div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
									<span className="text-sm text-gray-300">Security Issues</span>
								</div>
								<span className="text-sm font-medium text-gray-300">
									{project.securityRecommendations.length}
								</span>
							</div>
							<div className="w-full bg-gray-700 rounded-full h-2">
								<div
									className="h-2 rounded-full bg-red-500"
									style={{
										width: `${
											(project.securityRecommendations.length * 100) /
												(project.securityRecommendations.length +
													project.automaticChanges.length +
													project.improvementSuggestions.length) || 0
										}%`,
									}}
								></div>
							</div>
						</div>

						<div>
							<div className="flex justify-between items-center mb-1">
								<div className="flex items-center">
									<div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
									<span className="text-sm text-gray-300">Auto-fixed Issues</span>
								</div>
								<span className="text-sm font-medium text-gray-300">{project.automaticChanges.length}</span>
							</div>
							<div className="w-full bg-gray-700 rounded-full h-2">
								<div
									className="h-2 rounded-full bg-green-500"
									style={{
										width: `${
											(project.automaticChanges.length * 100) /
												(project.securityRecommendations.length +
													project.automaticChanges.length +
													project.improvementSuggestions.length) || 0
										}%`,
									}}
								></div>
							</div>
						</div>

						<div>
							<div className="flex justify-between items-center mb-1">
								<div className="flex items-center">
									<div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
									<span className="text-sm text-gray-300">Improvements</span>
								</div>
								<span className="text-sm font-medium text-gray-300">
									{project.improvementSuggestions.length}
								</span>
							</div>
							<div className="w-full bg-gray-700 rounded-full h-2">
								<div
									className="h-2 rounded-full bg-blue-500"
									style={{
										width: `${
											(project.improvementSuggestions.length * 100) /
												(project.securityRecommendations.length +
													project.automaticChanges.length +
													project.improvementSuggestions.length) || 0
										}%`,
									}}
								></div>
							</div>
						</div>
					</div>
				</div>

				{/* Resolution timeline */}
				<ResolutionTimeline changes={recentResolutions} />
			</div>

			{/* Activity timeline */}
			<div className="bg-gray-800 rounded-lg p-6">
				<h3 className="text-lg font-medium text-white mb-4">Recent Activity</h3>
				<div className="border-l-2 border-gray-700 pl-4 ml-3 space-y-6">
					<div className="relative">
						<div className="absolute -left-6 mt-1 h-4 w-4 rounded-full bg-green-500"></div>
						<div>
							<p className="text-white">Updated vulnerable dependencies</p>
							<p className="text-sm text-gray-400">Auto-fixed security vulnerabilities in package.json</p>
							<p className="text-xs text-gray-500 mt-1">2 days ago</p>
						</div>
					</div>

					<div className="relative">
						<div className="absolute -left-6 mt-1 h-4 w-4 rounded-full bg-red-500"></div>
						<div>
							<p className="text-white">Detected authentication vulnerability</p>
							<p className="text-sm text-gray-400">Found broken authentication in admin API</p>
							<p className="text-xs text-gray-500 mt-1">3 days ago</p>
						</div>
					</div>

					<div className="relative">
						<div className="absolute -left-6 mt-1 h-4 w-4 rounded-full bg-blue-500"></div>
						<div>
							<p className="text-white">Applied code improvement</p>
							<p className="text-sm text-gray-400">
								Implemented WebSocket connection pooling for better performance
							</p>
							<p className="text-xs text-gray-500 mt-1">1 week ago</p>
						</div>
					</div>

					<div className="relative">
						<div className="absolute -left-6 mt-1 h-4 w-4 rounded-full bg-purple-500"></div>
						<div>
							<p className="text-white">Added WebRTC support for video calls</p>
							<p className="text-sm text-gray-400">New feature commit to main branch</p>
							<p className="text-xs text-gray-500 mt-1">2 weeks ago</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
