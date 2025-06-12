// components/auth/GitHubLogin.tsx
import React from "react";
import { GitHubIcon } from "../Icons";

export default function GitHubLogin() {
        const handleLogin = () => {
                window.location.href = "/api/auth/login";
        };

	return (
		<button
			onClick={handleLogin}
			className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
		>
			<GitHubIcon className="h-5 w-5 mr-2" />
			Continue with GitHub
		</button>
	);
}
