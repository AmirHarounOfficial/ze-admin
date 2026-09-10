import React, { useState } from "react";
import {
  Award, Target, TrendingUp, Clock, UserCheck, Star,
  Search, Filter, Download, Plus, CheckCircle2, ChevronRight,
  MessageSquare, Sparkles, AlertCircle
} from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import {
  KPICard, SectionHeader, TableWrapper, Th, Td, StatusBadge,
  SearchBar, PrimaryBtn, OutlineBtn, Avatar, Toast
} from "@/components/ui/CommonUI";

interface PerformanceRecord {
  id: string;
  name: string;
  dept: string;
  role: string;
  okrScore: number;
  peerRating: number;
  readiness: "Ready" | "Developing" | "Action Needed";
  lastReviewDate: string;
  status: "completed" | "pending" | "in-review";
}

const MOCK_PERFORMANCE: PerformanceRecord[] = [
  {
    id: "EMP-001",
    name: "Youssef Mansour",
    dept: "Engineering",
    role: "VP of Engineering",
    okrScore: 94,
    peerRating: 4.9,
    readiness: "Ready",
    lastReviewDate: "2026-08-30",
    status: "completed",
  },
  {
    id: "EMP-002",
    name: "Dina Hassan",
    dept: "Marketing",
    role: "Head of Marketing",
    okrScore: 88,
    peerRating: 4.7,
    readiness: "Ready",
    lastReviewDate: "2026-08-28",
    status: "completed",
  },
  {
    id: "EMP-003",
    name: "Tarek Salah",
    dept: "Operations",
    role: "Operations Manager",
    okrScore: 82,
    peerRating: 4.5,
    readiness: "Developing",
    lastReviewDate: "2026-09-02",
    status: "in-review",
  },
  {
    id: "EMP-004",
    name: "Karim Adel",
    dept: "Engineering",
    role: "Senior Backend Dev",
    okrScore: 91,
    peerRating: 4.8,
    readiness: "Ready",
    lastReviewDate: "2026-08-25",
    status: "completed",
  },
  {
    id: "EMP-005",
    name: "Hana Mostafa",
    dept: "Engineering",
    role: "Frontend Engineer",
    okrScore: 76,
    peerRating: 4.2,
    readiness: "Developing",
    lastReviewDate: "2026-09-05",
    status: "pending",
  },
  {
    id: "EMP-006",
    name: "Nada Ramadan",
    dept: "Finance",
    role: "Finance Lead",
    okrScore: 96,
    peerRating: 4.95,
    readiness: "Ready",
    lastReviewDate: "2026-08-29",
    status: "completed",
  },
];

