import React, { useState } from "react";
import { useOutletContext } from "react-router";
import { Plus, Search, Filter, Download, Database, ShieldCheck, Wrench, DollarSign } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { RootCtx } from "@/types";
import {
  KPICard, SearchBar, PrimaryBtn, OutlineBtn, Tabs, TableWrapper, Th, Td, StatusBadge
} from "@/components/ui/CommonUI";

interface ERPAssetItem {
  id: string;
  name: string;
  category: "Hardware" | "Property" | "Vehicle" | "Servers";
  assignedTo: string;
  value: string;
  status: "in_use" | "maintenance" | "salvage";
  purchased: string;
}

const erpAssets: ERPAssetItem[] = [
  { id: "AST-001", name: 'MacBook Pro 16" M3 Max (Eng)', category: "Hardware", assignedTo: "Youssef Mansour", value: "EGP 95,000", status: "in_use",      purchased: "Jan 2024" },
  { id: "AST-002", name: "Dell Server Rack PowerEdge x4",category: "Servers",  assignedTo: "IT Infra Team",    value: "EGP 420,000",status: "in_use",      purchased: "Mar 2023" },
  { id: "AST-003", name: "HQ Premises — Zamalek Lease",  category: "Property", assignedTo: "Facilities Mgr",   value: "EGP 1.2M",   status: "in_use",      purchased: "Jan 2022" },
  { id: "AST-004", name: "Company Road Van — Cairo 1",   category: "Vehicle",  assignedTo: "Operations Crew",  value: "EGP 320,000",status: "in_use",      purchased: "Jun 2023" },
  { id: "AST-005", name: "iPhone 15 Pro QA Fleet x3",    category: "Hardware", assignedTo: "QA Testing Team",  value: "EGP 42,000", status: "in_use",      purchased: "Feb 2024" },
  { id: "AST-006", name: "Cisco Core Switch Unit x2",   category: "Servers",  assignedTo: "IT Network Team",  value: "EGP 28,000", status: "maintenance", purchased: "Apr 2022" },
];

export function ERPAssetsPage() {
  const { showToast } = useOutletContext<RootCtx>();
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("All");

  const categories = ["All", "Hardware", "Servers", "Property", "Vehicle"];

  const filtered = erpAssets.filter(a => {
    const q = query.toLowerCase();
    const matchesQ = a.id.toLowerCase().includes(q) || a.name.toLowerCase().includes(q) || a.assignedTo.toLowerCase().includes(q);
    if (tab !== "All") return matchesQ && a.category === tab;
    return matchesQ;
  });

  const inUseCount = erpAssets.filter(a => a.status === "in_use").length;
  const maintenanceCount = erpAssets.filter(a => a.status === "maintenance").length;

  return (
    <div className="space-y-5">
      {/* Asset Telemetry KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <KPICard title={t("Total Assets Count")}   value={String(erpAssets.length)} sub={t("Registered enterprise assets")} trend="+2" trendUp icon={<Database size={15} />} accent={C.blue} />
        <KPICard title={t("Assets In Use")}        value={String(inUseCount)} sub={t("Active custodian assignment")} trend="stable" trendUp icon={<ShieldCheck size={15} />} accent={C.green} />
        <KPICard title={t("Under Maintenance")}    value={String(maintenanceCount)} sub={t("Servicing ticket open")} trend="-1" trendUp={false} icon={<Wrench size={15} />} accent={C.orange} />
        <KPICard title={t("Est. Portfolio Value")} value="EGP 2.1M+" sub={t("Net book valuation")} trend="+4.1%" trendUp icon={<DollarSign size={15} />} accent={C.purple} />
      </div>

      {/* Main Controls & Search */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1">
          <SearchBar placeholder={t("Search asset ID, name, or custodian...")} value={query} onChange={setQuery} />
          <Tabs tabs={categories} active={tab} onChange={setTab} />
        </div>
        <div className="flex items-center gap-2">
          <PrimaryBtn small onClick={() => showToast("Asset registration form opened.")}>
            <Plus size={12} />
            {t("Add Asset")}
          </PrimaryBtn>
          <OutlineBtn small onClick={() => showToast("Asset inventory exported.")}>
            <Download size={12} />
            {t("Export CSV")}
          </OutlineBtn>
        </div>
      </div>

      {/* Asset Register Table */}
      <div className="rounded-xl border overflow-hidden" style={{ background: C.card, borderColor: C.border }}>
        <TableWrapper>
          <thead>
            <tr>
              <Th>{t("Asset ID")}</Th>
              <Th>{t("Asset Name")}</Th>
              <Th>{t("Category")}</Th>
              <Th>{t("Assigned To")}</Th>
              <Th>{t("Est. Value")}</Th>
              <Th>{t("Purchased")}</Th>
              <Th>{t("Status")}</Th>
              <Th>{t("Actions")}</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-sm" style={{ color: C.textMuted }}>
                  {t("No assets found matching your criteria.")}
                </td>
              </tr>
            ) : (
              filtered.map(a => (
                <tr key={a.id} className="hover:bg-slate-50/60 transition-colors">
                  <Td mono>
                    <span className="font-semibold" style={{ color: C.textPrimary }}>{a.id}</span>
                  </Td>
                  <Td>
                    <span className="font-medium text-sm" style={{ color: C.textPrimary }}>{a.name}</span>
                  </Td>
                  <Td>
                    <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ background: C.blueLight, color: C.blueMid }}>
                      {t(a.category)}
                    </span>
                  </Td>
                  <Td>
                    <span className="text-xs font-medium" style={{ color: C.textSecondary }}>{a.assignedTo}</span>
                  </Td>
                  <Td mono>{a.value}</Td>
                  <Td>
                    <span className="text-xs text-slate-400">{a.purchased}</span>
                  </Td>
                  <Td>
                    <StatusBadge status={a.status} />
                  </Td>
                  <Td>
                    <OutlineBtn small onClick={() => showToast(`${a.name} record opened.`)}>
                      {t("Edit")}
                    </OutlineBtn>
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
