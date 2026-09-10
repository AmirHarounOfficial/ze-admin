import React, { useState } from "react";
import {
  Clock, Building2, Laptop, AlertTriangle, CheckCircle2,
  Calendar, Download, Filter, Search, Plus, Timer, UserCheck,
  Edit3, ShieldCheck
} from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import {
  KPICard, SectionHeader, TableWrapper, Th, Td, StatusBadge,
  SearchBar, PrimaryBtn, OutlineBtn, Avatar, Toast
} from "@/components/ui/CommonUI";

interface AttendanceRecord {
  id: string;
  name: string;
  dept: string;
  date: string;
  checkIn: string;
  checkOut: string | null;
  totalHours: string;
  overtimeHours: number;
  workMode: "Office" | "Remote" | "Field";
  status: "on-time" | "late" | "absent" | "leave";
}

const MOCK_ATTENDANCE: AttendanceRecord[] = [
  {
    id: "EMP-001",
    name: "Youssef Mansour",
    dept: "Engineering",
    date: "2026-09-10",
    checkIn: "08:52 AM",
    checkOut: "06:15 PM",
    totalHours: "9h 23m",
    overtimeHours: 1.5,
    workMode: "Office",
    status: "on-time",
  },
  {
    id: "EMP-002",
    name: "Dina Hassan",
    dept: "Marketing",
    date: "2026-09-10",
    checkIn: "09:05 AM",
    checkOut: "05:30 PM",
    totalHours: "8h 25m",
    overtimeHours: 0,
    workMode: "Remote",
    status: "on-time",
  },
  {
    id: "EMP-003",
    name: "Tarek Salah",
    dept: "Operations",
    date: "2026-09-10",
    checkIn: "09:42 AM",
    checkOut: null,
    totalHours: "6h 18m",
    overtimeHours: 0,
    workMode: "Field",
    status: "late",
  },
  {
    id: "EMP-004",
    name: "Karim Adel",
    dept: "Engineering",
    date: "2026-09-10",
    checkIn: "08:45 AM",
    checkOut: "07:10 PM",
    totalHours: "10h 25m",
    overtimeHours: 2.5,
    workMode: "Office",
    status: "on-time",
  },
  {
    id: "EMP-005",
    name: "Hana Mostafa",
    dept: "Engineering",
    date: "2026-09-10",
    checkIn: "-",
    checkOut: null,
    totalHours: "0h 00m",
    overtimeHours: 0,
    workMode: "Remote",
    status: "leave",
  },
  {
    id: "EMP-006",
    name: "Nada Ramadan",
    dept: "Finance",
    date: "2026-09-10",
    checkIn: "08:58 AM",
    checkOut: "05:45 PM",
    totalHours: "8h 47m",
    overtimeHours: 0.5,
    workMode: "Office",
    status: "on-time",
  },
];

