// lib/mock-data.ts
import { Project } from "@/types";

export const MockProjects: Project[] = [
	{
		id: "ryon",
		name: "ryon",
		owner: "felixp33",
		url: "ryon-sandy.vercel.app",
		repoUrl: "https://github.com/felixp33/ryon",
		lastUpdated: "3d ago",
		lastUpdatedDate: "2025-05-02T10:00:00Z",
		lastActivity: "New web build 3d ago",
		branchCount: 5,
		commitCount: 127,
		automaticChanges: [
			{
				id: "auto-1",
				title: "Updated dependencies with security patches",
				description: "Several dependencies were updated to patch security vulnerabilities.",
				details:
					"The AI agent automatically updated the following dependencies to patch known security vulnerabilities: react-dom (CVE-2024-xxxx), axios (CVE-2023-xxxx), and lodash (CVE-2023-xxxx).",
				path: "package.json",
				timestamp: "3 days ago",
				code: `- "react-dom": "^17.0.2",
+ "react-dom": "^17.0.2-patch.1",
- "axios": "^0.21.1",
+ "axios": "^0.21.4",
- "lodash": "^4.17.20",
+ "lodash": "^4.17.21",`,
				links: [
					{
						title: "React DOM CVE-2024-xxxx",
						url: "https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-xxxx",
					},
					{
						title: "Axios CVE-2023-xxxx",
						url: "https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-xxxx",
					},
				],
			},
		],
		securityRecommendations: [
			{
				id: "sec-1",
				title: "Insecure direct object reference vulnerability in user API",
				description:
					"The user profile API endpoint is vulnerable to insecure direct object references, allowing potential unauthorized access to user data.",
				details:
					"The endpoint at /api/users/:id does not properly validate that the requesting user has permission to access the requested user data. This could allow an attacker to access other users' information by simply changing the ID in the request.",
				path: "pages/api/users/[id].js",
				severity: "High",
				timestamp: "3 days ago",
				code: `// Current vulnerable code
export default async function handler(req, res) {
  const { id } = req.query;
  const userData = await getUserData(id);
  return res.status(200).json(userData);
}

// Recommended secure implementation
export default async function handler(req, res) {
  const { id } = req.query;
  const session = await getSession({ req });
  
  if (!session || (session.user.id !== id && !session.user.isAdmin)) {
    return res.status(403).json({ error: 'Unauthorized access' });
  }
  
  const userData = await getUserData(id);
  return res.status(200).json(userData);
}`,
				links: [
					{
						title: "OWASP - Insecure Direct Object References",
						url: "https://owasp.org/www-project-top-ten/2017/A4_2017-Insecure_Direct_Object_References",
					},
				],
			},
			{
				id: "sec-2",
				title: "Cross-Site Scripting (XSS) vulnerability in comment rendering",
				description: "User comments are rendered without proper sanitization, creating an XSS vulnerability.",
				path: "components/Comments.js",
				severity: "Medium",
				timestamp: "5 days ago",
				details:
					"The Comments component renders user-provided content directly using dangerouslySetInnerHTML without sanitization. This allows attackers to inject malicious scripts that would execute in users' browsers.",
				code: `// Vulnerable code
<div 
  dangerouslySetInnerHTML={{ __html: comment.content }} 
/>

// Recommended secure implementation
import DOMPurify from 'dompurify';

<div 
  dangerouslySetInnerHTML={{ 
    __html: DOMPurify.sanitize(comment.content) 
  }} 
/>`,
				links: [
					{
						title: "OWASP - Cross Site Scripting Prevention",
						url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html",
					},
					{
						title: "DOMPurify Documentation",
						url: "https://github.com/cure53/DOMPurify",
					},
				],
			},
		],
		improvementSuggestions: [
			{
				id: "imp-1",
				title: "Replace custom authentication with NextAuth.js",
				description:
					"The current custom authentication implementation could be replaced with NextAuth.js for better security and maintenance.",
				details:
					"Your project is using a custom authentication solution that requires ongoing maintenance. NextAuth.js provides a more comprehensive and secure solution with support for OAuth providers, JWT, and database session storage. This would reduce maintenance overhead and improve security.",
				timestamp: "1 week ago",
				links: [
					{
						title: "NextAuth.js Documentation",
						url: "https://next-auth.js.org/getting-started/introduction",
					},
				],
			},
		],
	},
	{
		id: "findmyklez",
		name: "findmyklez",
		owner: "felixp33",
		url: "www.findmyklez.com",
		repoUrl: "https://github.com/felixp33/findmyklez",
		lastUpdated: "Mar 29",
		lastUpdatedDate: "2025-03-29T15:30:00Z",
		lastActivity: "Enhanced ScoreVisualization component with updated colors",
		branchCount: 3,
		commitCount: 89,
		automaticChanges: [],
		securityRecommendations: [],
		improvementSuggestions: [
			{
				id: "imp-findmyklez-1",
				title: "Consider migrating from Redux to React Context API",
				description: "Your state management needs could be simplified by using React Context API instead of Redux.",
				details:
					"The current implementation uses Redux for state management, but the application's state complexity doesn't necessarily warrant Redux. React Context API with hooks (useReducer, useState) could provide a simpler solution with less boilerplate code.",
				timestamp: "2 weeks ago",
				links: [
					{
						title: "React Context API Documentation",
						url: "https://reactjs.org/docs/context.html",
					},
				],
			},
		],
	},
	{
		id: "flatswaps",
		name: "flatswaps",
		owner: "felixp33",
		url: "www.flatswaps.com",
		repoUrl: "https://github.com/felixp33/flatmatch",
		lastUpdated: "Jan 5",
		lastUpdatedDate: "2025-01-05T09:45:00Z",
		lastActivity: "Added moving process, storage facilities and rental van features",
		branchCount: 8,
		commitCount: 243,
		automaticChanges: [
			{
				id: "auto-flatswaps-1",
				title: "Updated Node.js version in deployment workflow",
				description:
					"The CI/CD workflow was updated to use a more recent Node.js version for security and performance improvements.",
				path: ".github/workflows/deploy.yml",
				timestamp: "1 month ago",
				code: `- uses: actions/setup-node@v2
  with:
-   node-version: '14'
+   node-version: '18'`,
			},
		],
		securityRecommendations: [
			{
				id: "sec-flatswaps-1",
				title: "API keys exposed in client-side code",
				description:
					"Several API keys are hardcoded in client-side JavaScript files, making them visible to users.",
				details:
					"API keys for third-party services (Google Maps, Stripe) are currently hardcoded in client-side JavaScript files. These should be moved to environment variables on the server side and accessed via secure API endpoints to prevent misuse.",
				path: "src/services/api.js",
				severity: "High",
				timestamp: "2 weeks ago",
				code: `// Current implementation (insecure)
const STRIPE_KEY = 'sk_test_abcdefghijklmnopqrstuvwxyz';
const MAPS_API_KEY = 'AIza123456789abcdefghijklmnopqrstuvwxyz';

// Recommended approach
// 1. Use environment variables on the server
// 2. Create server endpoints that use the keys securely
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 3. Call these endpoints from the client instead of using keys directly`,
			},
		],
		improvementSuggestions: [
			{
				id: "imp-flatswaps-1",
				title: "Performance optimization for property listings",
				description: "The property listings page is loading slowly due to unoptimized image loading and rendering.",
				details:
					"Current implementation loads all property images at full resolution immediately, causing slow initial page load. Implementing lazy loading, responsive images, and pagination would significantly improve performance.",
				timestamp: "3 weeks ago",
				code: `// Current implementation
function PropertyList({ properties }) {
  return (
    <div className="property-grid">
      {properties.map(property => (
        <div key={property.id} className="property-card">
          <img src={property.imageUrl} alt={property.title} />
          {/* other property details */}
        </div>
      ))}
    </div>
  );
}

// Recommended implementation
import { useState, useEffect } from 'react';
import Image from 'next/image';

function PropertyList({ properties }) {
  const [visibleProperties, setVisibleProperties] = useState(properties.slice(0, 12));
  const [page, setPage] = useState(1);
  
  const loadMore = () => {
    const nextPage = page + 1;
    setVisibleProperties([
      ...visibleProperties,
      ...properties.slice(page * 12, nextPage * 12)
    ]);
    setPage(nextPage);
  };
  
  return (
    <>
      <div className="property-grid">
        {visibleProperties.map(property => (
          <div key={property.id} className="property-card">
            <div className="image-container">
              <Image
                src={property.imageUrl}
                alt={property.title}
                width={300}
                height={200}
                loading="lazy"
                placeholder="blur"
                blurDataURL={property.thumbnailUrl}
              />
            </div>
            {/* other property details */}
          </div>
        ))}
      </div>
      
      {visibleProperties.length < properties.length && (
        <button onClick={loadMore} className="load-more-btn">
          Load More Properties
        </button>
      )}
    </>
  );
}`,
			},
			{
				id: "imp-flatswaps-2",
				title: "Consider migrating to Next.js 14",
				description:
					"Your project is currently using an older version of Next.js. Migrating to version 14 would provide performance improvements and new features.",
				details:
					"Next.js 14 introduces several performance optimizations including improved server components, better image optimization, and more efficient data fetching. The migration would require some code changes but would result in better performance and developer experience.",
				timestamp: "1 month ago",
				links: [
					{
						title: "Next.js 14 Migration Guide",
						url: "https://nextjs.org/docs/upgrading",
					},
				],
			},
		],
	},
];
