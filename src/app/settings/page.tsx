"use client";

import React, { useState } from "react";
import Header from "@/components/Header";

export default function SettingsPage() {
	const [darkMode, setDarkMode] = useState(true);
	const [emailNotifications, setEmailNotifications] = useState(true);
	const [securityAlerts, setSecurityAlerts] = useState(true);
	const [weeklyReports, setWeeklyReports] = useState(false);

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
			<Header />

			<main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="mb-6">
					<h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white">Settings</h2>
					<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
						Manage your account preferences and notification settings.
					</p>
				</div>

				{/* Settings content */}
				<div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
					<div className="p-6 space-y-6">
						<div className="border-b border-gray-200 dark:border-gray-700 pb-6">
							<h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Account</h3>
							<div className="mt-4 space-y-4">
								<div className="flex items-center justify-between">
									<div>
										<span className="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</span>
										<p className="text-sm text-gray-500 dark:text-gray-400">
											Toggle between light and dark theme
										</p>
									</div>
									<button
										type="button"
										className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
											darkMode ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
										}`}
										role="switch"
										aria-checked={darkMode}
										onClick={() => setDarkMode(!darkMode)}
									>
										<span className="sr-only">Use dark mode</span>
										<span
											aria-hidden="true"
											className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
												darkMode ? "translate-x-5" : "translate-x-0"
											}`}
										/>
									</button>
								</div>

								<div>
									<label
										htmlFor="email"
										className="block text-sm font-medium text-gray-700 dark:text-gray-300"
									>
										Email address
									</label>
									<input
										type="email"
										name="email"
										id="email"
										defaultValue="dev.guard@example.com"
										className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
									/>
								</div>
							</div>
						</div>

						<div>
							<h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Notifications</h3>
							<div className="mt-4 space-y-4">
								<div className="flex items-start">
									<div className="flex items-center h-5">
										<input
											id="email-notifications"
											name="email-notifications"
											type="checkbox"
											checked={emailNotifications}
											onChange={() => setEmailNotifications(!emailNotifications)}
											className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
										/>
									</div>
									<div className="ml-3 text-sm">
										<label
											htmlFor="email-notifications"
											className="font-medium text-gray-700 dark:text-gray-300"
										>
											Email notifications
										</label>
										<p className="text-gray-500 dark:text-gray-400">
											Receive email notifications for important updates.
										</p>
									</div>
								</div>

								<div className="flex items-start">
									<div className="flex items-center h-5">
										<input
											id="security-alerts"
											name="security-alerts"
											type="checkbox"
											checked={securityAlerts}
											onChange={() => setSecurityAlerts(!securityAlerts)}
											className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
										/>
									</div>
									<div className="ml-3 text-sm">
										<label htmlFor="security-alerts" className="font-medium text-gray-700 dark:text-gray-300">
											Security alerts
										</label>
										<p className="text-gray-500 dark:text-gray-400">
											Get notified immediately about critical security vulnerabilities.
										</p>
									</div>
								</div>

								<div className="flex items-start">
									<div className="flex items-center h-5">
										<input
											id="weekly-reports"
											name="weekly-reports"
											type="checkbox"
											checked={weeklyReports}
											onChange={() => setWeeklyReports(!weeklyReports)}
											className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
										/>
									</div>
									<div className="ml-3 text-sm">
										<label htmlFor="weekly-reports" className="font-medium text-gray-700 dark:text-gray-300">
											Weekly summary reports
										</label>
										<p className="text-gray-500 dark:text-gray-400">
											Receive a weekly summary of all activity across your repositories.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="bg-gray-50 dark:bg-gray-750 px-6 py-4 flex justify-end">
						<button
							type="submit"
							className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							Save changes
						</button>
					</div>
				</div>
			</main>
		</div>
	);
}
