import React, { useState } from "react";
import { useOutletContext } from "react-router";
import { Banknote } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { RootCtx } from "@/types";
import { hrmEmployees } from "@/mock/mockData";
import { Stat, PrimaryBtn, TableWrapper, Th, Td, Avatar, StatusBadge } from "@/components/ui/CommonUI";

export function HRMPayrollPage() {
  const { showToast } = useOutletContext<RootCtx>();
  const [processed, setProcessed] = useState<string[]>([]);

  const payroll = hrmEmployees.map(e => ({
    ...e,
    gross: parseInt(e.salary.replace(/[^0-9]/g, "")),
    tax: Math.round(parseInt(e.salary.replace(/[^0-9]/g, "")) * 0.15),
    insurance: Math.round(parseInt(e.salary.replace(/[^0-9]/g, "")) * 0.06),
  })).map(e => ({ ...e, net: e.gross - e.tax - e.insurance }));

  const total = payroll.reduce((s, e) => s + e.gross, 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <Stat label={t("Gross Payroll")}     value={`EGP ${(total / 1000).toFixed(0)}K`} color={C.green} />
        <Stat label={t("Tax Deductions")}    value={`EGP ${Math.round(total * 0.15 / 1000)}K`} color={C.orange} />
        <Stat label={t("Insurance")}         value={`EGP ${Math.round(total * 0.06 / 1000)}K`} color={C.blue} />
        <Stat label={t("Net Payroll")}       value={`EGP ${Math.round(total * 0.79 / 1000)}K`} color={C.purple} />
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold" style={{ color: C.textPrimary }}>{t("July 2025 Payroll Run")}</div>
        <PrimaryBtn small onClick={() => { setProcessed(hrmEmployees.map(e => e.id)); showToast("Payroll processed for all employees."); }}>
          <Banknote size={13} />{t("Run Payroll")}</PrimaryBtn>
      </div>
      <TableWrapper>
        <thead><tr><Th>{t("Employee")}</Th><Th>{t("Department")}</Th><Th>{t("Gross")}</Th><Th>Tax (15%)</Th><Th>Insurance (6%)</Th><Th>{t("Net Pay")}</Th><Th>{t("Status")}</Th></tr></thead>
        <tbody>
          {payroll.map(e => (
            <tr key={e.id} className="hover:bg-slate-50/60 transition-colors">
              <Td><div className="flex items-center gap-2"><Avatar name={e.name} size={26} />{e.name}</div></Td>
              <Td><span className="text-xs" style={{ color: C.textSecondary }}>{e.dept}</span></Td>
              <Td mono>EGP {e.gross.toLocaleString()}</Td>
              <Td><span className="text-xs" style={{ color: C.orange }}>EGP {e.tax.toLocaleString()}</span></Td>
              <Td><span className="text-xs" style={{ color: C.blue }}>EGP {e.insurance.toLocaleString()}</span></Td>
              <Td><span className="font-semibold text-sm" style={{ color: C.green }}>EGP {e.net.toLocaleString()}</span></Td>
              <Td>
                {processed.includes(e.id)
                  ? <StatusBadge status="completed" />
                  : <StatusBadge status="pending" />}
              </Td>
            </tr>
          ))}
        </tbody>
      </TableWrapper>
    </div>
  );
}
