import React, { useState } from "react";
import { useOutletContext } from "react-router";
import {
  ShieldCheck, ShieldAlert, KeyRound, Lock, UserX, Globe, Laptop, Smartphone,
  Clock, CheckCircle2, AlertTriangle, RefreshCw, Download, Search, Ban, Eye
} from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { RootCtx } from "@/types";
import {
  KPICard, Stat, SearchBar, IconBtn, PrimaryBtn, OutlineBtn,
  TableWrapper, Th, Td, StatusBadge, Tabs, Avatar
} from "@/components/ui/CommonUI";

interface AdminSession {
  id: string;
  adminName: string;
  role: string;
  ip: string;
  location: string;
  device: string;
  lastActive: string;
  totpEnabled: boolean;
  isCurrent: boolean;
  status: "active" | "flagged" | "revoked";
}

const mockAdminSessions: AdminSession[] = [
  { id: "SES-901", adminName: "Youssef Mansour", role: "Super Administrator", ip: "197.54.12.88", location: "Cairo, Egypt", device: "Chrome 126 (MacOS)", lastActive: "Just now", totpEnabled: true, isCurrent: true, status: "active" },
  { id: "SES-902", adminName: "Dina Farouk", role: "Support Team Lead", ip: "197.54.14.102", location: "Giza, Egypt", device: "Safari 17 (macOS)", lastActive: "4 mins ago", totpEnabled: true, isCurrent: false, status: "active" },
  { id: "SES-903", adminName: "Sami Mansour", role: "Operations Supervisor", ip: "156.204.18.42", location: "Alexandria, Egypt", device: "Edge 125 (Windows)", lastActive: "12 mins ago", totpEnabled: true, isCurrent: false, status: "active" },
  { id: "SES-904", adminName: "Tarek Salah", role: "Finance Auditor", ip: "41.235.19.14", location: "New Cairo, Egypt", device: "Firefox 127 (Linux)", lastActive: "1 hour ago", totpEnabled: true, isCurrent: false, status: "flagged" },
];

const securityIncidents = [
  { id: "SEC-102", type: "Multiple Failed Logins", source: "185.220.101.5 (Proxy)", severity: "high", time: "14 mins ago", details: "5 invalid password attempts on admin account" },
  { id: "SEC-101", type: "Unusual Geofence Login", source: "197.54.14.102 (Giza)", severity: "medium", time: "1 hour ago", details: "Login from new IP address cleared by 2FA TOTP" },
  { id: "SEC-100", type: "API Secret Key Rotation", source: "System Automation", severity: "info", time: "3 hours ago", details: "Paymob Webhook secret key auto-rotated" },
];

