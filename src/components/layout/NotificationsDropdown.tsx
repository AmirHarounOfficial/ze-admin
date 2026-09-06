import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { AlertTriangle, Building2, DollarSign, Star, CheckCircle2, MessageSquare, Bell, X } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { NOTIF_DATA } from "@/mock/mockData";
import { NotifType } from "@/types";

export function NotificationsDropdown({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<NotifType>("all");
  const [notifs, setNotifs] = useState(NOTIF_DATA);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [onClose]);

  const filters: { key: NotifType; label: string }[] = [
    { key: "all",      label: "All" },
    { key: "alert",    label: "Alerts" },
    { key: "provider", label: "Providers" },
    { key: "finance",  label: "Finance" },
    { key: "support",  label: "Support" },
    { key: "review",   label: "Reviews" },
  ];

  const visible = filter === "all" ? notifs : notifs.filter(n => n.type === filter);
  const unreadCount = notifs.filter(n => n.unread).length;

  function markAllRead() { setNotifs(p => p.map(n => ({ ...n, unread: false }))); }
  function markRead(id: string) { setNotifs(p => p.map(n => n.id === id ? { ...n, unread: false } : n)); }

  return (
    <div ref={ref} className="absolute top-12 end-0 z-50 flex flex-col rounded-xl border shadow-2xl overflow-hidden"
      style={{ width: 400, maxHeight: 560, background: C.card, borderColor: C.border }}>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b shrink-0" style={{ borderColor: C.border }}>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold" style={{ color: C.textPrimary }}>{t("Notifications")}</span>
          {unreadCount > 0 && (
            <span className="text-xs font-bold px-1.5 py-0.5 rounded-full" style={{ background: C.gold, color: "#fff", lineHeight: 1.4 }}>
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-xs font-medium hover:opacity-70 transition-opacity" style={{ color: C.gold }}>
              {t("Mark all read")}
            </button>
          )}
          <button onClick={onClose} className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-100 transition-colors">
            <X size={13} color={C.textMuted} />
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-0 px-4 pt-3 pb-2 shrink-0 overflow-x-auto" style={{ borderBottom: `1px solid ${C.border}` }}>
        {filters.map(f => {
          const active = filter === f.key;
          const cnt = f.key === "all" ? unreadCount : notifs.filter(n => n.type === f.key && n.unread).length;
          return (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors mr-1"
              style={{ background: active ? C.gold : "transparent", color: active ? "#fff" : C.textSecondary }}>
              {t(f.label)}
              {cnt > 0 && (
                <span className="text-xs font-bold px-1 rounded-full" style={{ background: active ? "rgba(255,255,255,0.3)" : C.goldLight, color: active ? "#fff" : C.gold, lineHeight: 1.6 }}>
                  {cnt}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* List */}
      <div className="overflow-y-auto flex-1">
        {visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-2">
            <Bell size={28} color={C.border} />
            <span className="text-sm" style={{ color: C.textMuted }}>{t("No notifications")}</span>
          </div>
        ) : visible.map((n, i) => (
          <button key={n.id}
            onClick={() => { markRead(n.id); onClose(); navigate(n.page); }}
            className="w-full flex items-start gap-3 px-4 py-3.5 text-start transition-colors hover:bg-gray-50 border-b last:border-0"
            style={{ borderColor: C.border, background: n.unread ? `${C.gold}08` : "transparent" }}>
            {/* Unread dot */}
            <div className="shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full" style={{ background: n.unread ? C.gold : "transparent", marginTop: 6 }} />
            {/* Icon */}
            <div className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: n.iconColor + "18", color: n.iconColor }}>
              {n.icon}
            </div>
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-semibold leading-snug" style={{ color: n.unread ? C.textPrimary : C.textSecondary }}>{t(n.title)}</span>
                <span className="text-xs shrink-0" style={{ color: C.textMuted, fontSize: 10 }}>{n.time}</span>
              </div>
              <p className="text-xs mt-0.5 leading-relaxed" style={{ color: C.textMuted }}>{n.body}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t shrink-0 flex justify-center" style={{ borderColor: C.border }}>
        <button onClick={() => { onClose(); navigate("/support/tickets"); }} className="text-xs font-medium hover:opacity-70 transition-opacity" style={{ color: C.gold }}>
          {t("View all notifications →")}
        </button>
      </div>
    </div>
  );
}
