import React, { useState } from "react";
import { useOutletContext } from "react-router";
import { C } from "@/theme";
import { t } from "@/i18n";
import { RootCtx } from "@/types";
import { Stat, Tabs, TableWrapper, Th, Td, Avatar, StatusBadge } from "@/components/ui/CommonUI";

const leaveRequests = [
  { id: "LV-101", emp: "Dina Hassan",   dept: "Marketing",       type: "Annual",   from: "Jul 10", to: "Jul 20", days: 10, status: "approved",  reason: "Family vacation" },
  { id: "LV-102", emp: "Karim Adel",    dept: "Engineering",     type: "Sick",     from: "Jul 14", to: "Jul 15", days: 2,  status: "pending",   reason: "Medical appointment" },
  { id: "LV-103", emp: "Tarek Salah",   dept: "Operations",      type: "Annual",   from: "Jul 20", to: "Jul 25", days: 5,  status: "pending",   reason: "Personal travel" },
  { id: "LV-104", emp: "Hana Mostafa",  dept: "Engineering",     type: "Unpaid",   from: "Aug 01", to: "Aug 07", days: 7,  status: "rejected",  reason: "Extended break" },
  { id: "LV-105", emp: "Nada Ramadan",  dept: "Finance",         type: "Emergency",from: "Jul 09", to: "Jul 09", days: 1,  status: "approved",  reason: "Family emergency" },
];

export function HRMLeavesPage() {
  const { showToast } = useOutletContext<RootCtx>();
  const [statuses, setStatuses] = useState<Record<string, string>>({});
  const [tab, setTab] = useState("All");

  function getStatus(l: typeof leaveRequests[0]) { return statuses[l.id] ?? l.status; }

  const filtered = leaveRequests.filter(l => tab === "All" ? true : getStatus(l) === tab.toLowerCase());

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <Stat label={t("Pending Approvals")} value={leaveRequests.filter(l => (statuses[l.id] ?? l.status) === "pending").length}  color={C.orange} />
        <Stat label={t("Approved")}          value={leaveRequests.filter(l => (statuses[l.id] ?? l.status) === "approved").length} color={C.green}  />
        <Stat label={t("Rejected")}          value={leaveRequests.filter(l => (statuses[l.id] ?? l.status) === "rejected").length} color={C.red}    />
        <Stat label={t("Days Off This Month")} value="31" />
      </div>
      <Tabs tabs={["All", "Pending", "Approved", "Rejected"]} active={tab} onChange={setTab} />
      <TableWrapper>
        <thead><tr><Th>{t("ID")}</Th><Th>{t("Employee")}</Th><Th>{t("Department")}</Th><Th>{t("Type")}</Th><Th>{t("Period")}</Th><Th>{t("Days")}</Th><Th>{t("Status")}</Th><Th>{t("Actions")}</Th></tr></thead>
        <tbody>
          {filtered.map(l => {
            const st = getStatus(l);
            return (
              <tr key={l.id} className="hover:bg-slate-50/60 transition-colors">
                <Td mono>{l.id}</Td>
                <Td><div className="flex items-center gap-2"><Avatar name={l.emp} size={26} />{l.emp}</div></Td>
                <Td><span className="text-xs" style={{ color: C.textSecondary }}>{l.dept}</span></Td>
                <Td><span className="text-xs px-2 py-0.5 rounded" style={{ background: C.blueLight, color: C.blueMid }}>{l.type}</span></Td>
                <Td><span className="text-xs" style={{ color: C.textSecondary }}>{l.from} → {l.to}</span></Td>
                <Td mono>{l.days}d</Td>
                <Td><StatusBadge status={st} /></Td>
                <Td>
                  {st === "pending" ? (
                    <div className="flex gap-1">
                      <button className="text-xs px-2 py-1 rounded font-medium" style={{ background: C.greenLight, color: C.green }}
                        onClick={() => { setStatuses(s => ({ ...s, [l.id]: "approved" })); showToast(`Leave approved for ${l.emp}.`); }}>{t("Approve")}</button>
                      <button className="text-xs px-2 py-1 rounded font-medium" style={{ background: C.redLight, color: C.red }}
                        onClick={() => { setStatuses(s => ({ ...s, [l.id]: "rejected" })); showToast(`Leave rejected for ${l.emp}.`); }}>{t("Reject")}</button>
                    </div>
                  ) : <span className="text-xs" style={{ color: C.textMuted }}>—</span>}
                </Td>
              </tr>
            );
          })}
        </tbody>
      </TableWrapper>
    </div>
  );
}
