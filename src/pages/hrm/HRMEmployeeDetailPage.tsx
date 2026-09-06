import React, { useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router";
import { Send, CheckCircle2, Clock, DollarSign, Calendar, Star } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { RootCtx } from "@/types";
import { hrmEmployees, hrmDepartments } from "@/mock/mockData";
import {
  BackBtn, Avatar, DetailHeader, OutlineBtn, PrimaryBtn, KPICard, Tabs, InfoCard, InfoRow, StatusBadge, TableWrapper, Th, Td
} from "@/components/ui/CommonUI";

const leaveRequests = [
  { id: "LV-101", emp: "Dina Hassan",   dept: "Marketing",       type: "Annual",   from: "Jul 10", to: "Jul 20", days: 10, status: "approved",  reason: "Family vacation" },
  { id: "LV-102", emp: "Karim Adel",    dept: "Engineering",     type: "Sick",     from: "Jul 14", to: "Jul 15", days: 2,  status: "pending",   reason: "Medical appointment" },
  { id: "LV-103", emp: "Tarek Salah",   dept: "Operations",      type: "Annual",   from: "Jul 20", to: "Jul 25", days: 5,  status: "pending",   reason: "Personal travel" },
  { id: "LV-104", emp: "Hana Mostafa",  dept: "Engineering",     type: "Unpaid",   from: "Aug 01", to: "Aug 07", days: 7,  status: "rejected",  reason: "Extended break" },
  { id: "LV-105", emp: "Nada Ramadan",  dept: "Finance",         type: "Emergency",from: "Jul 09", to: "Jul 09", days: 1,  status: "approved",  reason: "Family emergency" },
];

export function HRMEmployeeDetailPage() {
  const { id = "EMP-001" } = useParams();
  const navigate = useNavigate();
  const { showToast } = useOutletContext<RootCtx>();
  const e = hrmEmployees.find(x => x.id === id) ?? hrmEmployees[0];
  const [tab, setTab] = useState("Profile");
  const [localStatus, setLocalStatus] = useState(e.status);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <BackBtn to="/hrm/employees" />
        <div className="flex items-center gap-3 flex-1">
          <Avatar name={e.name} size={44} />
          <DetailHeader title={e.name} id={id} subtitle={`${e.role} · ${e.dept}`} badge={localStatus} />
        </div>
        <div className="flex gap-2">
          <OutlineBtn onClick={() => showToast(`Payslip sent to ${e.email}`)}><Send size={13} />{t("Send Payslip")}</OutlineBtn>
          {localStatus === "on_leave" ? (
            <PrimaryBtn onClick={() => { setLocalStatus("active"); showToast("Employee marked as active."); }}>
              <CheckCircle2 size={13} />{t("Mark Active")}</PrimaryBtn>
          ) : (
            <OutlineBtn onClick={() => { setLocalStatus("on_leave"); showToast("Employee marked as on leave."); }}>
              <Clock size={13} />{t("Mark On Leave")}</OutlineBtn>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <KPICard title={t("Monthly Salary")}   value={e.salary}   sub={t("Gross")}          trend="stable" trendUp icon={<DollarSign size={15} />}  accent={C.green}  />
        <KPICard title={t("Tenure")}           value={e.joined}   sub={t("Joined ZeTime")}  trend="stable" trendUp icon={<Calendar size={15} />}     accent={C.blue}   />
        <KPICard title={t("Leave Balance")}    value="14 days"    sub={t("Annual remaining")} trend="stable" trendUp icon={<Clock size={15} />}       accent={C.orange} />
        <KPICard title={t("Performance")}      value="4.6 / 5"    sub={t("Last review")}    trend="+0.2"   trendUp icon={<Star size={15} />}         accent={C.gold}   />
      </div>

      <Tabs tabs={["Profile", "Attendance", "Leave History", "Performance"]} active={tab} onChange={setTab} />

      {tab === "Profile" && (
        <div className="grid grid-cols-2 gap-4">
          <InfoCard title={t("Personal Information")}>
            <InfoRow label={t("Full Name")}   value={e.name} />
            <InfoRow label={t("Employee ID")} value={id} mono />
            <InfoRow label={t("Email")}       value={e.email} mono />
            <InfoRow label={t("Phone")}       value={e.phone} />
            <InfoRow label={t("Status")}      value={<StatusBadge status={localStatus} />} />
          </InfoCard>
          <InfoCard title={t("Employment Details")}>
            <InfoRow label={t("Department")}  value={e.dept} />
            <InfoRow label={t("Role")}        value={e.role} />
            <InfoRow label={t("Salary")}      value={e.salary} />
            <InfoRow label={t("Joined")}      value={e.joined} />
            <InfoRow label={t("Manager")}     value={hrmDepartments.find(d => d.name === e.dept)?.head ?? "—"} />
          </InfoCard>
        </div>
      )}

      {tab === "Attendance" && (
        <div className="rounded-xl border overflow-hidden" style={{ background: C.card, borderColor: C.border }}>
          <div className="px-5 py-3.5 border-b text-sm font-semibold" style={{ borderColor: C.border, color: C.textPrimary }}>{t("July 2025 Attendance")}</div>
          <div className="p-5 grid grid-cols-7 gap-2">
            {Array.from({ length: 31 }, (_, i) => {
              const day = i + 1;
              const isWeekend = (new Date(2025, 6, day).getDay() % 6 === 0);
              const status = isWeekend ? "weekend" : Math.random() > 0.05 ? "present" : "absent";
              return (
                <div key={day} className="aspect-square rounded-lg flex items-center justify-center text-xs font-medium"
                  style={{
                    background: status === "present" ? C.greenLight : status === "absent" ? C.redLight : C.bg,
                    color: status === "present" ? C.green : status === "absent" ? C.red : C.textMuted,
                  }}>{day}</div>
              );
            })}
          </div>
          <div className="px-5 pb-4 flex gap-4">
            {[["present", C.green, C.greenLight, "Present"], ["absent", C.red, C.redLight, "Absent"], ["weekend", C.textMuted, C.bg, "Weekend"]].map(([k, color, bg, label]) => (
              <div key={k} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm" style={{ background: bg as string, border: `1px solid ${color}` }} />
                <span className="text-xs" style={{ color: C.textMuted }}>{label as string}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "Leave History" && (
        <TableWrapper>
          <thead><tr><Th>{t("ID")}</Th><Th>{t("Type")}</Th><Th>{t("From")}</Th><Th>{t("To")}</Th><Th>{t("Days")}</Th><Th>{t("Status")}</Th><Th>{t("Reason")}</Th></tr></thead>
          <tbody>
            {leaveRequests.filter(l => l.emp === e.name).length === 0 ? (
              <tr><td colSpan={7} className="text-center py-8 text-sm" style={{ color: C.textMuted }}>{t("No leave records found.")}</td></tr>
            ) : leaveRequests.filter(l => l.emp === e.name).map(l => (
              <tr key={l.id} className="hover:bg-slate-50/60 transition-colors">
                <Td mono>{l.id}</Td>
                <Td><span className="text-xs px-2 py-0.5 rounded" style={{ background: C.blueLight, color: C.blueMid }}>{l.type}</span></Td>
                <Td>{l.from}</Td><Td>{l.to}</Td>
                <Td mono>{l.days}d</Td>
                <Td><StatusBadge status={l.status} /></Td>
                <Td><span className="text-xs" style={{ color: C.textSecondary }}>{l.reason}</span></Td>
              </tr>
            ))}
          </tbody>
        </TableWrapper>
      )}

      {tab === "Performance" && (
        <div className="grid grid-cols-2 gap-4">
          <InfoCard title={t("Performance Scores")}>
            {[
              { label: "Technical Skills",    score: 4.8 },
              { label: "Communication",       score: 4.2 },
              { label: "Punctuality",         score: 4.7 },
              { label: "Team Collaboration",  score: 4.5 },
              { label: "Initiative",          score: 4.3 },
            ].map(s => (
              <div key={s.label} className="mb-3 last:mb-0">
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: C.textSecondary }}>{s.label}</span>
                  <span className="font-semibold" style={{ color: C.textPrimary }}>{s.score}</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: C.border }}>
                  <div className="h-1.5 rounded-full" style={{ width: `${(s.score / 5) * 100}%`, background: C.gold }} />
                </div>
              </div>
            ))}
          </InfoCard>
          <InfoCard title={t("Last Review Notes")}>
            <div className="text-sm leading-relaxed" style={{ color: C.textSecondary }}>
              "{e.name} consistently delivers high-quality work and shows strong ownership. Recommended for a senior promotion in Q4 2025."
            </div>
            <div className="mt-4 pt-4 border-t" style={{ borderColor: C.border }}>
              <div className="text-xs font-semibold mb-1" style={{ color: C.textSecondary }}>{t("Next Review")}</div>
              <div className="text-sm font-medium" style={{ color: C.textPrimary }}>{t("October 2025")}</div>
            </div>
          </InfoCard>
        </div>
      )}
    </div>
  );
}
