import React, { useState, useMemo } from "react";
import {
  DollarSign, TrendingUp, CheckCircle2, Clock, RefreshCw, Wifi, CreditCard,
  Bell, Map, Database, Bike, Navigation, Filter, Eye, AlertTriangle, ShieldCheck,
  Radio, Calendar, MapPin
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { C } from "@/theme";
import { t } from "@/i18n";
import {
  serviceBreakdown,
  detailedRecentBookings,
  emergencyAlerts,
  timeSeriesData,
  gatewayHealthServices,
  activityFeed
} from "@/mock/mockData";
import { KPICard, SectionHeader, IconBtn, TableWrapper, Th, Td, StatusBadge, PrimaryBtn } from "@/components/ui/CommonUI";
import { OrderDetailModal, DetailedBooking } from "@/components/overview/OrderDetailModal";
import { EmergencyAlertBanner } from "@/components/overview/EmergencyAlertBanner";

type TimeRange = "today" | "yesterday" | "7d" | "30d";

export function OverviewPage() {
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState<TimeRange>("today");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedVertical, setSelectedVertical] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<DetailedBooking | null>(null);
  const [alerts, setAlerts] = useState(emergencyAlerts);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  function refresh() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setToastMsg("Telemetry & metrics refreshed successfully.");
      setTimeout(() => setToastMsg(null), 3000);
    }, 700);
  }

  // Filter time series data
  const currentChartData = timeSeriesData[timeRange] || timeSeriesData.today;

  // Filter bookings
  const filteredBookings = useMemo(() => {
    return detailedRecentBookings.filter(b => {
      const matchCity = selectedCity === "all" || b.city.toLowerCase() === selectedCity.toLowerCase();
      const matchVertical = selectedVertical === "all" || b.vertical === selectedVertical;
      return matchCity && matchVertical;
    });
  }, [selectedCity, selectedVertical]);

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 end-6 z-50 px-4 py-2.5 rounded-xl shadow-lg border text-xs font-semibold text-white bg-slate-900 border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          {toastMsg}
        </div>
      )}

      {/* Emergency Operational Alert Banner */}
      <EmergencyAlertBanner
        alerts={alerts}
        onAcknowledge={(id) => {
          setAlerts(prev => prev.filter(a => a.id !== id));
          setToastMsg(`Incident ${id} acknowledged and supervisor notified.`);
          setTimeout(() => setToastMsg(null), 3000);
        }}
      />

      {/* Global Filter Bar */}
      <div
        className="p-3.5 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-xs"
        style={{ background: C.card, borderColor: C.border }}
      >
        <div className="flex items-center gap-2 flex-wrap">
          {/* Time Range Selector */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl gap-1 border" style={{ borderColor: C.border }}>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2" style={{ color: C.textMuted }}>
              <Calendar size={12} className="inline me-1" />
              {t("Period")}
            </span>
            {(["today", "yesterday", "7d", "30d"] as TimeRange[]).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className="text-xs px-2.5 py-1 rounded-lg font-semibold transition-all capitalize"
                style={{
                  background: timeRange === range ? C.gold : "transparent",
                  color: timeRange === range ? "#fff" : C.textSecondary,
                }}
              >
                {range === "today" ? t("Today (Live)") : range === "yesterday" ? t("Yesterday") : range === "7d" ? t("7 Days") : t("30 Days")}
              </button>
            ))}
          </div>

          {/* Territory / City Filter */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs" style={{ borderColor: C.border, background: C.bg }}>
            <MapPin size={13} style={{ color: C.textMuted }} />
            <select
              value={selectedCity}
              onChange={e => setSelectedCity(e.target.value)}
              className="bg-transparent font-medium outline-none cursor-pointer text-xs"
              style={{ color: C.textPrimary }}
            >
              <option value="all">{t("All Territories")}</option>
              <option value="Cairo">{t("Cairo Metro")}</option>
              <option value="Giza">{t("Giza & 6th Oct")}</option>
              <option value="Alexandria">{t("Alexandria")}</option>
            </select>
          </div>

          {/* Service Vertical Filter */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs" style={{ borderColor: C.border, background: C.bg }}>
            <Filter size={13} style={{ color: C.textMuted }} />
            <select
              value={selectedVertical}
              onChange={e => setSelectedVertical(e.target.value)}
              className="bg-transparent font-medium outline-none cursor-pointer text-xs"
              style={{ color: C.textPrimary }}
            >
              <option value="all">{t("All Verticals")}</option>
              <option value="food-delivery">{t("Food Delivery")}</option>
              <option value="home-services">{t("Home Services")}</option>
              <option value="car-services">{t("Car Services")}</option>
              <option value="roadside">{t("Roadside Rescue")}</option>
              <option value="property">{t("Property Rentals")}</option>
              <option value="restaurant">{t("Restaurant Bookings")}</option>
            </select>
          </div>
        </div>

        {/* Live Telemetry Pulse & Refresh */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-xl border text-xs font-semibold" style={{ background: C.greenLight, borderColor: `${C.green}30`, color: C.green }}>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>{t("LIVE TELEMETRY")}</span>
          </div>

          <button
            onClick={refresh}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors shadow-2xs"
            style={{ background: C.bg, borderColor: C.border, color: C.textPrimary }}
          >
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
            <span className="hidden sm:inline">{t("Refresh")}</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <KPICard
          title={t("Gross GMV")}
          value={timeRange === "today" ? "EGP 595K" : timeRange === "yesterday" ? "EGP 520K" : timeRange === "7d" ? "EGP 4.77M" : "EGP 15.3M"}
          sub={t("Platform combined")}
          trend="+11.3%"
          trendUp
          icon={<DollarSign size={15} />}
          accent={C.green}
        />
        <KPICard
          title={t("Net Revenue")}
          value={timeRange === "today" ? "EGP 29.7K" : timeRange === "yesterday" ? "EGP 26.0K" : timeRange === "7d" ? "EGP 238K" : "EGP 766K"}
          sub={t("5% take rate avg")}
          trend="+8.7%"
          trendUp
          icon={<TrendingUp size={15} />}
          accent={C.blue}
        />
        <KPICard
          title={t("Orders In-Flight")}
          value="348"
          sub={t("Currently active")}
          trend="+14.2%"
          trendUp
          icon={<Bike size={15} />}
          accent={C.purple}
        />
        <KPICard
          title={t("Fleet Utilization")}
          value="82.4%"
          sub={t("186 drivers on-duty")}
          trend="+3.5%"
          trendUp
          icon={<Navigation size={15} />}
          accent="#0284C7"
        />
        <KPICard
          title={t("Completion SLA")}
          value="94.2%"
          sub={t("Fulfilled on time")}
          trend="+1.8%"
          trendUp
          icon={<CheckCircle2 size={15} />}
          accent={C.green}
        />
        <KPICard
          title={t("Avg Response")}
          value="38 sec"
          sub={t("Target: < 45 sec")}
          trend="-4 sec"
          trendUp
          icon={<Clock size={15} />}
          accent={C.gold}
        />
      </div>

      {/* Main Visualizations: Revenue Trend & Service Share */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue and GMV Trend Chart */}
        <div className="lg:col-span-2 rounded-2xl border p-5 shadow-xs" style={{ background: C.card, borderColor: C.border }}>
          <div className="flex items-center justify-between mb-3">
            <SectionHeader
              title={t("GMV & Revenue Velocity")}
              subtitle={`${t("Real-time telemetry for period")}: ${timeRange.toUpperCase()}`}
            />
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: C.green }} /> GMV</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: C.blue }} /> Revenue</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={currentChartData} margin={{ top: 8, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient key="grad-gmv" id="gmvG" x1="0" y1="0" x2="0" y2="1">
                  <stop key="gmv-s" offset="5%" stopColor={C.green} stopOpacity={0.2} />
                  <stop key="gmv-e" offset="95%" stopColor={C.green} stopOpacity={0} />
                </linearGradient>
                <linearGradient key="grad-rev" id="revG" x1="0" y1="0" x2="0" y2="1">
                  <stop key="rev-s" offset="5%" stopColor={C.blue} stopOpacity={0.2} />
                  <stop key="rev-e" offset="95%" stopColor={C.blue} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: C.textMuted }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 11, fill: C.textMuted }}
                axisLine={false}
                tickLine={false}
                tickFormatter={v => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  background: C.card,
                  borderColor: C.border,
                  borderRadius: 12,
                  fontSize: 12,
                  color: C.textPrimary,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
              />
              <Area key="area-gmv" type="monotone" dataKey="gmv" stroke={C.green} strokeWidth={2.5} fill="url(#gmvG)" name="Gross GMV (EGP)" />
              <Area key="area-revenue" type="monotone" dataKey="revenue" stroke={C.blue} strokeWidth={2.5} fill="url(#revG)" name="Platform Net Revenue" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Vertical Split Donut */}
        <div className="rounded-2xl border p-5 shadow-xs flex flex-col justify-between" style={{ background: C.card, borderColor: C.border }}>
          <div>
            <SectionHeader title={t("Vertical GMV Split")} subtitle={t("Contribution by industry")} />
            <ResponsiveContainer width="100%" height={165}>
              <PieChart>
                <Pie data={serviceBreakdown} cx="50%" cy="50%" innerRadius={48} outerRadius={72} dataKey="value" paddingAngle={4}>
                  {serviceBreakdown.map((e, i) => <Cell key={`cell-${i}`} fill={e.color} />)}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: C.card,
                    borderColor: C.border,
                    borderRadius: 10,
                    fontSize: 12,
                    color: C.textPrimary,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 mt-2 border-t pt-3" style={{ borderColor: C.border }}>
            {serviceBreakdown.map(s => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                  <span className="font-medium" style={{ color: C.textSecondary }}>{t(s.name)}</span>
                </div>
                <span className="font-bold font-mono" style={{ color: C.textPrimary }}>{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lower Row: Recent Bookings Table & System Health Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Bookings Table */}
        <div className="lg:col-span-2 space-y-3">
          <SectionHeader
            title={t("Live Bookings & Dispatch Ledger")}
            subtitle={`${t("Showing")} ${filteredBookings.length} ${t("recent active orders")} • ${t("Click any row to inspect details")}`}
          />
          <TableWrapper>
            <thead>
              <tr>
                <Th>{t("Order ID")}</Th>
                <Th>{t("Customer")}</Th>
                <Th>{t("Service")}</Th>
                <Th>{t("Merchant / Fleet")}</Th>
                <Th>{t("Amount")}</Th>
                <Th>{t("Status")}</Th>
                <Th>{t("Time")}</Th>
                <Th>{t("Inspect")}</Th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-sm" style={{ color: C.textMuted }}>
                    {t("Updating real-time ledger…")}
                  </td>
                </tr>
              ) : filteredBookings.map(b => (
                <tr
                  key={b.id}
                  onClick={() => setSelectedBooking(b)}
                  className="hover:bg-slate-500/5 transition-colors cursor-pointer group"
                >
                  <Td mono>
                    <span className="font-bold text-xs" style={{ color: C.gold }}>{b.id}</span>
                  </Td>
                  <Td>
                    <div>
                      <div className="font-semibold text-xs" style={{ color: C.textPrimary }}>{b.customer}</div>
                      <div className="text-[10px] font-mono" style={{ color: C.textMuted }}>{b.customerPhone}</div>
                    </div>
                  </Td>
                  <Td>
                    <span className="text-xs font-medium" style={{ color: C.textSecondary }}>{t(b.service)}</span>
                  </Td>
                  <Td>
                    <div className="text-xs font-medium" style={{ color: C.textPrimary }}>{b.provider}</div>
                    {b.assignedWorker && (
                      <div className="text-[10px] truncate max-w-[120px]" style={{ color: C.textMuted }}>
                        {b.assignedWorker}
                      </div>
                    )}
                  </Td>
                  <Td mono>
                    <span className="font-bold text-xs">{b.amount}</span>
                  </Td>
                  <Td>
                    <StatusBadge status={b.status} />
                  </Td>
                  <Td>
                    <span className="text-xs font-mono" style={{ color: C.textMuted }}>{b.time}</span>
                  </Td>
                  <Td>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBooking(b);
                      }}
                      className="p-1 rounded-lg opacity-60 group-hover:opacity-100 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-all"
                      title={t("Inspect Order Details")}
                    >
                      <Eye size={14} style={{ color: C.textSecondary }} />
                    </button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableWrapper>
        </div>

        {/* System Health & Real-Time Feed */}
        <div className="space-y-4">
          {/* Infrastructure Health Card */}
          <div className="rounded-2xl border p-4 shadow-xs" style={{ background: C.card, borderColor: C.border }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: C.textPrimary }}>
                <ShieldCheck size={14} style={{ color: C.green }} />
                {t("Platform Gateway Health")}
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded font-mono" style={{ background: C.greenLight, color: C.green }}>
                99.94% Uptime
              </span>
            </div>

            <div className="space-y-2.5 divide-y divide-slate-200/40 dark:divide-slate-800">
              {gatewayHealthServices.map(srv => (
                <div key={srv.label} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-xs leading-none" style={{ color: C.textPrimary }}>
                      {srv.label}
                    </div>
                    <div className="text-[10px] mt-0.5 font-mono" style={{ color: C.textMuted }}>
                      Latency: <b style={{ color: C.textSecondary }}>{srv.latency}</b> • {srv.uptime}
                    </div>
                  </div>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full capitalize"
                    style={{
                      background: srv.status === "online" ? C.greenLight : C.orangeLight,
                      color: srv.status === "online" ? C.green : C.orange,
                    }}
                  >
                    ● {srv.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Operational Activity Stream */}
          <div className="rounded-2xl border p-4 shadow-xs" style={{ background: C.card, borderColor: C.border }}>
            <div className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center justify-between" style={{ color: C.textPrimary }}>
              <span>{t("Live Activity Feed")}</span>
              <Radio size={13} className="animate-pulse" style={{ color: C.gold }} />
            </div>
            <div className="space-y-2.5 max-h-[220px] overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
              {activityFeed.map(item => (
                <div key={item.id} className="text-xs flex items-start gap-2 p-1.5 rounded-lg hover:bg-slate-500/5 transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="leading-snug" style={{ color: C.textPrimary }}>{item.text}</div>
                    <div className="text-[10px] font-mono mt-0.5" style={{ color: C.textMuted }}>{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Order Detail Modal */}
      <OrderDetailModal
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
        onActionSuccess={(msg) => {
          setToastMsg(msg);
          setTimeout(() => setToastMsg(null), 3000);
        }}
      />
    </div>
  );
}
