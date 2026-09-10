import React, { useState } from "react";
import { useOutletContext } from "react-router";
import {
  Database, Wrench, Shield, TrendingDown, Clock, Plus, Download, Search,
  CheckCircle2, AlertCircle, ArrowUpRight, Cpu, Car, Building2, RefreshCw
} from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { RootCtx } from "@/types";
import {
  KPICard, Stat, SearchBar, IconBtn, PrimaryBtn, OutlineBtn,
  TableWrapper, Th, Td, StatusBadge, Tabs
} from "@/components/ui/CommonUI";

interface LifecycleAsset {
  id: string;
  serial: string;
  name: string;
  category: "Hardware" | "Vehicle" | "Property" | "Servers";
  custodian: string;
  dept: string;
  purchasedDate: string;
  initialCost: number;
  currentBookValue: number;
  salvageValue: number;
  usefulLifeYears: number;
  status: "operational" | "servicing_needed" | "in_repair" | "decommissioned";
  nextMaintenance: string;
}

const mockLifecycleAssets: LifecycleAsset[] = [
  { id: "AST-L-101", serial: "SN-MAC-98214", name: 'MacBook Pro 16" M3 Max (Eng)', category: "Hardware", custodian: "Youssef Mansour", dept: "Engineering", purchasedDate: "Jan 2024", initialCost: 95000, currentBookValue: 71250, salvageValue: 15000, usefulLifeYears: 4, status: "operational", nextMaintenance: "Jan 2026" },
  { id: "AST-L-102", serial: "SN-DEL-44102", name: "Dell PowerEdge Server Rack x4", category: "Servers", custodian: "IT Infra Team", dept: "DevOps", purchasedDate: "Mar 2023", initialCost: 420000, currentBookValue: 252000, salvageValue: 40000, usefulLifeYears: 5, status: "operational", nextMaintenance: "Aug 2025" },
  { id: "AST-L-103", serial: "SN-VHC-77821", name: "Company Road Van — Cairo 1", category: "Vehicle", custodian: "Ahmed El-Sayed", dept: "Operations", purchasedDate: "Jun 2023", initialCost: 320000, currentBookValue: 224000, salvageValue: 60000, usefulLifeYears: 5, status: "servicing_needed", nextMaintenance: "Jul 18, 2025" },
  { id: "AST-L-104", serial: "SN-HQ-ZAM001", name: "Zamalek HQ Office Lease & Renovation", category: "Property", custodian: "Facilities Manager", dept: "HR & Admin", purchasedDate: "Jan 2022", initialCost: 1200000, currentBookValue: 840000, salvageValue: 100000, usefulLifeYears: 10, status: "operational", nextMaintenance: "Dec 2025" },
  { id: "AST-L-105", serial: "SN-IPH-33910", name: "iPhone 15 Pro QA Test Fleet x3", category: "Hardware", custodian: "QA Testing Team", dept: "Product", purchasedDate: "Feb 2024", initialCost: 42000, currentBookValue: 33600, salvageValue: 8000, usefulLifeYears: 3, status: "operational", nextMaintenance: "Nov 2025" },
  { id: "AST-L-106", serial: "SN-CSC-88120", name: "Cisco Enterprise Switch Core x2", category: "Servers", custodian: "Network Support", dept: "IT Dept", purchasedDate: "Apr 2022", initialCost: 28000, currentBookValue: 11200, salvageValue: 3000, usefulLifeYears: 4, status: "in_repair", nextMaintenance: "Immediate" },
  { id: "AST-L-107", serial: "SN-MTR-11029", name: "Honda Rescue Motorcycle — Maadi", category: "Vehicle", custodian: "Khaled Hassan", dept: "Roadside", purchasedDate: "May 2023", initialCost: 85000, currentBookValue: 51000, salvageValue: 12000, usefulLifeYears: 5, status: "operational", nextMaintenance: "Oct 2025" },
];

