"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Project } from "@/types";
import { MockProjects } from "@/lib/mock-data";
import Header from "@/conponents/Header";
import ProjectHeader from "@/conponents/ProjectHeader";
import { AlertCircleIcon, ChevronLeftIcon, ShieldIcon, SparklesIcon } from "@/conponents/Icons";
import ChangeItem from "@/conponents/ChangeItem";

export default function ProjectDetailPage() {
	const router = useRouter();
	const params = useParams();
	const [project, setProject] = useState<Project | null>(null);
	const [activeTab, setActiveTab] = useState<"automatic" | "security" | "improvements">("security");

	// In a real app, we'd fetch this from an API
	useEffect(() => {
		if (params?.id) {
			const foundProject = MockProjects.find((p) => p.id === params.id);
			setProject(foundProject || null);

			// Default to the tab with issues, prioritizing security
			if (foundProject) {
				if (foundProject.securityRecommendations.length > 0) {
					setActiveTab("security");
				} else if (foundProject.automaticChanges.length > 0) {
					setActiveTab("automatic");
				} else if (foundProject.improvementSuggestions.length > 0) {
					setActiveTab("improvements");
				}
			}
		}
	}, [params]);

	if (!project) {
		return (
			<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
				<Header />
				<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="text-center py-12">
						<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Project not found</h2>
						<p className="mt-2 text-gray-500 dark:text-gray-400">
							The project you're looking for doesn't exist or you don't have access to it.
						</p>
						<button
							onClick={() => router.push("/")}
							className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 dark:text-blue-100 dark:bg-blue-900 dark:hover:bg-blue-800"
						>
							<ChevronLeftIcon className="h-5 w-5 mr-2" />
							Back to projects
						</button>
					</div>
				</main>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
			<Header />

			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Back button */}
				<div className="mb-6">
					<button
						onClick={() => router.push("/")}
						className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
					>
						<ChevronLeftIcon className="h-5 w-5 mr-1" />
						Back to projects
					</button>
				</div>

				{/* Project header with stats */}
				<ProjectHeader project={project} />

				{/* Tabs navigation */}
				<div className="mt-8 mb-6 border-b border-gray-200 dark:border-gray-700">
					<div className="flex space-x-8">
						<button
							className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
								activeTab === "automatic"
									? "border-green-500 text-green-600 dark:text-green-400"
									: "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
							}`}
							onClick={() => setActiveTab("automatic")}
						>
							<ShieldIcon className="h-5 w-5 mr-2" />
							Automatic Changes
							{project.automaticChanges.length > 0 && (
								<span className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">
									{project.automaticChanges.length}
								</span>
							)}
						</button>

						<button
							className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
								activeTab === "security"
									? "border-red-500 text-red-600 dark:text-red-400"
									: "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
							}`}
							onClick={() => setActiveTab("security")}
						>
							<AlertCircleIcon className="h-5 w-5 mr-2" />
							Security Recommendations
							{project.securityRecommendations.length > 0 && (
								<span className="ml-2 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">
									{project.securityRecommendations.length}
								</span>
							)}
						</button>

						<button
							className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
								activeTab === "improvements"
									? "border-blue-500 text-blue-600 dark:text-blue-400"
									: "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
							}`}
							onClick={() => setActiveTab("improvements")}
						>
							<SparklesIcon className="h-5 w-5 mr-2" />
							Improvement Suggestions
							{project.improvementSuggestions.length > 0 && (
								<span className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">
									{project.improvementSuggestions.length}
								</span>
							)}
						</button>
					</div>
				</div>

				{/* Tab content */}
				<div className="space-y-6">
					{activeTab === "automatic" && (
						<>
							{project.automaticChanges.length > 0 ? (
								project.automaticChanges.map((change) => (
									<ChangeItem key={change.id} change={change} type="automatic" />
								))
							) : (
								<div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
									<ShieldIcon className="mx-auto h-12 w-12 text-gray-400" />
									<h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">
										No automatic changes
									</h3>
									<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
										There are no automatic changes applied to this project yet.
									</p>
								</div>
							)}
						</>
					)}

					{activeTab === "security" && (
						<>
							{project.securityRecommendations.length > 0 ? (
								project.securityRecommendations.map((recommendation) => (
									<ChangeItem key={recommendation.id} change={recommendation} type="security" />
								))
							) : (
								<div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
									<AlertCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
									<h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">
										No security recommendations
									</h3>
									<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
										Your project has no security recommendations at this time.
									</p>
								</div>
							)}
						</>
					)}

					{activeTab === "improvements" && (
						<>
							{project.improvementSuggestions.length > 0 ? (
								project.improvementSuggestions.map((suggestion) => (
									<ChangeItem key={suggestion.id} change={suggestion} type="improvement" />
								))
							) : (
								<div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
									<SparklesIcon className="mx-auto h-12 w-12 text-gray-400" />
									<h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">
										No improvement suggestions
									</h3>
									<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
										There are no improvement suggestions for this project right now.
									</p>
								</div>
							)}
						</>
					)}
				</div>
			</main>
		</div>
	);
}
