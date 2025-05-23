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

// Time period selector component
const TimeFilter = ({ selected, onChange }: { selected: string; onChange: (period: string) => void }) => {
	const options = [
		{ value: "30days", label: "Last 30 Days" },
		{ value: "90days", label: "Last 90 Days" },
		{ value: "6months", label: "Last 6 Months" },
		{ value: "1year", label: "Last Year" },
	];

	return (
		<div className="flex bg-gray-800 rounded-md p-1 text-sm">
			{options.map((option) => (
				<button
					key={option.value}
					className={`px-3 py-1.5 rounded-md ${
						selected === option.value ? "bg-blue-600 text-white" : "text-gray-400 hover:text-gray-200"
					}`}
					onClick={() => onChange(option.value)}
				>
					{option.label}
				</button>
			))}
		</div>
	);
};

// Line chart component (simplified representation using divs)
const SecurityScoreChart = ({ data }: { data: { date: string; score: number }[] }) => {
	// Calculate the maximum score to normalize the heights
	const maxScore = Math.max(...data.map((d) => d.score));

	return (
		<div className="bg-gray-800 rounded-lg p-6">
			<h3 className="text-lg font-medium text-white mb-4">Security Score Trend</h3>
			<div className="flex justify-between items-end h-64 px-2">
				{data.map((point, index) => {
					// Normalize height (max height is 200px)
					const height = (point.score / 100) * 200;

					// Determine color based on score
					let bgColor = "bg-red-500";
					if (point.score >= 80) bgColor = "bg-green-500";
					else if (point.score >= 60) bgColor = "bg-yellow-500";

					return (
						<div key={index} className="flex flex-col items-center flex-1">
							<div className={`${bgColor} w-6 rounded-t-sm`} style={{ height: `${height}px` }}></div>
							<div className="text-xs text-gray-400 mt-2 transform -rotate-45 origin-top-left">{point.date}</div>
						</div>
					);
				})}
			</div>
			<div className="flex justify-between text-xs text-gray-400 mt-8 px-2">
				<div>Low Risk</div>
				<div>Medium Risk</div>
				<div>High Risk</div>
			</div>
		</div>
	);
};

// Auto-Fix Success Rate chart component
const AutoFixSuccessChart = ({ data }: { data: { date: string; successRate: number }[] }) => {
	return (
		<div className="bg-gray-800 rounded-lg p-6">
			<h3 className="text-lg font-medium text-white mb-4">Auto-Fix Success Rate Over Time</h3>
			<div className="flex justify-between items-end h-64 px-2 relative">
				{/* Grid lines for percentage reference */}
				<div className="absolute inset-0 flex flex-col justify-between text-xs text-gray-500 pointer-events-none">
					<div className="border-t border-gray-700 w-full">100%</div>
					<div className="border-t border-gray-700 w-full">75%</div>
					<div className="border-t border-gray-700 w-full">50%</div>
					<div className="border-t border-gray-700 w-full">25%</div>
					<div className="border-t border-gray-700 w-full">0%</div>
				</div>

				{/* Data points and line */}
				{data.map((point, index) => {
					// Normalize height (max height is 200px for 100%)
					const height = (point.successRate / 100) * 200;

					// Determine color based on success rate
					let bgColor = "bg-red-500";
					let dotColor = "bg-red-500";
					if (point.successRate >= 90) {
						bgColor = "bg-green-500";
						dotColor = "bg-green-500";
					} else if (point.successRate >= 75) {
						bgColor = "bg-yellow-500";
						dotColor = "bg-yellow-500";
					}

					return (
						<div key={index} className="flex flex-col items-center flex-1 relative z-10">
							{/* Data point */}
							<div className="relative flex flex-col items-center">
								<div className="text-xs text-white mb-1 font-medium">{point.successRate}%</div>
								<div
									className={`${dotColor} w-3 h-3 rounded-full border-2 border-gray-800`}
									style={{
										position: "absolute",
										bottom: `${height}px`,
									}}
								></div>
							</div>

							{/* Date label */}
							<div className="text-xs text-gray-400 mt-2 transform -rotate-45 origin-top-left">{point.date}</div>
						</div>
					);
				})}
			</div>

			{/* Legend and stats */}
			<div className="flex justify-between items-center text-xs text-gray-400 mt-8 px-2">
				<div className="flex items-center space-x-4">
					<div className="flex items-center">
						<div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
						<span>Excellent (90%+)</span>
					</div>
					<div className="flex items-center">
						<div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
						<span>Good (75-89%)</span>
					</div>
					<div className="flex items-center">
						<div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
						<span>Needs Improvement (&lt;75%)</span>
					</div>
				</div>
				<div className="text-right">
					<div>Current: {data[data.length - 1]?.successRate}%</div>
					<div>Avg: {Math.round(data.reduce((sum, d) => sum + d.successRate, 0) / data.length)}%</div>
				</div>
			</div>
		</div>
	);
};

