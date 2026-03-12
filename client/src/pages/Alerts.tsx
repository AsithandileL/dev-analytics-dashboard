// ============================================================
// Alerts Page — Notification center
// ============================================================

import { motion } from "framer-motion";
import { AlertTriangle, XCircle, Info, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import DashboardLayout from "@/components/DashboardLayout";
import { cn } from "@/lib/utils";

const ALERTS = [
  { id: 1, type: "error", title: "Pipeline Job Failed", message: "ML Feature Store Update failed after 3 retries. Last error: Connection timeout to feature store.", time: "2h ago", read: false },
  { id: 2, type: "warning", title: "Low Test Coverage Detected", message: "notification-svc coverage dropped to 65.2% — below the 70% threshold.", time: "4h ago", read: false },
  { id: 3, type: "warning", title: "High Complexity Warning", message: "ml-inference cyclomatic complexity score reached 22.8 — review recommended.", time: "6h ago", read: false },
  { id: 4, type: "warning", title: "Pipeline Latency Spike", message: "Search Index Rebuild took 12m 07s — 40% above the SLA threshold of 8m.", time: "8h ago", read: false },
  { id: 5, type: "info", title: "New PR Ready for Review", message: "Jordan Kim opened PR #284: 'feat: add integration tests for payment flow' in api-gateway.", time: "12h ago", read: true },
  { id: 6, type: "success", title: "Sprint 8 Completed", message: "Sprint 8 closed with 53/55 story points completed (96.4% completion rate).", time: "1d ago", read: true },
  { id: 7, type: "info", title: "Dependency Audit Complete", message: "Weekly security audit found 0 critical vulnerabilities across all repositories.", time: "2d ago", read: true },
];

const TYPE_CONFIG = {
  error: { icon: XCircle, color: "text-[oklch(0.60_0.22_15)]", bg: "bg-[oklch(0.60_0.22_15_/_0.1)]", accent: "rose" },
  warning: { icon: AlertTriangle, color: "text-[oklch(0.65_0.15_75)]", bg: "bg-[oklch(0.75_0.17_75_/_0.1)]", accent: "amber" },
  info: { icon: Info, color: "text-[oklch(0.62_0.12_185)]", bg: "bg-[oklch(0.62_0.12_185_/_0.1)]", accent: "teal" },
  success: { icon: CheckCircle2, color: "text-[oklch(0.55_0.14_145)]", bg: "bg-[oklch(0.70_0.14_145_/_0.1)]", accent: "green" },
};

export default function Alerts() {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 max-w-[1400px]">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-['Syne'] text-2xl font-extrabold text-foreground mb-1">Alerts</h1>
          <p className="text-muted-foreground text-sm">System notifications, pipeline alerts, and quality threshold warnings.</p>
        </motion.div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-['Syne'] font-700">Notification Center</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {ALERTS.map((alert, i) => {
              const cfg = TYPE_CONFIG[alert.type as keyof typeof TYPE_CONFIG];
              const Icon = cfg.icon;
              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg border transition-colors cursor-pointer hover:bg-muted/30",
                    `card-accent-${cfg.accent}`,
                    !alert.read && "bg-muted/20"
                  )}
                  onClick={() => toast.info(`Alert: ${alert.title}`)}
                >
                  <div className={cn("w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5", cfg.bg)}>
                    <Icon className={cn("w-4 h-4", cfg.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={cn("text-sm font-semibold text-foreground", !alert.read && "font-bold")}>{alert.title}</span>
                      <span className="text-xs text-muted-foreground flex-shrink-0">{alert.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{alert.message}</p>
                  </div>
                  {!alert.read && (
                    <div className="w-2 h-2 rounded-full bg-[oklch(0.62_0.12_185)] flex-shrink-0 mt-2" />
                  )}
                </motion.div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
