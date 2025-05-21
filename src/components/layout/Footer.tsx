"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-gray-900 border-t border-gray-800">
			<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col md:flex-row justify-between items-center">
					<div className="flex items-center mb-4 md:mb-0">
						<div className="h-6 w-6 rounded-full bg-blue-600 mr-2 flex items-center justify-center">
							<span className="font-bold text-white text-xs">D</span>
						</div>
						<span className="text-gray-400 text-sm">© {currentYear} DevGuard. All rights reserved.</span>
					</div>

					<div className="flex space-x-6">
						<Link href="/docs" className="text-gray-400 hover:text-gray-300 text-sm">
							Documentation
						</Link>
						<Link href="/settings" className="text-gray-400 hover:text-gray-300 text-sm">
							Settings
						</Link>
						<a
							href="https://github.com/devguard/devguard"
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-400 hover:text-gray-300 text-sm"
						>
							GitHub
						</a>
						<a href="mailto:support@devguard.io" className="text-gray-400 hover:text-gray-300 text-sm">
							Support
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
