"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MockProjects } from "@/lib/mock-data";
import { Project } from "@/types";
import Navbar from "@/components/layout/Navbar";

// Project card component for the homepage
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
	// Count total issues
	const totalIssues =
		project.automaticChanges.length + project.securityRecommendations.length + project.improvementSuggestions.length;

	// Determine status color based on security recommendations
	const getStatusColor = () => {
		if (project.securityRecommendations.length > 0) return "text-red-500";
		if (project.automaticChanges.length > 0) return "text-yellow-500";
		return "text-green-500";
	};

	return (
		<Link href={`/project/${project.id}`} className="block">
			<div className="bg-gray-800 border border-gray-700 rounded-lg hover:shadow-lg transition-shadow overflow-hidden">
				<div className="p-5">
					<div className="flex items-start justify-between mb-4">
						<div className="flex items-center">
							<div className="h-10 w-10 rounded flex items-center justify-center bg-gray-700 mr-3">
								<svg className="h-6 w-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
									<path
										fillRule="evenodd"
										d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
							<div>
								<h3 className="text-lg font-semibold text-white">{project.name}</h3>
								<div className="flex items-center text-sm text-gray-400">
									<span>{project.owner}/</span>
									<span className="font-medium">{project.name}</span>
								</div>
							</div>
						</div>

						<div className={`text-2xl font-bold ${getStatusColor()}`}>{totalIssues > 0 ? totalIssues : ""}</div>
					</div>

					<div className="flex space-x-3 mb-4">
						{project.automaticChanges.length > 0 && (
							<div className="flex items-center text-xs font-medium">
								<svg
									className="h-4 w-4 mr-1 text-green-500"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
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
								<span>{project.automaticChanges.length}</span>
							</div>
						)}

						{project.securityRecommendations.length > 0 && (
							<div className="flex items-center text-xs font-medium">
								<svg
									className="h-4 w-4 mr-1 text-red-500"
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
								<span>{project.securityRecommendations.length}</span>
							</div>
						)}

						{project.improvementSuggestions.length > 0 && (
							<div className="flex items-center text-xs font-medium">
								<svg
									className="h-4 w-4 mr-1 text-blue-500"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M13 10V3L4 14h7v7l9-11h-7z"
									/>
								</svg>
								<span>{project.improvementSuggestions.length}</span>
							</div>
						)}
					</div>

					{totalIssues > 0 ? (
						<p className="text-sm text-gray-300 line-clamp-2">
							{project.securityRecommendations.length > 0
								? project.securityRecommendations[0].title
								: project.automaticChanges.length > 0
								? project.automaticChanges[0].title
								: project.improvementSuggestions[0].title}
						</p>
					) : (
						<p className="text-sm text-gray-400">No issues detected</p>
					)}
				</div>

				<div className="bg-gray-750 px-5 py-3 text-xs text-gray-400 border-t border-gray-700">
					Last updated {project.lastUpdated}
				</div>
			</div>
		</Link>
	);
};

export default function HomePage() {
	const [projects] = useState(MockProjects);
	const [searchQuery, setSearchQuery] = useState("");
	const [sortBy, setSortBy] = useState<"activity" | "alphabetical" | "issues">("activity");

	// Filter projects based on search query
	const filteredProjects = projects.filter(
		(project) =>
			project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			project.owner.toLowerCase().includes(searchQuery.toLowerCase())
	);

	// Sort projects based on selected option
	const sortedProjects = [...filteredProjects].sort((a, b) => {
		if (sortBy === "alphabetical") {
			return a.name.localeCompare(b.name);
		} else if (sortBy === "issues") {
			const aIssues = a.automaticChanges.length + a.securityRecommendations.length + a.improvementSuggestions.length;
			const bIssues = b.automaticChanges.length + b.securityRecommendations.length + b.improvementSuggestions.length;
			return bIssues - aIssues;
		} else {
			// Sort by activity (last updated)
			return new Date(b.lastUpdatedDate).getTime() - new Date(a.lastUpdatedDate).getTime();
		}
	});

	return (
		<div className="min-h-screen bg-gray-900 text-white">
			<Navbar />

			{/* Add sufficient top padding to clear the fixed header */}
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-2xl font-bold">Your Projects</h1>

					<Link
						href="/login"
						className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
					>
						<svg
							className="mr-2 h-4 w-4"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
								clipRule="evenodd"
							/>
						</svg>
						Add New Repository
					</Link>
				</div>

				{/* Search and filter controls */}
				<div className="mb-6 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 md:items-center justify-between">
					<div className="relative flex-1 max-w-lg">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<svg
								className="h-5 w-5 text-gray-400"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<input
							type="text"
							placeholder="Search Repositories and Projects..."
							className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>

					<div className="flex items-center">
						<label htmlFor="sortBy" className="text-sm text-gray-400 mr-2">
							Sort by:
						</label>
						<select
							id="sortBy"
							className="block pl-3 pr-10 py-2 text-base border-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-gray-800 text-gray-100"
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value as any)}
						>
							<option value="activity">Recent activity</option>
							<option value="alphabetical">Alphabetical</option>
							<option value="issues">Issues</option>
						</select>
					</div>
				</div>

				{/* Project grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{sortedProjects.map((project) => (
						<ProjectCard key={project.id} project={project} />
					))}

					{sortedProjects.length === 0 && (
						<div className="col-span-full text-center py-12">
							<svg
								className="mx-auto h-12 w-12 text-gray-400"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
							</svg>
							<h3 className="mt-2 text-lg font-medium">No projects found</h3>
							<p className="mt-1 text-sm text-gray-400">
								Try adjusting your search or add a new repository to get started.
							</p>
							<Link
								href="/login"
								className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
							>
								Add New Repository
							</Link>
						</div>
					)}
				</div>
			</main>
		</div>
	);
}
