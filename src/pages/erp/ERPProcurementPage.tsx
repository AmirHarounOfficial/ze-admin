import React, { useState } from "react";
import { useOutletContext } from "react-router";
import {
  FileText, CheckCircle2, Clock, AlertTriangle, Building2, ShoppingBag,
  DollarSign, Plus, Filter, Download, ArrowUpRight, Search, ShieldAlert
} from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { RootCtx } from "@/types";
import {
  KPICard, Stat, SearchBar, IconBtn, PrimaryBtn, OutlineBtn,
  TableWrapper, Th, Td, StatusBadge, Tabs
} from "@/components/ui/CommonUI";

interface PurchaseOrder {
  id: string;
  vendor: string;
  category: string;
  date: string;
  dept: string;
  itemsCount: number;
  amount: number;
  slaDays: number;
  status: "pending_approval" | "dispatched" | "received" | "invoiced" | "disputed";
  description: string;
}

const mockPurchaseOrders: PurchaseOrder[] = [
  { id: "PO-2025-089", vendor: "Dell Technologies Egypt", category: "Hardware & Servers", date: "Jul 12, 2025", dept: "Engineering", itemsCount: 4, amount: 420000, slaDays: 2, status: "pending_approval", description: "Dell PowerEdge R750 Rack Servers x4" },
  { id: "PO-2025-088", vendor: "AWS Egypt",              category: "Cloud Infrastructure",date: "Jul 10, 2025", dept: "DevOps / IT",  itemsCount: 1, amount: 840000, slaDays: 1, status: "invoiced",         description: "Annual Cloud Infrastructure Reserved Instances" },
  { id: "PO-2025-087", vendor: "Raya Mobility",         category: "Fleet Vehicles",     date: "Jul 08, 2025", dept: "Operations",  itemsCount: 2, amount: 640000, slaDays: 5, status: "dispatched",       description: "Road Captain Electric Assist Motorcycles x2" },
  { id: "PO-2025-086", vendor: "Mobica Office Solutions",category: "Office Furniture",   date: "Jul 05, 2025", dept: "HR & Admin",  itemsCount: 18,amount: 145000, slaDays: 3, status: "received",         description: "Ergonomic Chairs & Workstations for Zamalek HQ" },
  { id: "PO-2025-085", vendor: "Cisco Systems Giza",    category: "Network & Security", date: "Jul 01, 2025", dept: "IT Dept",      itemsCount: 6, amount: 98000,  slaDays: 4, status: "pending_approval", description: "Catalyst Gigabit Switches & Firewall Modules" },
  { id: "PO-2025-084", vendor: "Vodafone Egypt Enterprise", category: "Telecom & IoT",   date: "Jun 28, 2025", dept: "Operations",  itemsCount: 150,amount: 72000, slaDays: 2, status: "invoiced",         description: "M2M Telemetry SIM Cards for Tow Trucks" },
  { id: "PO-2025-083", vendor: "Twilio Communications", category: "SMS Gateway",        date: "Jun 24, 2025", dept: "Customer Care",itemsCount: 1, amount: 48000,  slaDays: 7, status: "disputed",         description: "Bulk Verification SMS Gateway Credits" },
];

const vendorRenewals = [
  { vendor: "AWS Egypt", contractEnd: "Aug 15, 2025", daysLeft: 35, score: "99.4%", value: "EGP 840,000", tier: "Strategic" },
  { vendor: "Paymob Escrow", contractEnd: "Jul 28, 2025", daysLeft: 17, score: "98.8%", value: "Revenue-Share", tier: "Critical" },
  { vendor: "Dell Technologies", contractEnd: "Sep 02, 2025", daysLeft: 53, score: "96.2%", value: "EGP 420,000", tier: "Hardware Partner" },
  { vendor: "Vodafone Enterprise", contractEnd: "Jul 20, 2025", daysLeft: 9,  score: "94.5%", value: "EGP 72,000/mo", tier: "Network" },
];

