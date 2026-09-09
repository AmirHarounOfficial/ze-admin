import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  ChevronDown, Search, X, Check, ArrowRight, Sparkles, Layers,
  ExternalLink
} from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import {
  SUB_DASHBOARDS,
  SubDashboardConfig,
  getSubDashboardForPath,
  searchSubDashboardsAndScreens,
  SearchScreenResult
} from "@/constants/subDashboards";
import { getPageFromPathname, PAGE_TITLES } from "@/constants/navigation";

export function DashboardSelector() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Active sub-dashboard derived directly from path
  const activeSubDashboard = getSubDashboardForPath(pathname);

  // Search results
  const { dashboards: filteredDashboards, screens: filteredScreens } =
    searchSubDashboardsAndScreens(searchQuery);

  const totalSelectable = filteredDashboards.length + filteredScreens.length;

  // Open / Close with shortcut Ctrl+J or Cmd+J
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "j") {
        e.preventDefault();
        setIsOpen(prev => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Auto focus input
      setTimeout(() => inputRef.current?.focus(), 50);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Reset search when opening/closing
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  function handleSelectDashboard(dash: SubDashboardConfig) {
    setIsOpen(false);
    // If the current path is already in this sub-dashboard, don't navigate away; otherwise go to default
    const currentSub = getSubDashboardForPath(pathname);
    if (currentSub.id !== dash.id) {
      navigate(dash.defaultUrl);
    }
  }

  function handleSelectScreen(screen: SearchScreenResult) {
    setIsOpen(false);
    navigate(screen.url);
  }

  // Keyboard navigation within the dropdown
  function handleInputKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (totalSelectable || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + totalSelectable) % (totalSelectable || 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex < filteredDashboards.length) {
        const d = filteredDashboards[selectedIndex];
        if (d) handleSelectDashboard(d);
      } else {
        const s = filteredScreens[selectedIndex - filteredDashboards.length];
        if (s) handleSelectScreen(s);
      }
    }
  }

  return (
    <div className="relative" ref={containerRef}>
      {/* Trigger Button in Topbar */}
      <button
        onClick={() => setIsOpen(p => !p)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border transition-all duration-150 group"
        style={{
          background: isOpen ? activeSubDashboard.bgColor : "transparent",
          borderColor: isOpen ? activeSubDashboard.color : C.border,
        }}
        title={`${t("Select Sub-Dashboard")} (⌘J)`}
      >
        <span
          className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
          style={{ background: activeSubDashboard.bgColor, color: activeSubDashboard.color }}
        >
          {activeSubDashboard.icon}
        </span>

        <div className="text-start hidden sm:block">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold leading-none" style={{ color: C.textPrimary }}>
              {t(activeSubDashboard.title)}
            </span>
            {activeSubDashboard.badge && (
              <span
                className="text-[9px] font-bold px-1.5 py-0.2 rounded-full"
                style={{ background: C.gold, color: "#fff" }}
              >
                {activeSubDashboard.badge}
              </span>
            )}
          </div>
          <span className="text-[10px] leading-tight block truncate max-w-[120px]" style={{ color: C.textMuted }}>
            {t(activeSubDashboard.subtitle)}
          </span>
        </div>

        <ChevronDown
          size={14}
          className={`transition-transform duration-200 opacity-60 group-hover:opacity-100 ${isOpen ? "rotate-180" : ""}`}
          style={{ color: C.textSecondary }}
        />
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div
          className="absolute top-full start-0 mt-2 w-[380px] sm:w-[440px] max-w-[90vw] rounded-2xl border shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
          style={{ background: C.card, borderColor: C.border , zIndex: 1000}}
        >
          {/* Header & Search Bar */}
          <div className="p-3 border-b" style={{ borderColor: C.border }}>
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-bold flex items-center gap-1.5" style={{ color: C.textPrimary }}>
                <Layers size={13} style={{ color: C.gold }} />
                {t("Select Sub-Dashboard")}
              </span>
              <kbd
                className="px-1.5 py-0.5 rounded text-[10px] font-mono border"
                style={{ borderColor: C.border, color: C.textMuted, background: C.bg }}
              >
                ⌘J / Ctrl+J
              </kbd>
            </div>

            <div
              className="flex items-center gap-2 px-3 py-2 rounded-xl border transition-colors"
              style={{ background: C.bg, borderColor: C.border }}
            >
              <Search size={14} style={{ color: C.textMuted }} />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleInputKeyDown}
                placeholder={t("Search sub-dashboards or screens…")}
                className="bg-transparent text-xs outline-none flex-1 font-medium"
                style={{ color: C.textPrimary }}
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    inputRef.current?.focus();
                  }}
                  className="p-0.5 rounded hover:opacity-75"
                >
                  <X size={13} style={{ color: C.textMuted }} />
                </button>
              )}
            </div>
          </div>

          {/* Body Content */}
          <div className="max-h-[380px] overflow-y-auto p-2 space-y-3" style={{ scrollbarWidth: "thin" }}>
            {/* Dashboards Section */}
            {filteredDashboards.length > 0 && (
              <div>
                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider flex items-center justify-between" style={{ color: C.textMuted }}>
                  <span>{t("Sub-Dashboards")}</span>
                  <span>{filteredDashboards.length}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-1">
                  {filteredDashboards.map((dash, idx) => {
                    const isCurrent = activeSubDashboard.id === dash.id;
                    const isFocused = selectedIndex === idx;

                    return (
                      <button
                        key={dash.id}
                        onClick={() => handleSelectDashboard(dash)}
                        className="w-full flex items-start gap-2.5 p-2.5 rounded-xl border text-start transition-all"
                        style={{
                          borderColor: isCurrent ? dash.color : isFocused ? C.border : "transparent",
                          background: isCurrent ? dash.bgColor : isFocused ? C.bg : "transparent",
                        }}
                        onMouseEnter={() => setSelectedIndex(idx)}
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: dash.bgColor, color: dash.color }}
                        >
                          {dash.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold truncate" style={{ color: C.textPrimary }}>
                              {t(dash.title)}
                            </span>
                            {isCurrent && (
                              <span
                                className="w-1.5 h-1.5 rounded-full shrink-0"
                                style={{ background: dash.color }}
                                title="Active"
                              />
                            )}
                          </div>
                          <p className="text-[11px] line-clamp-1 mt-0.5 leading-tight" style={{ color: C.textSecondary }}>
                            {t(dash.subtitle)}
                          </p>
                          <div className="flex items-center gap-1.5 mt-1.5">
                            <span className="text-[9px] px-1.5 py-0.5 rounded font-semibold" style={{ background: C.bg, color: C.textMuted, border: `1px solid ${C.border}` }}>
                              {dash.groups.reduce((acc, g) => acc + g.items.length, 0)} screens
                            </span>
                            {dash.badge && (
                              <span
                                className="text-[9px] px-1.5 py-0.2 rounded-full font-bold"
                                style={{ background: C.gold, color: "#fff" }}
                              >
                                {dash.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Screens & Flows Section (Filtered Results) */}
            {filteredScreens.length > 0 && (
              <div>
                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider flex items-center justify-between" style={{ color: C.textMuted }}>
                  <span>{t("Screens & Flows")}</span>
                  <span>{filteredScreens.length}</span>
                </div>
                <div className="space-y-1 mt-1">
                  {filteredScreens.map((screen, sIdx) => {
                    const itemGlobalIdx = filteredDashboards.length + sIdx;
                    const isFocused = selectedIndex === itemGlobalIdx;

                    return (
                      <button
                        key={screen.page}
                        onClick={() => handleSelectScreen(screen)}
                        className="w-full flex items-center justify-between p-2 rounded-xl border text-start transition-all"
                        style={{
                          borderColor: isFocused ? screen.subDashboard.color : C.border,
                          background: isFocused ? screen.subDashboard.bgColor : C.bg,
                        }}
                        onMouseEnter={() => setSelectedIndex(itemGlobalIdx)}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                            style={{ background: screen.subDashboard.bgColor, color: screen.subDashboard.color }}
                          >
                            {screen.subDashboard.icon}
                          </span>
                          <div className="min-w-0">
                            <div className="text-xs font-semibold truncate" style={{ color: C.textPrimary }}>
                              {t(screen.title)}
                            </div>
                            <div className="text-[10px] truncate" style={{ color: C.textMuted }}>
                              {t(screen.subDashboard.title)}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0 ms-2 text-[10px]" style={{ color: screen.subDashboard.color }}>
                          <span>{t("Jump to Screen")}</span>
                          <ArrowRight size={11} className="rtl:rotate-180" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Empty State */}
            {filteredDashboards.length === 0 && filteredScreens.length === 0 && (
              <div className="py-8 text-center px-4">
                <Search size={24} className="mx-auto mb-2 opacity-30" style={{ color: C.textMuted }} />
                <p className="text-xs font-medium" style={{ color: C.textPrimary }}>
                  {t("No sub-dashboards or screens found.")}
                </p>
                <p className="text-[11px] mt-1" style={{ color: C.textMuted }}>
                  Try searching for keywords like "bookings", "reports", "payroll", or "drivers".
                </p>
              </div>
            )}
          </div>

          {/* Dropdown Footer */}
          <div
            className="p-2.5 border-t flex items-center justify-between text-[10px]"
            style={{ background: C.bg, borderColor: C.border, color: C.textMuted }}
          >
            <div className="flex items-center gap-2">
              <span>↑↓ Navigate</span>
              <span>•</span>
              <span>↵ Open</span>
              <span>•</span>
              <span>Esc Close</span>
            </div>
            <span className="font-semibold" style={{ color: activeSubDashboard.color }}>
              {t(activeSubDashboard.title)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
