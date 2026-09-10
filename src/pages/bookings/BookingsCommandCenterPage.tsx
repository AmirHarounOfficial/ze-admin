import React, { useState, useEffect, useMemo } from "react";
import {
  UtensilsCrossed, Home, Wrench, Car, Truck, Pizza, Package,
  TrendingUp, TrendingDown, Activity, CheckCircle2, XCircle, AlertTriangle,
  Clock, DollarSign, BarChart3, ArrowRight, Star, Zap, Filter,
  ChevronRight, Flame, Shield
} from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { KPICard, Tabs, SectionHeader } from "@/components/ui/CommonUI";

/* ─── Mock Data: Cross-vertical aggregation ─── */

const verticals = [
  { key: "restaurant",  label: "Restaurant",     icon: <UtensilsCrossed size={16} />, color: "#6366f1", bookingsToday: 197,  revenue: 84200,   slaTarget: 20, slaCurrent: 14.4, slaUnit: "min wait",   compliance: 94, trend: "+12%",  trendUp: true  },
  { key: "property",    label: "Property",        icon: <Home size={16} />,            color: "#de8208", bookingsToday: 31,   revenue: 218000,  slaTarget: 95, slaCurrent: 92,   slaUnit: "% occ.",    compliance: 87, trend: "+6.2%", trendUp: true  },
  { key: "home",        label: "Home Services",   icon: <Wrench size={16} />,          color: "#06854d", bookingsToday: 105,  revenue: 34200,   slaTarget: 20, slaCurrent: 18,   slaUnit: "min resp.", compliance: 91, trend: "+9.4%", trendUp: true  },
  { key: "car",         label: "Car Services",    icon: <Car size={16} />,             color: "#2563EB", bookingsToday: 95,   revenue: 35900,   slaTarget: 60, slaCurrent: 50,   slaUnit: "min job",   compliance: 89, trend: "+11%",  trendUp: true  },
  { key: "roadside",    label: "Roadside",        icon: <Truck size={16} />,           color: "#EF4444", bookingsToday: 42,   revenue: 18900,   slaTarget: 60, slaCurrent: 41,   slaUnit: "sec disp.", compliance: 84, trend: "-4.1%", trendUp: false },
  { key: "food",        label: "Food Delivery",   icon: <Pizza size={16} />,           color: "#7C3AED", bookingsToday: 312,  revenue: 62400,   slaTarget: 30, slaCurrent: 22,   slaUnit: "min del.",  compliance: 91, trend: "+15%",  trendUp: true  },
  { key: "parcel",      label: "Parcel Delivery", icon: <Package size={16} />,         color: "#0891b2", bookingsToday: 312,  revenue: 41500,   slaTarget: 4,  slaCurrent: 2.5,  slaUnit: "hrs del.",  compliance: 88, trend: "+22%",  trendUp: true  },
];

const pipelineData = {
  requested:   1094,
  confirmed:    987,
  inProgress:   623,
  completed:    891,
  cancelled:     62,
};

const activityFeedRaw = [
  { id: 1,  time: "13:42", vertical: "food",       event: "New order",        detail: "ORD-7705 — Burger Hub → Sara Mohamed",          type: "new"       },
  { id: 2,  time: "13:41", vertical: "roadside",   event: "SLA breach",       detail: "IA-5504 — Battery flat, Tahrir Square",          type: "breach"    },
  { id: 3,  time: "13:40", vertical: "home",        event: "Job completed",    detail: "HSB-910 — Deep Cleaning, HomeGuru",              type: "completed" },
  { id: 4,  time: "13:39", vertical: "property",   event: "Booking confirmed",detail: "PR-805 — Nile View Apt, Zamalek",                type: "new"       },
  { id: 5,  time: "13:38", vertical: "car",        event: "Job started",      detail: "CJ-808 — Oil Change, AutoCare Elite",            type: "progress"  },
  { id: 6,  time: "13:37", vertical: "parcel",     event: "Delivery failed",  detail: "PKG-5502 — SwiftShip, Maadi → Downtown",         type: "failed"    },
  { id: 7,  time: "13:36", vertical: "restaurant", event: "Reservation",      detail: "RES-8810 — Le Grill, 4 guests at 9 PM",          type: "new"       },
  { id: 8,  time: "13:35", vertical: "food",       event: "Order delivered",  detail: "ORD-7703 — Nile Brasserie → Omar Saad",          type: "completed" },
  { id: 9,  time: "13:34", vertical: "home",        event: "Technician dispatched", detail: "HSB-911 — AC repair, TechHome Cairo",       type: "progress"  },
  { id: 10, time: "13:33", vertical: "roadside",   event: "Incident resolved",detail: "IA-5501 — Towing, Ring Road",                     type: "completed" },
  { id: 11, time: "13:32", vertical: "car",        event: "Job completed",    detail: "CJ-806 — Brake Pad, ZoomFix",                    type: "completed" },
  { id: 12, time: "13:31", vertical: "parcel",     event: "Parcel picked up", detail: "PKG-5506 — NextDay EG, Amazon order",             type: "progress"  },
];

