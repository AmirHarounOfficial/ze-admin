import React, { useState } from "react";
import { useOutletContext } from "react-router";
import { C } from "@/theme";
import { t } from "@/i18n";
import { RootCtx } from "@/types";
import { Stat, Tabs, StatusBadge, OutlineBtn } from "@/components/ui/CommonUI";

const integrationList = [
  { id: "INT-001", name: "Paymob",         category: "Payment Gateway",  status: "active",   lastSync: "2 min ago",   logo: "P" },
  { id: "INT-002", name: "Vodafone Cash",  category: "Mobile Wallet",    status: "active",   lastSync: "5 min ago",   logo: "V" },
  { id: "INT-003", name: "EgyPay",         category: "Payment Gateway",  status: "active",   lastSync: "12 min ago",  logo: "E" },
  { id: "INT-004", name: "Google Maps",    category: "Maps & Routing",   status: "active",   lastSync: "1 min ago",   logo: "G" },
  { id: "INT-005", name: "Firebase SMS",   category: "Notifications",    status: "active",   lastSync: "8 min ago",   logo: "F" },
  { id: "INT-006", name: "Twilio",         category: "SMS & Voice",      status: "inactive", lastSync: "2 days ago",  logo: "T" },
  { id: "INT-007", name: "Elastic Email",  category: "Email Delivery",   status: "active",   lastSync: "30 min ago",  logo: "E" },
  { id: "INT-008", name: "Sentry",         category: "Error Tracking",   status: "active",   lastSync: "1 min ago",   logo: "S" },
];

const apiKeys = [
  { label: "Platform API Key",      value: "zt_live_sk_4f8a2c1d9e7b3a6f",  env: "Production" },
  { label: "Webhook Secret",        value: "whsec_8k2p9x1m4q7n3r5v",       env: "Production" },
  { label: "Maps API Key",          value: "AIzaSyB4k8x2p1n9m3q7r5v6w",    env: "Shared"     },
  { label: "Push Notification Key", value: "AAAA8Bk2x:APA91bN4q7r5v6w3p",  env: "Production" },
];

export function IntegrationsPage() {
  const { showToast } = useOutletContext<RootCtx>();
  const [intStatuses, setIntStatuses] = useState<Record<string, string>>({});
  const [tab, setTab] = useState("Integrations");

  function getStatus(i: typeof integrationList[0]) {
    return intStatuses[i.id] ?? i.status;
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-4 gap-4">
        <Stat label={t("Active Integrations")}   value={integrationList.filter(i => (intStatuses[i.id] ?? i.status) === "active").length}   color={C.green} />
        <Stat label={t("Inactive")}              value={integrationList.filter(i => (intStatuses[i.id] ?? i.status) === "inactive").length} color={C.orange} />
        <Stat label={t("API Keys")}              value={apiKeys.length} />
        <Stat label={t("Avg Sync Interval")}     value="5 min" />
      </div>

      <Tabs tabs={["Integrations", "API Keys & Secrets", "Webhooks"]} active={tab} onChange={setTab} />

      {tab === "Integrations" && (
        <div className="grid grid-cols-2 gap-4">
          {integrationList.map(int => {
            const status = getStatus(int);
            return (
              <div key={int.id} className="rounded-xl border p-4 flex items-center gap-4" style={{ background: C.card, borderColor: C.border }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ background: C.bg, border: `1px solid ${C.border}`, color: C.textSecondary }}>
                  {int.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold" style={{ color: C.textPrimary }}>{int.name}</span>
                    <StatusBadge status={status} />
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: C.textMuted }}>{int.category} · Synced {int.lastSync}</div>
                </div>
                <div className="flex gap-1.5">
                  <OutlineBtn small onClick={() => showToast(`${int.name} configuration opened.`)}>{t("Configure")}</OutlineBtn>
                  {status === "active" ? (
                    <button className="text-xs px-2.5 py-1 rounded font-medium"
                      style={{ background: C.redLight, color: C.red }}
                      onClick={() => { setIntStatuses(s => ({ ...s, [int.id]: "inactive" })); showToast(`${int.name} disabled.`); }}>{t("Disable")}</button>
                  ) : (
                    <button className="text-xs px-2.5 py-1 rounded font-medium"
                      style={{ background: C.greenLight, color: C.green }}
                      onClick={() => { setIntStatuses(s => ({ ...s, [int.id]: "active" })); showToast(`${int.name} enabled.`); }}>{t("Enable")}</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === "API Keys & Secrets" && (
        <div className="rounded-xl border overflow-hidden" style={{ background: C.card, borderColor: C.border }}>
          <div className="px-5 py-3.5 border-b text-sm font-semibold" style={{ borderColor: C.border, color: C.textPrimary }}>{t("API Key Credentials")}</div>
          <div className="p-5 space-y-4">
            {apiKeys.map(k => (
              <div key={k.label} className="flex items-center justify-between py-2 border-b last:border-b-0" style={{ borderColor: C.border }}>
                <div>
                  <div className="text-sm font-medium" style={{ color: C.textPrimary }}>{k.label}</div>
                  <div className="text-xs" style={{ color: C.textMuted }}>Environment: {k.env}</div>
                </div>
                <div className="flex items-center gap-2">
                  <code className="text-xs px-2.5 py-1 rounded font-mono" style={{ background: C.bg, color: C.textSecondary }}>{k.value}</code>
                  <OutlineBtn small onClick={() => showToast(`${k.label} copied to clipboard.`)}>{t("Copy")}</OutlineBtn>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "Webhooks" && (
        <div className="rounded-xl border p-6 text-center" style={{ background: C.card, borderColor: C.border }}>
          <div className="text-sm font-semibold mb-1" style={{ color: C.textPrimary }}>{t("Active Webhooks")}</div>
          <div className="text-xs max-w-md mx-auto" style={{ color: C.textMuted }}>
            Webhooks push real-time event notifications to external services. 4 webhooks registered.
          </div>
        </div>
      )}
    </div>
  );
}
