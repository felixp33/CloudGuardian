// src/components/layout/Navbar.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MockProjects } from "@/lib/mock-data";
import { Project } from "@/types";

export default function Navbar() {
	const router = useRouter();
	const pathname = usePathname();
	const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);
	const [projects, setProjects] = useState<Project[]>(MockProjects);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Extract project ID from URL if we're on a project page
	const projectIdMatch = pathname?.match(/\/project\/([^\/]+)/);
	const currentProjectId = projectIdMatch ? projectIdMatch[1] : undefined;

	// Find current project
	const currentProject = currentProjectId ? projects.find((p) => p.id === currentProjectId) : undefined;

	// Handle outside click to close dropdown
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsProjectsDropdownOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	// Handle project selection
	const handleProjectSelect = (projectId: string) => {
		router.push(`/project/${projectId}`);
		setIsProjectsDropdownOpen(false);
	};

	return (
		<nav className="fixed top-0 left-0 right-0 z-10 bg-gray-900 border-b border-gray-800">
			<div className="max-w-full mx-auto px-4">
				<div className="flex justify-between h-16">
					<div className="flex">
						{/* Logo/Brand */}
						<div className="flex-shrink-0 flex items-center">
							<Link href="/" className="flex items-center">
								<div className="h-8 w-8 rounded-full bg-blue-600 mr-2 flex items-center justify-center">
									<span className="font-bold text-white">D</span>
								</div>
								<span className="font-bold text-xl text-white">DevGuard</span>
							</Link>
						</div>

						{/* Project Selector Dropdown */}
						<div className="ml-6 flex items-center relative" ref={dropdownRef}>
							<button
								onClick={() => setIsProjectsDropdownOpen(!isProjectsDropdownOpen)}
								className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center border border-gray-800 hover:border-gray-700"
							>
								{currentProject ? (
									<>
										<div className="h-5 w-5 mr-2">
											<svg className="text-gray-400" fill="currentColor" viewBox="0 0 24 24">
												<path
													fillRule="evenodd"
													d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
													clipRule="evenodd"
												/>
											</svg>
										</div>
										<span className="truncate max-w-[100px]">{currentProject.name}</span>
									</>
								) : (
									<span>Projects</span>
								)}
								<svg
									className="ml-1 h-4 w-4"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clipRule="evenodd"
									/>
								</svg>
							</button>

							{isProjectsDropdownOpen && (
								<div className="absolute left-0 top-full mt-1 w-64 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
									<div className="py-1">
										<div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-700">
											Switch Project
										</div>

										<div className="max-h-80 overflow-y-auto">
											{projects.map((project) => (
												<button
													key={project.id}
													onClick={() => handleProjectSelect(project.id)}
													className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 flex items-center ${
														currentProjectId === project.id ? "bg-gray-700" : ""
													}`}
												>
													<div className="h-6 w-6 rounded flex items-center justify-center bg-gray-700 mr-2">
														<svg
															className="h-4 w-4 text-gray-400"
															fill="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																fillRule="evenodd"
																d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
																clipRule="evenodd"
															/>
														</svg>
													</div>
													<div>
														<div className="font-medium text-white">{project.name}</div>
														<div className="text-xs text-gray-500">{project.owner}</div>
													</div>

													{currentProjectId === project.id && (
														<svg
															className="ml-auto h-4 w-4 text-blue-400"
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
													)}
												</button>
											))}
										</div>

										<div className="border-t border-gray-700">
											<Link
												href="/login"
												className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
											>
												<div className="flex items-center">
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
													Add new repository
												</div>
											</Link>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Right side nav items */}
					<div className="flex items-center">
						{/* Main navigation */}
						<div className="hidden md:ml-6 md:flex md:space-x-4">
							<Link
								href="/dashboard"
								className={`px-3 py-2 rounded-md text-sm font-medium ${
									pathname === "/dashboard" ? "text-white" : "text-gray-300 hover:text-white"
								}`}
							>
								Dashboard
							</Link>

							<Link
								href="/docs"
								className={`px-3 py-2 rounded-md text-sm font-medium ${
									pathname === "/docs" ? "text-white" : "text-gray-300 hover:text-white"
								}`}
							>
								Docs
							</Link>

							<Link
								href="/settings"
								className={`px-3 py-2 rounded-md text-sm font-medium ${
									pathname === "/settings" ? "text-white" : "text-gray-300 hover:text-white"
								}`}
							>
								Settings
							</Link>
						</div>

						{/* User menu */}
						<div className="ml-4 flex items-center">
							<div className="ml-3 relative">
								<button className="rounded-full flex items-center focus:outline-none">
									<div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white">
										Fe
									</div>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
