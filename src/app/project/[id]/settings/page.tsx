"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { MockProjects } from "@/lib/mock-data";

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

// Select input component
const Select = ({
	label,
	description,
	value,
	onChange,
	options,
}: {
	label: string;
	description?: string;
	value: string;
	onChange: (value: string) => void;
	options: { value: string; label: string }[];
}) => {
	return (
		<div className="py-4 border-b border-gray-700">
			<label htmlFor={label.replace(/\s+/g, "-").toLowerCase()} className="block">
				<span className="text-white font-medium">{label}</span>
				{description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
			</label>
			<select
				id={label.replace(/\s+/g, "-").toLowerCase()}
				className="mt-2 block w-full rounded-md border-gray-700 bg-gray-800 text-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
				value={value}
				onChange={(e) => onChange(e.target.value)}
			>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};

// Text input component
const TextInput = ({
	label,
	description,
	value,
	onChange,
	placeholder,
	type = "text",
}: {
	label: string;
	description?: string;
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	type?: string;
}) => {
	return (
		<div className="py-4 border-b border-gray-700">
			<label htmlFor={label.replace(/\s+/g, "-").toLowerCase()} className="block">
				<span className="text-white font-medium">{label}</span>
				{description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
			</label>
			<input
				type={type}
				id={label.replace(/\s+/g, "-").toLowerCase()}
				className="mt-2 block w-full rounded-md border-gray-700 bg-gray-800 text-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
			/>
		</div>
	);
};

export default function ProjectSettingsPage() {
	const params = useParams();
	const projectId = params?.id as string;

	// Find the current project
	const project = MockProjects.find((p) => p.id === projectId);

	// Settings state
	const [settings, setSettings] = useState({
		// General settings
		automaticFixes: true,
		notifications: true,

		// Branch management
		branchPrefix: "fix",
		branchStrategy: "feature",
		baseBranch: "main",

		// Testing settings
		automaticTesting: true,
		testTimeout: "30",
		testRetries: "1",

		// Integration settings
		githubWebhooks: true,
		slackIntegration: false,
		slackChannel: "",

		// Access settings
		autoMerge: false,
		requireApproval: true,
	});

	// Handle setting changes
	const updateSetting = (key: string, value: any) => {
		setSettings({
			...settings,
			[key]: value,
		});
	};

	// Handle form submission
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// In a real app, this would update settings on the server
		console.log("Saving settings:", settings);

		// Show a success notification
		alert("Settings saved successfully");
	};

	if (!project) {
		return <div className="p-4 text-white">Project not found</div>;
	}

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold text-white">Project Settings</h2>

				<button
					type="button"
					onClick={handleSubmit}
					className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
				>
					Save Changes
				</button>
			</div>

			<form onSubmit={handleSubmit}>
				{/* General Settings */}
				<div className="bg-gray-800 rounded-lg overflow-hidden shadow mb-6">
					<div className="bg-gray-750 px-4 py-3 border-b border-gray-700">
						<h3 className="text-lg font-medium text-white">General Settings</h3>
					</div>
					<div className="px-4">
						<Toggle
							label="Automatic Fixes"
							description="Automatically apply fixes for non-critical issues"
							enabled={settings.automaticFixes}
							onChange={(value) => updateSetting("automaticFixes", value)}
						/>
						<Toggle
							label="Email Notifications"
							description="Receive email notifications for important updates"
							enabled={settings.notifications}
							onChange={(value) => updateSetting("notifications", value)}
						/>
					</div>
				</div>

				{/* Branch Management */}
				<div className="bg-gray-800 rounded-lg overflow-hidden shadow mb-6">
					<div className="bg-gray-750 px-4 py-3 border-b border-gray-700">
						<h3 className="text-lg font-medium text-white">Branch Management</h3>
					</div>
					<div className="px-4">
						<TextInput
							label="Branch Prefix"
							description="Prefix used for test branches"
							value={settings.branchPrefix}
							onChange={(value) => updateSetting("branchPrefix", value)}
							placeholder="fix"
						/>
						<Select
							label="Branching Strategy"
							description="How branches are created and managed"
							value={settings.branchStrategy}
							onChange={(value) => updateSetting("branchStrategy", value)}
							options={[
								{ value: "feature", label: "Feature Branches" },
								{ value: "gitflow", label: "GitFlow" },
								{ value: "trunk", label: "Trunk-Based Development" },
							]}
						/>
						<TextInput
							label="Base Branch"
							description="Branch that changes will be merged into"
							value={settings.baseBranch}
							onChange={(value) => updateSetting("baseBranch", value)}
							placeholder="main"
						/>
					</div>
				</div>

				{/* Testing Settings */}
				<div className="bg-gray-800 rounded-lg overflow-hidden shadow mb-6">
					<div className="bg-gray-750 px-4 py-3 border-b border-gray-700">
						<h3 className="text-lg font-medium text-white">Testing Settings</h3>
					</div>
					<div className="px-4">
						<Toggle
							label="Automatic Testing"
							description="Automatically run tests on created branches"
							enabled={settings.automaticTesting}
							onChange={(value) => updateSetting("automaticTesting", value)}
						/>
						<TextInput
							label="Test Timeout"
							description="Maximum time (in minutes) for tests to complete"
							value={settings.testTimeout}
							onChange={(value) => updateSetting("testTimeout", value)}
							type="number"
							placeholder="30"
						/>
						<TextInput
							label="Test Retries"
							description="Number of times to retry failed tests"
							value={settings.testRetries}
							onChange={(value) => updateSetting("testRetries", value)}
							type="number"
							placeholder="1"
						/>
					</div>
				</div>

				{/* Integration Settings */}
				<div className="bg-gray-800 rounded-lg overflow-hidden shadow mb-6">
					<div className="bg-gray-750 px-4 py-3 border-b border-gray-700">
						<h3 className="text-lg font-medium text-white">Integrations</h3>
					</div>
					<div className="px-4">
						<Toggle
							label="GitHub Webhooks"
							description="Receive notifications for GitHub events"
							enabled={settings.githubWebhooks}
							onChange={(value) => updateSetting("githubWebhooks", value)}
						/>
						<Toggle
							label="Slack Integration"
							description="Send notifications to Slack"
							enabled={settings.slackIntegration}
							onChange={(value) => updateSetting("slackIntegration", value)}
						/>
						{settings.slackIntegration && (
							<TextInput
								label="Slack Channel"
								description="Channel to send notifications to"
								value={settings.slackChannel}
								onChange={(value) => updateSetting("slackChannel", value)}
								placeholder="#devguard-alerts"
							/>
						)}
					</div>
				</div>

				{/* Access Control */}
				<div className="bg-gray-800 rounded-lg overflow-hidden shadow mb-6">
					<div className="bg-gray-750 px-4 py-3 border-b border-gray-700">
						<h3 className="text-lg font-medium text-white">Access Control</h3>
					</div>
					<div className="px-4">
						<Toggle
							label="Auto-Merge"
							description="Automatically merge changes when tests pass"
							enabled={settings.autoMerge}
							onChange={(value) => updateSetting("autoMerge", value)}
						/>
						<Toggle
							label="Require Approval"
							description="Require manual approval before merging changes"
							enabled={settings.requireApproval}
							onChange={(value) => updateSetting("requireApproval", value)}
						/>
					</div>
				</div>

				{/* Danger Zone */}
				<div className="bg-gray-800 rounded-lg overflow-hidden shadow">
					<div className="bg-red-900 px-4 py-3 border-b border-red-800">
						<h3 className="text-lg font-medium text-white">Danger Zone</h3>
					</div>
					<div className="p-4">
						<p className="text-gray-300 mb-4">
							These actions can't be undone. Please be certain before proceeding.
						</p>
						<div className="space-y-4">
							<button
								type="button"
								className="inline-flex items-center px-4 py-2 border border-red-700 text-sm font-medium rounded-md text-red-400 bg-gray-800 hover:bg-red-900 hover:text-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
							>
								Delete All Test Branches
							</button>
							<button
								type="button"
								className="inline-flex items-center px-4 py-2 border border-red-700 text-sm font-medium rounded-md text-red-400 bg-gray-800 hover:bg-red-900 hover:text-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
							>
								Remove Project from DevGuard
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}
