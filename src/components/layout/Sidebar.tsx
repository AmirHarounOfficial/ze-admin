import React, { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router";
import { ChevronDown, ChevronRight, Search, Layers, ArrowLeftRight } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import zeTimeLogo from "@/imports/ZETIME_Logo_Symbol.png";
import { Page, NavItem } from "@/types";
import { PAGE_URLS, getPageFromPathname } from "@/constants/navigation";
import { getSubDashboardForPath } from "@/constants/subDashboards";

export function Sidebar({ collapsed }: { collapsed: boolean }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activePage: Page = getPageFromPathname(pathname);
  const activeSubDashboard = getSubDashboardForPath(pathname);

  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    "Providers Center": true,
    "Staff Management": true,
    "Human Resources": true,
    "Enterprise Resource": true,
  });
  const [sidebarSearch, setSidebarSearch] = useState("");

  function toggleOpenSwitcher() {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "j", ctrlKey: true }));
  }

  // Filter groups based on search query inside the active sub-dashboard
  const visibleGroups = useMemo(() => {
    const q = sidebarSearch.trim().toLowerCase();
    if (!q) return activeSubDashboard.groups;

    return activeSubDashboard.groups
      .map(grp => {
        const filteredItems = grp.items
          .map(item => {
            const matchesItem = t(item.label).toLowerCase().includes(q) || item.label.toLowerCase().includes(q);
            if (matchesItem) return item;

            if (item.children) {
              const matchedChildren = item.children.filter(
                c => t(c.label).toLowerCase().includes(q) || c.label.toLowerCase().includes(q)
              );
              if (matchedChildren.length > 0) {
                return { ...item, children: matchedChildren };
              }
            }
            return null;
          })
          .filter(Boolean) as NavItem[];

        return { ...grp, items: filteredItems };
      })
      .filter(grp => grp.items.length > 0);
  }, [activeSubDashboard, sidebarSearch]);

  function renderItem(item: NavItem, depth = 0) {
    const isActive = item.page === activePage;
    const hasChildren = !!item.children?.length;
    const isOpen = expanded[item.label] ?? true;

    return (
      <div key={item.label}>
        <button
          onClick={() => {
            if (hasChildren) {
              setExpanded(p => ({ ...p, [item.label]: !p[item.label] }));
            } else if (item.page) {
              navigate(PAGE_URLS[item.page]);
            }
          }}
          title={collapsed ? t(item.label) : undefined}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-start transition-colors"
          style={{
            marginInlineStart: depth * 8,
            width: `calc(100% - ${depth * 8}px)`,
            background: isActive ? C.sidebarActive : "transparent",
            color: isActive ? "#fff" : C.sidebarText,
          }}
          onMouseEnter={e => {
            if (!isActive) e.currentTarget.style.background = C.sidebarHover;
          }}
          onMouseLeave={e => {
            if (!isActive) e.currentTarget.style.background = "transparent";
          }}
        >
          <span className="shrink-0">{item.icon}</span>
          {!collapsed && (
            <>
              <span className="flex-1 text-xs font-medium truncate">{t(item.label)}</span>
              {item.badge !== undefined && (
                <span
                  className="text-xs px-1.5 rounded-full font-semibold"
                  style={{ background: C.gold, color: "#fff", fontSize: 10, lineHeight: "18px" }}
                >
                  {item.badge}
                </span>
              )}
              {hasChildren && (
                <span className="ms-auto shrink-0 opacity-60">
                  {isOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} className="rtl:rotate-180" />}
                </span>
              )}
            </>
          )}
        </button>
        {hasChildren && isOpen && !collapsed && (
          <div className="mt-0.5 mb-0.5">
            {item.children!.map(child => renderItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="flex flex-col h-full overflow-hidden transition-all duration-200 shrink-0"
      style={{
        width: collapsed ? 56 : 230,
        background: C.sidebar,
        borderInlineEnd: "1px solid #0a4a7a",
      }}
    >
      {/* Brand Header */}
      <div className="flex items-center gap-2.5 px-4 py-3.5 border-b shrink-0" style={{ borderColor: "#0a4a7a" }}>
        <ImageWithFallback src={zeTimeLogo} alt="ZeTime" className="w-7 h-7 object-contain shrink-0" />
        {!collapsed && (
          <div className="min-w-0">
            <div className="text-sm font-bold text-white leading-none truncate">{t("ZeTime")}</div>
            <div className="text-xs mt-0.5 truncate" style={{ color: C.sidebarLabel }}>{t("Admin Console")}</div>
          </div>
        )}
      </div>

      {/* Active Sub-Dashboard Banner / Switcher */}
      {!collapsed ? (
        <div className="px-2.5 py-2.5 border-b shrink-0" style={{ borderColor: "#0a4a7a" }}>
          <button
            onClick={toggleOpenSwitcher}
            className="w-full flex items-center justify-between p-2 rounded-xl text-start transition-all duration-150 group border hover:border-opacity-100"
            style={{
              background: "#062b4c",
              borderColor: `${activeSubDashboard.color}40`,
            }}
            title={`${t("Switch Dashboard")} (⌘J)`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 shadow-sm"
                style={{ background: activeSubDashboard.bgColor, color: activeSubDashboard.color }}
              >
                {activeSubDashboard.icon}
              </span>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate leading-none">
                  {t(activeSubDashboard.title)}
                </div>
                <div className="text-[10px] mt-0.5 truncate" style={{ color: C.sidebarLabel }}>
                  {t(activeSubDashboard.subtitle)}
                </div>
              </div>
            </div>
            <ArrowLeftRight size={12} style={{ color: C.sidebarLabel }} className="shrink-0 opacity-60 group-hover:opacity-100 ms-1" />
          </button>
        </div>
      ) : (
        <div className="p-2 border-b flex justify-center shrink-0" style={{ borderColor: "#0a4a7a" }}>
          <button
            onClick={toggleOpenSwitcher}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform hover:scale-105"
            style={{ background: activeSubDashboard.bgColor, color: activeSubDashboard.color }}
            title={`${t(activeSubDashboard.title)} - ${t("Switch Dashboard")} (⌘J)`}
          >
            {activeSubDashboard.icon}
          </button>
        </div>
      )}

      {/* Quick Search */}
      {!collapsed && (
        <div className="px-3 py-2 border-b shrink-0" style={{ borderColor: "#0a4a7a" }}>
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg" style={{ background: "#0a4a7a" }}>
            <Search size={12} color={C.sidebarLabel} />
            <input
              value={sidebarSearch}
              onChange={e => setSidebarSearch(e.target.value)}
              placeholder={t("Quick search…")}
              className="bg-transparent text-xs outline-none flex-1"
              style={{ color: C.sidebarText }}
            />
          </div>
        </div>
      )}

      {/* Navigation Items (scoped strictly to current Sub-Dashboard) */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-4" style={{ scrollbarWidth: "none" }}>
        {visibleGroups.map(grp => (
          <div key={grp.group}>
            {!collapsed && (
              <div
                className="px-2 mb-1.5 font-semibold uppercase tracking-wider"
                style={{ color: C.sidebarLabel, fontSize: 10 }}
              >
                {t(grp.group)}
              </div>
            )}
            <div className="space-y-0.5">{grp.items.map(item => renderItem(item))}</div>
          </div>
        ))}

        {visibleGroups.length === 0 && (
          <div className="px-2 py-4 text-center text-xs" style={{ color: C.sidebarLabel }}>
            {t("No sub-dashboards or screens found.")}
          </div>
        )}
      </div>

      {/* Switch Workspace Quick Button */}
      {!collapsed && (
        <div className="px-3 py-2 border-t shrink-0" style={{ borderColor: "#0a4a7a" }}>
          <button
            onClick={toggleOpenSwitcher}
            className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-start transition-colors"
            style={{ color: C.sidebarLabel, background: "transparent" }}
            onMouseEnter={e => (e.currentTarget.style.background = C.sidebarHover)}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <span className="flex items-center gap-2 text-xs">
              <Layers size={13} />
              <span>{t("Switch Workspace")}</span>
            </span>
            <kbd className="px-1 rounded text-[9px] border border-[#0a4a7a] opacity-80">⌘J</kbd>
          </button>
        </div>
      )}

      {/* Super Admin Profile */}
      <div className="border-t px-3 py-3 flex items-center gap-2.5 shrink-0" style={{ borderColor: "#0a4a7a" }}>
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
          style={{ background: C.green, color: "#fff" }}
        >
          SA
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-white truncate">{t("Super Admin")}</div>
            <div className="text-xs truncate" style={{ color: C.sidebarLabel }}>admin@zetime.app</div>
          </div>
        )}
      </div>
    </div>
  );
}
