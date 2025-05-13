// components/ui/StatusBadge.tsx
import { StatusBadgeProps } from "@/types";

export function StatusBadge({ status }: StatusBadgeProps) {
	const getStatusStyles = () => {
		switch (status) {
			case "Secure":
				return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
			case "Warning":
				return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
			case "Critical":
				return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
			case "Review Required":
				return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
			case "Compliant":
				return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
			default:
				return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
		}
	};

	return (
		<span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles()}`}>
			{status}
		</span>
	);
}

export default StatusBadge;
