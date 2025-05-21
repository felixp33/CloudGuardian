// src/app/layout.tsx (Root Layout)
import type { Metadata } from "next";
import "@/styles/global.css";

export const metadata: Metadata = {
	title: "DevGuard - Security Monitoring for GitHub Repositories",
	description: "Monitor your GitHub repositories for security vulnerabilities and improvement opportunities",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="bg-gray-900 text-white">{children}</body>
		</html>
	);
}
