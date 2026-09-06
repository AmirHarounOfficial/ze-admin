import React, { useState } from "react";
import { useLocation } from "react-router";
import { Menu, ChevronRight, Search, Globe, Sun, Moon, Bell } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { NOTIF_DATA } from "@/mock/mockData";
import { Page } from "@/types";
import { PAGE_TITLES, URL_TO_PAGE } from "@/constants/navigation";
import { NotificationsDropdown } from "./NotificationsDropdown";
import { UserAvatarButton } from "./UserAvatarButton";

export function Topbar({ onToggle, onToggleDark, onToggleLang, dark, lang }: {
  onToggle: () => void; onToggleDark: () => void; onToggleLang: () => void; dark: boolean; lang: string
}) {
  const { pathname } = useLocation();
  const page: Page = URL_TO_PAGE[pathname] ?? "overview";
  const [showNotifs, setShowNotifs] = useState(false);
  const unread = NOTIF_DATA.filter(n => n.unread).length;
  return (
    <div className="flex items-center gap-4 px-5 h-14 border-b shrink-0" style={{ background: C.card, borderColor: C.border }}>
      <button onClick={onToggle} className="rounded-lg p-1.5 transition-colors" style={{ background: "transparent" }}
        onMouseEnter={e => (e.currentTarget.style.background = C.border)}
        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
        <Menu size={16} color={C.textSecondary} />
      </button>
      <div className="flex items-center gap-1.5 text-xs" style={{ color: C.textMuted }}>
        <span>{t("ZeTime")}</span><ChevronRight size={12} className="rtl:rotate-180" />
        <span className="font-medium" style={{ color: C.textPrimary }}>{t(PAGE_TITLES[page] ?? "")}</span>
      </div>
      <div className="ms-auto flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs" style={{ borderColor: C.border, color: C.textSecondary, background: C.card }}>
          <Search size={12} /><span>{t("Search…")}</span>
          <kbd className="ms-2 px-1 rounded text-xs border" style={{ borderColor: C.border, fontSize: 10 }}>⌘K</kbd>
        </div>

        {/* Language toggle */}
        <button onClick={onToggleLang}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-colors"
          style={{ borderColor: C.border, color: lang === "ar" ? C.gold : C.textSecondary, background: lang === "ar" ? C.goldLight : C.card }}
          title={t("Toggle language / تبديل اللغة")}>
          <Globe size={13} />
          <span>{lang === "ar" ? "AR" : "EN"}</span>
        </button>

        {/* Dark mode toggle */}
        <button onClick={onToggleDark}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors"
          style={{ borderColor: C.border, background: dark ? "#30363d" : C.card, color: dark ? "#e6edf3" : C.textSecondary }}
          title={dark ? "Switch to light mode" : "Switch to dark mode"}>
          {dark
            ? <Sun size={14} color="#f59e0b" />
            : <Moon size={14} color={C.textSecondary} />}
          <span style={{ fontSize: 11 }}>{dark ? t("Light") : t("Dark")}</span>
        </button>

        <div className="relative">
          <button onClick={() => setShowNotifs(p => !p)}
            className="relative w-8 h-8 rounded-lg flex items-center justify-center border transition-colors"
            style={{ borderColor: showNotifs ? C.gold : C.border, background: showNotifs ? C.goldLight : "transparent" }}>
            <Bell size={15} color={showNotifs ? C.gold : C.textSecondary} />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center text-white font-bold"
                style={{ background: C.gold, fontSize: 9 }}>
                {unread}
              </span>
            )}
          </button>
          {showNotifs && <NotificationsDropdown onClose={() => setShowNotifs(false)} />}
        </div>
        {/* User avatar + dropdown */}
        <UserAvatarButton />
      </div>
    </div>
  );
}
