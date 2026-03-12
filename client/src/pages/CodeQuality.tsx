// ============================================================
// Code Quality Page — Coverage trends, complexity, tech debt, sonar-style metrics
// Design: Data Cartography — dark banner + warm card grid
// ============================================================

import { motion } from "framer-motion";
import {
  LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { ShieldCheck, AlertTriangle, Bug, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import DashboardLayout from "@/components/DashboardLayout";
import { CODE_QUALITY_TREND, REPOSITORIES } from "@/lib/data";
import { cn } from "@/lib/utils";

const RADAR_DATA = [
  { metric: "Coverage", value: 82 },
  { metric: "Reliability", value: 91 },
  { metric: "Security", value: 96 },
  { metric: "Maintainability", value: 74 },
  { metric: "Performance", value: 88 },
  { metric: "Duplication", value: 95 },
];

const TECH_DEBT = [
  { category: "Code Smells", count: 47, hours: 12.4, severity: "medium" as const },
  { category: "Bugs", count: 7, hours: 3.2, severity: "high" as const },
  { category: "Vulnerabilities", count: 0, hours: 0, severity: "low" as const },
  { category: "Duplications", count: 23, hours: 5.8, severity: "medium" as const },
  { category: "Complexity", count: 12, hours: 8.1, severity: "high" as const },
];

const SEVERITY_STYLES = {
  high: { bg: "bg-[oklch(0.60_0.22_15_/_0.12)]", text: "text-[oklch(0.50_0.20_15)]", dot: "bg-[oklch(0.60_0.22_15)]" },
  medium: { bg: "bg-[oklch(0.75_0.17_75_/_0.12)]", text: "text-[oklch(0.55_0.15_75)]", dot: "bg-[oklch(0.75_0.17_75)]" },
  low: { bg: "bg-[oklch(0.70_0.14_145_/_0.12)]", text: "text-[oklch(0.45_0.14_145)]", dot: "bg-[oklch(0.70_0.14_145)]" },
};

export default function CodeQuality() {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 max-w-[1400px]">
        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-xl border border-border"
          style={{ minHeight: 160 }}
        >
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663428592179/96fqFLJopBTuWjAeD6eEFN/code-quality-banner-4TK37cm6RKN6BJXKReVP63.webp"
            alt="Code quality banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.12_0.025_260_/_0.92)] via-[oklch(0.12_0.025_260_/_0.7)] to-transparent" />
          <div className="relative z-10 p-8">
            <div className="text-[oklch(0.62_0.12_185)] text-xs font-semibold tracking-widest uppercase mb-2">
              Static Analysis · SonarQube-style
            </div>
            <h1 className="font-['Syne'] text-3xl font-extrabold text-white mb-2">Code Quality</h1>
            <p className="text-[oklch(0.72_0.012_260)] text-sm max-w-md">
              Coverage trends, complexity scores, tech debt estimation, and security vulnerability tracking.
            </p>
          </div>
        </motion.div>

        {/* Quality Score Cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Test Coverage", value: "81.6%", icon: ShieldCheck, accent: "teal", change: "+3.1%", grade: "A" },
            { label: "Bugs (Open)", value: "7", icon: Bug, accent: "rose", change: "-71%", grade: "A" },
            { label: "Vulnerabilities", value: "0", icon: AlertTriangle, accent: "green", change: "0", grade: "A+" },
            { label: "Tech Debt", value: "29.5h", icon: Zap, accent: "amber", change: "-12%", grade: "B+" },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <Card key={item.label} className={`card-accent-${item.accent}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Icon className="w-5 h-5 text-muted-foreground" />
                    <span className={cn(
                      "text-2xl font-['Syne'] font-extrabold px-2 py-0.5 rounded",
                      item.accent === "teal" ? "text-[oklch(0.62_0.12_185)] bg-[oklch(0.62_0.12_185_/_0.1)]" :
                      item.accent === "rose" ? "text-[oklch(0.60_0.22_15)] bg-[oklch(0.60_0.22_15_/_0.1)]" :
                      item.accent === "green" ? "text-[oklch(0.55_0.14_145)] bg-[oklch(0.70_0.14_145_/_0.1)]" :
                      "text-[oklch(0.60_0.15_75)] bg-[oklch(0.75_0.17_75_/_0.1)]"
                    )}>
                      {item.grade}
                    </span>
                  </div>
                  <div className="metric-number text-2xl text-foreground">{item.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
                  <div className={cn(
                    "text-xs font-medium mt-1",
                    item.change.startsWith("+") ? "text-[oklch(0.55_0.14_145)]" :
                    item.change.startsWith("-") && item.accent !== "rose" ? "text-[oklch(0.55_0.14_145)]" :
                    item.change === "0" ? "text-muted-foreground" :
                    "text-[oklch(0.55_0.14_145)]"
                  )}>
                    {item.change} vs last month
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coverage + Complexity Trend */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-['Syne'] font-700">Quality Trend (6 months)</CardTitle>
                <CardDescription>Test coverage improvement vs complexity reduction</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={CODE_QUALITY_TREND} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.015 85)" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "oklch(0.52 0.018 260)" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "oklch(0.52 0.018 260)" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "oklch(1 0.005 85)", border: "1px solid oklch(0.88 0.015 85)", borderRadius: "8px", fontSize: "12px" }} />
                    <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
                    <Line type="monotone" dataKey="coverage" stroke="oklch(0.62 0.12 185)" strokeWidth={2.5} dot={{ r: 4, fill: "oklch(0.62 0.12 185)" }} name="Coverage %" />
                    <Line type="monotone" dataKey="complexity" stroke="oklch(0.75 0.17 75)" strokeWidth={2} dot={{ r: 3, fill: "oklch(0.75 0.17 75)" }} name="Complexity" strokeDasharray="5 3" />
                    <Line type="monotone" dataKey="bugs" stroke="oklch(0.60 0.22 15)" strokeWidth={1.5} dot={{ r: 3, fill: "oklch(0.60 0.22 15)" }} name="Open Bugs" strokeDasharray="3 2" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-['Syne'] font-700">Quality Dimensions</CardTitle>
                <CardDescription>Multi-axis quality assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <RadarChart data={RADAR_DATA}>
                    <PolarGrid stroke="oklch(0.88 0.015 85)" />
                    <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: "oklch(0.52 0.018 260)" }} />
                    <Radar name="Score" dataKey="value" stroke="oklch(0.62 0.12 185)" fill="oklch(0.62 0.12 185)" fillOpacity={0.2} strokeWidth={2} />
                    <Tooltip contentStyle={{ background: "oklch(1 0.005 85)", border: "1px solid oklch(0.88 0.015 85)", borderRadius: "8px", fontSize: "12px" }} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Tech Debt + Repo Coverage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tech Debt Breakdown */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-['Syne'] font-700">Tech Debt Breakdown</CardTitle>
                <CardDescription>Estimated remediation effort by category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {TECH_DEBT.map((item) => {
                  const style = SEVERITY_STYLES[item.severity];
                  return (
                    <div key={item.category} className="flex items-center gap-3">
                      <div className={cn("w-2 h-2 rounded-full flex-shrink-0", style.dot)} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-foreground">{item.category}</span>
                          <span className="text-xs text-muted-foreground font-mono">{item.hours}h</span>
                        </div>
                        <Progress
                          value={item.count === 0 ? 0 : Math.min((item.count / 50) * 100, 100)}
                          className="h-1.5"
                        />
                      </div>
                      <span className={cn("text-xs font-semibold px-1.5 py-0.5 rounded", style.bg, style.text)}>
                        {item.count}
                      </span>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>

          {/* Per-repo Coverage */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-['Syne'] font-700">Coverage by Repository</CardTitle>
                <CardDescription>Test coverage and complexity per repo</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart
                    data={REPOSITORIES}
                    layout="vertical"
                    margin={{ top: 0, right: 40, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.015 85)" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: "oklch(0.52 0.018 260)" }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "oklch(0.52 0.018 260)", fontFamily: "'JetBrains Mono', monospace" }} axisLine={false} tickLine={false} width={100} />
                    <Tooltip contentStyle={{ background: "oklch(1 0.005 85)", border: "1px solid oklch(0.88 0.015 85)", borderRadius: "8px", fontSize: "12px" }} />
                    <Bar dataKey="coverage" fill="oklch(0.62 0.12 185)" radius={[0, 3, 3, 0]} name="Coverage %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
