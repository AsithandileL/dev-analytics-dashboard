// ============================================================
// Commit Activity Page — Detailed commit history, heatmap, and diff stats
// Design: Data Cartography
// ============================================================

import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, ComposedChart, Line
} from "recharts";
import { GitCommit, Plus, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";
import { COMMIT_ACTIVITY } from "@/lib/data";
import { cn } from "@/lib/utils";

// Generate a commit heatmap (52 weeks × 7 days)
function generateHeatmap() {
  const weeks = [];
  for (let w = 0; w < 52; w++) {
    const days = [];
    for (let d = 0; d < 7; d++) {
      const rand = Math.random();
      const val = rand < 0.3 ? 0 : rand < 0.5 ? 1 : rand < 0.7 ? 2 : rand < 0.85 ? 3 : rand < 0.95 ? 4 : 5;
      days.push(val);
    }
    weeks.push(days);
  }
  return weeks;
}

const HEATMAP = generateHeatmap();
const HEATMAP_COLORS = [
  "bg-muted",
  "bg-[oklch(0.85_0.07_185)]",
  "bg-[oklch(0.75_0.09_185)]",
  "bg-[oklch(0.65_0.11_185)]",
  "bg-[oklch(0.55_0.12_185)]",
  "bg-[oklch(0.45_0.13_185)]",
];

const RECENT_COMMITS = [
  { hash: "a3f8c12", message: "feat: add pipeline monitoring dashboard", author: "Priya Nair", time: "2h ago", additions: 284, deletions: 12, repo: "data-pipeline" },
  { hash: "b7e2d45", message: "fix: resolve race condition in auth middleware", author: "Marcus Webb", time: "4h ago", additions: 47, deletions: 89, repo: "auth-service" },
  { hash: "c1a9f78", message: "refactor: extract chart components into shared lib", author: "Sam Torres", time: "5h ago", additions: 156, deletions: 203, repo: "web-frontend" },
  { hash: "d4b3e91", message: "perf: optimize ML inference batch processing", author: "Priya Nair", time: "7h ago", additions: 412, deletions: 38, repo: "ml-inference" },
  { hash: "e6c7a23", message: "chore: upgrade Go dependencies to 1.22", author: "Alex Rivera", time: "9h ago", additions: 23, deletions: 18, repo: "api-gateway" },
  { hash: "f2d8b56", message: "test: add integration tests for payment flow", author: "Jordan Kim", time: "12h ago", additions: 389, deletions: 4, repo: "api-gateway" },
  { hash: "g9e1c34", message: "docs: update API reference for v2 endpoints", author: "Aria Chen", time: "1d ago", additions: 78, deletions: 34, repo: "web-frontend" },
];

export default function CommitActivity() {
  const totalCommits = COMMIT_ACTIVITY.reduce((s, d) => s + d.commits, 0);
  const totalAdditions = COMMIT_ACTIVITY.reduce((s, d) => s + d.additions, 0);
  const totalDeletions = COMMIT_ACTIVITY.reduce((s, d) => s + d.deletions, 0);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 max-w-[1400px]">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-['Syne'] text-2xl font-extrabold text-foreground mb-1">Commit Activity</h1>
          <p className="text-muted-foreground text-sm">Full year commit history, diff statistics, and recent activity feed.</p>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4"
        >
          {[
            { label: "Total Commits (YTD)", value: totalCommits.toLocaleString(), icon: GitCommit, accent: "teal" },
            { label: "Lines Added", value: `+${(totalAdditions / 1000).toFixed(0)}K`, icon: Plus, accent: "green" },
            { label: "Lines Removed", value: `-${(totalDeletions / 1000).toFixed(0)}K`, icon: Minus, accent: "rose" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.label} className={`card-accent-${item.accent}`}>
                <CardContent className="p-4">
                  <Icon className="w-5 h-5 text-muted-foreground mb-3" />
                  <div className="metric-number text-2xl md:text-3xl text-foreground">{item.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>

        {/* Commit Heatmap */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-['Syne'] font-700">Contribution Heatmap</CardTitle>
                  <CardDescription>Commit frequency over the past year</CardDescription>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span>Less</span>
                  {HEATMAP_COLORS.map((c, i) => (
                    <div key={i} className={cn("w-3 h-3 rounded-sm", c)} />
                  ))}
                  <span>More</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="flex gap-0.5 min-w-max">
                  {HEATMAP.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-0.5">
                      {week.map((val, di) => (
                        <div
                          key={di}
                          className={cn("w-3 h-3 rounded-sm transition-opacity hover:opacity-70", HEATMAP_COLORS[val])}
                          title={`${val * 3} commits`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Monthly Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-['Syne'] font-700">Monthly Commit Volume</CardTitle>
              <CardDescription>Commits, additions, and deletions by month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <ComposedChart data={COMMIT_ACTIVITY} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.015 85)" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: "oklch(0.52 0.018 260)" }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="left" tick={{ fontSize: 11, fill: "oklch(0.52 0.018 260)" }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: "oklch(0.52 0.018 260)" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "oklch(1 0.005 85)", border: "1px solid oklch(0.88 0.015 85)", borderRadius: "8px", fontSize: "12px" }} />
                  <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
                  <Bar yAxisId="left" dataKey="additions" fill="oklch(0.70 0.14 145)" name="Additions" radius={[2, 2, 0, 0]} opacity={0.8} />
                  <Bar yAxisId="left" dataKey="deletions" fill="oklch(0.60 0.22 15)" name="Deletions" radius={[2, 2, 0, 0]} opacity={0.7} />
                  <Line yAxisId="right" type="monotone" dataKey="commits" stroke="oklch(0.62 0.12 185)" strokeWidth={2.5} dot={{ r: 4, fill: "oklch(0.62 0.12 185)" }} name="Commits" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Commits Feed */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-['Syne'] font-700">Recent Commits</CardTitle>
              <CardDescription>Latest commits across all repositories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-0">
                {RECENT_COMMITS.map((commit, i) => (
                  <div
                    key={commit.hash}
                    className={cn(
                      "flex items-start gap-3 py-3",
                      i < RECENT_COMMITS.length - 1 && "border-b border-border/50"
                    )}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[oklch(0.62_0.12_185)] to-[oklch(0.55_0.10_260)] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                      {commit.author.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <span className="text-sm font-medium text-foreground">{commit.message}</span>
                        <span className="text-xs text-muted-foreground flex-shrink-0">{commit.time}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs">
                        <span className="font-mono text-muted-foreground">{commit.hash}</span>
                        <span className="text-muted-foreground">{commit.author}</span>
                        <span className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono">{commit.repo}</span>
                        <span className="text-[oklch(0.55_0.14_145)]">+{commit.additions}</span>
                        <span className="text-[oklch(0.60_0.22_15)]">-{commit.deletions}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
