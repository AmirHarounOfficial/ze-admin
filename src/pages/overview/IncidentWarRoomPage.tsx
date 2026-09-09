import React, { useState, useEffect, useMemo } from "react";
import {
  ShieldAlert, AlertTriangle, Clock, CheckCircle2, Phone, RefreshCw,
  Search, Filter, ArrowRight, Zap, DollarSign, UserCheck, ShieldCheck,
  MapPin, Flame, Radio, ExternalLink, X, ChevronRight, HelpCircle
} from "lucide-react";
import { C, _dark, _lang } from "@/theme";
import { t } from "@/i18n";
import { KPICard } from "@/components/ui/CommonUI";

export interface IncidentItem {
  id: string;
  severity: "critical" | "high" | "moderate";
  category: "roadside" | "food" | "home" | "car" | "parcel";
  title: string;
  description: string;
  customerName: string;
  customerPhone: string;
  location: string;
  assignedStaff: string;
  assignedRole: string;
  assignedPhone: string;
  vehiclePlate?: string;
  targetSlaMinutes: number;
  elapsedMinutes: number;
  status: "active" | "resolving" | "resolved";
  reportedAt: string;
  compensationGiven?: number;
}

const INITIAL_INCIDENTS: IncidentItem[] = [
  {
    id: "INC-881",
    severity: "critical",
    category: "roadside",
    title: "Flatbed SOS — Truck Engine Breakdown on Highway",
    description: "Captain flatbed stalled on Ring Road near Maadi. Customer alone in dark unlit emergency corridor.",
    customerName: "Mohamed Samir",
    customerPhone: "+20 100 445 1199",
    location: "Ring Road (Near Carrefour Maadi)",
    assignedStaff: "Captain Mostafa Nasser",
    assignedRole: "Heavy Flatbed Tow",
    assignedPhone: "+20 114 998 3322",
    vehiclePlate: "ق ر س 4821",
    targetSlaMinutes: 20,
    elapsedMinutes: 38,
    status: "active",
    reportedAt: "38 min ago",
  },
  {
    id: "INC-882",
    severity: "high",
    category: "food",
    title: "Order Delayed > 50 Mins — Courier Unresponsive",
    description: "Pizza Palace → Nasr City. Courier marked delivering 35m ago, GPS signal unchanged for 20m.",
    customerName: "Dina Mansour",
    customerPhone: "+20 102 778 9911",
    location: "Abbas El Akkad, Nasr City, Cairo",
    assignedStaff: "Ahmed Baraka",
    assignedRole: "Food Courier",
    assignedPhone: "+20 120 443 6677",
    vehiclePlate: "س ج د 9102",
    targetSlaMinutes: 35,
    elapsedMinutes: 52,
    status: "active",
    reportedAt: "52 min ago",
  },
  {
    id: "INC-883",
    severity: "high",
    category: "home",
    title: "Master Electrician Delayed — Customer Disputing",
    description: "Scheduled electrical rewiring job. Technician delayed 45m due to highway gridlock. Customer requested cancellation.",
    customerName: "Kareem Safwat",
    customerPhone: "+20 111 889 0022",
    location: "Degla, Maadi, Cairo",
    assignedStaff: "Eng. Mahmoud Sobhy",
    assignedRole: "Master Electrician",
    assignedPhone: "+20 109 332 4455",
    targetSlaMinutes: 30,
    elapsedMinutes: 45,
    status: "active",
    reportedAt: "45 min ago",
  },
  {
    id: "INC-884",
    severity: "critical",
    category: "roadside",
    title: "Desert Highway Battery Dead — Stranded Family",
    description: "Vehicle dead battery on Cairo-Alex Desert Road Km 34. Temperature 39°C with family on board.",
    customerName: "Tarek Fayed",
    customerPhone: "+20 122 556 7788",
    location: "Cairo-Alex Desert Road Km 34",
    assignedStaff: "Pending Auto-Dispatch",
    assignedRole: "Roadside Rescue",
    assignedPhone: "—",
    targetSlaMinutes: 15,
    elapsedMinutes: 22,
    status: "active",
    reportedAt: "22 min ago",
  },
  {
    id: "INC-885",
    severity: "moderate",
    category: "parcel",
    title: "Legal Contract Express Delay — Closing Hours Risk",
    description: "Urgent notary paperwork delivery to Smart Village. Recipient corporate office closes in 25 min.",
    customerName: "Hany Abdelrazek",
    customerPhone: "+20 101 445 6677",
    location: "Smart Village, 6th of October",
    assignedStaff: "Samy Adel",
    assignedRole: "Express Courier",
    assignedPhone: "+20 109 223 1144",
    vehiclePlate: "ب ط ر 3319",
    targetSlaMinutes: 45,
    elapsedMinutes: 42,
    status: "active",
    reportedAt: "42 min ago",
  },
  {
    id: "INC-886",
    severity: "moderate",
    category: "car",
    title: "Mobile Car Wash Site Access Denied",
    description: "Gated compound security refused entry to mobile wash van without pre-registered gate pass.",
    customerName: "Adel Mourad",
    customerPhone: "+20 114 556 7788",
    location: "Palm Hills Compound, Sheikh Zayed",
    assignedStaff: "Karim Zidan",
    assignedRole: "Auto Tech Lead",
    assignedPhone: "+20 106 778 9900",
    vehiclePlate: "م ن و 7714",
    targetSlaMinutes: 20,
    elapsedMinutes: 18,
    status: "active",
    reportedAt: "18 min ago",
  },
];

