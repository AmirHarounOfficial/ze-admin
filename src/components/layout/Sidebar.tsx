import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import zeTimeLogo from "@/imports/ZETIME_Logo_Symbol.png";
import { Page, NavItem } from "@/types";
import { NAV_GROUPS, PAGE_URLS, URL_TO_PAGE } from "@/constants/navigation";

export function Sidebar({ collapsed }: { collapsed: boolean }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activePage: Page = URL_TO_PAGE[pathname] ?? "overview";
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ "Providers Center": true });

  function renderItem(item: NavItem, depth = 0) {
    const isActive = item.page === activePage;
    const hasChildren = !!item.children?.length;
    const isOpen = expanded[item.label];

    return (
      <div key={item.label}>
        <button
          onClick={() => { if (hasChildren) setExpanded(p => ({ ...p, [item.label]: !p[item.label] })); else if (item.page) navigate(PAGE_URLS[item.page]); }}
          title={collapsed ? item.label : undefined}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-start transition-colors"
          style={{ marginInlineStart: depth * 8, width: `calc(100% - ${depth * 8}px)`, background: isActive ? C.sidebarActive : "transparent", color: isActive ? "#fff" : C.sidebarText }}
          onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = C.sidebarHover; }}
          onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}>
          <span className="shrink-0">{item.icon}</span>
          {!collapsed && (
            <>
              <span className="flex-1 text-xs font-medium truncate">{t(item.label)}</span>
              {item.badge !== undefined && (
                <span className="text-xs px-1.5 rounded-full font-semibold" style={{ background: C.gold, color: "#fff", fontSize: 10, lineHeight: "18px" }}>
                  {item.badge}
                </span>
              )}
              {hasChildren && <span className="ms-auto shrink-0 opacity-60">{isOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} className="rtl:rotate-180" />}</span>}
            </>
          )}
        </button>
        {hasChildren && isOpen && !collapsed && (
          <div className="mt-0.5 mb-0.5">{item.children!.map(child => renderItem(child, depth + 1))}</div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden transition-all duration-200"
      style={{ width: collapsed ? 56 : 224, background: C.sidebar, borderInlineEnd: "1px solid #0a4a7a" }}>
      <div className="flex items-center gap-2.5 px-4 py-4 border-b shrink-0" style={{ borderColor: "#0a4a7a" }}>
        <ImageWithFallback src={zeTimeLogo} alt="ZeTime" className="w-7 h-7 object-contain shrink-0" />
        {!collapsed && (
          <div>
            <div className="text-sm font-bold text-white leading-none">{t("ZeTime")}</div>
            <div className="text-xs mt-0.5" style={{ color: C.sidebarLabel }}>{t("Admin Console")}</div>
          </div>
        )}
      </div>
      {!collapsed && (
        <div className="px-3 py-2.5 border-b shrink-0" style={{ borderColor: "#0a4a7a" }}>
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg" style={{ background: "#0a4a7a" }}>
            <Search size={12} color={C.sidebarLabel} />
            <input placeholder={t("Quick search…")} className="bg-transparent text-xs outline-none flex-1" style={{ color: C.sidebarText }} />
          </div>
        </div>
      )}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-4" style={{ scrollbarWidth: "none" }}>
        {NAV_GROUPS.map(grp => (
          <div key={grp.group}>
            {!collapsed && (
              <div className="px-2 mb-1.5 font-semibold uppercase tracking-wider" style={{ color: C.sidebarLabel, fontSize: 10 }}>{t(grp.group)}</div>
            )}
            <div className="space-y-0.5">{grp.items.map(item => renderItem(item))}</div>
          </div>
        ))}
      </div>
      <div className="border-t px-3 py-3 flex items-center gap-2.5 shrink-0" style={{ borderColor: "#0a4a7a" }}>
        <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold" style={{ background: C.green, color: "#fff" }}>SA</div>
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
