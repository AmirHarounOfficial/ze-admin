import React, { useState, Component, ReactNode } from "react";
import { Outlet } from "react-router";
import { AlertCircle, RefreshCw } from "lucide-react";
import { C, _dark, _lang, applyTheme, setDark, setLang } from "@/theme";
import { t } from "@/i18n";
import { PrimaryBtn, Toast } from "@/components/ui/CommonUI";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 max-w-xl mx-auto my-12 rounded-2xl border text-center space-y-4 shadow-sm" style={{ background: C.card, borderColor: C.border }}>
          <AlertCircle size={44} color={C.red} className="mx-auto" />
          <h2 className="text-lg font-bold" style={{ color: C.textPrimary }}>{t("Something went wrong")}</h2>
          <p className="text-xs font-mono p-3 rounded-lg text-start overflow-x-auto" style={{ background: C.bg, color: C.red }}>
            {this.state.error?.message ?? "An unexpected runtime error occurred."}
          </p>
          <PrimaryBtn onClick={() => { this.setState({ hasError: false, error: null }); window.location.reload(); }}>
            <RefreshCw size={13} /> {t("Reload Page")}
          </PrimaryBtn>
        </div>
      );
    }
    return this.props.children;
  }
}

export function RootLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [themeVer, setThemeVer] = useState(0);

  function showToast(msg = "Action completed successfully.") {
    setToast(msg);
  }

  function toggleDark() {
    setDark(!_dark);
    applyTheme();
    setThemeVer(v => v + 1);
  }

  function toggleLang() {
    setLang(_lang === "en" ? "ar" : "en");
    applyTheme();
    setThemeVer(v => v + 1);
  }

  return (
    <div key={themeVer} className="flex h-screen overflow-hidden" style={{ fontFamily: _lang === "ar" ? "'Alexandria', 'Inter', sans-serif" : "'Satoshi', 'Inter', sans-serif", background: C.bg, direction: _lang === "ar" ? "rtl" : "ltr" }}>
      <style>{`@keyframes slideInRight { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>
      <Sidebar collapsed={collapsed} />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar onToggle={() => setCollapsed(p => !p)} onToggleDark={toggleDark} onToggleLang={toggleLang} dark={_dark} lang={_lang} />
        <main className="flex-1 overflow-y-auto p-6" style={{ background: C.bg }}>
          <ErrorBoundary>
            <Outlet context={{ showToast }} />
          </ErrorBoundary>
        </main>
      </div>
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
