"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

// Documentation section component
const DocSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
	return (
		<div className="mb-10">
			<h2 className="text-xl font-bold text-white mb-4">{title}</h2>
			{children}
		</div>
	);
};

// Documentation article component
const DocArticle = ({ title, description, link }: { title: string; description: string; link: string }) => {
	return (
		<Link href={link} className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-750 mb-3">
			<h3 className="text-lg font-medium text-white mb-1">{title}</h3>
			<p className="text-gray-400 text-sm">{description}</p>
		</Link>
	);
};

export default function DocsPage() {
	const [searchQuery, setSearchQuery] = useState("");

	// Filter articles based on search
	const filterArticles = (items: { title: string; description: string; link: string }[]) => {
		if (!searchQuery) return items;

		return items.filter(
			(item) =>
				item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.description.toLowerCase().includes(searchQuery.toLowerCase())
		);
	};

	// Documentation content by section
	const docSections = [
		{
			title: "Getting Started",
			articles: [
				{
					title: "Introduction to CloudGuardian",
					description: "Learn about CloudGuardian and how it helps protect your repositories.",
					link: "/docs/introduction",
				},
				{
					title: "Connecting Your GitHub Repository",
					description: "Step-by-step guide to connect your GitHub repositories to CloudGuardian.",
					link: "/docs/connecting-github",
				},
				{
					title: "Understanding the Dashboard",
					description: "Overview of the CloudGuardian dashboard and key metrics.",
					link: "/docs/dashboard-overview",
				},
			],
		},
		{
			title: "Working with Issues",
			articles: [
				{
					title: "Automatic Fixes",
					description: "How CloudGuardian automatically fixes security vulnerabilities.",
					link: "/docs/automatic-fixes",
				},
				{
					title: "Security Recommendations",
					description: "Understanding and implementing security recommendations.",
					link: "/docs/security-recommendations",
				},
				{
					title: "Improvement Suggestions",
					description: "Using CloudGuardian's improvement suggestions to enhance code quality.",
					link: "/docs/improvement-suggestions",
				},
				{
					title: "Test Branch Workflow",
					description: "How CloudGuardian uses test branches to safely apply changes.",
					link: "/docs/test-branch-workflow",
				},
			],
		},
		{
			title: "Advanced Usage",
			articles: [
				{
					title: "Custom Rules",
					description: "Creating and managing custom security rules.",
					link: "/docs/custom-rules",
				},
				{
					title: "CI/CD Integration",
					description: "Integrating CloudGuardian with your CI/CD pipeline.",
					link: "/docs/cicd-integration",
				},
				{
					title: "Team Collaboration",
					description: "Managing team access and collaboration in CloudGuardian.",
					link: "/docs/team-collaboration",
				},
				{
					title: "API Reference",
					description: "Complete API documentation for CloudGuardian.",
					link: "/docs/api-reference",
				},
			],
		},
	];

	return (
		<div className="min-h-screen bg-gray-900">
			<Navbar />

			{/* Add sufficient top padding to clear the fixed header */}
			<main className="max-w-4xl mx-auto px-4 py-8 pt-24">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-white mb-4">Documentation</h1>
					<p className="text-gray-400 mb-6">
						Find guides and references to help you get the most out of CloudGuardian's security monitoring
						capabilities.
					</p>

					{/* Search */}
					<div className="relative max-w-lg mb-8">
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
							placeholder="Search documentation..."
							className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>

					{/* Quick links */}
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
						<div className="p-4 bg-blue-900 bg-opacity-30 rounded-lg border border-blue-800">
							<h3 className="text-lg font-medium text-white mb-2">Test Branch Workflow</h3>
							<p className="text-gray-300 text-sm mb-3">
								Learn how CloudGuardian safely tests and applies changes.
							</p>
							<Link
								href="/docs/test-branch-workflow"
								className="text-blue-400 hover:text-blue-300 text-sm font-medium"
							>
								Read guide →
							</Link>
						</div>
						<div className="p-4 bg-green-900 bg-opacity-30 rounded-lg border border-green-800">
							<h3 className="text-lg font-medium text-white mb-2">Security Best Practices</h3>
							<p className="text-gray-300 text-sm mb-3">Essential security practices for your repositories.</p>
							<Link
								href="/docs/security-best-practices"
								className="text-green-400 hover:text-green-300 text-sm font-medium"
							>
								Read guide →
							</Link>
						</div>
						<div className="p-4 bg-purple-900 bg-opacity-30 rounded-lg border border-purple-800">
							<h3 className="text-lg font-medium text-white mb-2">Getting Started</h3>
							<p className="text-gray-300 text-sm mb-3">
								New to CloudGuardian? Start here to set up your account.
							</p>
							<Link
								href="/docs/getting-started"
								className="text-purple-400 hover:text-purple-300 text-sm font-medium"
							>
								Read guide →
							</Link>
						</div>
					</div>
				</div>

				{/* Documentation sections */}
				{docSections.map((section) => (
					<DocSection key={section.title} title={section.title}>
						{filterArticles(section.articles).length > 0 ? (
							filterArticles(section.articles).map((article) => (
								<DocArticle
									key={article.title}
									title={article.title}
									description={article.description}
									link={article.link}
								/>
							))
						) : (
							<p className="text-gray-400 italic">No articles match your search in this section.</p>
						)}
					</DocSection>
				))}

				{/* Help section */}
				<div className="mt-12 p-6 bg-gray-800 rounded-lg">
					<h2 className="text-xl font-bold text-white mb-2">Need more help?</h2>
					<p className="text-gray-400 mb-4">
						Can't find what you're looking for? We're here to help you get the most out of CloudGuardian.
					</p>
					<div className="flex flex-wrap gap-3">
						<a
							href="mailto:support@CloudGuardian.io"
							className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
						>
							<svg
								className="mr-2 h-4 w-4"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								/>
							</svg>
							Contact Support
						</a>
						<a
							href="https://github.com/CloudGuardian/docs/issues"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center px-4 py-2 border border-gray-700 text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700"
						>
							<svg
								className="mr-2 h-4 w-4"
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
							Report an Issue
						</a>
						<a
							href="https://github.com/CloudGuardian/CloudGuardian"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center px-4 py-2 border border-gray-700 text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700"
						>
							<svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
								<path
									fillRule="evenodd"
									d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
									clipRule="evenodd"
								/>
							</svg>
							GitHub Repository
						</a>
					</div>
				</div>
			</main>
		</div>
	);
}