// Donut chart component for issue distribution (simplified representation)
const IssueDistributionChart = ({ data }: { data: { label: string; count: number; color: string }[] }) => {
	const total = data.reduce((sum, item) => sum + item.count, 0);

	return (
		<div className="bg-gray-800 rounded-lg p-6">
			<h3 className="text-lg font-medium text-white mb-4">Issue Types Distribution</h3>
			<div className="flex">
				{/* Simplified donut chart visualization */}
				<div className="relative w-48 h-48">
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="text-xl font-bold text-white">{total}</div>
						<div className="text-xs text-gray-400">Total Issues</div>
					</div>
					<svg viewBox="0 0 100 100" className="w-full h-full">
						{data.map((item, index) => {
							// For a real implementation, calculate actual SVG arc paths
							// This is a simplified visual representation
							const radius = 40;
							const startAngle = index * (360 / data.length);
							const endAngle = (index + 1) * (360 / data.length);

							return (
								<circle
									key={index}
									cx="50"
									cy="50"
									r={radius / (index + 1)}
									fill="transparent"
									stroke={item.color}
									strokeWidth="20"
									strokeDasharray={`${(item.count / total) * 251.2} 251.2`}
									transform="rotate(-90 50 50)"
								/>
							);
						})}
					</svg>
				</div>

				{/* Legend */}
				<div className="ml-8 flex flex-col justify-center space-y-4">
					{data.map((item, index) => (
						<div key={index} className="flex items-center">
							<div className="w-4 h-4 rounded-sm mr-2" style={{ backgroundColor: item.color }}></div>
							<div className="text-gray-300">
								{item.label}: <span className="font-bold">{item.count}</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

// Bar chart component for MTTR (simplified representation)
const MTTRChart = ({ data }: { data: { label: string; days: number; color: string }[] }) => {
	const maxDays = Math.max(...data.map((d) => d.days));

	return (
		<div className="bg-gray-800 rounded-lg p-6">
			<h3 className="text-lg font-medium text-white mb-4">Mean Time to Remediate (MTTR)</h3>
			<div className="space-y-4">
				{data.map((item, index) => {
					// Normalize width (max width is 100%)
					const width = (item.days / maxDays) * 100;

					return (
						<div key={index} className="space-y-1">
							<div className="flex justify-between text-sm">
								<div className="text-gray-300">{item.label}</div>
								<div className="text-gray-400">{item.days} days</div>
							</div>
							<div className="w-full bg-gray-700 rounded-full h-2.5">
								<div
									className="h-2.5 rounded-full"
									style={{
										width: `${width}%`,
										backgroundColor: item.color,
									}}
								></div>
							</div>
						</div>
					);
				})}
			</div>
			<div className="text-xs text-gray-400 mt-4">Industry average: 5.2 days</div>
		</div>
	);
};

export default function StatisticsPage() {
	const params = useParams();
	const projectId = params?.id as string;
	const [timePeriod, setTimePeriod] = useState("30days");

	// Find the current project from mock data
	const project = MockProjects.find((p) => p.id === projectId);

	// Mock data for security score trend
	const [securityScoreData, setSecurityScoreData] = useState([
		{ date: "Jan 2", score: 65 },
		{ date: "Jan 9", score: 68 },
		{ date: "Jan 16", score: 62 },
		{ date: "Jan 23", score: 72 },
		{ date: "Jan 30", score: 76 },
		{ date: "Feb 6", score: 80 },
		{ date: "Feb 13", score: 85 },
		{ date: "Feb 20", score: 82 },
		{ date: "Feb 27", score: 78 },
		{ date: "Mar 6", score: 85 },
		{ date: "Mar 13", score: 87 },
		{ date: "Mar 20", score: 90 },
	]);

	// Mock data for auto-fix success rate
	const [autoFixSuccessData, setAutoFixSuccessData] = useState([
		{ date: "Jan 2", successRate: 82 },
		{ date: "Jan 9", successRate: 85 },
		{ date: "Jan 16", successRate: 79 },
		{ date: "Jan 23", successRate: 88 },
		{ date: "Jan 30", successRate: 91 },
		{ date: "Feb 6", successRate: 89 },
		{ date: "Feb 13", successRate: 93 },
		{ date: "Feb 20", successRate: 95 },
		{ date: "Feb 27", successRate: 92 },
		{ date: "Mar 6", successRate: 94 },
		{ date: "Mar 13", successRate: 96 },
		{ date: "Mar 20", successRate: 97 },
	]);

	// Mock data for issue distribution
	const [issueDistributionData, setIssueDistributionData] = useState([
		{ label: "Critical Security", count: 1, color: "#ef4444" }, // red-500
		{ label: "Medium Security", count: 2, color: "#f59e0b" }, // amber-500
		{ label: "Auto-fixed", count: 3, color: "#10b981" }, // emerald-500
		{ label: "Improvements", count: 4, color: "#3b82f6" }, // blue-500
	]);

	// Mock data for MTTR
	const [mttrData, setMttrData] = useState([
		{ label: "Critical Security Issues", days: 1.2, color: "#ef4444" }, // red-500
		{ label: "Medium Security Issues", days: 3.5, color: "#f59e0b" }, // amber-500
		{ label: "Low Security Issues", days: 5.8, color: "#10b981" }, // emerald-500
		{ label: "Improvement Suggestions", days: 7.2, color: "#3b82f6" }, // blue-500
	]);

	// Calculate stats from project data
	const [stats, setStats] = useState({
		securityScore: 85,
		resolvedIssues: 0,
		openIssues: 0,
		avgResolutionTime: "0",
	});

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
				resolvedIssues: resolvedIssues,
				openIssues: totalIssues,
				avgResolutionTime: `${(Math.random() * 3 + 1).toFixed(1)}`,
			});
		}
	}, [project]);

	if (!project) {
		return <div className="p-4 text-white">Project not found</div>;
	}

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold text-white">Project Statistics</h2>
				<TimeFilter selected={timePeriod} onChange={setTimePeriod} />
			</div>

			{/* Summary stats cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
				<StatCard
					title="Current Security Score"
					value={`${stats.securityScore}/100`}
					className={`${
						stats.securityScore >= 80
							? "border-l-4 border-green-500"
							: stats.securityScore >= 60
							? "border-l-4 border-yellow-500"
							: "border-l-4 border-red-500"
					}`}
				/>
				<StatCard title="Open Issues" value={stats.openIssues} description="Requiring attention" />
				<StatCard title="Resolved Issues" value={stats.resolvedIssues} description="Last 30 days" />
				<StatCard
					title="Avg. Resolution Time"
					value={`${stats.avgResolutionTime} days`}
					description="From detection to merge"
				/>
			</div>

			{/* Charts */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
				<SecurityScoreChart data={securityScoreData} />
				<AutoFixSuccessChart data={autoFixSuccessData} />
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
				<IssueDistributionChart data={issueDistributionData} />
				<MTTRChart data={mttrData} />
			</div>

			{/* Optional additional stats section */}
			<div className="bg-gray-800 rounded-lg p-6 mb-6">
				<h3 className="text-lg font-medium text-white mb-4">Security Insights</h3>
				<div className="space-y-4">
					<div className="flex items-center text-gray-300">
						<svg
							className="h-5 w-5 text-green-500 mr-2"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
						</svg>
						<span>Auto-fix success rate has improved to 97% (up from 82% last month)</span>
					</div>
					<div className="flex items-center text-gray-300">
						<svg
							className="h-5 w-5 text-green-500 mr-2"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
						</svg>
						<span>Security score has improved by 12 points in the last 30 days</span>
					</div>
					<div className="flex items-center text-gray-300">
						<svg
							className="h-5 w-5 text-red-500 mr-2"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
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
						<span>1 critical security issue needs immediate attention</span>
					</div>
					<div className="flex items-center text-gray-300">
						<svg
							className="h-5 w-5 text-blue-500 mr-2"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
							/>
						</svg>
						<span>Resolution time has decreased by 22% compared to previous period</span>
					</div>
				</div>
			</div>
		</div>
	);
}
