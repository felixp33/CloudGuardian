"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";

// Toggle component for settings
const Toggle = ({
	label,
	description,
	enabled,
	onChange,
}: {
	label: string;
	description?: string;
	enabled: boolean;
	onChange: (enabled: boolean) => void;
}) => {
	return (
		<div className="flex items-start justify-between py-4 border-b border-gray-700">
			<div>
				<h4 className="text-white font-medium">{label}</h4>
				{description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
			</div>
			<button
				type="button"
				className={`${
					enabled ? "bg-blue-600" : "bg-gray-700"
				} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900`}
				role="switch"
				aria-checked={enabled}
				onClick={() => onChange(!enabled)}
			>
				<span className="sr-only">Toggle {label}</span>
				<span
					aria-hidden="true"
					className={`${
						enabled ? "translate-x-5" : "translate-x-0"
					} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
				/>
			</button>
		</div>
	);
};

export default function SettingsPage() {
	// Settings state
	const [settings, setSettings] = useState({
		emailAlerts: true,
		autoFix: true,
		darkMode: true,
		slackNotifications: false,
	});

	// Update setting helper
	const updateSetting = (key: string, value: boolean) => {
		setSettings({
			...settings,
			[key]: value,
		});
	};

	// Save settings
	const handleSaveSettings = () => {
		// In a real app, this would send settings to an API
		console.log("Saving settings:", settings);

		// Show a success message
		alert("Settings saved successfully");
	};

	return (
		<div className="min-h-screen bg-gray-900">
			<Navbar />

			<main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-2xl font-bold text-white">Settings</h1>

					<button
						onClick={handleSaveSettings}
						className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						Save Changes
					</button>
				</div>

				{/* Settings Panel */}
				<div className="bg-gray-800 rounded-lg overflow-hidden shadow mb-6">
					<div className="bg-gray-750 px-4 py-3 border-b border-gray-700">
						<h2 className="text-lg font-medium text-white">Application Settings</h2>
					</div>
					<div className="px-4">
						<Toggle
							label="Email Alerts"
							description="Receive security alerts and updates via email"
							enabled={settings.emailAlerts}
							onChange={(value) => updateSetting("emailAlerts", value)}
						/>

						<Toggle
							label="Automatic Fixes"
							description="Automatically apply fixes for non-critical issues"
							enabled={settings.autoFix}
							onChange={(value) => updateSetting("autoFix", value)}
						/>

						<Toggle
							label="Dark Mode"
							description="Use dark theme throughout the application"
							enabled={settings.darkMode}
							onChange={(value) => updateSetting("darkMode", value)}
						/>

						<Toggle
							label="Slack Notifications"
							description="Send alerts to your connected Slack workspace"
							enabled={settings.slackNotifications}
							onChange={(value) => updateSetting("slackNotifications", value)}
						/>
					</div>
				</div>

				{/* Connected Accounts */}
				<div className="bg-gray-800 rounded-lg overflow-hidden shadow">
					<div className="bg-gray-750 px-4 py-3 border-b border-gray-700">
						<h2 className="text-lg font-medium text-white">Connected Accounts</h2>
					</div>
					<div className="px-4 py-4">
						<div className="flex items-center justify-between mb-4">
							<div className="flex items-center">
								<svg className="h-6 w-6 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 24 24">
									<path
										fillRule="evenodd"
										d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
										clipRule="evenodd"
									/>
								</svg>
								<div>
									<div className="text-white font-medium">GitHub</div>
									<div className="text-gray-400 text-sm">Connected as @felixp33</div>
								</div>
							</div>
							<button className="text-sm text-blue-400 hover:text-blue-300">Disconnect</button>
						</div>

						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<svg className="h-6 w-6 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 24 24">
									<path d="M22.2,12c0,5.6-4.5,10.2-10.2,10.2S1.8,17.6,1.8,12S6.4,1.8,12,1.8S22.2,6.4,22.2,12z M8.7,12.2c0-0.1,0-0.2-0.1-0.2 c-0.1,0-0.1,0-0.2,0.1c0,0.1,0,0.2,0.1,0.2C8.6,12.3,8.7,12.3,8.7,12.2z M9.9,12.5c0-0.1-0.1-0.2-0.2-0.1c-0.1,0-0.1,0.1-0.1,0.2 c0,0.1,0.1,0.2,0.2,0.1C9.8,12.7,9.9,12.6,9.9,12.5z M8.1,12.1c0-0.1-0.1-0.1-0.2-0.1c-0.1,0-0.2,0.1-0.1,0.2 c0,0.1,0.1,0.1,0.2,0.1C8,12.3,8.1,12.2,8.1,12.1z M7.4,11.7c0-0.1-0.1-0.1-0.2,0c-0.1,0-0.1,0.1-0.1,0.2c0,0.1,0.1,0.1,0.2,0 C7.4,11.9,7.4,11.8,7.4,11.7z M6.9,11.2c0-0.1-0.1,0-0.2,0c-0.1,0.1-0.1,0.1,0,0.2c0,0.1,0.1,0,0.2,0C6.9,11.4,6.9,11.3,6.9,11.2z M6.5,10.7c0-0.1-0.1,0-0.2,0c-0.1,0-0.1,0.1,0,0.2c0,0.1,0.1,0,0.2,0C6.5,10.8,6.5,10.7,6.5,10.7z M6.1,10.2 c0-0.1-0.1,0-0.2,0c-0.1,0-0.1,0.1,0,0.2c0,0.1,0.1,0,0.2,0C6.1,10.3,6.1,10.3,6.1,10.2z" />
								</svg>
								<div>
									<div className="text-white font-medium">Slack</div>
									<div className="text-gray-400 text-sm">Not connected</div>
								</div>
							</div>
							<button className="text-sm text-green-400 hover:text-green-300">Connect</button>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
