import type { Metadata } from "next";
import "@/styles/global.css";
import Footer from "@/components/layout/Footer";

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
			<body className="bg-gray-900 text-white flex flex-col min-h-screen">
				<div className="flex-grow">{children}</div>
				<Footer />
			</body>
		</html>
	);
}