export function ERPLifecyclePage() {
  const { showToast } = useOutletContext<RootCtx>();
  const [assets, setAssets] = useState<LifecycleAsset[]>(mockLifecycleAssets);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("All");

  const categories = ["All", "Hardware", "Servers", "Vehicle", "Property"];

  const filteredAssets = assets.filter(a => {
    const q = query.toLowerCase();
    const matchesQ = a.id.toLowerCase().includes(q) || a.name.toLowerCase().includes(q) || a.custodian.toLowerCase().includes(q) || a.dept.toLowerCase().includes(q);
    if (tab !== "All") return matchesQ && a.category === tab;
    return matchesQ;
  });

  const totalCost = assets.reduce((sum, a) => sum + a.initialCost, 0);
  const currentBookVal = assets.reduce((sum, a) => sum + a.currentBookValue, 0);
  const accumulatedDepreciation = totalCost - currentBookVal;
  const inMaintenanceCount = assets.filter(a => a.status === "servicing_needed" || a.status === "in_repair").length;

  const handleScheduleService = (assetId: string) => {
    setAssets(prev => prev.map(a => a.id === assetId ? { ...a, status: "in_repair", nextMaintenance: "In Repair (Scheduled)" } : a));
    showToast(`Maintenance scheduled for ${assetId}. Work order sent to facilities tech.`);
  };

  const handleDecommission = (assetId: string) => {
    setAssets(prev => prev.map(a => a.id === assetId ? { ...a, status: "decommissioned" } : a));
    showToast(`Asset ${assetId} decommissioned. Salvage value ledger updated.`);
  };

  return (
    <div className="space-y-5">
      {/* Asset Valuation Telemetry KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <KPICard title={t("Total Asset Portfolio")}  value={`EGP ${(totalCost / 1000000).toFixed(2)}M`} sub={t("Original acquisition cost")} trend="+8.2%" trendUp icon={<Database size={15} />} accent={C.blue} />
        <KPICard title={t("Current Book Value")}     value={`EGP ${(currentBookVal / 1000000).toFixed(2)}M`} sub={t("Net asset balance value")} trend="stable" trendUp icon={<Shield size={15} />} accent={C.purple} />
        <KPICard title={t("Accumulated Depreciation")} value={`EGP ${(accumulatedDepreciation / 1000).toFixed(0)}K`} sub={t("Straight-line depreciation")} trend="-12%" trendUp={false} icon={<TrendingDown size={15} />} accent={C.orange} />
        <KPICard title={t("In Maintenance / Repair")} value={String(inMaintenanceCount)} sub={t("Requires servicing signoff")} trend="-1" trendUp icon={<Wrench size={15} />} accent={C.red} />
      </div>

      {/* Depreciation Overview & Maintenance Calendar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 rounded-xl border p-4 flex flex-col justify-between" style={{ background: C.card, borderColor: C.border }}>
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold flex items-center gap-2" style={{ color: C.textPrimary }}>
              <TrendingDown size={15} style={{ color: C.purple }} />
              {t("Straight-Line Depreciation & Asset Valuation Engine")}
            </div>
            <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: C.purpleLight, color: C.purple }}>
              IAS-16 Standard
            </span>
          </div>

          <div className="space-y-3">
            {/* Category Depreciation Bars */}
            <div>
              <div className="flex justify-between text-xs mb-1" style={{ color: C.textSecondary }}>
                <span>{t("Hardware & Workstations")} (Useful Life: 4 Yrs • 25% / Yr)</span>
                <span className="font-semibold" style={{ color: C.textPrimary }}>EGP 137K / EGP 71K Book</span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: C.border }}>
                <div className="h-full rounded-full" style={{ width: "75%", background: C.blue }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1" style={{ color: C.textSecondary }}>
                <span>{t("Servers & Cloud Hardware")} (Useful Life: 5 Yrs • 20% / Yr)</span>
                <span className="font-semibold" style={{ color: C.textPrimary }}>EGP 448K / EGP 263K Book</span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: C.border }}>
                <div className="h-full rounded-full" style={{ width: "60%", background: C.purple }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1" style={{ color: C.textSecondary }}>
                <span>{t("Fleet Vehicles & Vans")} (Useful Life: 5 Yrs • 20% / Yr)</span>
                <span className="font-semibold" style={{ color: C.textPrimary }}>EGP 405K / EGP 275K Book</span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: C.border }}>
                <div className="h-full rounded-full" style={{ width: "68%", background: C.orange }} />
              </div>
            </div>
          </div>
        </div>

        {/* Preventative Maintenance Planner */}
        <div className="rounded-xl border p-4 space-y-3 flex flex-col justify-between" style={{ background: C.card, borderColor: C.border }}>
          <div>
            <div className="flex items-center justify-between border-b pb-2 mb-2" style={{ borderColor: C.border }}>
              <div className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5" style={{ color: C.textPrimary }}>
                <Wrench size={13} style={{ color: C.orange }} />
                {t("Preventative Maintenance")}
              </div>
              <span className="text-[11px] font-semibold text-red-600">{inMaintenanceCount} {t("Alerts")}</span>
            </div>

            <div className="space-y-2">
              <div className="p-2.5 rounded-lg border text-xs" style={{ background: C.redLight, borderColor: C.red }}>
                <div className="font-semibold text-red-800 flex items-center justify-between">
                  <span>Cisco Switch Core x2</span>
                  <span className="text-[10px] bg-red-200 px-1.5 py-0.5 rounded font-mono">Immediate</span>
                </div>
                <div className="text-[11px] text-red-700 mt-0.5">Hardware failure warning on Port 4. Servicing ticket dispatched.</div>
              </div>

              <div className="p-2.5 rounded-lg border text-xs" style={{ background: C.orangeLight, borderColor: C.orange }}>
                <div className="font-semibold text-amber-800 flex items-center justify-between">
                  <span>Company Road Van — Cairo 1</span>
                  <span className="text-[10px] bg-amber-200 px-1.5 py-0.5 rounded font-mono">Jul 18</span>
                </div>
                <div className="text-[11px] text-amber-700 mt-0.5">Periodic 15,000 km engine servicing & brake inspection due.</div>
              </div>
            </div>
          </div>

          <OutlineBtn small onClick={() => showToast("Maintenance inspection schedule opened.")}>
            <Clock size={12} />
            {t("View Maintenance Log")}
          </OutlineBtn>
        </div>
      </div>

      {/* Search & Filtering Controls */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1">
          <SearchBar placeholder={t("Search assets by tag, serial, custodian or department...")} value={query} onChange={setQuery} />
          <Tabs tabs={categories} active={tab} onChange={setTab} />
        </div>
        <div className="flex items-center gap-2">
          <PrimaryBtn small onClick={() => showToast("New asset entry created.")}>
            <Plus size={12} />
            {t("Add Asset")}
          </PrimaryBtn>
          <OutlineBtn small onClick={() => showToast("Depreciation schedule exported.")}>
            <Download size={12} />
            {t("Export CSV")}
          </OutlineBtn>
        </div>
      </div>

      {/* Asset Lifecycle Table */}
      <div className="rounded-xl border overflow-hidden" style={{ background: C.card, borderColor: C.border }}>
        <TableWrapper>
          <thead>
            <tr>
              <Th>{t("Asset ID")}</Th>
              <Th>{t("Asset Name & Serial")}</Th>
              <Th>{t("Category")}</Th>
              <Th>{t("Custodian & Dept")}</Th>
              <Th>{t("Initial Cost")}</Th>
              <Th>{t("Book Value")}</Th>
              <Th>{t("Status")}</Th>
              <Th>{t("Actions")}</Th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-sm" style={{ color: C.textMuted }}>
                  {t("No assets found matching your search filter.")}
                </td>
              </tr>
            ) : (
              filteredAssets.map(asset => {
                const depPct = Math.round((asset.currentBookValue / asset.initialCost) * 100);
                return (
                  <tr key={asset.id} className="hover:bg-slate-50/60 transition-colors">
                    <Td mono>
                      <span className="font-semibold" style={{ color: C.textPrimary }}>{asset.id}</span>
                    </Td>
                    <Td>
                      <div>
                        <span className="font-medium text-sm block" style={{ color: C.textPrimary }}>{asset.name}</span>
                        <span className="text-[11px] font-mono text-slate-400">{asset.serial}</span>
                      </div>
                    </Td>
                    <Td>
                      <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ background: C.blueLight, color: C.blueMid }}>
                        {asset.category}
                      </span>
                    </Td>
                    <Td>
                      <div>
                        <span className="text-xs font-medium block" style={{ color: C.textSecondary }}>{asset.custodian}</span>
                        <span className="text-[11px] text-slate-400">{asset.dept}</span>
                      </div>
                    </Td>
                    <Td mono>
                      <span className="text-xs" style={{ color: C.textMuted }}>EGP {asset.initialCost.toLocaleString()}</span>
                    </Td>
                    <Td mono>
                      <div>
                        <span className="font-semibold text-sm" style={{ color: C.textPrimary }}>
                          EGP {asset.currentBookValue.toLocaleString()}
                        </span>
                        <div className="flex items-center gap-1 mt-0.5">
                          <div className="w-12 h-1 rounded-full bg-slate-200 overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${depPct}%` }} />
                          </div>
                          <span className="text-[10px] text-slate-400">{depPct}%</span>
                        </div>
                      </div>
                    </Td>
                    <Td>
                      <StatusBadge status={asset.status} />
                    </Td>
                    <Td>
                      <div className="flex items-center gap-1.5">
                        {asset.status !== "in_repair" && asset.status !== "decommissioned" && (
                          <button
                            className="px-2 py-1 rounded text-xs font-semibold border hover:bg-amber-50 transition-colors"
                            style={{ borderColor: C.orange, color: C.orange }}
                            onClick={() => handleScheduleService(asset.id)}
                          >
                            {t("Maintenance")}
                          </button>
                        )}
                        <OutlineBtn small onClick={() => showToast(`Asset ${asset.id} record opened.`)}>
                          {t("Edit")}
                        </OutlineBtn>
                        {asset.status !== "decommissioned" && (
                          <button
                            className="px-2 py-1 rounded text-xs font-medium hover:bg-red-50 text-red-600 transition-colors"
                            onClick={() => handleDecommission(asset.id)}
                          >
                            {t("Decommission")}
                          </button>
                        )}
                      </div>
                    </Td>
                  </tr>
                );
              })
            )}
          </tbody>
        </TableWrapper>
      </div>
    </div>
  );
}