const BACKUP_PROVIDERS = [
  { name: "Captain Hany Nabil", role: "Flatbed Rescue (Zamalek)", eta: "8 min", rating: 4.95, phone: "+20 100 123 4567" },
  { name: "Yasser El-Sayed", role: "Express Motorbike (Maadi)", eta: "5 min", rating: 4.88, phone: "+20 111 234 5678" },
  { name: "Tamer Gamal", role: "Road Technician (Ring Road)", eta: "11 min", rating: 4.92, phone: "+20 122 345 6789" },
];

export function IncidentWarRoomPage() {
  const [incidents, setIncidents] = useState<IncidentItem[]>(INITIAL_INCIDENTS);
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Modal states
  const [redispatchIncident, setRedispatchIncident] = useState<IncidentItem | null>(null);
  const [walletCreditIncident, setWalletCreditIncident] = useState<IncidentItem | null>(null);
  const [resolveIncident, setResolveIncident] = useState<IncidentItem | null>(null);
  const [creditAmount, setCreditAmount] = useState<number>(100);
  const [resolveNote, setResolveNote] = useState<string>("Issue handled and alternative assigned.");

  function showToast(msg: string) {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  }

  // Simulate incoming emergency
  function handleSimulateEmergency() {
    const newInc: IncidentItem = {
      id: `INC-${Math.floor(890 + Math.random() * 50)}`,
      severity: "critical",
      category: "roadside",
      title: "🚨 SOS Highway Emergency Call",
      description: "Customer pressed in-app Emergency SOS beacon. Vehicle collision on 6th October Bridge.",
      customerName: "Farida Shawky",
      customerPhone: "+20 109 888 1234",
      location: "6th October Bridge (Zamalek Exit)",
      assignedStaff: "Searching Nearest Captain...",
      assignedRole: "Roadside Rescue",
      assignedPhone: "—",
      targetSlaMinutes: 10,
      elapsedMinutes: 2,
      status: "active",
      reportedAt: "Just now",
    };
    setIncidents(prev => [newInc, ...prev]);
    showToast(`${t("Critical SOS")}: ${newInc.id} ${t("Simulate Emergency")}`);
  }

  // Handle re-dispatch
  function confirmRedispatch(providerName: string, providerPhone: string) {
    if (!redispatchIncident) return;
    setIncidents(prev =>
      prev.map(item =>
        item.id === redispatchIncident.id
          ? {
              ...item,
              assignedStaff: providerName,
              assignedPhone: providerPhone,
              description: `${item.description} [${t("Re-dispatch initiated")}: ${providerName}]`,
            }
          : item
      )
    );
    showToast(`${t("Re-dispatch initiated")}: ${providerName} → ${redispatchIncident.id}`);
    setRedispatchIncident(null);
  }

  // Handle wallet credit compensation
  function confirmWalletCredit() {
    if (!walletCreditIncident) return;
    setIncidents(prev =>
      prev.map(item =>
        item.id === walletCreditIncident.id
          ? {
              ...item,
              compensationGiven: (item.compensationGiven || 0) + creditAmount,
            }
          : item
      )
    );
    showToast(`${t("Wallet credit granted")}: ${creditAmount} EGP → ${walletCreditIncident.customerName}`);
    setWalletCreditIncident(null);
  }

  // Handle resolve incident
  function confirmResolve() {
    if (!resolveIncident) return;
    setIncidents(prev =>
      prev.map(item =>
        item.id === resolveIncident.id
          ? { ...item, status: "resolved" }
          : item
      )
    );
    showToast(`${t("Incident marked resolved")}: ${resolveIncident.id}`);
    setResolveIncident(null);
  }

  // Filtered incidents
  const filteredIncidents = useMemo(() => {
    return incidents.filter(item => {
      const matchesSeverity = severityFilter === "all" || item.severity === severityFilter;
      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        item.id.toLowerCase().includes(q) ||
        item.customerName.toLowerCase().includes(q) ||
        item.assignedStaff.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q);

      return matchesSeverity && matchesCategory;
    });
  }, [incidents, severityFilter, categoryFilter, searchQuery]);

  // Metric counts
  const criticalCount = incidents.filter(i => i.severity === "critical" && i.status !== "resolved").length;
  const highCount = incidents.filter(i => i.severity === "high" && i.status !== "resolved").length;
  const resolvedCount = incidents.filter(i => i.status === "resolved").length;

  return (
    <div className="p-6 space-y-6 min-h-screen" style={{ background: C.bg, color: C.text }}>
      {/* Toast alert */}
      {toastMsg && (
        <div
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl text-white text-sm font-medium animate-in fade-in slide-in-from-bottom-5"
          style={{ background: "#06854d" }}
        >
          <CheckCircle2 size={18} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Title & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">{t("Incident Escalation War Room")}</h1>
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-bold"
              style={{ background: "#FEE2E2", color: "#DC2626" }}
            >
              {criticalCount} {t("Critical SOS")}
            </span>
          </div>
          <p className="text-xs" style={{ color: C.textSecondary }}>
            {t("Real-Time Incident Stream")} — Active emergency interventions, SLA breaches, and rapid supervisor dispatch controls.
          </p>
        </div>

        {/* Emergency Simulator button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSimulateEmergency}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-white shadow-md transition-all hover:scale-105 active:scale-95"
            style={{ background: "linear-gradient(135deg, #DC2626, #991B1B)" }}
          >
            <Radio size={14} className="animate-pulse" />
            <span>{t("Simulate Emergency")}</span>
          </button>
        </div>
      </div>

      {/* 4 Top KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Active Critical Breaches"
          value={String(criticalCount)}
          sub={t("Requires immediate supervisor action")}
          trend="+2"
          trendUp={false}
          icon={<Flame size={18} />}
          accent="#DC2626"
        />
        <KPICard
          title="SLA At-Risk Orders"
          value={String(highCount)}
          sub={t("Overdue delivery & technician delays")}
          trend="+4"
          trendUp={false}
          icon={<AlertTriangle size={18} />}
          accent="#EA580C"
        />
        <KPICard
          title="Mean Time to Resolution"
          value="7.4 min"
          sub={t("Average supervisor response time")}
          trend="↓ 1.2 min"
          trendUp={true}
          icon={<Clock size={18} />}
          accent="#2563EB"
        />
        <KPICard
          title="Resolved Today"
          value={String(resolvedCount + 42)}
          sub={t("Successfully closed & compensated")}
          trend="+8"
          trendUp={true}
          icon={<ShieldCheck size={18} />}
          accent="#06854d"
        />
      </div>

      {/* Filter and Search Bar */}
      <div
        className="p-4 rounded-xl border flex flex-col md:flex-row gap-3 items-center justify-between"
        style={{ background: C.card, borderColor: C.border }}
      >
        <div className="flex items-center gap-2 w-full md:w-auto">
          {/* Severity filter buttons */}
          <div className="flex items-center gap-1.5 p-1 rounded-lg border text-xs font-medium" style={{ borderColor: C.border }}>
            <button
              onClick={() => setSeverityFilter("all")}
              className={`px-3 py-1.5 rounded-md transition-colors ${severityFilter === "all" ? "bg-blue-600 text-white font-bold" : "hover:opacity-80"}`}
            >
              {t("All")} ({incidents.length})
            </button>
            <button
              onClick={() => setSeverityFilter("critical")}
              className={`px-3 py-1.5 rounded-md transition-colors ${severityFilter === "critical" ? "bg-red-600 text-white font-bold" : "hover:opacity-80"}`}
            >
              🔴 {t("Critical SOS")} ({criticalCount})
            </button>
            <button
              onClick={() => setSeverityFilter("high")}
              className={`px-3 py-1.5 rounded-md transition-colors ${severityFilter === "high" ? "bg-orange-500 text-white font-bold" : "hover:opacity-80"}`}
            >
              🟠 {t("High SLA Breach")} ({highCount})
            </button>
            <button
              onClick={() => setSeverityFilter("moderate")}
              className={`px-3 py-1.5 rounded-md transition-colors ${severityFilter === "moderate" ? "bg-yellow-500 text-white font-bold" : "hover:opacity-80"}`}
            >
              🟡 {t("Moderate Delay")}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          {/* Vertical filter */}
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg border text-xs font-medium outline-none"
            style={{ background: C.bg, borderColor: C.border, color: C.text }}
          >
            <option value="all">{t("All")} {t("Verticals")}</option>
            <option value="roadside">{t("Roadside & Assistance")}</option>
            <option value="food">{t("Food Delivery")}</option>
            <option value="home">{t("Home Services")}</option>
            <option value="car">{t("Car Services")}</option>
            <option value="parcel">{t("Parcel Network")}</option>
          </select>

          {/* Search box */}
          <div className="relative flex-1 md:w-64">
            <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={`${t("Search")} ID, Customer, Staff...`}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border text-xs outline-none"
              style={{ background: C.bg, borderColor: C.border, color: C.text }}
            />
          </div>
        </div>
      </div>

      {/* Incidents Feed Roster */}
      <div className="space-y-4">
        {filteredIncidents.length === 0 ? (
          <div
            className="p-12 text-center rounded-2xl border flex flex-col items-center justify-center gap-2"
            style={{ background: C.card, borderColor: C.border }}
          >
            <CheckCircle2 size={40} className="text-emerald-500" />
            <h3 className="text-base font-semibold">{t("No active incidents")}</h3>
            <p className="text-xs max-w-sm" style={{ color: C.textSecondary }}>
              All service level agreements are being met across all 7 operational verticals.
            </p>
          </div>
        ) : (
          filteredIncidents.map(item => {
            const isCritical = item.severity === "critical";
            const isHigh = item.severity === "high";
            const isOverdue = item.elapsedMinutes > item.targetSlaMinutes;
            const overdueMin = item.elapsedMinutes - item.targetSlaMinutes;
            const isResolved = item.status === "resolved";

            const severityBorder = isResolved
              ? "#10B981"
              : isCritical
              ? "#EF4444"
              : isHigh
              ? "#F97316"
              : "#FACC15";

            return (
              <div
                key={item.id}
                className="rounded-xl border p-5 transition-all shadow-sm flex flex-col gap-4"
                style={{
                  background: C.card,
                  borderColor: isCritical ? "#EF4444" : C.border,
                  borderLeftWidth: "6px",
                  borderLeftColor: severityBorder,
                }}
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b" style={{ borderColor: C.border }}>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                      {item.id}
                    </span>
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider"
                      style={{
                        background: isResolved ? "#DEF7EC" : isCritical ? "#FEE2E2" : isHigh ? "#FFEDD5" : "#FEF3C7",
                        color: isResolved ? "#03543F" : isCritical ? "#B91C1C" : isHigh ? "#C2410C" : "#B45309",
                      }}
                    >
                      {isResolved ? t("Resolved") : t(item.severity === "critical" ? "Critical SOS" : item.severity === "high" ? "High SLA Breach" : "Moderate Delay")}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                      {t(item.category.toUpperCase())}
                    </span>
                    <span className="text-xs font-normal" style={{ color: C.textSecondary }}>
                      {item.reportedAt}
                    </span>
                  </div>

                  {/* SLA clock indicator */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold"
                      style={{
                        background: isOverdue ? "rgba(239, 68, 68, 0.15)" : "rgba(16, 185, 129, 0.15)",
                        color: isOverdue ? "#EF4444" : "#10B981"
                      }}>
                      <Clock size={13} />
                      <span>{t("Elapsed")}: {item.elapsedMinutes}m / {item.targetSlaMinutes}m</span>
                      {isOverdue && !isResolved && (
                        <span className="ml-1 text-[11px] font-bold px-1.5 py-0.2 rounded bg-red-600 text-white">
                          +{overdueMin}m {t("Overdue")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Main Content Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Issue description */}
                  <div className="md:col-span-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold mb-1">{t(item.title)}</h4>
                      <p className="text-xs leading-relaxed" style={{ color: C.textSecondary }}>
                        {t(item.description)}
                      </p>
                    </div>
                    {item.compensationGiven && (
                      <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        <DollarSign size={14} />
                        <span>{t("Compensation Amount")}: {item.compensationGiven} EGP</span>
                      </div>
                    )}
                  </div>

                  {/* Customer Card */}
                  <div className="p-3.5 rounded-lg border flex flex-col justify-between" style={{ background: C.bg, borderColor: C.border }}>
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                        {t("Customer")}
                      </div>
                      <div className="text-xs font-bold">{item.customerName}</div>
                      <div className="text-xs font-mono" style={{ color: C.textSecondary }}>{item.customerPhone}</div>
                      <div className="flex items-center gap-1 text-xs" style={{ color: C.textSecondary }}>
                        <MapPin size={12} className="shrink-0 text-red-500" />
                        <span className="truncate">{item.location}</span>
                      </div>
                    </div>
                    <a
                      href={`tel:${item.customerPhone}`}
                      className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <Phone size={12} />
                      <span>{t("Call Customer")}</span>
                    </a>
                  </div>

                  {/* Assigned Staff Card */}
                  <div className="p-3.5 rounded-lg border flex flex-col justify-between" style={{ background: C.bg, borderColor: C.border }}>
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                        {t("Assigned Unit")}
                      </div>
                      <div className="text-xs font-bold">{item.assignedStaff}</div>
                      <div className="text-xs font-mono" style={{ color: C.textSecondary }}>{item.assignedRole}</div>
                      {item.vehiclePlate && (
                        <div className="text-xs font-mono px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-800 w-fit">
                          {item.vehiclePlate}
                        </div>
                      )}
                    </div>
                    {item.assignedPhone !== "—" && (
                      <a
                        href={`tel:${item.assignedPhone}`}
                        className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <Phone size={12} />
                        <span>{t("Call Driver")}</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Supervisor Rapid Action Toolbar */}
                <div className="pt-3 border-t flex flex-wrap items-center justify-between gap-3" style={{ borderColor: C.border }}>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium" style={{ color: C.textSecondary }}>
                      {t("Supervisor Actions")}:
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {/* 1. Force Re-dispatch */}
                    {!isResolved && (
                      <button
                        onClick={() => setRedispatchIncident(item)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all hover:bg-orange-50 dark:hover:bg-orange-950/30 text-orange-600 dark:text-orange-400"
                        style={{ borderColor: "#F97316" }}
                      >
                        <RefreshCw size={13} />
                        <span>{t("Force Re-Dispatch")}</span>
                      </button>
                    )}

                    {/* 2. Issue Wallet Credit */}
                    <button
                      onClick={() => setWalletCreditIncident(item)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400"
                      style={{ borderColor: "#10B981" }}
                    >
                      <DollarSign size={13} />
                      <span>{t("Issue Wallet Credit")}</span>
                    </button>

                    {/* 3. Mark Resolved */}
                    {!isResolved ? (
                      <button
                        onClick={() => setResolveIncident(item)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
                      >
                        <CheckCircle2 size={13} />
                        <span>{t("Resolve Incident")}</span>
                      </button>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                        <CheckCircle2 size={15} />
                        <span>{t("Resolved & Closed")}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* MODAL 1: Force Re-Dispatch Modal */}
      {redispatchIncident && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className="w-full max-w-md rounded-2xl border p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95"
            style={{ background: C.card, borderColor: C.border }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RefreshCw size={18} className="text-orange-500" />
                <h3 className="text-base font-bold">{t("Force Re-Dispatch")}</h3>
              </div>
              <button
                onClick={() => setRedispatchIncident(null)}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs" style={{ color: C.textSecondary }}>
              Re-assigning backup unit for incident <span className="font-mono font-bold text-blue-500">{redispatchIncident.id}</span> ({redispatchIncident.title}).
            </p>

            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400">
                {t("Select Backup Driver")}
              </div>
              {BACKUP_PROVIDERS.map((p, idx) => (
                <div
                  key={idx}
                  onClick={() => confirmRedispatch(p.name, p.phone)}
                  className="p-3 rounded-xl border flex items-center justify-between cursor-pointer hover:border-orange-500 hover:bg-orange-50/10 transition-all"
                  style={{ borderColor: C.border }}
                >
                  <div>
                    <div className="text-xs font-bold">{p.name}</div>
                    <div className="text-[11px] text-gray-400">{p.role}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-orange-500">ETA {p.eta}</div>
                    <div className="text-[11px] text-yellow-500">★ {p.rating}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setRedispatchIncident(null)}
                className="px-4 py-2 rounded-xl border text-xs font-semibold"
                style={{ borderColor: C.border }}
              >
                {t("Cancel")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Issue Wallet Credit Modal */}
      {walletCreditIncident && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className="w-full max-w-md rounded-2xl border p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95"
            style={{ background: C.card, borderColor: C.border }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign size={18} className="text-emerald-500" />
                <h3 className="text-base font-bold">{t("Issue Wallet Credit")}</h3>
              </div>
              <button
                onClick={() => setWalletCreditIncident(null)}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs" style={{ color: C.textSecondary }}>
              Grant instant customer wallet compensation to <span className="font-bold">{walletCreditIncident.customerName}</span> for service disruption.
            </p>

            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-400">{t("Compensation Amount")}</label>
              <div className="grid grid-cols-3 gap-2">
                {[50, 100, 200].map(amt => (
                  <button
                    key={amt}
                    onClick={() => setCreditAmount(amt)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${creditAmount === amt ? "border-emerald-500 bg-emerald-500/10 text-emerald-500" : "border-gray-200 dark:border-gray-800"}`}
                  >
                    {amt} EGP
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3">
              <button
                onClick={() => setWalletCreditIncident(null)}
                className="px-4 py-2 rounded-xl border text-xs font-semibold"
                style={{ borderColor: C.border }}
              >
                {t("Cancel")}
              </button>
              <button
                onClick={confirmWalletCredit}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md"
              >
                {t("Credit Customer Wallet")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Resolve Incident Modal */}
      {resolveIncident && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className="w-full max-w-md rounded-2xl border p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95"
            style={{ background: C.card, borderColor: C.border }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-500" />
                <h3 className="text-base font-bold">{t("Resolve Incident")}</h3>
              </div>
              <button
                onClick={() => setResolveIncident(null)}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs" style={{ color: C.textSecondary }}>
              Mark incident <span className="font-mono font-bold text-blue-500">{resolveIncident.id}</span> as resolved and archive from active queue.
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400">{t("Resolution Notes")}</label>
              <textarea
                value={resolveNote}
                onChange={e => setResolveNote(e.target.value)}
                rows={3}
                className="w-full p-2.5 rounded-xl border text-xs outline-none"
                style={{ background: C.bg, borderColor: C.border, color: C.text }}
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setResolveIncident(null)}
                className="px-4 py-2 rounded-xl border text-xs font-semibold"
                style={{ borderColor: C.border }}
              >
                {t("Cancel")}
              </button>
              <button
                onClick={confirmResolve}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md"
              >
                {t("Mark Resolved")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
