import React, { useState } from "react";
import { useOutletContext } from "react-router";
import { Plus, Search, Filter, Building2, CheckCircle2, ShieldAlert, Download, Phone, Mail } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { RootCtx } from "@/types";
import {
  KPICard, SearchBar, PrimaryBtn, OutlineBtn, StatusBadge, Tabs
} from "@/components/ui/CommonUI";

interface ERPVendor {
  id: string;
  name: string;
  category: string;
  contact: string;
  contract: string;
  value: string;
  status: "active" | "inactive";
  sla: string;
}

const erpVendors: ERPVendor[] = [
  { id: "VND-001", name: "AWS Egypt",         category: "Cloud Infrastructure", contact: "aws-support@amazon.com",   contract: "Annual",   value: "EGP 840K/yr",  status: "active",   sla: "99.4%" },
  { id: "VND-002", name: "Paymob Escrow",     category: "Payment Gateway",       contact: "partner@paymob.com",       contract: "Revenue-share", value: "1.5%",    status: "active",   sla: "98.8%" },
  { id: "VND-003", name: "Firebase (Google)", category: "Notifications / Auth",  contact: "firebase@google.com",      contract: "Pay-as-go",  value: "EGP 42K/mo", status: "active",   sla: "99.9%" },
  { id: "VND-004", name: "Dell Technologies", category: "Hardware & Servers",    contact: "enterprise@dell.eg",       contract: "Annual",   value: "EGP 420K/yr",  status: "active",   sla: "96.2%" },
  { id: "VND-005", name: "Twilio",            category: "SMS & Voice",           contact: "support@twilio.com",       contract: "Pay-as-go",  value: "EGP 48K/mo", status: "inactive", sla: "91.0%" },
  { id: "VND-006", name: "Vodafone Enterprise",category: "Telecom & IoT",        contact: "corp@vodafone.com.eg",     contract: "Monthly",  value: "EGP 72K/mo", status: "active",   sla: "94.5%" },
];

export function ERPVendorsPage() {
  const { showToast } = useOutletContext<RootCtx>();
  const [intStatuses, setIntStatuses] = useState<Record<string, string>>({});
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("All");

  const categories = ["All", "Active", "Inactive"];

  const filteredVendors = erpVendors.filter(v => {
    const currentStatus = intStatuses[v.id] ?? v.status;
    const q = query.toLowerCase();
    const matchesQ = v.id.toLowerCase().includes(q) || v.name.toLowerCase().includes(q) || v.category.toLowerCase().includes(q) || v.contact.toLowerCase().includes(q);
    if (tab === "Active") return matchesQ && currentStatus === "active";
    if (tab === "Inactive") return matchesQ && currentStatus === "inactive";
    return matchesQ;
  });

  const activeCount = erpVendors.filter(v => (intStatuses[v.id] ?? v.status) === "active").length;
  const inactiveCount = erpVendors.filter(v => (intStatuses[v.id] ?? v.status) === "inactive").length;

  return (
    <div className="space-y-5">
      {/* Vendor Telemetry KPIs */}
      <div className="grid grid-cols-3 gap-4">
        <KPICard title={t("Active Vendors")} value={String(activeCount)} sub={t("Contracted & SLA monitored")} trend="stable" trendUp icon={<Building2 size={15} />} accent={C.green} />
        <KPICard title={t("Inactive Vendors")} value={String(inactiveCount)} sub={t("Pending renewal or suspended")} trend="-1" trendUp={false} icon={<ShieldAlert size={15} />} accent={C.orange} />
        <KPICard title={t("Annual Vendor Spend")} value="EGP 4.2M" sub={t("Total contracted commitment")} trend="+5.2%" trendUp icon={<CheckCircle2 size={15} />} accent={C.blue} />
      </div>

      {/* Search & Actions Bar */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1">
          <SearchBar placeholder={t("Search vendor name, category, or contact...")} value={query} onChange={setQuery} />
          <Tabs tabs={categories} active={tab} onChange={setTab} />
        </div>
        <div className="flex items-center gap-2">
          <PrimaryBtn small onClick={() => showToast("Vendor onboarding modal opened.")}>
            <Plus size={12} />
            {t("Add Vendor")}
          </PrimaryBtn>
          <OutlineBtn small onClick={() => showToast("Vendor directory exported.")}>
            <Download size={12} />
            {t("Export CSV")}
          </OutlineBtn>
        </div>
      </div>

      {/* Vendors Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredVendors.length === 0 ? (
          <div className="col-span-2 text-center py-12 rounded-xl border" style={{ background: C.card, borderColor: C.border, color: C.textMuted }}>
            {t("No vendors match your search criteria.")}
          </div>
        ) : (
          filteredVendors.map(v => {
            const status = intStatuses[v.id] ?? v.status;
            return (
              <div key={v.id} className="rounded-xl border p-4 flex items-start gap-4 hover:shadow-sm transition-all" style={{ background: C.card, borderColor: C.border }}>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-base font-bold shrink-0"
                  style={{ background: C.bg, border: `1px solid ${C.border}`, color: C.textSecondary }}
                >
                  {v.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold" style={{ color: C.textPrimary }}>{v.name}</span>
                    <StatusBadge status={status} />
                  </div>
                  <div className="text-xs mb-1 font-medium" style={{ color: C.blueMid }}>{t(v.category)}</div>
                  <div className="text-xs font-mono flex items-center gap-1" style={{ color: C.textMuted }}>
                    <Mail size={11} />
                    {v.contact}
                  </div>
                  <div className="flex items-center gap-4 mt-3 pt-2 border-t text-xs" style={{ borderColor: C.border }}>
                    <div>
                      <span className="text-slate-400 block text-[10px]">{t("Contract")}</span>
                      <span className="font-medium" style={{ color: C.textPrimary }}>{t(v.contract)}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">{t("Value")}</span>
                      <span className="font-semibold" style={{ color: C.green }}>{v.value}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">{t("SLA Score")}</span>
                      <span className="font-bold text-emerald-600">{v.sla}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 shrink-0">
                  <OutlineBtn small onClick={() => showToast(`${v.name} contract details opened.`)}>
                    {t("View")}
                  </OutlineBtn>
                  {status === "active" ? (
                    <button
                      className="text-xs px-2 py-1 rounded font-semibold border hover:bg-red-50 text-red-600 transition-colors"
                      style={{ borderColor: C.red }}
                      onClick={() => {
                        setIntStatuses(s => ({ ...s, [v.id]: "inactive" }));
                        showToast(`${v.name} contract set to inactive.`);
                      }}
                    >
                      {t("Disable")}
                    </button>
                  ) : (
                    <button
                      className="text-xs px-2 py-1 rounded font-semibold border hover:bg-emerald-50 text-emerald-600 transition-colors"
                      style={{ borderColor: C.green }}
                      onClick={() => {
                        setIntStatuses(s => ({ ...s, [v.id]: "active" }));
                        showToast(`${v.name} contract reactivated.`);
                      }}
                    >
                      {t("Enable")}
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
