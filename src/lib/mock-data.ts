// lib/mock-data.ts
import { Project } from "@/types";

export const MockProjects: Project[] = [
	{
		id: "wavelink",
		name: "wavelink",
		owner: "techcorp",
		url: "wavelink-app.vercel.app",
		repoUrl: "https://github.com/techcorp/wavelink",
		lastUpdated: "2d ago",
		lastUpdatedDate: "2025-05-03T14:30:00Z",
		lastActivity: "Added WebRTC support for video calls",
		branchCount: 7,
		commitCount: 184,
		automaticChanges: [
			{
				id: "auto-wavelink-1",
				title: "Updated vulnerable dependencies",
				description: "Several dependencies were automatically updated to patch known security vulnerabilities.",
				details:
					"CloudGuardian automatically updated the following dependencies to address security issues: socket.io (CVE-2025-1234), uuid (CVE-2025-5678), and jsonwebtoken (CVE-2025-9012).",
				path: "package.json",
				timestamp: "2 days ago",
				code: `- "socket.io": "^4.5.1",
+ "socket.io": "^4.6.2",
- "uuid": "^8.3.2",
+ "uuid": "^9.0.0",
- "jsonwebtoken": "^8.5.1",
+ "jsonwebtoken": "^9.0.1",`,
				links: [
					{
						title: "Socket.io Security Advisory",
						url: "https://github.com/socketio/socket.io/security/advisories/example",
					},
					{
						title: "JWT Security Best Practices",
						url: "https://auth0.com/blog/jwt-security-best-practices/",
					},
				],
			},
		],
		securityRecommendations: [
			{
				id: "sec-wavelink-1",
				title: "Broken authentication in admin API",
				description:
					"The admin API does not properly verify admin privileges, creating a privilege escalation vulnerability.",
				details:
					"The endpoint at /api/admin/users lacks proper role validation. While it checks for authentication, it doesn't verify the user has admin privileges, allowing any authenticated user to access admin functions.",
				path: "src/api/admin/users.ts",
				severity: "High",
				timestamp: "2 days ago",
				code: `// Current vulnerable code
export async function getUsers(req: AuthRequest, res: Response) {
  // Only checks authentication, not admin role
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const users = await db.users.findAll();
  return res.status(200).json(users);
}

// Recommended secure implementation
export async function getUsers(req: AuthRequest, res: Response) {
  // Check both authentication and admin role
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Admin access required' });
  }
  
  const users = await db.users.findAll();
  return res.status(200).json(users);
}`,
				links: [
					{
						title: "OWASP - Broken Access Control",
						url: "https://owasp.org/Top10/A01_2021-Broken_Access_Control/",
					},
				],
			},
			{
				id: "sec-wavelink-2",
				title: "Insufficient rate limiting on login API",
				description: "The login API lacks rate limiting, making it vulnerable to brute force attacks.",
				path: "src/api/auth/login.ts",
				severity: "Medium",
				timestamp: "5 days ago",
				details:
					"The login endpoint does not implement rate limiting, allowing attackers to make unlimited authentication attempts. This makes the application vulnerable to brute force password attacks.",
				code: `// Current vulnerable implementation
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  
  if (!user || !comparePassword(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const token = generateToken(user);
  return res.json({ token });
});

// Recommended secure implementation
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: { error: 'Too many login attempts. Please try again later.' }
});

app.post('/api/auth/login', loginLimiter, async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  
  if (!user || !comparePassword(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const token = generateToken(user);
  return res.json({ token });
});`,
				links: [
					{
						title: "OWASP - Rate Limiting",
						url: "https://cheatsheetseries.owasp.org/cheatsheets/Rate_Limiting_Cheat_Sheet.html",
					},
				],
			},
		],
		improvementSuggestions: [
			{
				id: "imp-wavelink-1",
				title: "Implement WebSocket connection pooling",
				description: "Current WebSocket implementation creates new connections for each client interaction.",
				details:
					"The current implementation creates a new WebSocket connection for each client interaction, which is inefficient and can lead to connection limits. Implementing connection pooling would reduce resource usage and improve performance.",
				timestamp: "1 week ago",
				code: `// Current implementation
function createConnection(userId) {
  return new WebSocket(SOCKET_URL);
}

// Send message
function sendMessage(userId, message) {
  const socket = createConnection(userId);
  socket.onopen = () => {
    socket.send(JSON.stringify(message));
    socket.close();
  };
}

// Recommended implementation
const connectionPool = new Map();

function getConnection(userId) {
  if (!connectionPool.has(userId) || connectionPool.get(userId).readyState !== WebSocket.OPEN) {
    connectionPool.set(userId, new WebSocket(SOCKET_URL));
  }
  return connectionPool.get(userId);
}

// Send message using pooled connection
function sendMessage(userId, message) {
  const socket = getConnection(userId);
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    socket.onopen = () => {
      socket.send(JSON.stringify(message));
    };
  }
}`,
			},
		],
	},
	{
		id: "nextsync",
		name: "nextsync",
		owner: "techcorp",
		url: "www.nextsync.dev",
		repoUrl: "https://github.com/techcorp/nextsync",
		lastUpdated: "1w ago",
		lastUpdatedDate: "2025-04-28T09:15:00Z",
		lastActivity: "Implemented cross-device file syncing",
		branchCount: 5,
		commitCount: 92,
		automaticChanges: [
			{
				id: "auto-nextsync-1",
				title: "Updated CI/CD pipeline to use Node.js 20",
				description: "GitHub Actions workflow was updated to use the latest LTS version of Node.js.",
				path: ".github/workflows/main.yml",
				timestamp: "1 week ago",
				code: `- uses: actions/setup-node@v3
  with:
-   node-version: '18'
+   node-version: '20'`,
			},
		],
		securityRecommendations: [],
		improvementSuggestions: [
			{
				id: "imp-nextsync-1",
				title: "Migrate state management to Zustand",
				description: "Replace Redux with Zustand for simpler state management and better TypeScript integration.",
				details:
					"The current Redux implementation is complex and contains significant boilerplate code. Migrating to Zustand would simplify state management, improve type safety, and reduce bundle size.",
				timestamp: "2 weeks ago",
				code: `// Current Redux implementation
// store.ts
import { configureStore } from '@reduxjs/toolkit';
import fileReducer from './features/fileSlice';
import userReducer from './features/userSlice';
import syncReducer from './features/syncSlice';

export const store = configureStore({
  reducer: {
    files: fileReducer,
    user: userReducer,
    sync: syncReducer,
  },
});

// Usage
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiles } from './features/fileSlice';

function FileBrowser() {
  const dispatch = useDispatch();
  const { files, isLoading, error } = useSelector(state => state.files);
  
  useEffect(() => {
    dispatch(fetchFiles());
  }, [dispatch]);
  
  // Component code
}

// Recommended Zustand implementation
// store.ts
import create from 'zustand';

interface FileState {
  files: File[];
  isLoading: boolean;
  error: string | null;
  fetchFiles: () => Promise<void>;
}

export const useFileStore = create<FileState>((set) => ({
  files: [],
  isLoading: false,
  error: null,
  fetchFiles: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.getFiles();
      set({ files: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

// Usage
import { useFileStore } from './store';

function FileBrowser() {
  const { files, isLoading, error, fetchFiles } = useFileStore();
  
  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);
  
  // Component code
}`,
				links: [
					{
						title: "Zustand Documentation",
						url: "https://github.com/pmndrs/zustand",
					},
				],
			},
			{
				id: "imp-nextsync-2",
				title: "Implement file chunking for large file uploads",
				description: "Improve large file upload reliability by implementing chunked file transfers.",
				details:
					"The current file upload system sends the entire file in a single request, which can fail for large files or on unstable connections. Implementing file chunking would allow resumable uploads and better progress tracking.",
				timestamp: "3 weeks ago",
				links: [
					{
						title: "File Upload Best Practices",
						url: "https://web.dev/patterns/files/",
					},
				],
			},
		],
	},
	{
		id: "codetracker",
		name: "codetracker",
		owner: "devstudio",
		url: "codetracker.devstudio.io",
		repoUrl: "https://github.com/devstudio/codetracker",
		lastUpdated: "Apr 15",
		lastUpdatedDate: "2025-04-15T16:45:00Z",
		lastActivity: "Redesigned analytics dashboard with chart.js",
		branchCount: 9,
		commitCount: 214,
		automaticChanges: [],
		securityRecommendations: [
			{
				id: "sec-codetracker-1",
				title: "SQL injection vulnerability in search functionality",
				description: "The project search feature is vulnerable to SQL injection attacks.",
				details:
					"The search endpoint directly concatenates user input into SQL queries without proper parameterization. This allows attackers to inject malicious SQL code that could extract sensitive data or damage the database.",
				path: "src/services/projectService.js",
				severity: "High",
				timestamp: "2 weeks ago",
				code: `// Current vulnerable code
export async function searchProjects(query) {
  const sql = \`SELECT * FROM projects WHERE name LIKE '%\${query}%' OR description LIKE '%\${query}%'\`;
  return db.query(sql);
}

// Recommended secure implementation
export async function searchProjects(query) {
  const sql = \`SELECT * FROM projects WHERE name LIKE ? OR description LIKE ?\`;
  const params = [\`%\${query}%\`, \`%\${query}%\`];
  return db.query(sql, params);
}`,
				links: [
					{
						title: "OWASP - SQL Injection Prevention",
						url: "https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html",
					},
				],
			},
		],
		improvementSuggestions: [
			{
				id: "imp-codetracker-1",
				title: "Implement virtual scrolling for activity logs",
				description: "Activity log pages load slowly due to rendering thousands of items at once.",
				details:
					"The activity log component currently loads and renders all items at once, causing performance issues with large datasets. Implementing virtual scrolling would significantly improve page performance and user experience.",
				timestamp: "1 month ago",
				code: `// Current implementation
function ActivityLogList({ projectId }) {
  const [logs, setLogs] = useState([]);
  
  useEffect(() => {
    async function fetchLogs() {
      const response = await api.getActivityLogs(projectId);
      setLogs(response.data);
    }
    fetchLogs();
  }, [projectId]);
  
  return (
    <div className="activity-log">
      {logs.map(log => (
        <ActivityLogItem key={log.id} log={log} />
      ))}
    </div>
  );
}

// Recommended implementation with virtual scrolling
import { FixedSizeList } from 'react-window';

function ActivityLogList({ projectId }) {
  const [logs, setLogs] = useState([]);
  
  useEffect(() => {
    async function fetchLogs() {
      const response = await api.getActivityLogs(projectId);
      setLogs(response.data);
    }
    fetchLogs();
  }, [projectId]);
  
  const Row = ({ index, style }) => (
    <div style={style}>
      <ActivityLogItem log={logs[index]} />
    </div>
  );
  
  return (
    <FixedSizeList
      height={500}
      width="100%"
      itemCount={logs.length}
      itemSize={60}
    >
      {Row}
    </FixedSizeList>
  );
}`,
				links: [
					{
						title: "React Window Documentation",
						url: "https://github.com/bvaughn/react-window",
					},
				],
			},
			{
				id: "imp-codetracker-2",
				title: "Implement data caching with SWR",
				description: "API requests are repeated unnecessarily when navigating between pages.",
				details:
					"The application currently makes fresh API requests each time a component mounts, even if the data was recently fetched. Implementing SWR would provide efficient caching, revalidation, and improved user experience with stale-while-revalidate pattern.",
				timestamp: "3 weeks ago",
				code: `// Current implementation
function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      try {
        const response = await api.getProjects();
        setProjects(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProjects();
  }, []);
  
  if (loading) return <LoadingSpinner />;
  
  return (
    <div className="dashboard">
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  ); 
}

// Recommended implementation with SWR
import useSWR from 'swr';

function Dashboard() {
  const { data: projects, error, isLoading } = useSWR(
    '/api/projects',
    () => api.getProjects().then(res => res.data)
  );
  
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return (
    <div className="dashboard">
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}`,
				links: [
					{
						title: "SWR Documentation",
						url: "https://swr.vercel.app/",
					},
				],
			},
		],
	},
	{
		id: "quickstore",
		name: "quickstore",
		owner: "ecomtech",
		url: "www.quickstore.app",
		repoUrl: "https://github.com/ecomtech/quickstore",
		lastUpdated: "Mar 20",
		lastUpdatedDate: "2025-03-20T11:20:00Z",
		lastActivity: "Added multi-currency support",
		branchCount: 4,
		commitCount: 156,
		automaticChanges: [
			{
				id: "auto-quickstore-1",
				title: "Fixed dependency conflict in package.json",
				description: "Resolved conflicting dependency versions between main package and subpackages.",
				path: "package.json",
				timestamp: "1 month ago",
				code: `- "react-query": "^3.39.2",
+ "react-query": "^3.39.3",
  "dependencies": {
    // ...
-   "@tanstack/react-query": "^4.28.0",
+   "@tanstack/react-query": "^4.29.5",`,
			},
		],
		securityRecommendations: [
			{
				id: "sec-quickstore-1",
				title: "Insecure storage of payment information",
				description: "Customer payment details are being stored insecurely in local storage.",
				details:
					"The checkout component is storing credit card information in browser local storage without encryption. This exposes sensitive payment information to XSS attacks and browser security breaches.",
				path: "src/components/checkout/PaymentForm.js",
				timestamp: "2 weeks ago",
				code: `// Current vulnerable code
function savePaymentDetails(cardInfo) {
  localStorage.setItem('savedPaymentMethod', JSON.stringify({
    cardNumber: cardInfo.cardNumber,
    cardHolder: cardInfo.cardHolder,
    expiryDate: cardInfo.expiryDate,
    cvv: cardInfo.cvv
  }));
}

// Recommended secure implementation
// 1. Don't store full card details at all
// 2. If needed, use a payment token system
function savePaymentDetails(cardInfo) {
  // Only store last 4 digits for reference
  localStorage.setItem('savedPaymentMethod', JSON.stringify({
    lastFourDigits: cardInfo.cardNumber.slice(-4),
    cardHolder: cardInfo.cardHolder,
    paymentToken: generatePaymentToken(cardInfo)
  }));
}

// 3. Better yet, use a secure payment provider
function processPayment(cardInfo) {
  return securePaymentProvider.createToken(cardInfo)
    .then(token => {
      // Store only the token reference, not actual card details
      localStorage.setItem('paymentTokenRef', token.id);
      return api.processPayment(token.id);
    });
}`,
				links: [
					{
						title: "PCI DSS Guidelines",
						url: "https://www.pcisecuritystandards.org/document_library",
					},
					{
						title: "OWASP - Secure Storage Guidelines",
						url: "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html",
					},
				],
			},
		],
		improvementSuggestions: [
			{
				id: "imp-quickstore-1",
				title: "Implement service worker for offline functionality",
				description:
					"The application doesn't work without an internet connection. Adding offline support would improve user experience.",
				details:
					"Implementing a service worker would allow the app to cache critical resources and provide basic functionality when users lose their internet connection. This would be especially valuable for the shopping cart and product browsing features.",
				timestamp: "2 months ago",
				links: [
					{
						title: "Service Workers: an Introduction",
						url: "https://developers.google.com/web/fundamentals/primers/service-workers",
					},
				],
			},
		],
	},
	{
		id: "taskflow",
		name: "taskflow",
		owner: "productlab",
		url: "taskflow.productlab.co",
		repoUrl: "https://github.com/productlab/taskflow",
		lastUpdated: "Feb 12",
		lastUpdatedDate: "2025-02-12T14:10:00Z",
		lastActivity: "Implemented Kanban board drag-and-drop functionality",
		branchCount: 6,
		commitCount: 178,
		automaticChanges: [
			{
				id: "auto-taskflow-1",
				title: "Updated webpack configuration for better performance",
				description: "Webpack build configuration was updated to improve bundle size and build performance.",
				path: "webpack.config.js",
				timestamp: "2 months ago",
				code: `module.exports = {
-  mode: 'development',
+  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
   // ...
+  optimization: {
+    splitChunks: {
+      chunks: 'all',
+      maxInitialRequests: Infinity,
+      minSize: 0,
+      cacheGroups: {
+        vendor: {
+          test: /[\\/]node_modules[\\/]/,
+          name(module) {
+            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
+            return \`npm.\${packageName.replace('@', '')}\`;
+          },
+        },
+      },
+    },
+  },`,
			},
		],
		securityRecommendations: [],
		improvementSuggestions: [
			{
				id: "imp-taskflow-1",
				title: "Implement optimistic UI updates",
				description:
					"Current task operations wait for server response before updating UI, creating perceived slowness.",
				details:
					"Task operations like status updates and assignments wait for server confirmation before updating the UI. Implementing optimistic updates would make the application feel more responsive by updating the UI immediately while processing the server request in the background.",
				timestamp: "3 months ago",
				code: `// Current implementation
function updateTaskStatus(taskId, newStatus) {
  setIsLoading(true);
  
  return api.updateTask(taskId, { status: newStatus })
    .then(updatedTask => {
      // Update local state only after server confirms
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? updatedTask : task
        )
      );
      setIsLoading(false);
    })
    .catch(error => {
      setError(error.message);
      setIsLoading(false);
    });
}

// Recommended implementation with optimistic updates
function updateTaskStatus(taskId, newStatus) {
  // Immediately update UI
  setTasks(prevTasks =>
    prevTasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    )
  );
  
  // Then send request to server
  return api.updateTask(taskId, { status: newStatus })
    .catch(error => {
      // Revert changes if request fails
      setError(\`Failed to update task: \${error.message}\`);
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId
            ? { ...task, status: task.originalStatus }
            : task
        )
      );
    });
}`,
			},
		],
	},
];