export function HRMAttendancePage() {
  const [search, setSearch] = useState("");
  const [modeFilter, setModeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const filtered = MOCK_ATTENDANCE.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.id.toLowerCase().includes(search.toLowerCase()) ||
      a.dept.toLowerCase().includes(search.toLowerCase());
    const matchesMode = modeFilter === "all" || a.workMode.toLowerCase() === modeFilter.toLowerCase();
    const matchesStatus = statusFilter === "all" || a.status === statusFilter;
    return matchesSearch && matchesMode && matchesStatus;
  });

  const handleManualPunch = () => {
    setToastMsg("Manual punch adjustment modal opened. Select employee to edit check-in time.");
  };

  const handleApproveOvertime = (name: string, hours: number) => {
    setToastMsg(`Approved ${hours} hours overtime for ${name}. Added to monthly payroll ledger.`);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {toastMsg && <Toast msg={toastMsg} onClose={() => setToastMsg(null)} />}

      {/* Header */}
      <SectionHeader
        title="Attendance & Shift Roster Control"
        subtitle="Real-time clock-in telemetry, remote work check-ins, overtime approvals & anomaly alerts"
        actions={
          <div className="flex items-center gap-2">
            <OutlineBtn onClick={() => setToastMsg("Exporting monthly attendance & clock-in logs CSV...")}>
              <Download size={14} className="mr-1" />
              {t("Export Attendance Logs")}
            </OutlineBtn>
            <PrimaryBtn onClick={handleManualPunch}>
              <Edit3 size={14} className="mr-1" />
              {t("Manual Punch Adjustment")}
            </PrimaryBtn>
          </div>
        }
      />

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="On-Time Check-ins"
          value="94.8%"
          sub="172 of 181 employees today"
          trend="+1.8%"
          trendUp={true}
          icon={<Clock size={16} />}
          accent={C.green}
        />
        <KPICard
          title="Work Mode Split"
          value="68% Office"
          sub="123 Office, 58 Remote, 8 Field"
          trend="Normal ratio"
          trendUp={true}
          icon={<Building2 size={16} />}
          accent={C.blue}
        />
        <KPICard
          title="Overtime Logged"
          value="42.5 hrs"
          sub="Engineering & Operations"
          trend="+4.0 hrs"
          trendUp={false}
          icon={<Timer size={16} />}
          accent={C.purple}
        />
        <KPICard
          title="Anomaly Alerts"
          value="4 Flagged"
          sub="Late >30m or missing checkout"
          trend="-2 resolved"
          trendUp={true}
          icon={<AlertTriangle size={16} />}
          accent={C.orange}
        />
      </div>

      {/* Anomaly Alert Banner */}
      <div className="p-4 rounded-xl border flex items-center justify-between gap-4"
        style={{ background: "rgba(245, 158, 11, 0.08)", borderColor: "rgba(245, 158, 11, 0.25)" }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: C.orange + "20", color: C.orange }}>
            <AlertTriangle size={18} />
          </div>
          <div>
            <div className="text-sm font-semibold" style={{ color: C.textPrimary }}>
              {t("Attendance Anomaly Detected: 4 Missing Check-Outs")}
            </div>
            <div className="text-xs mt-0.5" style={{ color: C.textSecondary }}>
              {t("Tarek Salah and 3 other employees require manual checkout time confirmation before shift closure.")}
            </div>
          </div>
        </div>
        <button onClick={handleManualPunch}
          className="px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors"
          style={{ background: C.gold, color: "#fff" }}>
          {t("Review Flagged Punches")}
        </button>
      </div>

      {/* Filter and Attendance Ledger */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <SearchBar
          placeholder="Search employee name, ID, or department..."
          value={search}
          onChange={setSearch}
        />

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={modeFilter}
            onChange={e => setModeFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border text-xs outline-none cursor-pointer"
            style={{ background: C.card, borderColor: C.border, color: C.textPrimary }}
          >
            <option value="all">{t("All Work Modes")}</option>
            <option value="Office">{t("Office Mode")}</option>
            <option value="Remote">{t("Remote Mode")}</option>
            <option value="Field">{t("Field Mode")}</option>
          </select>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border text-xs outline-none cursor-pointer"
            style={{ background: C.card, borderColor: C.border, color: C.textPrimary }}
          >
            <option value="all">{t("All Statuses")}</option>
            <option value="on-time">{t("On-Time")}</option>
            <option value="late">{t("Late Arrival")}</option>
            <option value="leave">{t("On Leave")}</option>
            <option value="absent">{t("Absent")}</option>
          </select>
        </div>
      </div>

      <TableWrapper>
        <thead>
          <tr>
            <Th>Employee</Th>
            <Th>Department</Th>
            <Th>Check-In</Th>
            <Th>Check-Out</Th>
            <Th>Total Hours</Th>
            <Th>Work Mode</Th>
            <Th>Overtime</Th>
            <Th>Status</Th>
            <Th right>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((a) => (
            <tr key={a.id} className="hover:bg-gray-50/50 transition-colors">
              <Td>
                <div className="flex items-center gap-3">
                  <Avatar name={a.name} size={34} />
                  <div>
                    <div className="font-semibold text-sm" style={{ color: C.textPrimary }}>{a.name}</div>
                    <div className="text-xs font-mono" style={{ color: C.textMuted }}>{a.id}</div>
                  </div>
                </div>
              </Td>
              <Td>
                <span className="text-xs font-medium" style={{ color: C.textSecondary }}>{a.dept}</span>
              </Td>
              <Td mono>{a.checkIn}</Td>
              <Td mono>
                {a.checkOut ? (
                  <span>{a.checkOut}</span>
                ) : (
                  <span className="text-xs text-amber-600 font-semibold italic">{t("Missing Checkout")}</span>
                )}
              </Td>
              <Td mono>{a.totalHours}</Td>
              <Td>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border"
                  style={{
                    background: a.workMode === "Office" ? C.blueLight : a.workMode === "Remote" ? C.purpleLight : C.orangeLight,
                    color: a.workMode === "Office" ? C.blueMid : a.workMode === "Remote" ? C.purple : C.orange,
                    borderColor: "transparent",
                  }}>
                  {a.workMode === "Office" ? <Building2 size={12} /> : a.workMode === "Remote" ? <Laptop size={12} /> : <Clock size={12} />}
                  {t(a.workMode)}
                </span>
              </Td>
              <Td mono>
                {a.overtimeHours > 0 ? (
                  <span className="font-bold text-purple-600">+{a.overtimeHours}h</span>
                ) : (
                  <span className="text-gray-400">0h</span>
                )}
              </Td>
              <Td>
                <StatusBadge status={a.status} />
              </Td>
              <Td right>
                <div className="flex items-center justify-end gap-1.5">
                  {a.overtimeHours > 0 && (
                    <button
                      onClick={() => handleApproveOvertime(a.name, a.overtimeHours)}
                      className="px-2 py-1 rounded text-xs font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                    >
                      {t("Approve OT")}
                    </button>
                  )}
                  <button
                    onClick={handleManualPunch}
                    className="p-1.5 rounded-lg border hover:bg-gray-100 transition-colors"
                    title={t("Edit Punch")}
                    style={{ borderColor: C.border, color: C.textSecondary }}
                  >
                    <Edit3 size={14} />
                  </button>
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </TableWrapper>
    </div>
  );
}
