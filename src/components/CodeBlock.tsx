import React, { useState } from "react";

interface CodeBlockProps {
	code: string;
	title?: string;
}

const SimpleCodeBlock: React.FC<CodeBlockProps> = ({ code, title }) => {
	const [copied, setCopied] = useState(false);

	const copyToClipboard = () => {
		navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	// Inline styles to guarantee contrast regardless of theme context
	const containerStyle = {
		borderRadius: "0.375rem",
		overflow: "hidden",
		border: "1px solid #444",
		marginBottom: "1rem",
	};

	const headerStyle = {
		backgroundColor: "#2d2d2d",
		padding: "0.5rem 1rem",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		borderBottom: "1px solid #444",
	};

	const titleStyle = {
		color: "#ffffff",
		fontWeight: 500,
		fontSize: "0.875rem",
	};

	const buttonStyle = {
		backgroundColor: "#444",
		color: "#fff",
		border: "none",
		borderRadius: "0.25rem",
		padding: "0.25rem 0.5rem",
		cursor: "pointer",
		fontSize: "0.75rem",
	};

	const preStyle = {
		margin: 0,
		padding: "1rem",
		backgroundColor: "#1e1e1e",
		color: "#ffffff",
		fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
		fontSize: "0.875rem",
		lineHeight: 1.7,
		whiteSpace: "pre",
		overflowX: "auto",
	};

	return (
		<div style={containerStyle}>
			{title && (
				<div style={headerStyle}>
					<span style={titleStyle}>{title}</span>
					<button onClick={copyToClipboard} style={buttonStyle}>
						{copied ? "Copied!" : "Copy"}
					</button>
				</div>
			)}
			<pre>
				<code style={{ color: "inherit" }}>{code}</code>
			</pre>
		</div>
	);
};

export default SimpleCodeBlock;
