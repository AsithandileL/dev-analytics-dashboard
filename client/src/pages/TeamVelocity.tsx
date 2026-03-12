// ============================================================
// Team Velocity Page — Sprint metrics, burndown, contributor leaderboard
// Design: Data Cartography — warm parchment, hand-drawn chart aesthetic
// ============================================================

import { motion } from "framer-motion";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, ReferenceLine
} from "recharts";
import { TrendingUp, Award, GitPullRequest, GitCommit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

import DashboardLayout from "@/components/DashboardLayout";
import { SPRINT_DATA, BURNDOWN_DATA, TEAM_MEMBERS } from "@/lib/data";
import { cn } from "@/lib/utils";

const AVATAR_COLORS = [
  "from-[oklch(0.62_0.12_185)] to-[oklch(0.55_0.10_260)]",
  "from-[oklch(0.75_0.17_75)] to-[oklch(0.65_0.15_55)]",
  "from-[oklch(0.60_0.22_15)] to-[oklch(0.55_0.18_25)]",
  "from-[oklch(0.55_0.10_260)] to-[oklch(0.45_0.12_280)]",
  "from-[oklch(0.70_0.14_145)] to-[oklch(0.60_0.12_165)]",
  "from-[oklch(0.65_0.15_310)] to-[oklch(0.55_0.13_290)]",
];

export default function TeamVelocity() {
  const sortedMembers = [...TEAM_MEMBERS].sort((a, b) => b.commits - a.commits);
  const totalVelocity = SPRINT_DATA[SPRINT_DATA.length - 1].velocity;
  const avgVelocity = Math.round(SPRINT_DATA.reduce((s, d) => s + d.velocity, 0) / SPRINT_DATA.length);

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
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663428592179/96fqFLJopBTuWjAeD6eEFN/team-velocity-banner-EwJmKBixLpXUXW4gtJXNj2.webp"
            alt="Team velocity banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.975_0.012_85_/_0.9)] via-[oklch(0.975_0.012_85_/_0.6)] to-transparent" />
          <div className="relative z-10 p-8">
            <div className="text-[oklch(0.62_0.12_185)] text-xs font-semibold tracking-widest uppercase mb-2">
              Agile Metrics · Sprint Analytics
            </div>
            <h1 className="font-['Syne'] text-3xl font-extrabold text-foreground mb-2">Team Velocity</h1>
            <p className="text-muted-foreground text-sm max-w-md">
              Sprint completion rates, burndown analysis, and individual contributor performance metrics.
            </p>
          </div>
        </motion.div>

        {/* Sprint Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Current Sprint Velocity", value: totalVelocity, unit: "pts", accent: "teal", icon: TrendingUp },
            { label: "Avg Sprint Velocity", value: avgVelocity, unit: "pts", accent: "amber", icon: Award },
            { label: "Sprint Completion Rate", value: "96.2", unit: "%", accent: "green", icon: GitPullRequest },
            { label: "Bugs Introduced (S8)", value: "1", unit: "", accent: "rose", icon: GitCommit },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.label} className={`card-accent-${item.accent}`}>
                <CardContent className="p-4">
                  <Icon className="w-5 h-5 text-muted-foreground mb-3" />
                  <div className="metric-number text-3xl text-foreground">{item.value}<span className="text-lg text-muted-foreground ml-1">{item.unit}</span></div>
                  <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sprint Velocity Chart */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-['Syne'] font-700">Sprint Velocity Trend</CardTitle>
                <CardDescription>Planned vs completed story points per sprint</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={SPRINT_DATA} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.015 85)" vertical={false} />
                    <XAxis dataKey="sprint" tick={{ fontSize: 11, fill: "oklch(0.52 0.018 260)" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "oklch(0.52 0.018 260)" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "oklch(1 0.005 85)", border: "1px solid oklch(0.88 0.015 85)", borderRadius: "8px", fontSize: "12px" }} />
                    <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
                    <Bar dataKey="planned" fill="oklch(0.88 0.015 85)" name="Planned" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="completed" fill="oklch(0.62 0.12 185)" name="Completed" radius={[3, 3, 0, 0]} />
                    <Line type="monotone" dataKey="velocity" stroke="oklch(0.75 0.17 75)" strokeWidth={2} dot={{ r: 3 }} name="Velocity" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Burndown Chart */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-['Syne'] font-700">Sprint Burndown (Current)</CardTitle>
                <CardDescription>Ideal vs actual remaining story points</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={BURNDOWN_DATA} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.015 85)" />
                    <XAxis dataKey="day" tick={{ fontSize: 10, fill: "oklch(0.52 0.018 260)" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "oklch(0.52 0.018 260)" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "oklch(1 0.005 85)", border: "1px solid oklch(0.88 0.015 85)", borderRadius: "8px", fontSize: "12px" }} />
                    <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
                    <ReferenceLine y={0} stroke="oklch(0.70 0.14 145)" strokeDasharray="4 2" />
                    <Line type="monotone" dataKey="ideal" stroke="oklch(0.75 0.17 75)" strokeWidth={1.5} strokeDasharray="6 3" dot={false} name="Ideal" />
                    <Line type="monotone" dataKey="actual" stroke="oklch(0.62 0.12 185)" strokeWidth={2.5} dot={{ r: 4, fill: "oklch(0.62 0.12 185)" }} name="Actual" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Contributor Leaderboard */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-['Syne'] font-700">Contributor Leaderboard</CardTitle>
              <CardDescription>Individual performance metrics for the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Rank</th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Contributor</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Commits</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">PRs</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Reviews</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell">Lines Added</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden lg:table-cell">Lines Removed</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedMembers.map((member, i) => {
                      const impact = Math.round((member.commits * 0.4 + member.prs * 1.2 + member.reviews * 0.8) / 3);
                      return (
                        <tr key={member.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                          <td className="py-3 px-3">
                            <span className={cn(
                              "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                              i === 0 ? "bg-[oklch(0.75_0.17_75_/_0.2)] text-[oklch(0.55_0.15_75)]" :
                              i === 1 ? "bg-muted text-muted-foreground" :
                              i === 2 ? "bg-[oklch(0.75_0.17_75_/_0.1)] text-[oklch(0.65_0.12_75)]" :
                              "text-muted-foreground"
                            )}>
                              {i + 1}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2.5">
                              <div className={cn(
                                "w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-xs font-bold flex-shrink-0",
                                AVATAR_COLORS[i % AVATAR_COLORS.length]
                              )}>
                                {member.avatar}
                              </div>
                              <div>
                                <div className="font-medium text-foreground">{member.name}</div>
                                <div className="text-xs text-muted-foreground">{member.role}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-right font-mono font-medium text-foreground">{member.commits}</td>
                          <td className="py-3 px-3 text-right font-mono text-foreground">{member.prs}</td>
                          <td className="py-3 px-3 text-right font-mono text-foreground">{member.reviews}</td>
                          <td className="py-3 px-3 text-right font-mono text-[oklch(0.55_0.14_145)] hidden md:table-cell">+{member.linesAdded.toLocaleString()}</td>
                          <td className="py-3 px-3 text-right font-mono text-[oklch(0.60_0.22_15)] hidden lg:table-cell">-{member.linesRemoved.toLocaleString()}</td>
                          <td className="py-3 px-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                                <div
                                  className="h-full rounded-full bg-[oklch(0.62_0.12_185)]"
                                  style={{ width: `${Math.min((impact / 70) * 100, 100)}%` }}
                                />
                              </div>
                              <span className="text-xs font-mono text-muted-foreground">{impact}</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
