// ============================================================
// Overview Page — KPI cards, commit activity, PR metrics, language distribution
// Design: Data Cartography — warm parchment, teal/amber accents
// ============================================================

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { TrendingUp, TrendingDown, GitCommit, GitPullRequest, Clock, Shield, Database, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";
import {
  KPI_CARDS, COMMIT_ACTIVITY, PR_METRICS, LANGUAGE_DISTRIBUTION,
  REPOSITORIES, PIPELINE_JOBS
} from "@/lib/data";
import { cn } from "@/lib/utils";

const ACCENT_COLORS = {
  teal: "oklch(0.62 0.12 185)",
  amber: "oklch(0.75 0.17 75)",
  green: "oklch(0.70 0.14 145)",
  slate: "oklch(0.55 0.10 260)",
  rose: "oklch(0.60 0.22 15)",
};

const KPI_ICONS = [GitCommit, GitPullRequest, Clock, Shield, Layers, Database];

function AnimatedNumber({ value, suffix = "" }: { value: string; suffix?: string }) {
  return (
    <span className="metric-number text-3xl text-foreground">
      {value}<span className="text-lg text-muted-foreground ml-0.5">{suffix}</span>
    </span>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 max-w-[1400px]">
        {/* Hero banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-xl border border-border"
          style={{ minHeight: 180 }}
        >
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663428592179/96fqFLJopBTuWjAeD6eEFN/dashboard-hero-bg-2c84AbtBK5MS9Zmi9BmZA2.webp"
            alt="Dashboard hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.22_0.025_260_/_0.85)] via-[oklch(0.22_0.025_260_/_0.5)] to-transparent" />
          <div className="relative z-10 p-8">
            <div className="text-[oklch(0.62_0.12_185)] text-xs font-semibold tracking-widest uppercase mb-2">
              Engineering Intelligence
            </div>
            <h1 className="font-['Syne'] text-3xl font-extrabold text-white mb-2">
              Team Overview
            </h1>
            <p className="text-[oklch(0.78_0.012_260)] text-sm max-w-md">
              Real-time metrics across commits, pull requests, code quality, and data pipelines.
              Last 30 days · 6 contributors · 12 repositories
            </p>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4"
        >
          {KPI_CARDS.map((kpi, i) => {
            const Icon = KPI_ICONS[i];
            const isPositive = kpi.change > 0;
            const accentColor = ACCENT_COLORS[kpi.accent];
            return (
              <motion.div key={kpi.label} variants={itemVariants}>
                <Card className={cn(
                  "relative overflow-hidden hover:shadow-md transition-shadow duration-200",
                  `card-accent-${kpi.accent}`
                )}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className="w-8 h-8 rounded-md flex items-center justify-center"
                        style={{ background: `${accentColor}20` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: accentColor }} />
                      </div>
                      <span className={cn(
                        "flex items-center gap-0.5 text-xs font-medium",
                        isPositive ? "text-[oklch(0.55_0.14_145)]" : "text-[oklch(0.50_0.20_15)]"
                      )}>
                        {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {Math.abs(kpi.change)}%
                      </span>
                    </div>
                    <AnimatedNumber value={kpi.value} suffix={kpi.unit} />
                    <p className="text-muted-foreground text-xs mt-1 leading-tight">{kpi.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Commit Activity — wide */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-['Syne'] font-700">Commit Activity</CardTitle>
                <CardDescription>Monthly commits with additions & deletions (2025)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={COMMIT_ACTIVITY} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(0.62 0.12 185)" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="oklch(0.62 0.12 185)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorAdditions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(0.75 0.17 75)" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="oklch(0.75 0.17 75)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.015 85)" />
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: "oklch(0.52 0.018 260)" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "oklch(0.52 0.018 260)" }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        background: "oklch(1 0.005 85)",
                        border: "1px solid oklch(0.88 0.015 85)",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
                    <Area type="monotone" dataKey="commits" stroke="oklch(0.62 0.12 185)" strokeWidth={2} fill="url(#colorCommits)" name="Commits" />
                    <Area type="monotone" dataKey="additions" stroke="oklch(0.75 0.17 75)" strokeWidth={1.5} fill="url(#colorAdditions)" name="Additions" strokeDasharray="4 2" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Language Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-['Syne'] font-700">Language Mix</CardTitle>
                <CardDescription>Codebase distribution by language</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={LANGUAGE_DISTRIBUTION}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {LANGUAGE_DISTRIBUTION.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "oklch(1 0.005 85)",
                        border: "1px solid oklch(0.88 0.015 85)",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                      formatter={(value) => [`${value}%`, ""]}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-1 gap-1.5 w-full mt-2">
                  {LANGUAGE_DISTRIBUTION.map((lang) => (
                    <div key={lang.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-sm" style={{ background: lang.color }} />
                        <span className="text-foreground font-medium">{lang.name}</span>
                      </div>
                      <span className="text-muted-foreground font-mono">{lang.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* PR Metrics + Repos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* PR Velocity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-['Syne'] font-700">PR Velocity</CardTitle>
                <CardDescription>Opened vs merged pull requests by week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={PR_METRICS} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.015 85)" vertical={false} />
                    <XAxis dataKey="week" tick={{ fontSize: 11, fill: "oklch(0.52 0.018 260)" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "oklch(0.52 0.018 260)" }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        background: "oklch(1 0.005 85)",
                        border: "1px solid oklch(0.88 0.015 85)",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
                    <Bar dataKey="opened" fill="oklch(0.75 0.17 75)" name="Opened" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="merged" fill="oklch(0.62 0.12 185)" name="Merged" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Repository Health */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-['Syne'] font-700">Repository Health</CardTitle>
                <CardDescription>Coverage, complexity, and open issues</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {REPOSITORIES.map((repo) => (
                  <div key={repo.name} className={cn(
                    "flex items-center gap-3 p-2.5 rounded-lg border bg-card hover:bg-muted/50 transition-colors",
                    `card-accent-${repo.status === "healthy" ? "teal" : repo.status === "warning" ? "amber" : "rose"}`
                  )}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium font-mono text-foreground truncate">{repo.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{repo.language}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">{repo.lastCommit}</div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-right flex-shrink-0">
                      <div>
                        <div className="font-mono font-medium text-foreground">{repo.coverage}%</div>
                        <div className="text-muted-foreground">cov</div>
                      </div>
                      <div>
                        <div className="font-mono font-medium text-foreground">{repo.issues}</div>
                        <div className="text-muted-foreground">issues</div>
                      </div>
                      <div className={cn(
                        "w-2 h-2 rounded-full flex-shrink-0",
                        repo.status === "healthy" ? "bg-[oklch(0.70_0.14_145)]" :
                        repo.status === "warning" ? "bg-[oklch(0.75_0.17_75)]" :
                        "bg-[oklch(0.60_0.22_15)]"
                      )} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Pipeline quick status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-['Syne'] font-700">Pipeline Status</CardTitle>
              <CardDescription>Active ETL jobs and data processing health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {PIPELINE_JOBS.slice(0, 4).map((job) => (
                  <div key={job.id} className={cn(
                    "p-3 rounded-lg border bg-card",
                    `card-accent-${job.status === "success" ? "teal" : job.status === "running" ? "amber" : job.status === "warning" ? "amber" : "rose"}`
                  )}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={cn(
                        "text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded-full",
                        job.status === "success" ? "bg-[oklch(0.70_0.14_145_/_0.15)] text-[oklch(0.45_0.14_145)]" :
                        job.status === "running" ? "bg-[oklch(0.75_0.17_75_/_0.15)] text-[oklch(0.55_0.15_75)]" :
                        job.status === "warning" ? "bg-[oklch(0.75_0.17_75_/_0.15)] text-[oklch(0.55_0.15_75)]" :
                        "bg-[oklch(0.60_0.22_15_/_0.15)] text-[oklch(0.50_0.20_15)]"
                      )}>
                        {job.status}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-mono">{job.duration}</span>
                    </div>
                    <div className="text-sm font-medium text-foreground truncate">{job.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{job.lastRun}</div>
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
