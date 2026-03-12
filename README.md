# DevPulse — Developer Analytics Dashboard

A sophisticated, real-time analytics dashboard that combines **software engineering metrics** with **data analytics** to provide comprehensive visibility into team productivity, code quality, pipeline health, and developer contributions.

## Overview

DevPulse is built for engineering teams who need to understand their development velocity, code quality trends, and operational metrics in one unified interface. It bridges the gap between traditional project management dashboards and deep technical analytics.

### Key Features

**Engineering Intelligence**
- **Commit Activity** — Year-long contribution heatmap, monthly commit volume, and recent commit feed
- **Code Quality** — Coverage trends, complexity analysis, tech debt tracking, and per-repository health scores
- **Team Velocity** — Sprint metrics, burndown charts, and contributor leaderboards
- **Contributors** — Individual developer profiles with performance radar charts

**Data & Operations**
- **Data Pipeline** — ETL job monitoring, 24-hour throughput charts, and data quality dimension scores
- **Alerts** — Centralized notification center with severity-coded alerts
- **Real-time Status** — Live metrics updated every 2 minutes

**Intelligent Insights**
- Multi-dimensional data visualization (area charts, bar charts, radar charts, heatmaps)
- Trend indicators (↑↓ percentage changes on all KPIs)
- Comparative analysis across repositories and team members

---

## Quick Start

### Prerequisites
- **Node.js** 18+ and **pnpm** 10+
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

```bash
# Clone or download the project
cd dev-analytics-dashboard

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

The dashboard will be available at `http://localhost:5173` (or the next available port).

### Build for Production

```bash
pnpm build
pnpm preview
```

---

## Dashboard Pages

### 1. **Overview** (Home)
The landing page with a comprehensive snapshot of team metrics.

**Displays:**
- 6 KPI cards: Total Commits, PRs Merged, Avg Cycle Time, Test Coverage, Active Pipelines, Data Processed
- Commit Activity chart (monthly volume with additions/deletions)
- Language Mix pie chart (codebase distribution)
- Repository Health grid (per-repo status)
- Pipeline Status summary

**Use Case:** Daily standup reference, executive reporting, quick health check

---

### 2. **Commit Activity**
Deep dive into version control history and contribution patterns.

**Displays:**
- Contribution heatmap (52 weeks × 7 days, color-coded by commit frequency)
- Monthly commit volume chart (commits, additions, deletions)
- Recent commits feed (7 latest commits with authors, repos, diff stats)
- YTD totals (total commits, lines added, lines removed)

**Use Case:** Understanding development patterns, identifying active periods, tracking code churn

---

### 3. **Code Quality**
Comprehensive code health and quality metrics.

**Displays:**
- Coverage trend chart (12-month line)
- Complexity radar (5 dimensions: Coverage, Complexity, Duplication, Maintainability, Security)
- Per-repository coverage breakdown
- Tech debt by repository
- Quality threshold warnings

**Use Case:** Quality gate decisions, tech debt prioritization, coverage trend analysis

---

### 4. **Team Velocity**
Sprint planning and team performance metrics.

**Displays:**
- Sprint velocity bars (story points completed per sprint)
- Burndown chart (ideal vs. actual progress)
- Contributor leaderboard (commits, PRs, impact score)
- Average cycle time by contributor
- Sprint completion percentage

**Use Case:** Sprint planning, capacity planning, identifying bottlenecks

---

### 5. **Data Pipeline**
ETL and data infrastructure monitoring.

**Displays:**
- 24-hour throughput chart (records processed, errors)
- ETL job status table (with run/pause controls)
- Job success rate, duration, and record counts
- Data quality dimension scores (accuracy, completeness, timeliness, consistency, validity, uniqueness)
- Overall data quality percentage

**Use Case:** Pipeline health monitoring, SLA tracking, data quality assurance

---

### 6. **Contributors**
Individual developer profiles and performance analysis.

**Displays:**
- Developer cards with avatar, role, and stats
- Radar charts per developer (commits, PRs, reviews, output, cleanup)
- Lines added/removed per contributor
- Sortable by commits, PRs, or reviews

**Use Case:** Recognition, performance review, workload balancing

---

### 7. **Alerts**
Centralized notification and warning center.

**Displays:**
- Severity-coded alerts (error, warning, info, success)
- Alert feed with timestamps
- Pipeline failures, quality threshold breaches, SLA violations
- Read/unread status

**Use Case:** Issue triage, incident response, alert management

---

### 8. **Settings**
Configuration and integration hub (placeholder for future expansion).

**Sections:**
- Notifications (alert thresholds)
- Security & Access (permissions, API keys)
- Data Sources (GitHub, Jira, SonarQube integrations)
- Team Management
- Appearance (theme, layout customization)

---

## Design System

### Visual Philosophy: Data Cartography

The dashboard follows a **scientific data visualization** aesthetic inspired by cartographic precision and warm, analytical color palettes.

**Color Palette:**
- **Base:** Warm parchment (`#F8F6F1`) with soft dot-grid texture
- **Primary Accent:** Teal (`oklch(0.62 0.12 185)`) — represents data flow and insights
- **Secondary Accent:** Amber (`oklch(0.75 0.17 75)`) — highlights warnings and important metrics
- **Structural:** Deep slate (`oklch(0.235 0.015 65)`) — text and borders

