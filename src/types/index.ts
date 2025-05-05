// types/index.ts
import { ReactNode } from "react";

export interface Project {
	id: string;
	name: string;
	owner: string;
	url: string;
	repoUrl: string;
	icon?: ReactNode;
	lastUpdated: string;
	lastUpdatedDate: string; // ISO date string for sorting
	lastActivity?: string;
	branchCount?: number;
	commitCount?: number;
	automaticChanges: Change[];
	securityRecommendations: Change[];
	improvementSuggestions: Change[];
}

export interface Change {
	id: string;
	title: string;
	description: string;
	details?: string;
	code?: string;
	path?: string;
	severity?: "High" | "Medium" | "Low";
	timestamp: string;
	links?: {
		title: string;
		url: string;
	}[];
}

export type ResourceStatus = "Secure" | "Warning" | "Critical";
export type ComplianceStatus = "Compliant" | "Review Required";
export type Status = ResourceStatus | ComplianceStatus | string;

export interface Resource {
	name: string;
	status: ResourceStatus;
	icon: ReactNode;
}

// Alert types
export type AlertSeverity = "Critical" | "Warning" | "Low";

export interface Alert {
	id: number;
	severity: AlertSeverity;
	resource: string;
	message: string;
	time: string;
}

// Compliance types
export interface ComplianceItem {
	standard: string;
	status: ComplianceStatus;
	lastCheck: string;
}

// Historical data
export interface HistoricalData {
	scoreHistory: number[];
	threatHistory: number[];
}

// Component prop types
export interface TabProps {
	active: boolean;
	onClick: () => void;
	children: ReactNode;
}

export interface StatusBadgeProps {
	status: Status;
}

export interface StatCardProps {
	title: string;
	value: number;
	change: string;
	changeType: "positive" | "negative" | "warning";
	icon: ReactNode;
}

export interface AlertItemProps {
	alert: Alert;
}

export interface ResourceCardProps {
	resource: Resource;
}

export interface TabNavigationProps {
	activeTab: string;
	setActiveTab: (tab: string) => void;
}

export interface OverviewTabProps {
	securityScore: number;
	activeThreats: number;
	resolvedThreats: number;
	pendingUpdates: number;
	historicalData: HistoricalData | null;
	resources: Resource[];
	alerts: Alert[];
}

export interface ResourcesTabProps {
	resources: Resource[];
}

export interface AlertsTabProps {
	alerts: Alert[];
}

export interface ComplianceTabProps {
	compliance: ComplianceItem[];
}
