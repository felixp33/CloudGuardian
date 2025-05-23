// src/app/project/[id]/layout.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { MockProjects } from "@/lib/mock-data";

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
	const params = useParams();
	const projectId = params?.id as string;

	// Find the current project from mock data
	const project = MockProjects.find((p) => p.id === projectId);

	if (!project) {
		return (
			<div className="min-h-screen flex flex-col bg-gray-900 text-white">
				<Navbar />
				<main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
					<div className="text-center py-12">
						<h2 className="text-2xl font-bold">Project not found</h2>
						<p className="mt-2 text-gray-400">
							The project you're looking for doesn't exist or you don't have access to it.
						</p>
						<Link
							href="/"
							className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
						>
							<svg
								className="h-5 w-5 mr-2"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
									clipRule="evenodd"
								/>
							</svg>
							Back to projects
						</Link>
					</div>
				</main>
			</div>
		);
	}

	return (
		<div className="min-h-screen flex flex-col bg-gray-900 text-white">
			{/* Fixed navbar */}
			<div className="fixed top-0 inset-x-0 z-10 bg-gray-900 border-b border-gray-800">
				<Navbar />
			</div>

			{/* Main content area with sidebar and content */}
			<div className="flex flex-1 pt-16">
				{/* Fixed sidebar */}
				<div className="fixed w-64 top-16 bottom-0 left-0 overflow-y-auto border-r border-gray-800 bg-gray-900">
					<Sidebar projectId={projectId} />
				</div>
				{/* Main content with left margin */}
				<main className="flex-1 ml-64">
					<div className="p-6">
						<div className="max-w-7xl mx-auto">
							{/* Page content */}
							<div>{children}</div>
						</div>
					</div>
				</main>
			</div>

			{/* Footer (only shown on smaller screens where sidebar doesn't take full height) */}
			<div className="md:hidden bg-gray-800 border-t border-gray-700 p-4 text-center text-sm text-gray-400">
				© {new Date().getFullYear()} CloudGuardian. All rights reserved.
			</div>
		</div>
	);
}
