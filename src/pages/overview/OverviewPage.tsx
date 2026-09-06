import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  DollarSign, TrendingUp, CheckCircle2, Clock, RefreshCw, Wifi, CreditCard, Bell, Map, Database
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { C } from "@/theme";
import { t } from "@/i18n";
import { revenueData, serviceBreakdown, recentBookings, activityFeed } from "@/mock/mockData";
import { KPICard, SectionHeader, IconBtn, TableWrapper, Th, Td, StatusBadge } from "@/components/ui/CommonUI";

export function OverviewPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function refresh() {
    setLoading(true);
    setTimeout(() => setLoading(false), 900);
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <KPICard title={t("Gross GMV")}       value="EGP 1.28M" sub={t("All services combined")}   trend="+11.3%" trendUp icon={<DollarSign size={15} />}    accent={C.green}  />
        <KPICard title={t("Net Revenue")}     value="EGP 64,000" sub={t("5% take rate avg")}       trend="+8.7%"  trendUp icon={<TrendingUp size={15} />}     accent={C.blue}   />
        <KPICard title={t("Completion Rate")} value="87.4%"      sub={t("Bookings completed")}     trend="+2.1%"  trendUp icon={<CheckCircle2 size={15} />}   accent={C.green}  />
        <KPICard title={t("Avg Response")}    value="42 sec"     sub={t("Captain dispatch SLA")}   trend="+5.2%"  trendUp={false} icon={<Clock size={15} />}  accent={C.orange} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 rounded-xl border p-5" style={{ background: C.card, borderColor: C.border }}>
          <SectionHeader title={t("GMV & Revenue Trend")} subtitle={t("Monthly platform performance")} />
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient key="grad-gmv" id="gmvG" x1="0" y1="0" x2="0" y2="1">
                  <stop key="gmv-s" offset="5%"  stopColor={C.green} stopOpacity={0.15} />
                  <stop key="gmv-e" offset="95%" stopColor={C.green} stopOpacity={0}    />
                </linearGradient>
                <linearGradient key="grad-rev" id="revG" x1="0" y1="0" x2="0" y2="1">
                  <stop key="rev-s" offset="5%"  stopColor={C.blue}  stopOpacity={0.15} />
                  <stop key="rev-e" offset="95%" stopColor={C.blue}  stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: C.textMuted }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: C.textMuted }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12 }} />
              <Area key="area-gmv"     type="monotone" dataKey="gmv"     stroke={C.green} strokeWidth={2} fill="url(#gmvG)" name="GMV" />
              <Area key="area-revenue" type="monotone" dataKey="revenue" stroke={C.blue}  strokeWidth={2} fill="url(#revG)" name="Revenue" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border p-5" style={{ background: C.card, borderColor: C.border }}>
          <SectionHeader title={t("Service Split")} subtitle={t("By GMV contribution")} />
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={serviceBreakdown} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
                {serviceBreakdown.map((e, i) => <Cell key={`cell-${i}`} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={{ border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {serviceBreakdown.map(s => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: s.color }}></span>
                  <span style={{ color: C.textSecondary }}>{s.name}</span>
                </div>
                <span className="font-medium" style={{ color: C.textPrimary }}>{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <SectionHeader title={t("Recent Bookings")} subtitle={t("Last 30 minutes")}
            actions={<IconBtn icon={<RefreshCw size={12} className={loading ? "animate-spin" : ""} />} label={t("Refresh")} onClick={refresh} />} />
          <TableWrapper>
            <thead><tr><Th>{t("ID")}</Th><Th>{t("Customer")}</Th><Th>{t("Service")}</Th><Th>{t("Provider")}</Th><Th>{t("Amount")}</Th><Th>{t("Status")}</Th><Th>{t("Time")}</Th></tr></thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="text-center py-8 text-sm" style={{ color: C.textMuted }}>Refreshing data…</td></tr>
              ) : recentBookings.map(b => (
                <tr key={b.id} className="hover:bg-slate-50/60 transition-colors cursor-pointer" onClick={() => navigate(`/customers/${b.customerId}`)}>
                  <Td mono>{b.id}</Td><Td>{b.customer}</Td>
                  <Td><span className="text-xs" style={{ color: C.textSecondary }}>{b.service}</span></Td>
                  <Td>{b.provider}</Td><Td mono>{b.amount}</Td>
                  <Td><StatusBadge status={b.status} /></Td>
                  <Td><span className="text-xs" style={{ color: C.textMuted }}>{b.time}</span></Td>
                </tr>
              ))}
            </tbody>
          </TableWrapper>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border p-4" style={{ background: C.card, borderColor: C.border }}>
            <div className="text-xs font-semibold mb-3 uppercase tracking-wide" style={{ color: C.textSecondary }}>{t("System Health")}</div>
            {[
              { label: "API Gateway", status: "online",   icon: <Wifi size={12} /> },
              { label: "Payfort",     status: "online",   icon: <CreditCard size={12} /> },
              { label: "FCM Push",    status: "online",   icon: <Bell size={12} /> },
              { label: "OSRM",        status: "degraded", icon: <Map size={12} /> },
              { label: "Database",    status: "online",   icon: <Database size={12} /> },
            ].map(sys => (
              <div key={sys.label} className="flex items-center justify-between py-1.5 border-b last:border-0" style={{ borderColor: C.border }}>
                <div className="flex items-center gap-2" style={{ color: C.textSecondary }}>{sys.icon}<span className="text-xs">{sys.label}</span></div>
                <span className="text-xs font-medium" style={{ color: sys.status === "online" ? C.green : C.orange }}>● {sys.status}</span>
              </div>
            ))}
          </div>
          <div className="rounded-xl border p-4" style={{ background: C.card, borderColor: C.border }}>
            <div className="text-xs font-semibold mb-3 uppercase tracking-wide" style={{ color: C.textSecondary }}>{t("Activity Feed")}</div>
            <div className="space-y-3">
              {activityFeed.map((a, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: a.color + "18", color: a.color }}>{a.icon}</div>
                  <div className="flex-1">
                    <div className="text-xs" style={{ color: C.textPrimary }}>{a.text}</div>
                    <div className="text-xs mt-0.5" style={{ color: C.textMuted }}>{a.time} ago</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border p-5" style={{ background: C.card, borderColor: C.border }}>
        <SectionHeader title={t("Monthly Bookings Volume")} subtitle={t("All service modules combined")} />
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={revenueData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: C.textMuted }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: C.textMuted }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12 }} />
            <Bar key="bar-bookings" dataKey="bookings" fill={C.green} radius={[4, 4, 0, 0]} maxBarSize={40} name="Bookings" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
