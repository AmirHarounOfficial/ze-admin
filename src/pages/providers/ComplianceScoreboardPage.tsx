import React, { useState } from "react";
import {
  ShieldCheck, Clock, Award, AlertOctagon, FileText, CheckCircle2,
  AlertTriangle, XCircle, Search, Filter, ArrowRight, ShieldAlert,
  Calendar, RefreshCw, Send, Lock, ChevronRight, Check
} from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import {
  KPICard, SectionHeader, TableWrapper, Th, Td, StatusBadge,
  SearchBar, PrimaryBtn, OutlineBtn, IconBtn, Avatar, Toast
} from "@/components/ui/CommonUI";

interface ExpirationRecord {
  id: string;
  providerName: string;
  category: string;
  tier: "Platinum" | "Gold" | "Silver" | "Probationary";
  docType: string;
  expiryDate: string;
  daysRemaining: number;
  complianceScore: number;
  status: "valid" | "warning" | "critical" | "expired";
}

const MOCK_EXPIRATIONS: ExpirationRecord[] = [
  {
    id: "PRV-8812",
    providerName: "Al-Baraka Towing & Recovery",
    category: "Roadside & Assistance",
    tier: "Platinum",
    docType: "Commercial Register & Tax ID",
    expiryDate: "2026-09-18",
    daysRemaining: 8,
    complianceScore: 98,
    status: "critical",
  },
  {
    id: "PRV-7740",
    providerName: "Modern Home Plumbing Co.",
    category: "Home Services",
    tier: "Gold",
    docType: "Technician Insurance Policy",
    expiryDate: "2026-09-24",
    daysRemaining: 14,
    complianceScore: 92,
    status: "critical",
  },
  {
    id: "PRV-6591",
    providerName: "Cairo Quick Logistics",
    category: "Parcel & Courier Delivery",
    tier: "Silver",
    docType: "Fleet Vehicle Inspection Certificates",
    expiryDate: "2026-10-04",
    daysRemaining: 24,
    complianceScore: 85,
    status: "warning",
  },
  {
    id: "PRV-5402",
    providerName: "Gourmet Kitchen Group",
    category: "Food Delivery & Dining",
    tier: "Gold",
    docType: "Health & Sanitation Permit",
    expiryDate: "2026-10-12",
    daysRemaining: 32,
    complianceScore: 94,
    status: "valid",
  },
  {
    id: "PRV-4319",
    providerName: "El-Nile Auto Repair",
    category: "Car Maintenance",
    tier: "Probationary",
    docType: "Criminal Background Checks",
    expiryDate: "2026-09-08",
    daysRemaining: -2,
    complianceScore: 68,
    status: "expired",
  },
];

interface DisciplinaryLog {
  id: string;
  provider: string;
  type: "Warning" | "Suspension" | "Restored" | "Tier Upgrade";
  reason: string;
  date: string;
  admin: string;
}

const MOCK_DISCIPLINARY: DisciplinaryLog[] = [
  { id: "AUD-991", provider: "El-Nile Auto Repair", type: "Suspension", reason: "Expired criminal background check documentation", date: "2026-09-09", admin: "Super Admin" },
  { id: "AUD-988", provider: "Al-Baraka Towing", type: "Warning", reason: "SLA response breach on 2 emergency calls", date: "2026-09-07", admin: "Ops Manager" },
  { id: "AUD-982", provider: "Modern Home Plumbing", type: "Tier Upgrade", reason: "Promoted from Silver to Gold after 100 clean jobs", date: "2026-09-04", admin: "Super Admin" },
  { id: "AUD-975", provider: "Cairo Express Drivers", type: "Restored", reason: "Updated vehicle inspection uploaded and verified", date: "2026-09-01", admin: "Compliance Officer" },
];

