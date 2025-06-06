// src/components/layout/Sidebar.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MockProjects } from "@/lib/mock-data";

interface SidebarProps {
	projectId: string;
}

export default function Sidebar({ projectId }: SidebarProps) {
	const pathname = usePathname();

	// Find the current project from mock data
	const project = MockProjects.find((p) => p.id === projectId);

	// Navigation items for the sidebar
	const navItems = [
		{
			name: "News & Alerts",
			path: `/project/${projectId}`,
			icon: (
				<svg
					className="h-5 w-5"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			),
			exact: true,
		},
		{
			name: "In Progress",
			path: `/project/${projectId}/in-progress`,
			icon: (
				<svg
					className="h-5 w-5"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			),
		},
		{
			name: "Applied Changes",
			path: `/project/${projectId}/applied`,
			icon: (
				<svg
					className="h-5 w-5"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
				</svg>
			),
		},
		{
			name: "Statistics",
			path: `/project/${projectId}/statistics`,
			icon: (
				<svg
					className="h-5 w-5"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
					/>
				</svg>
			),
		},
		{
			name: "Settings",
			path: `/project/${projectId}/settings`,
			icon: (
				<svg
					className="h-5 w-5"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
					/>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</svg>
			),
		},
	];

	// Check if a path is active
	const isActive = (path: string, exact = false) => {
		if (exact) {
			return pathname === path;
		}
		return pathname === path || pathname?.startsWith(path + "/");
	};

	return (
		<div className="h-screen pt-16 bg-gray-900 w-64 border-r border-gray-800 flex-shrink-0 overflow-y-auto fixed left-0 top-0">
			<div className="flex flex-col h-full">
				{/* Project name at the top of the sidebar */}
				{project && (
					<div className="px-4 py-5 border-b border-gray-800">
						<h2 className="text-xl font-bold text-white">{project.name}</h2>
						<p className="text-sm text-gray-400">{project.owner}</p>
					</div>
				)}

				<div className="py-4 flex-grow">
					<nav className="px-2 space-y-1">
						{navItems.map((item) => (
							<Link
								key={item.path}
								href={item.path}
								className={`group flex items-center px-4 py-3 text-sm font-medium rounded-md ${
									isActive(item.path, item.exact)
										? "bg-gray-800 text-white"
										: "text-gray-300 hover:bg-gray-800 hover:text-white"
								}`}
							>
								<span className="mr-3">{item.icon}</span>
								{item.name}
							</Link>
						))}
					</nav>
				</div>

				{/* Bottom section of sidebar */}
				<div className="p-4 border-t border-gray-800 mt-auto">
					<div className="flex items-center">
						<svg
							className="h-5 w-5 text-gray-400"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<Link href="/docs" className="ml-2 text-sm text-gray-300 hover:text-white">
							Help & Documentation
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