**Typography:**
- **Display/Metrics:** `Syne` (bold, geometric) — for KPI numbers and section titles
- **Body/UI:** `DM Sans` (modern, readable) — for descriptions and UI labels
- **Code/Hashes:** `JetBrains Mono` (monospace) — for commit hashes, technical values

**Layout Principles:**
- Fixed left sidebar with collapsible navigation
- Masonry-inspired card grid with intentional size variation
- Generous whitespace for breathing room
- Soft shadows and subtle gradients for depth
- Left-border accent on key cards

**Interactions:**
- Smooth Framer Motion animations on page transitions
- Hover effects on interactive elements
- Staggered entrance animations for card grids
- Live status indicators with pulse animations

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend Framework** | React 19 + TypeScript | Component-based UI with type safety |
| **Styling** | Tailwind CSS 4 + OKLCH colors | Utility-first CSS with advanced color space |
| **UI Components** | shadcn/ui + Radix UI | Accessible, composable component library |
| **Routing** | Wouter | Lightweight client-side routing |
| **Charts** | Recharts | Composable, responsive data visualizations |
| **Animation** | Framer Motion | Declarative motion library |
| **Notifications** | Sonner | Toast notifications |
| **Build Tool** | Vite | Lightning-fast dev server and bundling |
| **Package Manager** | pnpm | Fast, disk-space efficient package management |

---

## Project Structure

```
dev-analytics-dashboard/
├── client/
│   ├── public/              # Static assets (favicon, robots.txt)
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── DashboardLayout.tsx    # Main layout with sidebar
│   │   │   ├── ErrorBoundary.tsx      # Error handling
│   │   │   └── ui/                    # shadcn/ui components
│   │   ├── contexts/        # React contexts (Theme)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/
│   │   │   ├── data.ts      # Demo data and constants
│   │   │   └── utils.ts     # Utility functions
│   │   ├── pages/           # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── CommitActivity.tsx
│   │   │   ├── CodeQuality.tsx
│   │   │   ├── TeamVelocity.tsx
│   │   │   ├── DataPipeline.tsx
│   │   │   ├── Contributors.tsx
│   │   │   ├── Alerts.tsx
│   │   │   ├── SettingsPage.tsx
│   │   │   └── NotFound.tsx
│   │   ├── App.tsx          # Route definitions
│   │   ├── main.tsx         # React entry point
│   │   └── index.css        # Global styles and design tokens
│   └── index.html           # HTML template
├── server/                  # Express server (static hosting)
├── shared/                  # Shared types
├── package.json             # Dependencies and scripts
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite configuration
```

---

## Demo Data

All data is currently simulated for demonstration purposes. The data module (`client/src/lib/data.ts`) exports:

- **COMMIT_ACTIVITY** — Monthly commit statistics
- **CODE_QUALITY_TREND** — 12-month coverage trend
- **REPOSITORIES** — Per-repo quality metrics
- **SPRINT_DATA** — Sprint velocity data
- **BURNDOWN_DATA** — Sprint burndown chart
- **TEAM_MEMBERS** — Developer profiles
- **PIPELINE_JOBS** — ETL job status
- **PIPELINE_THROUGHPUT** — 24-hour throughput data
- **DATA_QUALITY_METRICS** — Data quality dimension scores

---

## Customization

### Connecting Real Data

To connect to live data sources:

1. **GitHub API** — Replace demo data in `data.ts` with GitHub REST API calls
2. **SonarQube** — Integrate code quality metrics from SonarQube API
3. **Jira** — Pull sprint and velocity data from Jira
4. **Custom Backend** — Build an Express API layer to aggregate multiple sources

### Theming

Edit `client/src/index.css` to customize:
- Color palette (OKLCH color space)
- Typography (font families, sizes)
- Spacing and radius tokens
- Light/dark mode colors

### Adding New Pages

1. Create a new component in `client/src/pages/`
2. Add a route in `client/src/App.tsx`
3. Add navigation item in `client/src/components/DashboardLayout.tsx`

---

## Performance Considerations

- **Code Splitting:** Vite automatically splits routes into separate chunks
- **Image Optimization:** Hero banners use CDN-hosted images
- **Chart Rendering:** Recharts optimizes for large datasets
- **Animation Performance:** Framer Motion uses GPU acceleration
- **Bundle Size:** ~180KB gzipped (React, Recharts, Framer Motion included)

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Future Enhancements

- [ ] Real GitHub API integration
- [ ] Dark mode toggle
- [ ] Date range filtering
- [ ] Custom dashboard layouts
- [ ] Export reports (PDF, CSV)
- [ ] Slack/email notifications
- [ ] Role-based access control
- [ ] Custom alert rules
- [ ] Team comparison views
- [ ] Historical trend analysis

---

## License

MIT

---

## Support

For issues, feature requests, or questions, please refer to the technical documentation below or review the inline code comments throughout the project.

---

**Built with ❤️ for engineering teams who care about metrics that matter.**