export function SecurityCommandPage() {
  const { showToast } = useOutletContext<RootCtx>();
  const [sessions, setSessions] = useState<AdminSession[]>(mockAdminSessions);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("All");

  const categories = ["All", "Active Sessions", "Flagged Anomaly"];

  const filteredSessions = sessions.filter(s => {
    const q = query.toLowerCase();
    const matchesQ = s.id.toLowerCase().includes(q) || s.adminName.toLowerCase().includes(q) || s.role.toLowerCase().includes(q) || s.ip.includes(q);
    if (tab === "Active Sessions") return matchesQ && s.status === "active";
    if (tab === "Flagged Anomaly") return matchesQ && s.status === "flagged";
    return matchesQ;
  });

  const handleTerminateSession = (sessionId: string, name: string) => {
    setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, status: "revoked" } : s));
    showToast(`Session ${sessionId} terminated for ${name}.`);
  };

  const handleBlockIP = (ip: string) => {
    showToast(`IP address ${ip} added to firewall blacklist.`);
  };

  const activeCount = sessions.filter(s => s.status === "active").length;
  const flaggedCount = sessions.filter(s => s.status === "flagged").length;

  return (
    <div className="space-y-5">
      {/* Security Telemetry KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <KPICard title={t("Security Health Score")} value="98 / 100" sub={t("Optimal security posture")} trend="+2" trendUp icon={<ShieldCheck size={15} />} accent={C.green} />
        <KPICard title={t("Active Operator Sessions")} value={String(activeCount)} sub={t("Currently authenticated")} trend="stable" trendUp icon={<Laptop size={15} />} accent={C.blue} />
        <KPICard title={t("2FA TOTP Compliance")} value="100%" sub={t("All admin accounts enforced")} trend="stable" trendUp icon={<Lock size={15} />} accent={C.purple} />
        <KPICard title={t("Blocked Threat IP Pings")} value="14 Today" sub={t("Firewall auto-mitigation")} trend="-4" trendUp icon={<Ban size={15} />} accent={C.orange} />
      </div>

      {/* Security Threat Stream & Firewall Status Banner */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 rounded-xl border p-4 flex flex-col justify-between" style={{ background: C.card, borderColor: C.border }}>
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold flex items-center gap-2" style={{ color: C.textPrimary }}>
              <ShieldAlert size={15} style={{ color: C.orange }} />
              {t("Real-Time Security Threat Stream & Audit Log")}
            </div>
            <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: C.greenLight, color: C.green }}>
              Firewall Active
            </span>
          </div>

          <div className="space-y-2">
            {securityIncidents.map(inc => (
              <div key={inc.id} className="p-2.5 rounded-lg border text-xs flex items-center justify-between" style={{ background: C.bg, borderColor: C.border }}>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-bold" style={{ color: C.textPrimary }}>{inc.type}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                      inc.severity === "high" ? "bg-red-100 text-red-700" :
                      inc.severity === "medium" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                    }`}>
                      {inc.severity.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-[11px]" style={{ color: C.textMuted }}>{inc.details}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{inc.source} • {inc.time}</div>
                </div>
                {inc.severity === "high" && (
                  <button
                    className="px-2 py-1 rounded text-xs font-semibold border hover:bg-red-50 text-red-600 transition-colors"
                    style={{ borderColor: C.red }}
                    onClick={() => handleBlockIP(inc.source)}
                  >
                    {t("Block IP")}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Global Security Policy Overview */}
        <div className="rounded-xl border p-4 space-y-3 flex flex-col justify-between" style={{ background: C.card, borderColor: C.border }}>
          <div>
            <div className="flex items-center justify-between border-b pb-2 mb-3" style={{ borderColor: C.border }}>
              <div className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5" style={{ color: C.textPrimary }}>
                <KeyRound size={13} style={{ color: C.purple }} />
                {t("Enforced Policies")}
              </div>
              <span className="text-[11px] font-semibold text-emerald-600">{t("Compliant")}</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded border" style={{ background: C.bg, borderColor: C.border }}>
                <span style={{ color: C.textSecondary }}>{t("TOTP 2FA Enforcement")}</span>
                <CheckCircle2 size={14} style={{ color: C.green }} />
              </div>
              <div className="flex items-center justify-between p-2 rounded border" style={{ background: C.bg, borderColor: C.border }}>
                <span style={{ color: C.textSecondary }}>{t("Session Inactivity Timeout (30m)")}</span>
                <CheckCircle2 size={14} style={{ color: C.green }} />
              </div>
              <div className="flex items-center justify-between p-2 rounded border" style={{ background: C.bg, borderColor: C.border }}>
                <span style={{ color: C.textSecondary }}>{t("IP Geofence Lockout Policy")}</span>
                <CheckCircle2 size={14} style={{ color: C.green }} />
              </div>
              <div className="flex items-center justify-between p-2 rounded border" style={{ background: C.bg, borderColor: C.border }}>
                <span style={{ color: C.textSecondary }}>{t("Password Rotation (90 Days)")}</span>
                <CheckCircle2 size={14} style={{ color: C.green }} />
              </div>
            </div>
          </div>

          <OutlineBtn small onClick={() => showToast("Security policy manager opened.")}>
            {t("Manage Security Rules")}
          </OutlineBtn>
        </div>
      </div>

      {/* Main Search & Control Bar */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1">
          <SearchBar placeholder={t("Search active sessions by admin, role, or IP...")} value={query} onChange={setQuery} />
          <Tabs tabs={categories} active={tab} onChange={setTab} />
        </div>
        <div className="flex items-center gap-2">
          <OutlineBtn small onClick={() => showToast("Security audit log downloaded.")}>
            <Download size={12} />
            {t("Export CSV")}
          </OutlineBtn>
        </div>
      </div>

      {/* Active Admin Sessions Table */}
      <div className="rounded-xl border overflow-hidden" style={{ background: C.card, borderColor: C.border }}>
        <TableWrapper>
          <thead>
            <tr>
              <Th>{t("Session ID")}</Th>
              <Th>{t("Operator & Role")}</Th>
              <Th>{t("IP & Location")}</Th>
              <Th>{t("Device & Browser")}</Th>
              <Th>{t("Last Activity")}</Th>
              <Th>{t("2FA Status")}</Th>
              <Th>{t("Status")}</Th>
              <Th>{t("Actions")}</Th>
            </tr>
          </thead>
          <tbody>
            {filteredSessions.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-sm" style={{ color: C.textMuted }}>
                  {t("No active sessions match your search criteria.")}
                </td>
              </tr>
            ) : (
              filteredSessions.map(s => (
                <tr key={s.id} className="hover:bg-slate-50/60 transition-colors">
                  <Td mono>
                    <span className="font-semibold" style={{ color: C.textPrimary }}>{s.id}</span>
                  </Td>
                  <Td>
                    <div className="flex items-center gap-2">
                      <Avatar name={s.adminName} size={24} />
                      <div>
                        <div className="font-semibold text-sm flex items-center gap-1.5" style={{ color: C.textPrimary }}>
                          {s.adminName}
                          {s.isCurrent && (
                            <span className="text-[9px] bg-blue-100 text-blue-700 px-1 py-0.2 rounded uppercase font-mono">
                              {t("This Device")}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px]" style={{ color: C.textMuted }}>{s.role}</div>
                      </div>
                    </div>
                  </Td>
                  <Td mono>
                    <div>
                      <span className="text-xs font-semibold block" style={{ color: C.textSecondary }}>{s.ip}</span>
                      <span className="text-[11px] text-slate-400">{s.location}</span>
                    </div>
                  </Td>
                  <Td>
                    <span className="text-xs" style={{ color: C.textMuted }}>{s.device}</span>
                  </Td>
                  <Td mono>
                    <span className="text-xs" style={{ color: C.textSecondary }}>{s.lastActive}</span>
                  </Td>
                  <Td>
                    <span className="text-xs px-2 py-0.5 rounded font-medium bg-purple-100 text-purple-700">
                      TOTP 2FA
                    </span>
                  </Td>
                  <Td>
                    <StatusBadge status={s.status} />
                  </Td>
                  <Td>
                    {!s.isCurrent && s.status !== "revoked" && (
                      <button
                        className="px-2 py-1 rounded text-xs font-semibold border hover:bg-red-50 text-red-600 transition-colors"
                        style={{ borderColor: C.red }}
                        onClick={() => handleTerminateSession(s.id, s.adminName)}
                      >
                        {t("Terminate Session")}
                      </button>
                    )}
                  </Td>
                </tr>
              ))
            )}
          </tbody>
        </TableWrapper>
      </div>
    </div>
  );
}
