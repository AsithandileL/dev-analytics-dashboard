// ============================================================
// Data Pipeline Page — ETL job monitoring, throughput, data quality
// Design: Data Cartography — dark pipeline banner, technical data tables
// ============================================================

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { Database, CheckCircle2, XCircle, AlertCircle, Loader2, RefreshCw, Play, Pause } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import DashboardLayout from "@/components/DashboardLayout";
import { PIPELINE_JOBS, DATA_QUALITY_METRICS, PIPELINE_THROUGHPUT } from "@/lib/data";
import { cn } from "@/lib/utils";

const STATUS_CONFIG = {
  success: { icon: CheckCircle2, color: "text-[oklch(0.55_0.14_145)]", bg: "bg-[oklch(0.70_0.14_145_/_0.12)]", label: "Success" },
  running: { icon: Loader2, color: "text-[oklch(0.62_0.12_185)]", bg: "bg-[oklch(0.62_0.12_185_/_0.12)]", label: "Running" },
  failed: { icon: XCircle, color: "text-[oklch(0.60_0.22_15)]", bg: "bg-[oklch(0.60_0.22_15_/_0.12)]", label: "Failed" },
  warning: { icon: AlertCircle, color: "text-[oklch(0.65_0.15_75)]", bg: "bg-[oklch(0.75_0.17_75_/_0.12)]", label: "Warning" },
};

const ACCENT_MAP = {
  success: "teal",
  running: "teal",
  failed: "rose",
  warning: "amber",
};

export default function DataPipeline() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast.success("Pipeline status refreshed");
    }, 1200);
  };

  const handleAction = (action: string, job: string) => {
    toast.info(`${action} triggered for ${job}`);
  };

  const successCount = PIPELINE_JOBS.filter(j => j.status === "success").length;
  const runningCount = PIPELINE_JOBS.filter(j => j.status === "running").length;
  const failedCount = PIPELINE_JOBS.filter(j => j.status === "failed").length;
  const warningCount = PIPELINE_JOBS.filter(j => j.status === "warning").length;

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
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663428592179/96fqFLJopBTuWjAeD6eEFN/pipeline-monitor-banner-58tptTi6QLEexyeCtE3uwD.webp"
            alt="Pipeline banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.10_0.025_260_/_0.92)] via-[oklch(0.10_0.025_260_/_0.65)] to-transparent" />
          <div className="relative z-10 p-8 flex items-start justify-between">
            <div>
              <div className="text-[oklch(0.62_0.12_185)] text-xs font-semibold tracking-widest uppercase mb-2">
                ETL Monitoring · Real-time
              </div>
              <h1 className="font-['Syne'] text-3xl font-extrabold text-white mb-2">Data Pipeline</h1>
              <p className="text-[oklch(0.72_0.012_260)] text-sm max-w-md">
                Monitor ETL job health, data throughput, quality scores, and pipeline performance metrics.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="mt-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <RefreshCw className={cn("w-3.5 h-3.5 mr-2", refreshing && "animate-spin")} />
              Refresh
            </Button>
          </div>
        </motion.div>

        {/* Status Summary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Successful Jobs", value: successCount, accent: "teal", icon: CheckCircle2 },
            { label: "Running Now", value: runningCount, accent: "teal", icon: Loader2 },
            { label: "Warnings", value: warningCount, accent: "amber", icon: AlertCircle },
            { label: "Failed Jobs", value: failedCount, accent: "rose", icon: XCircle },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.label} className={`card-accent-${item.accent}`}>
                <CardContent className="p-4">
                  <Icon className="w-5 h-5 text-muted-foreground mb-3" />
                  <div className="metric-number text-3xl text-foreground">{item.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>

        {/* Throughput Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-['Syne'] font-700">24h Throughput</CardTitle>
              <CardDescription>Records processed and errors by hour</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={PIPELINE_THROUGHPUT} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRecords" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.62 0.12 185)" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="oklch(0.62 0.12 185)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorErrors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.60 0.22 15)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="oklch(0.60 0.22 15)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.015 85)" />
                  <XAxis dataKey="hour" tick={{ fontSize: 10, fill: "oklch(0.52 0.018 260)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "oklch(0.52 0.018 260)" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: "oklch(1 0.005 85)", border: "1px solid oklch(0.88 0.015 85)", borderRadius: "8px", fontSize: "12px" }}
                    formatter={(value: number) => [value.toLocaleString(), ""]}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
                  <Area type="monotone" dataKey="records" stroke="oklch(0.62 0.12 185)" strokeWidth={2} fill="url(#colorRecords)" name="Records" />
                  <Area type="monotone" dataKey="errors" stroke="oklch(0.60 0.22 15)" strokeWidth={1.5} fill="url(#colorErrors)" name="Errors" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Jobs Table + Data Quality */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ETL Jobs Table */}
          <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-['Syne'] font-700">ETL Jobs</CardTitle>
                <CardDescription>Current pipeline job status and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {PIPELINE_JOBS.map((job) => {
                    const cfg = STATUS_CONFIG[job.status];
                    const Icon = cfg.icon;
                    return (
                      <div
                        key={job.id}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors",
                          `card-accent-${ACCENT_MAP[job.status]}`
                        )}
                      >
                        <div className={cn("w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0", cfg.bg)}>
                          <Icon className={cn("w-4 h-4", cfg.color, job.status === "running" && "animate-spin")} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-medium text-foreground truncate">{job.name}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{job.type}</span>
                          </div>
                          <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground">
                            <span className="font-mono">{job.lastRun}</span>
                            <span>·</span>
                            <span className="font-mono">{job.duration}</span>
                            {job.records > 0 && (
                              <>
                                <span>·</span>
                                <span>{(job.records / 1000000).toFixed(1)}M records</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <div className="text-right hidden sm:block">
                            <div className="text-xs font-mono font-medium text-foreground">{job.successRate}%</div>
                            <div className="text-[10px] text-muted-foreground">success</div>
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleAction("Restart", job.name)}
                              className="w-7 h-7 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleAction(job.status === "running" ? "Pause" : "Run", job.name)}
                              className="w-7 h-7 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                            >
                              {job.status === "running" ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Data Quality Scores */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-['Syne'] font-700">Data Quality</CardTitle>
                <CardDescription>Quality dimension scores</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {DATA_QUALITY_METRICS.map((metric) => {
                  const isPositive = metric.trend >= 0;
                  const scoreColor = metric.score >= 95 ? "oklch(0.62 0.12 185)" :
                    metric.score >= 90 ? "oklch(0.70 0.14 145)" :
                    metric.score >= 85 ? "oklch(0.75 0.17 75)" : "oklch(0.60 0.22 15)";
                  return (
                    <div key={metric.dimension}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-foreground">{metric.dimension}</span>
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "text-xs font-medium",
                            isPositive ? "text-[oklch(0.55_0.14_145)]" : "text-[oklch(0.60_0.22_15)]"
                          )}>
                            {metric.trend > 0 ? "+" : ""}{metric.trend}%
                          </span>
                          <span className="text-sm font-mono font-semibold" style={{ color: scoreColor }}>
                            {metric.score}%
                          </span>
                        </div>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: scoreColor }}
                          initial={{ width: 0 }}
                          animate={{ width: `${metric.score}%` }}
                          transition={{ duration: 0.8, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  );
                })}

                {/* Overall score */}
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">Overall Score</span>
                    <span className="metric-number text-2xl text-[oklch(0.62_0.12_185)]">94.6%</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Across 6 quality dimensions</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
