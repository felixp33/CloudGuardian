import "@/styles/global.css";

export const metadata = {
	title: "DevGuard - Security Monitoring for GitHub Repositories",
	description: "Monitor your GitHub repositories for security vulnerabilities and improvements",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