export function HRMPerformancePage() {
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [readinessFilter, setReadinessFilter] = useState("all");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const filtered = MOCK_PERFORMANCE.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.role.toLowerCase().includes(search.toLowerCase());
    const matchesDept = deptFilter === "all" || p.dept.toLowerCase() === deptFilter.toLowerCase();
    const matchesReadiness = readinessFilter === "all" || p.readiness.toLowerCase() === readinessFilter.toLowerCase();
    return matchesSearch && matchesDept && matchesReadiness;
  });

  const handleLaunchCycle = () => {
    setToastMsg("Q3 Company Appraisal Cycle launched. 42 review notifications sent to department leads.");
  };

  const handlePromote = (name: string) => {
    setToastMsg(`Promotion recommendation initiated for ${name}. Sent to HR Executive Committee.`);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {toastMsg && <Toast msg={toastMsg} onClose={() => setToastMsg(null)} />}

      {/* Header */}
      <SectionHeader
        title="Performance Evaluation & OKR Scoreboard"
        subtitle="Company-wide OKR progress, quarterly appraisal cycles & promotion readiness tracker"
        actions={
          <div className="flex items-center gap-2">
            <OutlineBtn onClick={() => setToastMsg("Exporting performance appraisal summary...")}>
              <Download size={14} className="mr-1" />
              {t("Export Evaluation Report")}
            </OutlineBtn>
            <PrimaryBtn onClick={handleLaunchCycle}>
              <Sparkles size={14} className="mr-1" />
              {t("Launch Q3 Appraisal Cycle")}
            </PrimaryBtn>
          </div>
        }
      />

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Company OKR Progress"
          value="84.2%"
          sub="Q3 Target: 85.0%"
          trend="+5.1%"
          trendUp={true}
          icon={<Target size={16} />}
          accent={C.green}
        />
        <KPICard
          title="Exceeding Target"
          value="34 Employees"
          sub="Eligible for annual bonus"
          trend="+6 staff"
          trendUp={true}
          icon={<Award size={16} />}
          accent={C.purple}
        />
        <KPICard
          title="Appraisals Pending"
          value="12 Reviews"
          sub="8 manager, 4 HR signoff"
          trend="-4 queued"
          trendUp={true}
          icon={<Clock size={16} />}
          accent={C.orange}
        />
        <KPICard
          title="Promotion Candidates"
          value="8 Employees"
          sub="Ready for tier advancement"
          trend="+2 ready"
          trendUp={true}
          icon={<TrendingUp size={16} />}
          accent={C.blue}
        />
      </div>

      {/* Departmental OKR & Performance Breakdown */}
      <div className="rounded-xl border p-5" style={{ background: C.card, borderColor: C.border }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold" style={{ color: C.textPrimary }}>{t("Departmental OKR Completion Rates")}</h3>
            <p className="text-xs mt-0.5" style={{ color: C.textSecondary }}>{t("Average OKR achievement score across departmental units")}</p>
          </div>
          <span className="text-xs font-mono font-semibold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">
            {t("Q3 Evaluation Period")}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { dept: "Engineering", score: 91, rating: "4.8 ⭐", color: C.blue },
            { dept: "Marketing", score: 82, rating: "4.6 ⭐", color: C.purple },
            { dept: "Operations", score: 85, rating: "4.7 ⭐", color: C.green },
            { dept: "Customer Support", score: 79, rating: "4.4 ⭐", color: C.orange },
            { dept: "Finance & Legal", score: 96, rating: "4.9 ⭐", color: C.gold },
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl border flex flex-col justify-between"
              style={{ background: C.bg, borderColor: C.border }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold" style={{ color: C.textPrimary }}>{t(item.dept)}</span>
                <span className="text-[11px] font-semibold" style={{ color: C.textMuted }}>{item.rating}</span>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span style={{ color: C.textSecondary }}>{t("OKR Completion")}</span>
                  <span className="font-bold font-mono" style={{ color: item.color }}>{item.score}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden bg-gray-200">
                  <div className="h-full rounded-full" style={{ width: `${item.score}%`, background: item.color }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter and Performance Ledger */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <SearchBar
          placeholder="Search employee name, ID, role or department..."
          value={search}
          onChange={setSearch}
        />

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={deptFilter}
            onChange={e => setDeptFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border text-xs outline-none cursor-pointer"
            style={{ background: C.card, borderColor: C.border, color: C.textPrimary }}
          >
            <option value="all">{t("All Departments")}</option>
            <option value="Engineering">{t("Engineering")}</option>
            <option value="Marketing">{t("Marketing")}</option>
            <option value="Operations">{t("Operations")}</option>
            <option value="Finance">{t("Finance")}</option>
          </select>

          <select
            value={readinessFilter}
            onChange={e => setReadinessFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border text-xs outline-none cursor-pointer"
            style={{ background: C.card, borderColor: C.border, color: C.textPrimary }}
          >
            <option value="all">{t("All Readiness Tiers")}</option>
            <option value="Ready">{t("Ready for Promotion")}</option>
            <option value="Developing">{t("Developing Tier")}</option>
            <option value="Action Needed">{t("Action Needed")}</option>
          </select>
        </div>
      </div>

      <TableWrapper>
        <thead>
          <tr>
            <Th>Employee</Th>
            <Th>Department & Role</Th>
            <Th>OKR Score</Th>
            <Th>Peer Rating</Th>
            <Th>Promotion Readiness</Th>
            <Th>Last Review Date</Th>
            <Th>Status</Th>
            <Th right>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
              <Td>
                <div className="flex items-center gap-3">
                  <Avatar name={p.name} size={34} />
                  <div>
                    <div className="font-semibold text-sm" style={{ color: C.textPrimary }}>{p.name}</div>
                    <div className="text-xs font-mono" style={{ color: C.textMuted }}>{p.id}</div>
                  </div>
                </div>
              </Td>
              <Td>
                <div className="flex flex-col">
                  <span className="font-semibold text-xs" style={{ color: C.textPrimary }}>{p.role}</span>
                  <span className="text-[11px]" style={{ color: C.textMuted }}>{p.dept}</span>
                </div>
              </Td>
              <Td>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-1.5 rounded-full overflow-hidden bg-gray-200">
                    <div className="h-full rounded-full"
                      style={{
                        width: `${p.okrScore}%`,
                        background: p.okrScore >= 90 ? C.green : p.okrScore >= 80 ? C.blue : C.orange
                      }} />
                  </div>
                  <span className="text-xs font-bold font-mono">{p.okrScore}%</span>
                </div>
              </Td>
              <Td>
                <span className="font-bold text-amber-600 text-xs">⭐ {p.peerRating}</span>
              </Td>
              <Td>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{
                    background: p.readiness === "Ready" ? "#EFF6FF" : p.readiness === "Developing" ? "#FEF3C7" : "#FEE2E2",
                    color: p.readiness === "Ready" ? "#1D4ED8" : p.readiness === "Developing" ? "#D97706" : "#DC2626",
                  }}>
                  {t(p.readiness)}
                </span>
              </Td>
              <Td>
                <span className="text-xs" style={{ color: C.textMuted }}>{p.lastReviewDate}</span>
              </Td>
              <Td>
                <StatusBadge status={p.status} />
              </Td>
              <Td right>
                <div className="flex items-center justify-end gap-1.5">
                  {p.readiness === "Ready" && (
                    <button
                      onClick={() => handlePromote(p.name)}
                      className="px-2.5 py-1 rounded-lg border text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                      style={{ borderColor: C.blueLight }}
                    >
                      {t("Promote")}
                    </button>
                  )}
                  <button
                    onClick={() => setToastMsg(`Opening performance feedback form for ${p.name}...`)}
                    className="p-1.5 rounded-lg border hover:bg-gray-100 transition-colors"
                    title={t("Send Feedback")}
                    style={{ borderColor: C.border, color: C.textSecondary }}
                  >
                    <MessageSquare size={14} />
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