export function ComplianceScoreboardPage() {
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const filteredExpirations = MOCK_EXPIRATIONS.filter(e => {
    const matchesSearch = e.providerName.toLowerCase().includes(search.toLowerCase()) ||
      e.id.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase()) ||
      e.docType.toLowerCase().includes(search.toLowerCase());
    const matchesTier = tierFilter === "all" || e.tier.toLowerCase() === tierFilter.toLowerCase();
    const matchesStatus = statusFilter === "all" || e.status === statusFilter;
    return matchesSearch && matchesTier && matchesStatus;
  });

  const handleSendReminder = (providerName: string) => {
    setToastMsg(`KYC renewal notification & SMS sent to ${providerName}.`);
  };

  const handleMassRemind = () => {
    setToastMsg("Mass renewal reminders sent to 28 providers with expiring credentials.");
  };

  const handleAuditExport = () => {
    setToastMsg("Exporting full compliance audit log & credential records...");
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {toastMsg && <Toast msg={toastMsg} onClose={() => setToastMsg(null)} />}

      {/* Header */}
      <SectionHeader
        title="Compliance & KYC Scoreboard"
        subtitle="End-to-end verification pipeline, credential expiration monitor & provider tiers"
        actions={
          <div className="flex items-center gap-2">
            <OutlineBtn onClick={handleAuditExport}>
              {t("Export Audit Ledger")}
            </OutlineBtn>
            <PrimaryBtn onClick={handleMassRemind}>
              <Send size={14} className="mr-1" />
              {t("Send Mass Renewal Notices")}
            </PrimaryBtn>
          </div>
        }
      />

      {/* KPI Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Verification Pipeline"
          value="142 Applications"
          sub="Avg review time: 1.8 days"
          trend="-12% queue"
          trendUp={true}
          icon={<ShieldCheck size={16} />}
          accent={C.blue}
        />
        <KPICard
          title="Expiring Credentials"
          value="28 Providers"
          sub="12 critical (<15 days)"
          trend="+4 expiring"
          trendUp={false}
          icon={<Clock size={16} />}
          accent={C.orange}
        />
        <KPICard
          title="High Tier Providers"
          value="86.4%"
          sub="Platinum & Gold Tier status"
          trend="+2.5%"
          trendUp={true}
          icon={<Award size={16} />}
          accent={C.green}
        />
        <KPICard
          title="Disciplinary Actions"
          value="9 Logs"
          sub="5 warnings, 3 suspensions, 1 restored"
          trend="-2 actioned"
          trendUp={true}
          icon={<AlertOctagon size={16} />}
          accent={C.red}
        />
      </div>

      {/* 4-Stage Verification Funnel Pipeline */}
      <div className="rounded-xl border p-5" style={{ background: C.card, borderColor: C.border }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold" style={{ color: C.textPrimary }}>{t("Provider Onboarding & Verification Funnel")}</h3>
            <p className="text-xs mt-0.5" style={{ color: C.textSecondary }}>{t("Current distribution of provider applications across onboarding stages")}</p>
          </div>
          <span className="text-xs font-mono font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
            {t("142 Total in Pipeline")}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { stage: "Stage 1", title: "Document Review", count: 45, color: "#3B82F6", sub: "ID, Tax & Licensing" },
            { stage: "Stage 2", title: "Background Checks", count: 38, color: "#8B5CF6", sub: "Criminal record & background" },
            { stage: "Stage 3", title: "Vehicle / Equipment", count: 32, color: "#F59E0B", sub: "Tools & vehicle inspection" },
            { stage: "Stage 4", title: "Ready for Activation", count: 27, color: "#10B981", sub: "Final supervisor signoff" },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl border relative overflow-hidden flex flex-col justify-between"
              style={{ borderColor: C.border, background: C.bg }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">{t(item.stage)}</span>
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
              </div>
              <div>
                <div className="text-2xl font-bold tracking-tight" style={{ color: C.textPrimary }}>{item.count}</div>
                <div className="text-xs font-semibold mt-1" style={{ color: C.textPrimary }}>{t(item.title)}</div>
                <div className="text-[11px] mt-0.5" style={{ color: C.textMuted }}>{t(item.sub)}</div>
              </div>
              <div className="mt-3 pt-3 border-t flex items-center justify-between text-xs font-medium"
                style={{ borderColor: C.border, color: item.color }}>
                <span>{t("View Queue")}</span>
                <ChevronRight size={14} className="rtl:rotate-180" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter and Expiration Ledger */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <SearchBar
          placeholder="Search by provider name, document type, ID or category..."
          value={search}
          onChange={setSearch}
        />

        <div className="flex flex-wrap items-center gap-2">
          {/* Tier Filter */}
          <select
            value={tierFilter}
            onChange={e => setTierFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border text-xs outline-none cursor-pointer"
            style={{ background: C.card, borderColor: C.border, color: C.textPrimary }}
          >
            <option value="all">{t("All Tiers")}</option>
            <option value="Platinum">{t("Platinum Tier")}</option>
            <option value="Gold">{t("Gold Tier")}</option>
            <option value="Silver">{t("Silver Tier")}</option>
            <option value="Probationary">{t("Probationary Tier")}</option>
          </select>

          {/* Expiration Status Filter */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border text-xs outline-none cursor-pointer"
            style={{ background: C.card, borderColor: C.border, color: C.textPrimary }}
          >
            <option value="all">{t("All Statuses")}</option>
            <option value="critical">{t("Critical (<15 Days)")}</option>
            <option value="warning">{t("Warning (<30 Days)")}</option>
            <option value="valid">{t("Valid (>30 Days)")}</option>
            <option value="expired">{t("Expired")}</option>
          </select>
        </div>
      </div>

      {/* Credential Expiration Ledger */}
      <TableWrapper>
        <thead>
          <tr>
            <Th>Provider & Merchant</Th>
            <Th>Category</Th>
            <Th>Tier Rating</Th>
            <Th>Document Type</Th>
            <Th>Expiration Countdown</Th>
            <Th>Compliance Score</Th>
            <Th right>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {filteredExpirations.map((item) => {
            const isCritical = item.daysRemaining <= 15 && item.daysRemaining >= 0;
            const isExpired = item.daysRemaining < 0;

            return (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                <Td>
                  <div className="flex items-center gap-3">
                    <Avatar name={item.providerName} size={34} />
                    <div>
                      <div className="font-semibold text-sm" style={{ color: C.textPrimary }}>{item.providerName}</div>
                      <div className="text-xs font-mono" style={{ color: C.textMuted }}>{item.id}</div>
                    </div>
                  </div>
                </Td>
                <Td>
                  <span className="text-xs font-medium" style={{ color: C.textSecondary }}>{item.category}</span>
                </Td>
                <Td>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold"
                    style={{
                      background: item.tier === "Platinum" ? "#EFF6FF" : item.tier === "Gold" ? "#FEF3C7" : item.tier === "Silver" ? "#F1F5F9" : "#FEE2E2",
                      color: item.tier === "Platinum" ? "#1D4ED8" : item.tier === "Gold" ? "#D97706" : item.tier === "Silver" ? "#475569" : "#DC2626",
                    }}>
                    ⭐ {item.tier}
                  </span>
                </Td>
                <Td>
                  <div className="flex items-center gap-1.5 text-xs">
                    <FileText size={13} color={C.textMuted} />
                    <span style={{ color: C.textPrimary }}>{item.docType}</span>
                  </div>
                </Td>
                <Td>
                  <div className="flex flex-col gap-0.5">
                    <span className={`text-xs font-bold font-mono ${isExpired ? "text-red-600" : isCritical ? "text-amber-600" : "text-emerald-600"}`}>
                      {isExpired ? `Expired ${Math.abs(item.daysRemaining)}d ago` : `${item.daysRemaining} days left`}
                    </span>
                    <span className="text-[10px]" style={{ color: C.textMuted }}>Due: {item.expiryDate}</span>
                  </div>
                </Td>
                <Td>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-1.5 rounded-full overflow-hidden bg-gray-200">
                      <div className="h-full rounded-full"
                        style={{
                          width: `${item.complianceScore}%`,
                          background: item.complianceScore >= 90 ? C.green : item.complianceScore >= 75 ? C.orange : C.red
                        }} />
                    </div>
                    <span className="text-xs font-bold font-mono">{item.complianceScore}/100</span>
                  </div>
                </Td>
                <Td right>
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => handleSendReminder(item.providerName)}
                      className="px-2.5 py-1 rounded-lg border text-xs font-medium hover:bg-gray-50 transition-colors"
                      style={{ borderColor: C.border, color: C.blueMid }}
                    >
                      {t("Send Notice")}
                    </button>
                  </div>
                </Td>
              </tr>
            );
          })}
        </tbody>
      </TableWrapper>

      {/* Disciplinary & Audit Log */}
      <div className="rounded-xl border p-5" style={{ background: C.card, borderColor: C.border }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold" style={{ color: C.textPrimary }}>{t("Disciplinary & Governance Audit Log")}</h3>
            <p className="text-xs mt-0.5" style={{ color: C.textSecondary }}>{t("Recent enforcement actions, warnings, suspensions and tier overrides")}</p>
          </div>
          <OutlineBtn onClick={() => setToastMsg("Opening governance override panel...")} small>
            {t("Supervisor Override")}
          </OutlineBtn>
        </div>

        <div className="space-y-3">
          {MOCK_DISCIPLINARY.map((log) => (
            <div key={log.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-lg border text-xs"
              style={{ borderColor: C.border, background: C.bg }}>
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded font-semibold text-[11px]"
                  style={{
                    background: log.type === "Suspension" ? C.redLight : log.type === "Warning" ? C.orangeLight : log.type === "Restored" ? C.greenLight : C.purpleLight,
                    color: log.type === "Suspension" ? C.red : log.type === "Warning" ? C.orange : log.type === "Restored" ? C.greenText : C.purple,
                  }}>
                  {t(log.type)}
                </span>
                <div>
                  <span className="font-bold" style={{ color: C.textPrimary }}>{log.provider}</span>
                  <span className="mx-1.5" style={{ color: C.textMuted }}>—</span>
                  <span style={{ color: C.textSecondary }}>{log.reason}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 text-[11px]" style={{ color: C.textMuted }}>
                <span>By: {log.admin}</span>
                <span>•</span>
                <span>{log.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
