import React, { useState } from "react";
import { useOutletContext } from "react-router";
import { DollarSign, TrendingUp, Wallet, Search, Download, Plus, Filter, Calculator } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { RootCtx } from "@/types";
import { hrmDepartments } from "@/mock/mockData";
import {
  KPICard, SearchBar, PrimaryBtn, OutlineBtn, TableWrapper, Th, Td, Avatar
} from "@/components/ui/CommonUI";

const deptBudgets = hrmDepartments.map(d => ({
  dept: d.name,
  head: d.head,
  budget: parseInt(d.budget.replace(/[^0-9]/g, "")) * 1000,
  spent: Math.round(parseInt(d.budget.replace(/[^0-9]/g, "")) * 1000 * (d.name === "Engineering" ? 0.78 : d.name === "Marketing" ? 0.84 : 0.62)),
}));

export function ERPBudgetPage() {
  const { showToast } = useOutletContext<RootCtx>();
  const [query, setQuery] = useState("");

  const totalAnnual = deptBudgets.reduce((sum, d) => sum + d.budget, 0);
  const totalSpent = deptBudgets.reduce((sum, d) => sum + d.spent, 0);
  const totalRemaining = totalAnnual - totalSpent;
  const utilPct = Math.round((totalSpent / totalAnnual) * 100);

  const filteredDepts = deptBudgets.filter(d => {
    const q = query.toLowerCase();
    return d.dept.toLowerCase().includes(q) || d.head.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-5">
      {/* Budget Telemetry KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <KPICard title={t("Total Annual Budget")}  value={`EGP ${(totalAnnual / 1000000).toFixed(2)}M`} sub={t("Approved FY 2025 allocation")} trend="stable" trendUp icon={<DollarSign size={15} />} accent={C.blue} />
        <KPICard title={t("YTD Operating Spend")}  value={`EGP ${(totalSpent / 1000000).toFixed(2)}M`} sub={`${utilPct}% ${t("utilized")}`} trend="+3.2%" trendUp icon={<TrendingUp size={15} />} accent={C.purple} />
        <KPICard title={t("Remaining Balance")}   value={`EGP ${(totalRemaining / 1000000).toFixed(2)}M`} sub={t("Available for Q3/Q4")} trend="stable" trendUp icon={<Wallet size={15} />} accent={C.green} />
        <KPICard title={t("Budget Variance")}     value="-2.4%" sub={t("Under budget baseline")} trend="-2.4%" trendUp={false} icon={<Calculator size={15} />} accent={C.orange} />
      </div>

      {/* Main Filter & Action Controls */}
      <div className="flex items-center justify-between gap-3">
        <SearchBar placeholder={t("Search department or manager...")} value={query} onChange={setQuery} />
        <div className="flex items-center gap-2">
          <PrimaryBtn small onClick={() => showToast("Budget reallocation modal opened.")}>
            <Plus size={12} />
            {t("Reallocate Budget")}
          </PrimaryBtn>
          <OutlineBtn small onClick={() => showToast("Budget report exported to CSV.")}>
            <Download size={12} />
            {t("Export CSV")}
          </OutlineBtn>
        </div>
      </div>

      {/* Department Budget Table */}
      <div className="rounded-xl border overflow-hidden" style={{ background: C.card, borderColor: C.border }}>
        <div className="px-5 py-3.5 border-b text-sm font-semibold flex items-center justify-between" style={{ borderColor: C.border, color: C.textPrimary }}>
          <span>{t("Department Budget Tracker — FY 2025")}</span>
          <span className="text-xs text-slate-400 font-mono">6 {t("Departments")}</span>
        </div>
        <TableWrapper>
          <thead>
            <tr>
              <Th>{t("Department")}</Th>
              <Th>{t("Head")}</Th>
              <Th>{t("Annual Budget")}</Th>
              <Th>{t("YTD Spent")}</Th>
              <Th>{t("Remaining")}</Th>
              <Th>{t("Utilisation")}</Th>
            </tr>
          </thead>
          <tbody>
            {filteredDepts.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-sm" style={{ color: C.textMuted }}>
                  {t("No departments found matching your search.")}
                </td>
              </tr>
            ) : (
              filteredDepts.map(d => {
                const remaining = d.budget - d.spent;
                const pct = Math.round((d.spent / d.budget) * 100);
                const color = pct > 80 ? C.orange : pct > 70 ? C.blue : C.green;
                return (
                  <tr key={d.dept} className="hover:bg-slate-50/60 transition-colors">
                    <Td>
                      <span className="font-semibold text-sm" style={{ color: C.textPrimary }}>{t(d.dept)}</span>
                    </Td>
                    <Td>
                      <div className="flex items-center gap-2">
                        <Avatar name={d.head} size={24} />
                        <span className="text-xs font-medium" style={{ color: C.textSecondary }}>{d.head}</span>
                      </div>
                    </Td>
                    <Td mono>EGP {d.budget.toLocaleString()}</Td>
                    <Td mono>
                      <span style={{ color }}>EGP {d.spent.toLocaleString()}</span>
                    </Td>
                    <Td mono>EGP {remaining.toLocaleString()}</Td>
                    <Td>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full" style={{ background: C.border, minWidth: 80 }}>
                          <div className="h-1.5 rounded-full" style={{ width: `${Math.min(pct, 100)}%`, background: color }} />
                        </div>
                        <span className="text-xs font-semibold" style={{ color }}>{pct}%</span>
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
