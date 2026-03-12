// ============================================================
// DashboardLayout — Persistent sidebar + top bar shell
// Design: Data Cartography — Deep Slate sidebar, Parchment main
// ============================================================

import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  GitBranch,
  ShieldCheck,
  Zap,
  Users,
  Database,
  Settings,
  Bell,
  ChevronLeft,
  ChevronRight,
  Activity,
  TrendingUp,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const NAV_ITEMS = [
  { path: "/", label: "Overview", icon: LayoutDashboard, badge: null },
  { path: "/commits", label: "Commit Activity", icon: GitBranch, badge: null },
  { path: "/quality", label: "Code Quality", icon: ShieldCheck, badge: "3" },
  { path: "/velocity", label: "Team Velocity", icon: TrendingUp, badge: null },
  { path: "/pipeline", label: "Data Pipeline", icon: Database, badge: "1" },
  { path: "/team", label: "Contributors", icon: Users, badge: null },
];

const BOTTOM_NAV = [
  { path: "/alerts", label: "Alerts", icon: Bell, badge: "4" },
  { path: "/settings", label: "Settings", icon: Settings, badge: null },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  const currentPage = NAV_ITEMS.find(n => n.path === location) ||
    BOTTOM_NAV.find(n => n.path === location);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={cn(
        "flex items-center gap-3 px-4 py-5 border-b",
        "border-[oklch(0.30_0.025_260)]"
      )}>
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[oklch(0.62_0.12_185)] flex items-center justify-center">
          <Activity className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="font-['Syne'] font-800 text-[oklch(0.95_0.008_85)] text-base leading-tight tracking-tight" style={{ fontWeight: 800 }}>
              DevPulse
            </div>
            <div className="text-[oklch(0.55_0.015_260)] text-[10px] font-medium tracking-widest uppercase">
              Analytics
            </div>
          </div>
        )}
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
        <div className={cn("text-[10px] font-semibold tracking-widest uppercase px-3 mb-2",
          "text-[oklch(0.45_0.015_260)]", collapsed && "hidden")}>
          Engineering
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          return (
            <Link key={item.path} href={item.path}>
              <div className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-150 relative",
                isActive
                  ? "bg-[oklch(0.62_0.12_185_/_0.18)] text-[oklch(0.75_0.10_185)]"
                  : "text-[oklch(0.68_0.012_260)] hover:bg-[oklch(0.28_0.03_260)] hover:text-[oklch(0.92_0.008_85)]"
              )}>
                {isActive && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-[oklch(0.62_0.12_185)] rounded-l-full" />
                )}
                <Icon className="w-4 h-4 flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <Badge className="bg-[oklch(0.60_0.22_15_/_0.25)] text-[oklch(0.75_0.18_15)] border-0 text-[10px] h-4 px-1.5 min-w-0">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom nav */}
      <div className="px-2 py-3 border-t border-[oklch(0.30_0.025_260)] space-y-0.5">
        {BOTTOM_NAV.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          return (
            <Link key={item.path} href={item.path}>
              <div className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-[oklch(0.62_0.12_185_/_0.18)] text-[oklch(0.75_0.10_185)]"
                  : "text-[oklch(0.68_0.012_260)] hover:bg-[oklch(0.28_0.03_260)] hover:text-[oklch(0.92_0.008_85)]"
              )}>
                <Icon className="w-4 h-4 flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <Badge className="bg-[oklch(0.75_0.17_75_/_0.25)] text-[oklch(0.55_0.15_75)] border-0 text-[10px] h-4 px-1.5 min-w-0">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* User avatar */}
      <div className={cn(
        "flex items-center gap-3 px-4 py-4 border-t border-[oklch(0.30_0.025_260)]",
      )}>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[oklch(0.62_0.12_185)] to-[oklch(0.55_0.10_260)] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          AL
        </div>
        {!collapsed && (
          <div className="overflow-hidden flex-1 min-w-0">
            <div className="text-[oklch(0.88_0.008_85)] text-sm font-medium truncate">Asithandile Ludonga</div>
            <div className="text-[oklch(0.52_0.015_260)] text-xs truncate">Software Engineer</div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col flex-shrink-0 bg-[oklch(0.22_0.025_260)] transition-all duration-300 ease-in-out relative",
          collapsed ? "w-16" : "w-60"
        )}
      >
        <SidebarContent />
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-[oklch(0.22_0.025_260)] border border-[oklch(0.35_0.025_260)] flex items-center justify-center text-[oklch(0.65_0.015_260)] hover:text-[oklch(0.88_0.008_85)] transition-colors z-10"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-60 bg-[oklch(0.22_0.025_260)] flex flex-col z-10">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex-shrink-0 h-14 bg-card border-b border-border flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                {currentPage?.label || "Dashboard"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-muted text-xs text-muted-foreground border border-border cursor-pointer hover:bg-muted/80 transition-colors">
              <span className="text-muted-foreground">Last 30 days</span>
              <ChevronRight className="w-3 h-3 text-muted-foreground rotate-90" />
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-muted text-xs text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-[oklch(0.70_0.14_145)] animate-pulse" />
              Live · Updated 2m ago
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[oklch(0.60_0.22_15)]" />
            </Button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[oklch(0.62_0.12_185)] to-[oklch(0.55_0.10_260)] flex items-center justify-center text-white text-xs font-bold">
              AL
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto dot-grid">
          {children}
        </main>
      </div>
    </div>
  );
}
