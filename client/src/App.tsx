// ============================================================
// DevPulse — App Router
// Design: Data Cartography (Syne + DM Sans + JetBrains Mono)
// ============================================================

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import CommitActivity from "./pages/CommitActivity";
import CodeQuality from "./pages/CodeQuality";
import TeamVelocity from "./pages/TeamVelocity";
import DataPipeline from "./pages/DataPipeline";
import Contributors from "./pages/Contributors";
import Alerts from "./pages/Alerts";
import SettingsPage from "./pages/SettingsPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/commits" component={CommitActivity} />
      <Route path="/quality" component={CodeQuality} />
      <Route path="/velocity" component={TeamVelocity} />
      <Route path="/pipeline" component={DataPipeline} />
      <Route path="/team" component={Contributors} />
      <Route path="/alerts" component={Alerts} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
