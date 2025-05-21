// src/components/layout/MainLayout.tsx
import React from "react";
import Navbar from "./Navbar";
import { MockProjects } from "@/lib/mock-data";
import { Project } from "@/types";

interface MainLayoutProps {
	children: React.ReactNode;
	projectId?: string;
	showSidebar?: boolean;
	showNavbar?: boolean;
	project?: Project;
}

/**
 * MainLayout - A reusable layout component that can be used within Next.js App Router layouts
 *
 * This component provides a consistent structure for pages that share layout requirements
 * but may not be in the same route group in the App Router hierarchy
 */
export default function MainLayout({
	children,
	projectId,
	showSidebar = false,
	showNavbar = true,
	project: projectProp,
}: MainLayoutProps) {
	// If project is not provided as a prop but projectId is,
	// attempt to find it from mock data
	const project = projectProp || (projectId ? MockProjects.find((p) => p.id === projectId) : undefined);

	return (
		<div className="flex flex-col h-full">
			{showNavbar && <Navbar />}

			<div className="flex flex-1 overflow-hidden">
				{/* Main content */}
				<main className="flex-1 overflow-auto">
					<div className="p-6 h-full">
						<div className="max-w-7xl mx-auto h-full">
							{/* Project header info */}
							{project && (
								<div className="mb-6">
									<h1 className="text-2xl font-bold">{project.name}</h1>
									<p className="text-gray-400">{project.owner}</p>
								</div>
							)}

							{/* Page content */}
							<div>{children}</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
