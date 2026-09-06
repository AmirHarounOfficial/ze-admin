import React from "react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { hrmDepartments } from "@/mock/mockData";
import { Stat, TableWrapper, Th, Td, Avatar } from "@/components/ui/CommonUI";

const deptBudgets = hrmDepartments.map(d => ({
  dept: d.name,
  budget: parseInt(d.budget.replace(/[^0-9]/g, "")) * 1000,
  spent: Math.round(parseInt(d.budget.replace(/[^0-9]/g, "")) * 1000 * 0.65),
}));

export function ERPBudgetPage() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-4">
        <Stat label={t("Total Annual Budget")}  value="EGP 22.14M" color={C.blue}   />
        <Stat label={t("YTD Spend")}            value="EGP 11.8M"  color={C.orange} />
        <Stat label={t("Remaining")}            value="EGP 10.34M" color={C.green}  />
      </div>
      <div className="rounded-xl border overflow-hidden" style={{ background: C.card, borderColor: C.border }}>
        <div className="px-5 py-3.5 border-b text-sm font-semibold" style={{ borderColor: C.border, color: C.textPrimary }}>{t("Department Budget Tracker — FY 2025")}</div>
        <TableWrapper>
          <thead><tr><Th>{t("Department")}</Th><Th>{t("Head")}</Th><Th>{t("Annual Budget")}</Th><Th>{t("YTD Spent")}</Th><Th>{t("Remaining")}</Th><Th>{t("Utilisation")}</Th></tr></thead>
          <tbody>
            {deptBudgets.map(d => {
              const dept = hrmDepartments.find(hd => hd.name === d.dept)!;
              const remaining = d.budget - d.spent;
              const pct = Math.round((d.spent / d.budget) * 100);
              const color = pct > 90 ? C.red : pct > 70 ? C.orange : C.green;
              return (
                <tr key={d.dept} className="hover:bg-slate-50/60 transition-colors">
                  <Td><span className="font-medium" style={{ color: C.textPrimary }}>{d.dept}</span></Td>
                  <Td><div className="flex items-center gap-2"><Avatar name={dept.head} size={24} />{dept.head}</div></Td>
                  <Td mono>EGP {d.budget.toLocaleString()}</Td>
                  <Td><span style={{ color }}>{`EGP ${d.spent.toLocaleString()}`}</span></Td>
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
            })}
          </tbody>
        </TableWrapper>
      </div>
    </div>
  );
}
