// components/ui/Tab.tsx
import { TabProps } from "@/types";

export function Tab({ active, onClick, children }: TabProps) {
	return (
		<button
			onClick={onClick}
			className={`pb-4 px-1 font-medium text-sm transition-colors ${
				active
					? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
					: "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
			}`}
		>
			{children}
		</button>
	);
}

export default Tab;
