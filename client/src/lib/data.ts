// ============================================================
// DevPulse — Demo Data Module
// All data is synthetic/demo. Structured to mirror real GitHub/Jira/SonarQube APIs.
// ============================================================

export const TEAM_MEMBERS = [
  { id: 1, name: "Aria Chen", avatar: "AC", role: "Senior Engineer", commits: 187, prs: 34, reviews: 52, linesAdded: 12400, linesRemoved: 8200 },
  { id: 2, name: "Marcus Webb", avatar: "MW", role: "Staff Engineer", commits: 142, prs: 28, reviews: 89, linesAdded: 9800, linesRemoved: 11200 },
  { id: 3, name: "Priya Nair", avatar: "PN", role: "Data Engineer", commits: 203, prs: 41, reviews: 37, linesAdded: 18700, linesRemoved: 6300 },
  { id: 4, name: "Jordan Kim", avatar: "JK", role: "Backend Engineer", commits: 156, prs: 29, reviews: 44, linesAdded: 10200, linesRemoved: 7800 },
  { id: 5, name: "Sam Torres", avatar: "ST", role: "Frontend Engineer", commits: 118, prs: 22, reviews: 31, linesAdded: 8900, linesRemoved: 5400 },
  { id: 6, name: "Alex Rivera", avatar: "AR", role: "DevOps Engineer", commits: 94, prs: 18, reviews: 28, linesAdded: 6200, linesRemoved: 9100 },
];

export const COMMIT_ACTIVITY = [
  { date: "Jan", commits: 312, additions: 18400, deletions: 12100 },
  { date: "Feb", commits: 287, additions: 16200, deletions: 10800 },
  { date: "Mar", commits: 398, additions: 24600, deletions: 15300 },
  { date: "Apr", commits: 342, additions: 20100, deletions: 13700 },
  { date: "May", commits: 421, additions: 27800, deletions: 18200 },
  { date: "Jun", commits: 389, additions: 23400, deletions: 16100 },
  { date: "Jul", commits: 456, additions: 31200, deletions: 19800 },
  { date: "Aug", commits: 412, additions: 28700, deletions: 17400 },
  { date: "Sep", commits: 478, additions: 33100, deletions: 21600 },
  { date: "Oct", commits: 502, additions: 36400, deletions: 23200 },
  { date: "Nov", commits: 467, additions: 32800, deletions: 20900 },
  { date: "Dec", commits: 389, additions: 26100, deletions: 17300 },
];

export const PR_METRICS = [
  { week: "W1", opened: 18, merged: 15, closed: 2, avgCycleHours: 14.2 },
  { week: "W2", opened: 22, merged: 19, closed: 1, avgCycleHours: 11.8 },
  { week: "W3", opened: 16, merged: 14, closed: 3, avgCycleHours: 16.4 },
  { week: "W4", opened: 25, merged: 21, closed: 2, avgCycleHours: 10.1 },
  { week: "W5", opened: 20, merged: 18, closed: 1, avgCycleHours: 12.7 },
  { week: "W6", opened: 28, merged: 24, closed: 3, avgCycleHours: 9.8 },
  { week: "W7", opened: 19, merged: 17, closed: 2, avgCycleHours: 13.5 },
  { week: "W8", opened: 31, merged: 27, closed: 1, avgCycleHours: 8.9 },
];

export const CODE_QUALITY_TREND = [
  { month: "Jul", coverage: 71.2, complexity: 18.4, duplication: 8.2, bugs: 24, vulnerabilities: 3 },
  { month: "Aug", coverage: 73.8, complexity: 17.9, duplication: 7.8, bugs: 19, vulnerabilities: 2 },
  { month: "Sep", coverage: 75.1, complexity: 17.2, duplication: 7.1, bugs: 16, vulnerabilities: 2 },
  { month: "Oct", coverage: 77.4, complexity: 16.8, duplication: 6.5, bugs: 12, vulnerabilities: 1 },
  { month: "Nov", coverage: 79.2, complexity: 16.1, duplication: 5.9, bugs: 9, vulnerabilities: 1 },
  { month: "Dec", coverage: 81.6, complexity: 15.4, duplication: 5.2, bugs: 7, vulnerabilities: 0 },
];

export const REPOSITORIES = [
  { name: "api-gateway", language: "Go", stars: 234, coverage: 84.2, complexity: 12.1, issues: 3, lastCommit: "2h ago", status: "healthy" as const },
  { name: "data-pipeline", language: "Python", stars: 189, coverage: 78.6, complexity: 18.7, issues: 7, lastCommit: "4h ago", status: "warning" as const },
  { name: "web-frontend", language: "TypeScript", stars: 156, coverage: 82.1, complexity: 14.3, issues: 2, lastCommit: "1h ago", status: "healthy" as const },
  { name: "ml-inference", language: "Python", stars: 312, coverage: 71.4, complexity: 22.8, issues: 14, lastCommit: "6h ago", status: "warning" as const },
  { name: "auth-service", language: "Rust", stars: 98, coverage: 91.3, complexity: 9.6, issues: 0, lastCommit: "30m ago", status: "healthy" as const },
  { name: "notification-svc", language: "Node.js", stars: 67, coverage: 65.2, complexity: 16.4, issues: 21, lastCommit: "2d ago", status: "error" as const },
];

