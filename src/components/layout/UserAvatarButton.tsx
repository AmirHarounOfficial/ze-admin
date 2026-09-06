import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { User, Shield, Settings, ChevronDown, LogOut } from "lucide-react";
import { C, doLogout } from "@/theme";
import { t } from "@/i18n";

export function UserAvatarButton() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const menuItems = [
    { icon: <User size={14} />, label: "My Profile", action: () => { navigate("/account/profile"); setOpen(false); } },
    { icon: <Shield size={14} />, label: "Account Security", action: () => { navigate("/account/security"); setOpen(false); } },
    { icon: <Settings size={14} />, label: "Preferences", action: () => { navigate("/system/settings"); setOpen(false); } },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(p => !p)}
        className="flex items-center gap-2 rounded-lg px-2 py-1 transition-colors"
        style={{ background: open ? C.goldLight : "transparent", border: `1px solid ${open ? C.gold : "transparent"}` }}
        onMouseEnter={e => { if (!open) e.currentTarget.style.background = C.border; }}
        onMouseLeave={e => { if (!open) e.currentTarget.style.background = "transparent"; }}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
          style={{ background: C.sidebar, color: "#fff", boxShadow: open ? `0 0 0 2px ${C.gold}` : "none" }}>
          SA
        </div>
        <div className="hidden sm:flex flex-col items-start leading-none" style={{ maxWidth: 100 }}>
          <span className="text-xs font-semibold truncate" style={{ color: C.textPrimary }}>{t("Super Admin")}</span>
          <span className="text-xs truncate" style={{ color: C.textMuted, fontSize: 10 }}>{t("Administrator")}</span>
        </div>
        <ChevronDown size={12} color={C.textMuted} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .15s" }} />
      </button>

      {open && (
        <div className="absolute end-0 top-full mt-2 w-64 rounded-2xl border shadow-xl overflow-hidden z-50"
          style={{ background: C.card, borderColor: C.border, boxShadow: "0 12px 40px rgba(0,0,0,0.18)" }}>
          {/* User info header */}
          <div className="px-4 py-4 border-b" style={{ borderColor: C.border, background: `linear-gradient(135deg, ${C.sidebar}15 0%, ${C.card} 100%)` }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold shrink-0"
                style={{ background: C.sidebar, color: "#fff", boxShadow: `0 0 0 3px ${C.gold}` }}>
                SA
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm truncate" style={{ color: C.textPrimary }}>{t("Super Admin")}</div>
                <div className="text-xs truncate" style={{ color: C.textSecondary }}>admin@zetime.app</div>
                <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{ background: C.goldLight, color: C.gold }}>{t("Super Administrator")}</span>
              </div>
            </div>
          </div>

          {/* Menu items */}
          <div className="py-1.5">
            {menuItems.map(item => (
              <button key={item.label} onClick={item.action}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-start"
                style={{ color: C.textPrimary }}
                onMouseEnter={e => (e.currentTarget.style.background = C.bg)}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                <span style={{ color: C.textMuted }}>{item.icon}</span>
                {t(item.label)}
              </button>
            ))}
          </div>

          {/* Sign out */}
          <div className="border-t py-1.5" style={{ borderColor: C.border }}>
            <button
              onClick={() => { setOpen(false); doLogout(); navigate("/login", { replace: true }); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-start"
              style={{ color: C.red }}
              onMouseEnter={e => (e.currentTarget.style.background = C.redLight)}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
              <LogOut size={14} />
              {t("Sign Out")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
