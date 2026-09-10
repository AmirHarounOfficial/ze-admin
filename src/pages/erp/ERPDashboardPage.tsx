import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import {
  DollarSign, TrendingUp, Building2, Database, ShoppingBag, Clock,
  ArrowUpRight, ArrowDownRight, Layers, FileText, CheckCircle2,
  Wrench, ShieldAlert, Plus, Download, Filter, Search, ChevronRight
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell, Legend
} from "recharts";
import { C } from "@/theme";
import { t } from "@/i18n";
import { RootCtx } from "@/types";
import { hrmDepartments } from "@/mock/mockData";
import {
  KPICard, Stat, SearchBar, IconBtn, PrimaryBtn, OutlineBtn,
  TableWrapper, Th, Td, StatusBadge, Tabs, Avatar
} from "@/components/ui/CommonUI";

const monthlyERPSpend = [
  { month: "Jan", budget: 1850000, spent: 1420000, capex: 320000 },
  { month: "Feb", budget: 1850000, spent: 1580000, capex: 280000 },
  { month: "Mar", budget: 1850000, spent: 1690000, capex: 410000 },
  { month: "Apr", budget: 1850000, spent: 1510000, capex: 190000 },
  { month: "May", budget: 1850000, spent: 1740000, capex: 520000 },
  { month: "Jun", budget: 1850000, spent: 1820000, capex: 350000 },
  { month: "Jul (YTD)", budget: 1850000, spent: 1640000, capex: 290000 },
];

const erpVendors = [
  { id: "VND-001", name: "AWS Egypt",         category: "Cloud Infrastructure", contact: "aws-support@amazon.com",   contract: "Annual",   value: "EGP 840K/yr",  status: "active",   sla: "99.4%" },
  { id: "VND-002", name: "Paymob Escrow",     category: "Payment Gateway",       contact: "partner@paymob.com",       contract: "Revenue-share", value: "1.5%",    status: "active",   sla: "98.8%" },
  { id: "VND-003", name: "Firebase (Google)", category: "Notifications / Auth",  contact: "firebase@google.com",      contract: "Pay-as-go",  value: "EGP 42K/mo", status: "active",   sla: "99.9%" },
  { id: "VND-004", name: "Dell Technologies", category: "Hardware & Servers",    contact: "enterprise@dell.eg",       contract: "Annual",   value: "EGP 420K/yr",  status: "active",   sla: "96.2%" },
  { id: "VND-005", name: "Twilio",            category: "SMS & Voice",           contact: "support@twilio.com",       contract: "Pay-as-go",  value: "EGP 48K/mo", status: "inactive", sla: "91.0%" },
  { id: "VND-006", name: "Vodafone Enterprise",category: "Telecom & IoT",        contact: "corp@vodafone.com.eg",     contract: "Monthly",  value: "EGP 72K/mo", status: "active",   sla: "94.5%" },
];

const deptBudgets = hrmDepartments.map(d => {
  const budget = parseInt(d.budget.replace(/[^0-9]/g, "")) * 1000;
  const spent = Math.round(budget * (d.name === "Engineering" ? 0.78 : d.name === "Marketing" ? 0.84 : 0.62));
  return {
    dept: d.name,
    head: d.head,
    budget,
    spent,
    remaining: budget - spent,
    poCount: d.name === "Engineering" ? 8 : d.name === "Marketing" ? 5 : 3,
  };
});

const recentRequisitions = [
  { id: "PO-2025-089", vendor: "Dell Technologies", dept: "Engineering", amount: 420000, date: "Today 14:30", status: "pending_approval" },
  { id: "PO-2025-088", vendor: "AWS Egypt",          dept: "DevOps / IT",  amount: 840000, date: "Yesterday",   status: "invoiced" },
  { id: "PO-2025-087", vendor: "Raya Mobility",     dept: "Operations",  amount: 640000, date: "Jul 08",      status: "dispatched" },
  { id: "PO-2025-086", vendor: "Mobica Furniture",  dept: "HR & Admin",  amount: 145000, date: "Jul 05",      status: "received" },
];

