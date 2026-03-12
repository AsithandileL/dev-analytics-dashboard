// ============================================================
// Settings Page — Configuration and preferences
// ============================================================

import { motion } from "framer-motion";
import { Bell, Shield, Database, Users, Palette } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import DashboardLayout from "@/components/DashboardLayout";

const SETTINGS_SECTIONS = [
  { icon: Bell, title: "Notifications", description: "Configure alert thresholds and notification channels", accent: "teal" },
  { icon: Shield, title: "Security & Access", description: "Manage team permissions, API keys, and audit logs", accent: "amber" },
  { icon: Database, title: "Data Sources", description: "Connect GitHub, Jira, SonarQube, and pipeline integrations", accent: "slate" },
  { icon: Users, title: "Team Management", description: "Add or remove team members and configure roles", accent: "teal" },
  { icon: Palette, title: "Appearance", description: "Customize dashboard layout, themes, and chart colors", accent: "amber" },
];

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 max-w-[800px]">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-['Syne'] text-2xl font-extrabold text-foreground mb-1">Settings</h1>
          <p className="text-muted-foreground text-sm">Configure integrations, notifications, and dashboard preferences.</p>
        </motion.div>

        <div className="space-y-3">
          {SETTINGS_SECTIONS.map((section, i) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Card
                  className={`card-accent-${section.accent} cursor-pointer hover:shadow-md transition-shadow`}
                  onClick={() => toast.info(`${section.title} settings — coming soon`)}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{section.title}</div>
                      <div className="text-sm text-muted-foreground">{section.description}</div>
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
