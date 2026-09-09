import React, { useState } from "react";
import { AlertTriangle, Siren, ChevronRight, X, Phone, ShieldAlert, Check } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";

export interface EmergencyAlert {
  id: string;
  severity: "critical" | "warning";
  title: string;
  zone: string;
  service: string;
  time: string;
  contact?: string;
  status: "unassigned" | "escalated" | "acknowledged";
}

export function EmergencyAlertBanner({
  alerts,
  onAcknowledge,
}: {
  alerts: EmergencyAlert[];
  onAcknowledge?: (id: string) => void;
}) {
  const [dismissed, setDismissed] = useState<Record<string, boolean>>({});
  const activeAlerts = alerts.filter(a => !dismissed[a.id]);

  if (activeAlerts.length === 0) return null;

  const primaryAlert = activeAlerts[0];
  const isCritical = primaryAlert.severity === "critical";

  return (
    <div
      className="rounded-2xl border p-3.5 shadow-sm transition-all duration-200 animate-in fade-in slide-in-from-top-2"
      style={{
        background: isCritical ? "rgba(239, 68, 68, 0.08)" : "rgba(245, 158, 11, 0.08)",
        borderColor: isCritical ? "rgba(239, 68, 68, 0.35)" : "rgba(245, 158, 11, 0.35)",
      }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 relative shadow-xs"
            style={{
              background: isCritical ? C.red : C.orange,
              color: "#fff",
            }}
          >
            {isCritical ? <Siren size={16} className="animate-pulse" /> : <AlertTriangle size={16} />}
            <span
              className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-white ring-2 animate-ping"
              style={{ ringColor: isCritical ? C.red : C.orange }}
            />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-[10px] font-bold px-1.5 py-0.2 rounded uppercase tracking-wider text-white"
                style={{ background: isCritical ? C.red : C.orange }}
              >
                {isCritical ? t("Critical SOS") : t("Operational Warning")}
              </span>
              <span className="text-xs font-bold truncate" style={{ color: C.textPrimary }}>
                {primaryAlert.title}
              </span>
              <span className="text-xs font-mono opacity-70" style={{ color: C.textSecondary }}>
                ({primaryAlert.zone} • {primaryAlert.time})
              </span>
            </div>
            <p className="text-xs mt-0.5" style={{ color: C.textSecondary }}>
              {t("Service")}: <b style={{ color: C.textPrimary }}>{primaryAlert.service}</b> — {t("Immediate captain dispatch or supervisor escalation advised.")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          {primaryAlert.contact && (
            <a
              href={`tel:${primaryAlert.contact}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors"
              style={{ borderColor: isCritical ? C.red : C.border, color: isCritical ? C.red : C.textPrimary, background: C.card }}
            >
              <Phone size={12} />
              <span>{t("Call Customer")}</span>
            </a>
          )}

          <button
            onClick={() => {
              if (onAcknowledge) onAcknowledge(primaryAlert.id);
              setDismissed(p => ({ ...p, [primaryAlert.id]: true }));
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white shadow-xs transition-transform active:scale-95"
            style={{ background: isCritical ? C.red : C.orange }}
          >
            <Check size={13} />
            <span>{t("Acknowledge & Dispatch")}</span>
          </button>

          <button
            onClick={() => setDismissed(p => ({ ...p, [primaryAlert.id]: true }))}
            className="p-1 rounded-lg opacity-60 hover:opacity-100 transition-opacity"
            style={{ color: C.textSecondary }}
            title={t("Dismiss alert")}
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