const topProviders = [
  { rank: 1, name: "HomeGuru",        vertical: "Home Services",   rating: 4.7, completions: 1248, revenue: "EGP 89.4K", trend: "+12%" },
  { rank: 2, name: "ZoomFix",         vertical: "Car Services",    rating: 4.6, completions: 1102, revenue: "EGP 112K",  trend: "+8%"  },
  { rank: 3, name: "SwiftShip",       vertical: "Parcel Delivery", rating: 4.6, completions: 2840, revenue: "EGP 201K",  trend: "+22%" },
  { rank: 4, name: "Le Grill",        vertical: "Restaurant",      rating: 4.7, completions: 892,  revenue: "EGP 156K",  trend: "+5%"  },
  { rank: 5, name: "CairoAssist",     vertical: "Roadside",        rating: 4.6, completions: 768,  revenue: "EGP 67.2K", trend: "+3%"  },
];

/* ─── Component ─── */

export function BookingsCommandCenterPage() {
  const [activeTab, setActiveTab] = useState("Pipeline");
  const [feedPulse, setFeedPulse] = useState(0);

  // Simulate live feed pulse
  useEffect(() => {
    const iv = setInterval(() => setFeedPulse(p => p + 1), 8000);
    return () => clearInterval(iv);
  }, []);

  const totalBookings = verticals.reduce((a, v) => a + v.bookingsToday, 0);
  const totalRevenue  = verticals.reduce((a, v) => a + v.revenue, 0);
  const avgCompliance = Math.round(verticals.reduce((a, v) => a + v.compliance, 0) / verticals.length);
  const breachCount   = verticals.filter(v => v.compliance < 88).length;

  const pipeStages = [
    { label: t("Requested"),   value: pipelineData.requested,   color: "#64748B", pct: 100 },
    { label: t("Confirmed"),   value: pipelineData.confirmed,   color: "#2563EB", pct: Math.round((pipelineData.confirmed / pipelineData.requested) * 100) },
    { label: t("In Progress"), value: pipelineData.inProgress,  color: "#de8208", pct: Math.round((pipelineData.inProgress / pipelineData.requested) * 100) },
    { label: t("Completed"),   value: pipelineData.completed,   color: "#06854d", pct: Math.round((pipelineData.completed / pipelineData.requested) * 100) },
    { label: t("Cancelled"),   value: pipelineData.cancelled,   color: "#EF4444", pct: Math.round((pipelineData.cancelled / pipelineData.requested) * 100) },
  ];

  // Max revenue for bar chart scaling
  const maxRev = Math.max(...verticals.map(v => v.revenue));

  const eventTypeStyles: Record<string, { bg: string; color: string; icon: React.ReactNode }> = {
    new:       { bg: C.blueLight, color: C.blueMid, icon: <Zap size={11} /> },
    completed: { bg: C.greenLight, color: C.green,   icon: <CheckCircle2 size={11} /> },
    progress:  { bg: C.orangeLight, color: C.orange, icon: <ArrowRight size={11} /> },
    breach:    { bg: C.redLight, color: C.red,         icon: <AlertTriangle size={11} /> },
    failed:    { bg: C.redLight, color: C.red,         icon: <XCircle size={11} /> },
  };

  return (
    <div className="space-y-5">
      {/* ─── Hero KPIs ─── */}
      <div className="grid grid-cols-4 gap-4">
        <KPICard title={t("Total Bookings Today")} value={totalBookings.toLocaleString()} sub={t("Across all 7 verticals")}   trend="+14.2%" trendUp icon={<Activity size={15} />}       accent={C.green}  />
        <KPICard title={t("Platform GMV Today")}    value={`EGP ${(totalRevenue / 1000).toFixed(0)}K`} sub={t("Gross merchandise value")} trend="+11.8%" trendUp icon={<DollarSign size={15} />}    accent={C.blue}   />
        <KPICard title={t("Avg SLA Compliance")}    value={`${avgCompliance}%`}                        sub={t("Weighted across verticals")} trend="+2.1%" trendUp icon={<Shield size={15} />}        accent={C.orange} />
        <KPICard title={t("SLA Breaches")}          value={String(breachCount)}                        sub={t("Verticals below 88%")}      trend={`${breachCount}`} trendUp={breachCount === 0} icon={<AlertTriangle size={15} />} accent={C.red} />
      </div>

      {/* ─── 7 Vertical Mini-Cards ─── */}
      <div className="grid grid-cols-7 gap-3">
        {verticals.map(v => (
          <div key={v.key} className="rounded-xl border p-3.5 relative overflow-hidden group cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5" style={{ background: C.card, borderColor: C.border }}>
            {/* Accent strip */}
            <div className="absolute top-0 start-0 end-0 h-1 rounded-t-xl" style={{ background: v.color }} />
            <div className="flex items-center gap-2 mb-2.5 mt-1">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: v.color + "18", color: v.color }}>{v.icon}</div>
              <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: C.textSecondary }}>{t(v.label)}</span>
            </div>
            <div className="text-lg font-bold" style={{ color: C.textPrimary }}>{v.bookingsToday}</div>
            <div className="text-[10px] mt-0.5" style={{ color: C.textMuted }}>{t("bookings today")}</div>
            <div className="flex items-center gap-1 mt-2 text-[10px] font-medium">
              {v.trendUp ? <TrendingUp size={10} color={C.green} /> : <TrendingDown size={10} color={C.red} />}
              <span style={{ color: v.trendUp ? C.green : C.red }}>{v.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Tabs ─── */}
      <Tabs tabs={["Pipeline", "Revenue Chart", "SLA Matrix"]} active={activeTab} onChange={setActiveTab} />

      {/* ─── Tab: Pipeline Funnel ─── */}
      {activeTab === "Pipeline" && (
        <div className="rounded-2xl border p-6" style={{ background: C.card, borderColor: C.border }}>
          <div className="flex items-center gap-2 mb-5">
            <BarChart3 size={16} color={C.textPrimary} />
            <span className="text-sm font-semibold" style={{ color: C.textPrimary }}>{t("Booking Pipeline Funnel")}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-medium ms-2" style={{ background: C.greenLight, color: C.green }}>{t("Today")}</span>
          </div>

          <div className="space-y-3">
            {pipeStages.map((stage, i) => (
              <div key={stage.label} className="flex items-center gap-4">
                <div className="w-24 text-xs font-medium text-end" style={{ color: C.textSecondary }}>{stage.label}</div>
                <div className="flex-1 h-9 rounded-lg overflow-hidden relative" style={{ background: C.bg }}>
                  <div
                    className="h-full rounded-lg transition-all duration-700"
                    style={{ width: `${Math.max(stage.pct, 6)}%`, background: stage.color, opacity: 0.75 }}
                  />
                  <span className="absolute top-1/2 -translate-y-1/2 start-3 text-xs font-bold" style={{ color: C.textPrimary }}>{stage.value.toLocaleString()}</span>
                </div>
                <div className="w-12 text-xs font-medium text-end" style={{ color: C.textMuted }}>
                  {stage.pct}%
                </div>
                {i > 0 && i < pipeStages.length - 1 && (
                  <div className="w-16 text-[10px] font-medium" style={{ color: C.textMuted }}>
                    {Math.round((pipeStages[i].value / pipeStages[i - 1].value) * 100)}% {t("conv.")}
                  </div>
                )}
                {i === 0 && <div className="w-16" />}
                {i === pipeStages.length - 1 && (
                  <div className="w-16 text-[10px] font-medium" style={{ color: C.red }}>
                    {((pipelineData.cancelled / pipelineData.requested) * 100).toFixed(1)}% {t("lost")}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Conversion summary */}
          <div className="flex items-center gap-6 mt-5 pt-4 border-t" style={{ borderColor: C.border }}>
            <div className="text-center">
              <div className="text-lg font-bold" style={{ color: C.green }}>{Math.round((pipelineData.completed / pipelineData.requested) * 100)}%</div>
              <div className="text-[10px]" style={{ color: C.textMuted }}>{t("Completion Rate")}</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold" style={{ color: C.blueMid }}>{Math.round((pipelineData.confirmed / pipelineData.requested) * 100)}%</div>
              <div className="text-[10px]" style={{ color: C.textMuted }}>{t("Confirmation Rate")}</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold" style={{ color: C.red }}>{((pipelineData.cancelled / pipelineData.requested) * 100).toFixed(1)}%</div>
              <div className="text-[10px]" style={{ color: C.textMuted }}>{t("Cancellation Rate")}</div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Tab: Revenue Chart ─── */}
      {activeTab === "Revenue Chart" && (
        <div className="rounded-2xl border p-6" style={{ background: C.card, borderColor: C.border }}>
          <div className="flex items-center gap-2 mb-5">
            <DollarSign size={16} color={C.textPrimary} />
            <span className="text-sm font-semibold" style={{ color: C.textPrimary }}>{t("Revenue by Vertical — This Month")}</span>
          </div>
          <div className="space-y-3">
            {[...verticals].sort((a, b) => b.revenue - a.revenue).map(v => (
              <div key={v.key} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: v.color + "18", color: v.color }}>{v.icon}</div>
                <div className="w-28 text-xs font-medium truncate" style={{ color: C.textPrimary }}>{t(v.label)}</div>
                <div className="flex-1 h-8 rounded-lg overflow-hidden relative" style={{ background: C.bg }}>
                  <div
                    className="h-full rounded-lg transition-all duration-700"
                    style={{ width: `${(v.revenue / maxRev) * 100}%`, background: `linear-gradient(90deg, ${v.color}44, ${v.color}bb)` }}
                  />
                  <span className="absolute top-1/2 -translate-y-1/2 start-3 text-xs font-bold" style={{ color: v.color }}>
                    EGP {(v.revenue / 1000).toFixed(0)}K
                  </span>
                </div>
                <div className="w-14 text-end">
                  <div className="flex items-center justify-end gap-1 text-[10px] font-medium">
                    {v.trendUp ? <TrendingUp size={10} color={C.green} /> : <TrendingDown size={10} color={C.red} />}
                    <span style={{ color: v.trendUp ? C.green : C.red }}>{v.trend}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Total */}
          <div className="flex items-center justify-between mt-5 pt-4 border-t" style={{ borderColor: C.border }}>
            <span className="text-xs font-medium" style={{ color: C.textSecondary }}>{t("Total Platform GMV")}</span>
            <span className="text-lg font-bold" style={{ color: C.textPrimary }}>EGP {(totalRevenue / 1000).toFixed(0)}K</span>
          </div>
        </div>
      )}

      {/* ─── Tab: SLA Matrix ─── */}
      {activeTab === "SLA Matrix" && (
        <div className="rounded-2xl border p-6" style={{ background: C.card, borderColor: C.border }}>
          <div className="flex items-center gap-2 mb-5">
            <Shield size={16} color={C.textPrimary} />
            <span className="text-sm font-semibold" style={{ color: C.textPrimary }}>{t("SLA Health Matrix")}</span>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {/* Header */}
            <div className="grid grid-cols-7 gap-3 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider" style={{ color: C.textMuted }}>
              <span>{t("Vertical")}</span>
              <span>{t("SLA Metric")}</span>
              <span>{t("Target")}</span>
              <span>{t("Current")}</span>
              <span>{t("Compliance")}</span>
              <span>{t("Status")}</span>
              <span>{t("Trend")}</span>
            </div>
            {verticals.map(v => {
              const isOk = v.compliance >= 88;
              const isWarn = v.compliance >= 80 && v.compliance < 88;
              const statusColor = isOk ? C.green : isWarn ? C.orange : C.red;
              const statusBg = isOk ? C.greenLight : isWarn ? C.orangeLight : C.redLight;
              const statusLabel = isOk ? t("Healthy") : isWarn ? t("Warning") : t("Critical");
              return (
                <div key={v.key} className="grid grid-cols-7 gap-3 px-3 py-3 rounded-xl items-center border" style={{ background: C.card, borderColor: C.border }}>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: v.color + "18", color: v.color }}>{v.icon}</div>
                    <span className="text-xs font-medium" style={{ color: C.textPrimary }}>{t(v.label)}</span>
                  </div>
                  <span className="text-xs" style={{ color: C.textSecondary }}>{v.slaUnit}</span>
                  <span className="text-xs font-mono font-medium" style={{ color: C.textPrimary }}>≤ {v.slaTarget}</span>
                  <span className="text-xs font-mono font-bold" style={{ color: statusColor }}>{v.slaCurrent}</span>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: C.bg }}>
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${v.compliance}%`, background: statusColor }} />
                    </div>
                    <span className="text-[10px] font-bold" style={{ color: statusColor }}>{v.compliance}%</span>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full inline-flex items-center gap-1 w-fit" style={{ background: statusBg, color: statusColor }}>
                    {statusLabel}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] font-medium">
                    {v.trendUp ? <TrendingUp size={10} color={C.green} /> : <TrendingDown size={10} color={C.red} />}
                    <span style={{ color: v.trendUp ? C.green : C.red }}>{v.trend}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── Bottom Split: Activity Feed + Top Providers ─── */}
      <div className="grid grid-cols-5 gap-4">
        {/* Live Activity Feed */}
        <div className="col-span-3 rounded-2xl border p-5" style={{ background: C.card, borderColor: C.border }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: C.green }} />
              <span className="text-sm font-semibold" style={{ color: C.textPrimary }}>{t("Live Activity Feed")}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: C.greenLight, color: C.green }}>{t("LIVE")}</span>
            </div>
          </div>
          <div className="space-y-1.5 max-h-[340px] overflow-y-auto">
            {activityFeedRaw.map(ev => {
              const vert = verticals.find(v => v.key === ev.vertical);
              const style = eventTypeStyles[ev.type] || eventTypeStyles.new;
              return (
                <div key={ev.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:shadow-sm transition-all" style={{ background: C.bg }}>
                  <span className="text-[10px] font-mono w-11 flex-shrink-0" style={{ color: C.textMuted }}>{ev.time}</span>
                  <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: (vert?.color || "#888") + "18", color: vert?.color || "#888" }}>
                    {vert?.icon || <Activity size={11} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold" style={{ color: C.textPrimary }}>{t(ev.event)}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium" style={{ background: style.bg, color: style.color }}>{style.icon}</span>
                    </div>
                    <div className="text-[10px] truncate" style={{ color: C.textMuted }}>{ev.detail}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Providers Leaderboard */}
        <div className="col-span-2 rounded-2xl border p-5" style={{ background: C.card, borderColor: C.border }}>
          <div className="flex items-center gap-2 mb-4">
            <Star size={14} color={C.gold} fill={C.gold} />
            <span className="text-sm font-semibold" style={{ color: C.textPrimary }}>{t("Top Providers")}</span>
          </div>
          <div className="space-y-2">
            {topProviders.map((p, i) => (
              <div key={p.rank} className="flex items-center gap-3 px-3 py-3 rounded-xl border" style={{ background: i === 0 ? C.goldLight : C.bg, borderColor: i === 0 ? C.gold + "44" : C.border }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: i < 3 ? C.gold + "22" : C.bg, color: i < 3 ? C.gold : C.textSecondary }}>
                  {p.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold truncate" style={{ color: C.textPrimary }}>{p.name}</div>
                  <div className="text-[10px]" style={{ color: C.textMuted }}>{t(p.vertical)}</div>
                </div>
                <div className="text-end">
                  <div className="flex items-center gap-1 justify-end">
                    <Star size={10} fill={C.orange} color={C.orange} />
                    <span className="text-xs font-bold" style={{ color: C.textPrimary }}>{p.rating}</span>
                  </div>
                  <div className="text-[10px] font-medium" style={{ color: C.textMuted }}>{p.completions.toLocaleString()} {t("jobs")}</div>
                </div>
                <div className="text-end">
                  <div className="text-xs font-bold" style={{ color: C.green }}>{p.revenue}</div>
                  <div className="flex items-center gap-0.5 justify-end">
                    <TrendingUp size={9} color={C.green} />
                    <span className="text-[10px]" style={{ color: C.green }}>{p.trend}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