export const SPRINT_DATA = [
  { sprint: "S1", planned: 42, completed: 38, velocity: 38, bugs: 4 },
  { sprint: "S2", planned: 40, completed: 35, velocity: 35, bugs: 6 },
  { sprint: "S3", planned: 45, completed: 43, velocity: 43, bugs: 2 },
  { sprint: "S4", planned: 48, completed: 44, velocity: 44, bugs: 3 },
  { sprint: "S5", planned: 46, completed: 46, velocity: 46, bugs: 1 },
  { sprint: "S6", planned: 50, completed: 47, velocity: 47, bugs: 2 },
  { sprint: "S7", planned: 52, completed: 49, velocity: 49, bugs: 3 },
  { sprint: "S8", planned: 55, completed: 53, velocity: 53, bugs: 1 },
];

export const BURNDOWN_DATA = [
  { day: "Day 1", ideal: 80, actual: 80 },
  { day: "Day 2", ideal: 73, actual: 76 },
  { day: "Day 3", ideal: 66, actual: 71 },
  { day: "Day 4", ideal: 59, actual: 65 },
  { day: "Day 5", ideal: 52, actual: 58 },
  { day: "Day 6", ideal: 45, actual: 49 },
  { day: "Day 7", ideal: 38, actual: 41 },
  { day: "Day 8", ideal: 31, actual: 33 },
  { day: "Day 9", ideal: 24, actual: 24 },
  { day: "Day 10", ideal: 17, actual: 18 },
];

export const PIPELINE_JOBS = [
  { id: "etl-001", name: "User Events Ingestion", type: "ETL", status: "running" as const, duration: "4m 12s", records: 2847293, lastRun: "2 min ago", successRate: 99.2 },
  { id: "etl-002", name: "Product Analytics Sync", type: "ETL", status: "success" as const, duration: "1m 48s", records: 184729, lastRun: "15 min ago", successRate: 100 },
  { id: "etl-003", name: "Revenue Aggregation", type: "Transform", status: "success" as const, duration: "3m 22s", records: 48291, lastRun: "1h ago", successRate: 98.7 },
  { id: "etl-004", name: "ML Feature Store Update", type: "Load", status: "failed" as const, duration: "0m 43s", records: 0, lastRun: "2h ago", successRate: 87.4 },
  { id: "etl-005", name: "Audit Log Archival", type: "ETL", status: "success" as const, duration: "8m 14s", records: 9284721, lastRun: "3h ago", successRate: 100 },
  { id: "etl-006", name: "Search Index Rebuild", type: "Transform", status: "warning" as const, duration: "12m 07s", records: 1284920, lastRun: "4h ago", successRate: 94.1 },
  { id: "etl-007", name: "Cold Storage Migration", type: "Load", status: "running" as const, duration: "18m 33s", records: 48291847, lastRun: "Running now", successRate: 99.8 },
];

export const DATA_QUALITY_METRICS = [
  { dimension: "Completeness", score: 96.4, trend: +1.2 },
  { dimension: "Accuracy", score: 94.1, trend: +0.8 },
  { dimension: "Consistency", score: 91.7, trend: -0.3 },
  { dimension: "Timeliness", score: 88.9, trend: +2.1 },
  { dimension: "Validity", score: 97.2, trend: +0.5 },
  { dimension: "Uniqueness", score: 99.1, trend: 0 },
];

export const PIPELINE_THROUGHPUT = [
  { hour: "00:00", records: 124000, errors: 320 },
  { hour: "02:00", records: 98000, errors: 180 },
  { hour: "04:00", records: 87000, errors: 140 },
  { hour: "06:00", records: 142000, errors: 290 },
  { hour: "08:00", records: 387000, errors: 820 },
  { hour: "10:00", records: 512000, errors: 1240 },
  { hour: "12:00", records: 498000, errors: 980 },
  { hour: "14:00", records: 534000, errors: 1100 },
  { hour: "16:00", records: 489000, errors: 870 },
  { hour: "18:00", records: 421000, errors: 740 },
  { hour: "20:00", records: 312000, errors: 520 },
  { hour: "22:00", records: 198000, errors: 380 },
];

export const LANGUAGE_DISTRIBUTION = [
  { name: "TypeScript", value: 38, color: "#0EA5A0" },
  { name: "Python", value: 27, color: "#F59E0B" },
  { name: "Go", value: 18, color: "#1C2333" },
  { name: "Rust", value: 9, color: "#F43F5E" },
  { name: "Other", value: 8, color: "#94A3B8" },
];

export const KPI_CARDS = [
  { label: "Total Commits (30d)", value: "1,847", change: +12.4, unit: "", accent: "teal" as const },
  { label: "PRs Merged (30d)", value: "203", change: +8.7, unit: "", accent: "amber" as const },
  { label: "Avg Cycle Time", value: "11.4", change: -18.2, unit: "hrs", accent: "teal" as const },
  { label: "Test Coverage", value: "81.6", change: +3.1, unit: "%", accent: "green" as const },
  { label: "Active Pipelines", value: "24", change: +2, unit: "", accent: "slate" as const },
  { label: "Data Processed (24h)", value: "4.2", change: +6.8, unit: "TB", accent: "amber" as const },
];