const assetCategoryData = [
  { name: "Hardware", value: 1140000, color: C.blue },
  { name: "Servers & Cloud", value: 920000, color: C.purple },
  { name: "Vehicles & Fleet", value: 850000, color: C.orange },
  { name: "Property Lease", value: 1200000, color: C.green },
];

export function ERPDashboardPage() {
  const navigate = useNavigate();
  const { showToast } = useOutletContext<RootCtx>();

  const totalAnnualBudget = deptBudgets.reduce((sum, d) => sum + d.budget, 0);
  const totalYTDSpent = deptBudgets.reduce((sum, d) => sum + d.spent, 0);
  const totalRemaining = totalAnnualBudget - totalYTDSpent;
  const overallUtilPct = Math.round((totalYTDSpent / totalAnnualBudget) * 100);

  return (
    <div className="space-y-5">
      {/* Top ERP Command Telemetry KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <KPICard
          title={t("Total Fiscal Budget")}
          value={`EGP ${(totalAnnualBudget / 1000000).toFixed(2)}M`}
          sub={t("Approved FY 2025 allocation")}
          trend="stable"
          trendUp
          icon={<DollarSign size={15} />}
          accent={C.blue}
        />
        <KPICard
          title={t("YTD Operating Spend")}
          value={`EGP ${(totalYTDSpent / 1000000).toFixed(2)}M`}
          sub={`${overallUtilPct}% ${t("of budget utilized")}`}
          trend="+3.4%"
          trendUp
          icon={<TrendingUp size={15} />}
          accent={C.purple}
        />
        <KPICard
          title={t("Active Vendors")}
          value={String(erpVendors.filter(v => v.status === "active").length)}
          sub={t("Contracted & SLA monitored")}
          trend="stable"
          trendUp
          icon={<Building2 size={15} />}
          accent={C.green}
        />
        <KPICard
          title={t("Active PO Commitments")}
          value="EGP 3.84M"
          sub={t("7 open purchase orders")}
          trend="+12%"
          trendUp
          icon={<ShoppingBag size={15} />}
          accent={C.orange}
        />
      </div>

      {/* Main Financial Velocity Chart & Asset Valuation Split */}
      <div className="grid grid-cols-3 gap-4">
        {/* Monthly Budget vs Spend & CapEx Outflow */}
        <div className="col-span-2 rounded-xl border overflow-hidden flex flex-col justify-between" style={{ background: C.card, borderColor: C.border }}>
          <div className="px-5 py-3.5 border-b flex items-center justify-between" style={{ borderColor: C.border }}>
            <div>
              <div className="text-sm font-semibold" style={{ color: C.textPrimary }}>
                {t("Enterprise Budget vs Spend & CapEx Velocity")}
              </div>
              <div className="text-xs" style={{ color: C.textMuted }}>
                {t("Monthly operating expenditure and capital investment trends")}
              </div>
            </div>
            <OutlineBtn small onClick={() => navigate("/erp/budget")}>
              {t("View Budget Details")}
              <ChevronRight size={12} className="ml-1" />
            </OutlineBtn>
          </div>

          <div className="p-5">
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={monthlyERPSpend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={C.purple} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={C.purple} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorBudget" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={C.blue} stopOpacity={0.15} />
                    <stop offset="95%" stopColor={C.blue} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: C.textMuted }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: C.textMuted }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000000).toFixed(1)}M`} />
                <Tooltip contentStyle={{ border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 11 }} formatter={(v: number) => `EGP ${v.toLocaleString()}`} />
                <Area type="monotone" dataKey="budget" name="Monthly Cap" stroke={C.blueMid} fillOpacity={1} fill="url(#colorBudget)" strokeWidth={2} />
                <Area type="monotone" dataKey="spent" name="Actual Spend" stroke={C.purple} fillOpacity={1} fill="url(#colorSpent)" strokeWidth={2} />
                <Bar dataKey="capex" name="CapEx Outflow" fill={C.gold} radius={[3,3,0,0]} barSize={16} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Asset Portfolio Distribution */}
        <div className="rounded-xl border p-4 flex flex-col justify-between" style={{ background: C.card, borderColor: C.border }}>
          <div>
            <div className="flex items-center justify-between border-b pb-3 mb-2" style={{ borderColor: C.border }}>
              <div className="text-sm font-semibold flex items-center gap-2" style={{ color: C.textPrimary }}>
                <Database size={15} style={{ color: C.blue }} />
                {t("Asset Portfolio Split")}
              </div>
              <span className="text-xs font-semibold font-mono text-emerald-600">
                EGP 4.11M
              </span>
            </div>

            <div className="py-2">
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie data={assetCategoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={4}>
                    {assetCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val: number) => `EGP ${(val/1000).toFixed(0)}k`} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-1.5 text-xs">
              {assetCategoryData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                    <span style={{ color: C.textSecondary }}>{item.name}</span>
                  </div>
                  <span className="font-semibold font-mono" style={{ color: C.textPrimary }}>
                    EGP {(item.value / 1000).toFixed(0)}K
                  </span>
                </div>
              ))}
            </div>
          </div>

          <OutlineBtn small onClick={() => navigate("/erp/lifecycle")} className="mt-3">
            {t("Asset Lifecycle Hub")}
          </OutlineBtn>
        </div>
      </div>

      {/* Quick Navigation Hub for ERP */}
      <div className="grid grid-cols-4 gap-4">
        <div
          className="rounded-xl border p-4 cursor-pointer hover:shadow-md transition-all flex items-center justify-between"
          style={{ background: C.card, borderColor: C.border }}
          onClick={() => navigate("/erp/procurement")}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: C.purpleLight, color: C.purple }}>
              <ShoppingBag size={18} />
            </div>
            <div>
              <div className="text-sm font-semibold" style={{ color: C.textPrimary }}>{t("Procurement Hub")}</div>
              <div className="text-xs" style={{ color: C.textMuted }}>{t("Purchase orders & bids")}</div>
            </div>
          </div>
          <ChevronRight size={16} style={{ color: C.textMuted }} />
        </div>

        <div
          className="rounded-xl border p-4 cursor-pointer hover:shadow-md transition-all flex items-center justify-between"
          style={{ background: C.card, borderColor: C.border }}
          onClick={() => navigate("/erp/vendors")}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: C.greenLight, color: C.green }}>
              <Building2 size={18} />
            </div>
            <div>
              <div className="text-sm font-semibold" style={{ color: C.textPrimary }}>{t("Vendor Directory")}</div>
              <div className="text-xs" style={{ color: C.textMuted }}>{t("Contracts & SLA scores")}</div>
            </div>
          </div>
          <ChevronRight size={16} style={{ color: C.textMuted }} />
        </div>

        <div
          className="rounded-xl border p-4 cursor-pointer hover:shadow-md transition-all flex items-center justify-between"
          style={{ background: C.card, borderColor: C.border }}
          onClick={() => navigate("/erp/budget")}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: C.blueLight, color: C.blueMid }}>
              <DollarSign size={18} />
            </div>
            <div>
              <div className="text-sm font-semibold" style={{ color: C.textPrimary }}>{t("Budget Tracker")}</div>
              <div className="text-xs" style={{ color: C.textMuted }}>{t("Departmental allocations")}</div>
            </div>
          </div>
          <ChevronRight size={16} style={{ color: C.textMuted }} />
        </div>

        <div
          className="rounded-xl border p-4 cursor-pointer hover:shadow-md transition-all flex items-center justify-between"
          style={{ background: C.card, borderColor: C.border }}
          onClick={() => navigate("/erp/lifecycle")}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: C.orangeLight, color: C.orange }}>
              <Wrench size={18} />
            </div>
            <div>
              <div className="text-sm font-semibold" style={{ color: C.textPrimary }}>{t("Asset Lifecycle")}</div>
              <div className="text-xs" style={{ color: C.textMuted }}>{t("Depreciation & maintenance")}</div>
            </div>
          </div>
          <ChevronRight size={16} style={{ color: C.textMuted }} />
        </div>
      </div>

      {/* Department Budget Utilization Matrix & Recent PO Stream */}
      <div className="grid grid-cols-3 gap-4">
        {/* Department Budget Matrix */}
        <div className="col-span-2 rounded-xl border overflow-hidden" style={{ background: C.card, borderColor: C.border }}>
          <div className="px-5 py-3.5 border-b flex items-center justify-between" style={{ borderColor: C.border }}>
            <div className="text-sm font-semibold" style={{ color: C.textPrimary }}>
              {t("Department Budget Utilization — FY 2025")}
            </div>
            <OutlineBtn small onClick={() => navigate("/erp/budget")}>
              {t("View All Departments")}
            </OutlineBtn>
          </div>

          <TableWrapper>
            <thead>
              <tr>
                <Th>{t("Department")}</Th>
                <Th>{t("Department Head")}</Th>
                <Th>{t("Annual Budget")}</Th>
                <Th>{t("YTD Spent")}</Th>
                <Th>{t("Remaining")}</Th>
                <Th>{t("Utilisation")}</Th>
              </tr>
            </thead>
            <tbody>
              {deptBudgets.map(d => {
                const pct = Math.round((d.spent / d.budget) * 100);
                const color = pct > 80 ? C.orange : pct > 70 ? C.blue : C.green;
                return (
                  <tr key={d.dept} className="hover:bg-slate-50/60 transition-colors">
                    <Td>
                      <span className="font-semibold text-sm" style={{ color: C.textPrimary }}>{d.dept}</span>
                    </Td>
                    <Td>
                      <div className="flex items-center gap-2">
                        <Avatar name={d.head} size={22} />
                        <span className="text-xs" style={{ color: C.textSecondary }}>{d.head}</span>
                      </div>
                    </Td>
                    <Td mono>EGP {d.budget.toLocaleString()}</Td>
                    <Td mono>
                      <span style={{ color }}>EGP {d.spent.toLocaleString()}</span>
                    </Td>
                    <Td mono>EGP {d.remaining.toLocaleString()}</Td>
                    <Td>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full" style={{ background: C.border, minWidth: 70 }}>
                          <div className="h-1.5 rounded-full" style={{ width: `${Math.min(pct, 100)}%`, background: color }} />
                        </div>
                        <span className="text-xs font-semibold" style={{ color }}>{pct}%</span>
                      </div>
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </TableWrapper>
        </div>

        {/* Live Requisition Stream */}
        <div className="rounded-xl border p-4 flex flex-col justify-between" style={{ background: C.card, borderColor: C.border }}>
          <div>
            <div className="flex items-center justify-between border-b pb-3 mb-3" style={{ borderColor: C.border }}>
              <div className="text-sm font-semibold flex items-center gap-2" style={{ color: C.textPrimary }}>
                <FileText size={15} style={{ color: C.purple }} />
                {t("Recent PO Requisitions")}
              </div>
              <span className="text-[11px] font-medium text-purple-600">{recentRequisitions.length} {t("Recent")}</span>
            </div>

            <div className="space-y-2.5">
              {recentRequisitions.map((req) => (
                <div key={req.id} className="p-2.5 rounded-lg border text-xs flex items-center justify-between" style={{ background: C.bg, borderColor: C.border }}>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-bold text-blue-600">{req.id}</span>
                      <StatusBadge status={req.status} />
                    </div>
                    <div className="font-semibold" style={{ color: C.textPrimary }}>{req.vendor}</div>
                    <div className="text-[10px]" style={{ color: C.textMuted }}>{req.dept} • {req.date}</div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-sm block" style={{ color: C.textPrimary }}>
                      EGP {(req.amount / 1000).toFixed(0)}K
                    </span>
                    <button
                      className="text-[10px] text-blue-600 font-semibold hover:underline mt-1"
                      onClick={() => navigate("/erp/procurement")}
                    >
                      {t("Inspect")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <PrimaryBtn small onClick={() => navigate("/erp/procurement")} className="mt-3 w-full justify-center">
            <ShoppingBag size={12} />
            {t("Open Procurement Command")}
          </PrimaryBtn>
        </div>
      </div>
    </div>
  );
}
