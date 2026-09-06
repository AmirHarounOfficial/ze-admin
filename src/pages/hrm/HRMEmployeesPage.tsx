import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Plus } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { RootCtx } from "@/types";
import { hrmEmployees, hrmDepartments } from "@/mock/mockData";
import { Stat, SearchBar, PrimaryBtn, TableWrapper, Th, Td, Avatar, StatusBadge, OutlineBtn, Pagination } from "@/components/ui/CommonUI";

export function HRMEmployeesPage() {
  const navigate = useNavigate();
  const { showToast } = useOutletContext<RootCtx>();
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");

  const depts = ["All", ...Array.from(new Set(hrmEmployees.map(e => e.dept)))];
  const filtered = hrmEmployees.filter(e => {
    const matchDept = deptFilter === "All" || e.dept === deptFilter;
    const matchSearch = !search || e.name.toLowerCase().includes(search.toLowerCase()) || e.role.toLowerCase().includes(search.toLowerCase());
    return matchDept && matchSearch;
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <Stat label={t("Total Employees")} value={hrmEmployees.length} />
        <Stat label={t("Departments")}     value={hrmDepartments.length} color={C.blue} />
        <Stat label={t("On Leave")}        value={hrmEmployees.filter(e => e.status === "on_leave").length} color={C.orange} />
        <Stat label={t("Monthly Payroll")} value="EGP 1.28M" color={C.green} />
      </div>

      <div className="flex items-center gap-3">
        <SearchBar placeholder={t("Search by name, role…")} value={search} onChange={setSearch} />
        <select className="text-xs px-3 py-2 rounded-lg border outline-none"
          style={{ borderColor: C.border, background: C.card, color: C.textSecondary }}
          value={deptFilter} onChange={e => setDeptFilter(e.target.value)}>
          {depts.map(d => <option key={d}>{d}</option>)}
        </select>
        <PrimaryBtn small onClick={() => showToast("Employee onboarding form sent.")}><Plus size={12} />{t("Add Employee")}</PrimaryBtn>
      </div>

      <TableWrapper>
        <thead><tr><Th>{t("ID")}</Th><Th>{t("Name")}</Th><Th>{t("Department")}</Th><Th>{t("Role")}</Th><Th>{t("Salary")}</Th><Th>{t("Joined")}</Th><Th>{t("Status")}</Th><Th></Th></tr></thead>
        <tbody>
          {filtered.map(e => (
            <tr key={e.id} className="hover:bg-slate-50/60 transition-colors cursor-pointer" onClick={() => navigate(`/hrm/employees/${e.id}`)}>
              <Td mono>{e.id}</Td>
              <Td><div className="flex items-center gap-2"><Avatar name={e.name} size={28} />{e.name}</div></Td>
              <Td><span className="text-xs" style={{ color: C.textSecondary }}>{e.dept}</span></Td>
              <Td><span className="text-xs font-medium" style={{ color: C.textPrimary }}>{e.role}</span></Td>
              <Td mono>{e.salary}</Td>
              <Td><span className="text-xs" style={{ color: C.textMuted }}>{e.joined}</span></Td>
              <Td><StatusBadge status={e.status} /></Td>
              <Td><OutlineBtn small onClick={ev => { ev.stopPropagation(); navigate(`/hrm/employees/${e.id}`); }}>{t("View")}</OutlineBtn></Td>
            </tr>
          ))}
        </tbody>
      </TableWrapper>
      <Pagination total={`${hrmEmployees.length} employees`} showing={`1–${filtered.length}`} />
    </div>
  );
}
