"use client";

import React, { useState } from "react";
import { Project } from "@/types";
import { MockProjects } from "@/lib/mock-data";
import Header from "@/conponents/Header";
import ProjectCard from "@/conponents/ProjectCard";

export default function Home() {
	const [projects, setProjects] = useState<Project[]>(MockProjects);
	const [searchQuery, setSearchQuery] = useState("");
	const [sortBy, setSortBy] = useState<"activity" | "alphabetical" | "issues">("activity");
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
			<Header />

			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
							className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>

					<div className="flex items-center space-x-4">
						<div className="relative inline-block text-left">
							<select
								className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value as any)}
							>
								<option value="activity">Sort by activity</option>
								<option value="alphabetical">Sort alphabetically</option>
								<option value="issues">Sort by issues</option>
							</select>
						</div>

						<div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-md p-1 border border-gray-300 dark:border-gray-600">
							<button
								className={`p-1 rounded ${viewMode === "grid" ? "bg-gray-100 dark:bg-gray-700" : ""}`}
								onClick={() => setViewMode("grid")}
								aria-label="Grid view"
							>
								<svg className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
									<path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
								</svg>
							</button>
							<button
								className={`p-1 rounded ${viewMode === "list" ? "bg-gray-100 dark:bg-gray-700" : ""}`}
								onClick={() => setViewMode("list")}
								aria-label="List view"
							>
								<svg className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
									<path
										fillRule="evenodd"
										d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
										clipRule="evenodd"
									/>
								</svg>
							</button>
						</div>

						<button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
							Add New...
						</button>
					</div>
				</div>

				{/* Project grid */}
				<div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
					{sortedProjects.map((project) => (
						<ProjectCard key={project.id} project={project} />
					))}

					{sortedProjects.length === 0 && (
						<div className="col-span-full text-center py-12">
							<h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No projects found</h3>
							<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
								Try adjusting your search or filter to find what you're looking for.
							</p>
						</div>
					)}
				</div>
			</main>
		</div>
	);
}
