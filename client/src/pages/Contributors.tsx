// ============================================================
// Contributors Page — Team member profiles and activity stats
// Design: Data Cartography
// ============================================================

import { motion } from "framer-motion";
import { GitCommit, GitPullRequest, Eye } from "lucide-react"; // TrendingUp reserved for future use
import { Card, CardContent } from "@/components/ui/card";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from "recharts";
import DashboardLayout from "@/components/DashboardLayout";
import { TEAM_MEMBERS } from "@/lib/data";
import { cn } from "@/lib/utils";

const AVATAR_COLORS = [
  "from-[oklch(0.62_0.12_185)] to-[oklch(0.55_0.10_260)]",
  "from-[oklch(0.75_0.17_75)] to-[oklch(0.65_0.15_55)]",
  "from-[oklch(0.60_0.22_15)] to-[oklch(0.55_0.18_25)]",
  "from-[oklch(0.55_0.10_260)] to-[oklch(0.45_0.12_280)]",
  "from-[oklch(0.70_0.14_145)] to-[oklch(0.60_0.12_165)]",
  "from-[oklch(0.65_0.15_310)] to-[oklch(0.55_0.13_290)]",
];

export default function Contributors() {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 max-w-[1400px]">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-['Syne'] text-2xl font-extrabold text-foreground mb-1">Contributors</h1>
          <p className="text-muted-foreground text-sm">Individual developer profiles, activity metrics, and contribution patterns.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {TEAM_MEMBERS.map((member, i) => {
            const maxCommits = Math.max(...TEAM_MEMBERS.map(m => m.commits));
            const radarData = [
              { metric: "Commits", value: Math.round((member.commits / maxCommits) * 100) },
              { metric: "PRs", value: Math.round((member.prs / 45) * 100) },
              { metric: "Reviews", value: Math.round((member.reviews / 95) * 100) },
              { metric: "Output", value: Math.round((member.linesAdded / 20000) * 100) },
              { metric: "Cleanup", value: Math.round((member.linesRemoved / 12000) * 100) },
            ];

            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Card className="card-accent-teal hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={cn(
                        "w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-sm font-bold flex-shrink-0",
                        AVATAR_COLORS[i % AVATAR_COLORS.length]
                      )}>
                        {member.avatar}
                      </div>
                      <div>
                        <div className="font-['Syne'] font-bold text-foreground">{member.name}</div>
                        <div className="text-xs text-muted-foreground">{member.role}</div>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {[
                        { label: "Commits", value: member.commits, icon: GitCommit },
                        { label: "PRs", value: member.prs, icon: GitPullRequest },
                        { label: "Reviews", value: member.reviews, icon: Eye },
                      ].map((stat) => {
                        const Icon = stat.icon;
                        return (
                          <div key={stat.label} className="text-center p-2 rounded-lg bg-muted/50">
                            <Icon className="w-3.5 h-3.5 text-muted-foreground mx-auto mb-1" />
                            <div className="metric-number text-lg text-foreground">{stat.value}</div>
                            <div className="text-[10px] text-muted-foreground">{stat.label}</div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Radar */}
                    <ResponsiveContainer width="100%" height={140}>
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="oklch(0.88 0.015 85)" />
                        <PolarAngleAxis dataKey="metric" tick={{ fontSize: 9, fill: "oklch(0.52 0.018 260)" }} />
                        <Radar dataKey="value" stroke="oklch(0.62 0.12 185)" fill="oklch(0.62 0.12 185)" fillOpacity={0.2} strokeWidth={1.5} />
                        <Tooltip contentStyle={{ background: "oklch(1 0.005 85)", border: "1px solid oklch(0.88 0.015 85)", borderRadius: "8px", fontSize: "11px" }} />
                      </RadarChart>
                    </ResponsiveContainer>

                    {/* Lines */}
                    <div className="flex items-center justify-between mt-2 text-xs">
                      <span className="text-[oklch(0.55_0.14_145)]">+{member.linesAdded.toLocaleString()} added</span>
                      <span className="text-[oklch(0.60_0.22_15)]">-{member.linesRemoved.toLocaleString()} removed</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