export function ERPProcurementPage() {
  const { showToast } = useOutletContext<RootCtx>();
  const [orders, setOrders] = useState<PurchaseOrder[]>(mockPurchaseOrders);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("All");

  const categories = ["All", "Pending Approval", "Dispatched", "Received", "Invoiced", "Disputed"];

  const filteredOrders = orders.filter(po => {
    const q = query.toLowerCase();
    const matchesQ = po.id.toLowerCase().includes(q) || po.vendor.toLowerCase().includes(q) || po.category.toLowerCase().includes(q) || po.dept.toLowerCase().includes(q);
    if (tab === "Pending Approval") return matchesQ && po.status === "pending_approval";
    if (tab === "Dispatched")       return matchesQ && po.status === "dispatched";
    if (tab === "Received")         return matchesQ && po.status === "received";
    if (tab === "Invoiced")         return matchesQ && po.status === "invoiced";
    if (tab === "Disputed")         return matchesQ && po.status === "disputed";
    return matchesQ;
  });

  const handleApprovePO = (poId: string) => {
    setOrders(prev => prev.map(o => o.id === poId ? { ...o, status: "dispatched" } : o));
    showToast(`Purchase order ${poId} approved and dispatched to vendor.`);
  };

  const handleFlagDispute = (poId: string) => {
    setOrders(prev => prev.map(o => o.id === poId ? { ...o, status: "disputed" } : o));
    showToast(`Dispute flagged for purchase order ${poId}. Finance team notified.`);
  };

  const totalProcurementVal = orders.reduce((sum, o) => sum + o.amount, 0);
  const pendingCount = orders.filter(o => o.status === "pending_approval").length;

  return (
    <div className="space-y-5">
      {/* Top Telemetry KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <KPICard title={t("Active Procurement Vol")} value={`EGP ${(totalProcurementVal / 1000000).toFixed(2)}M`} sub={t("Total active PO commitments")} trend="+12.4%" trendUp icon={<DollarSign size={15} />} accent={C.purple} />
        <KPICard title={t("Open Purchase Orders")}   value={String(orders.length)} sub={t("Across 6 departments")} trend="stable" trendUp icon={<ShoppingBag size={15} />} accent={C.blue} />
        <KPICard title={t("Pending Approvals")}      value={String(pendingCount)} sub={t("Requires management signoff")} trend="-2" trendUp icon={<Clock size={15} />} accent={C.orange} />
        <KPICard title={t("Avg Vendor SLA")}         value="3.2 Days" sub={t("Requisition to delivery")} trend="+0.4d" trendUp={false} icon={<CheckCircle2 size={15} />} accent={C.green} />
      </div>

      {/* PO Lifecycle Funnel & Contract Renewals Alert */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 rounded-xl border p-4 flex flex-col justify-between" style={{ background: C.card, borderColor: C.border }}>
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold flex items-center gap-2" style={{ color: C.textPrimary }}>
              <FileText size={15} style={{ color: C.blue }} />
              {t("Purchase Order Requisition Lifecycle")}
            </div>
            <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: C.blueLight, color: C.blueMid }}>
              FY 2025 PO Engine
            </span>
          </div>

          {/* Lifecycle Stages */}
          <div className="grid grid-cols-5 gap-2 text-center">
            <div className="p-3 rounded-lg border flex flex-col items-center" style={{ background: C.bg, borderColor: C.border }}>
              <span className="text-xs text-slate-500 mb-1">{t("Requisition")}</span>
              <span className="text-base font-bold" style={{ color: C.textPrimary }}>4</span>
              <span className="text-[10px] mt-1 text-slate-400">Internal Needs</span>
            </div>
            <div className="p-3 rounded-lg border flex flex-col items-center" style={{ background: C.bg, borderColor: C.border }}>
              <span className="text-xs text-slate-500 mb-1">{t("Quotes & Bids")}</span>
              <span className="text-base font-bold" style={{ color: C.purple }}>3</span>
              <span className="text-[10px] mt-1 text-purple-600 font-medium">Vendor Quotes</span>
            </div>
            <div className="p-3 rounded-lg border flex flex-col items-center" style={{ background: C.orangeLight, borderColor: C.orange }}>
              <span className="text-xs font-semibold text-amber-700 mb-1">{t("Signoff")}</span>
              <span className="text-base font-bold" style={{ color: C.orange }}>{pendingCount}</span>
              <span className="text-[10px] mt-1 text-amber-600 font-medium">Awaiting Signoff</span>
            </div>
            <div className="p-3 rounded-lg border flex flex-col items-center" style={{ background: C.bg, borderColor: C.border }}>
              <span className="text-xs text-slate-500 mb-1">{t("Dispatched")}</span>
              <span className="text-base font-bold" style={{ color: C.blue }}>2</span>
              <span className="text-[10px] mt-1 text-slate-400">In Transit / Prep</span>
            </div>
            <div className="p-3 rounded-lg border flex flex-col items-center" style={{ background: C.greenLight, borderColor: C.green }}>
              <span className="text-xs font-semibold text-emerald-800 mb-1">{t("Invoiced / Done")}</span>
              <span className="text-base font-bold" style={{ color: C.green }}>2</span>
              <span className="text-[10px] mt-1 text-emerald-600 font-medium">Cleared</span>
            </div>
          </div>
        </div>

        {/* Vendor Contract Expiration Scorecard */}
        <div className="rounded-xl border p-4 space-y-3" style={{ background: C.card, borderColor: C.border }}>
          <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: C.border }}>
            <div className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5" style={{ color: C.textPrimary }}>
              <Building2 size={13} style={{ color: C.purple }} />
              {t("Contract Renewal Scorecard")}
            </div>
            <span className="text-[11px] font-medium text-amber-600">{t("1 Critical")}</span>
          </div>

          <div className="space-y-2 max-h-[120px] overflow-y-auto pr-1">
            {vendorRenewals.map((vr, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded-lg text-xs" style={{ background: C.bg, border: `1px solid ${C.border}` }}>
                <div>
                  <div className="font-semibold" style={{ color: C.textPrimary }}>{vr.vendor}</div>
                  <div className="text-[10px]" style={{ color: C.textMuted }}>{vr.tier} • {vr.value}</div>
                </div>
                <div className="text-right">
                  <div className={`font-bold text-[11px] ${vr.daysLeft <= 10 ? "text-red-600" : "text-amber-600"}`}>
                    {vr.daysLeft} {t("days left")}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-medium">{vr.score} SLA</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Controls & Search */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1">
          <SearchBar placeholder={t("Search POs by ID, vendor, category or department...")} value={query} onChange={setQuery} />
          <Tabs tabs={categories} active={tab} onChange={setTab} />
        </div>
        <div className="flex items-center gap-2">
          <PrimaryBtn small onClick={() => showToast("Purchase order requisition modal opened.")}>
            <Plus size={12} />
            {t("Create Purchase Order")}
          </PrimaryBtn>
          <OutlineBtn small onClick={() => showToast("PO ledger exported to CSV.")}>
            <Download size={12} />
            {t("Export CSV")}
          </OutlineBtn>
        </div>
      </div>

      {/* Purchase Orders Table */}
      <div className="rounded-xl border overflow-hidden" style={{ background: C.card, borderColor: C.border }}>
        <TableWrapper>
          <thead>
            <tr>
              <Th>{t("PO ID")}</Th>
              <Th>{t("Vendor")}</Th>
              <Th>{t("Category & Items")}</Th>
              <Th>{t("Department")}</Th>
              <Th>{t("Order Date")}</Th>
              <Th>{t("Total Amount")}</Th>
              <Th>{t("Status")}</Th>
              <Th>{t("Actions")}</Th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-sm" style={{ color: C.textMuted }}>
                  {t("No purchase orders found matching your criteria.")}
                </td>
              </tr>
            ) : (
              filteredOrders.map(po => (
                <tr key={po.id} className="hover:bg-slate-50/60 transition-colors">
                  <Td mono>
                    <span className="font-semibold" style={{ color: C.blueMid }}>{po.id}</span>
                  </Td>
                  <Td>
                    <div>
                      <span className="font-medium text-sm block" style={{ color: C.textPrimary }}>{po.vendor}</span>
                      <span className="text-[11px]" style={{ color: C.textMuted }}>{po.description}</span>
                    </div>
                  </Td>
                  <Td>
                    <div>
                      <span className="text-xs font-medium" style={{ color: C.textSecondary }}>{po.category}</span>
                      <span className="text-[11px] block text-slate-400">{po.itemsCount} {t("item(s)")}</span>
                    </div>
                  </Td>
                  <Td>
                    <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ background: C.blueLight, color: C.blueMid }}>
                      {po.dept}
                    </span>
                  </Td>
                  <Td>
                    <span className="text-xs" style={{ color: C.textMuted }}>{po.date}</span>
                  </Td>
                  <Td mono>
                    <span className="font-semibold text-sm" style={{ color: C.textPrimary }}>
                      EGP {po.amount.toLocaleString()}
                    </span>
                  </Td>
                  <Td>
                    <StatusBadge status={po.status} />
                  </Td>
                  <Td>
                    <div className="flex items-center gap-1.5">
                      {po.status === "pending_approval" && (
                        <button
                          className="px-2 py-1 rounded text-xs font-semibold border hover:bg-emerald-50 transition-colors"
                          style={{ borderColor: C.green, color: C.green }}
                          onClick={() => handleApprovePO(po.id)}
                        >
                          {t("Approve PO")}
                        </button>
                      )}
                      <OutlineBtn small onClick={() => showToast(`Viewing details for ${po.id}`)}>
                        {t("View")}
                      </OutlineBtn>
                      {po.status !== "disputed" && (
                        <button
                          className="p-1 rounded text-xs hover:bg-red-50 text-red-600 transition-colors"
                          title={t("Flag Dispute")}
                          onClick={() => handleFlagDispute(po.id)}
                        >
                          <ShieldAlert size={13} />
                        </button>
                      )}
                    </div>
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
