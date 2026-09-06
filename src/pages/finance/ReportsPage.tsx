import React, { useState } from "react";
import { DollarSign, TrendingUp, Wallet, ArrowDownUp, Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { C } from "@/theme";
import { t } from "@/i18n";
import { KPICard, IconBtn, SectionHeader, TableWrapper, Th, Td } from "@/components/ui/CommonUI";

const reportMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
const reportsData = {
  gmv:      [820000, 932000, 1010000, 940000, 1150000, 1090000, 1280000],
  revenue:  [41000,  46600,  50500,   47000,  57500,   54500,   64000],
  payouts:  [620000, 710000, 770000,  720000, 880000,  840000,  980000],
  refunds:  [12000,  14500,  11000,   16000,  9800,    13200,   10400],
};

const serviceRevenue = [
  { name: "Home Services",  gmv: 312000, revenue: 15600, commRate: "5.0%", color: C.green  },
  { name: "Food Delivery",  gmv: 280000, revenue: 11200, commRate: "4.0%", color: C.orange },
  { name: "Property",       gmv: 240000, revenue: 12000, commRate: "5.0%", color: C.blue   },
  { name: "Car Services",   gmv: 180000, revenue: 7200,  commRate: "4.0%", color: C.purple },
  { name: "Restaurant",     gmv: 160000, revenue: 6400,  commRate: "4.0%", color: C.gold   },
  { name: "Roadside",       gmv: 72000,  revenue: 5760,  commRate: "8.0%", color: C.red    },
  { name: "Parcel",         gmv: 36000,  revenue: 1840,  commRate: "5.1%", color: C.textSecondary },
];

export function ReportsPage() {
  const [period, setPeriod] = useState("Jul 2025");
  const periods = ["Jan 2025", "Feb 2025", "Mar 2025", "Apr 2025", "May 2025", "Jun 2025", "Jul 2025"];
  const chartData = reportMonths.map((m, i) => ({
    month: m,
    gmv:     reportsData.gmv[i],
    revenue: reportsData.revenue[i],
    payouts: reportsData.payouts[i],
    refunds: reportsData.refunds[i],
  }));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {periods.map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className="text-xs px-3 py-1.5 rounded-lg font-medium"
              style={{ background: period === p ? C.gold : C.card, color: period === p ? "#fff" : C.textSecondary, border: `1px solid ${period === p ? C.gold : C.border}` }}>
              {p}
            </button>
          ))}
        </div>
        <IconBtn icon={<Download size={12} />} label={t("Export PDF")} />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <KPICard title={t("Gross GMV")}     value="EGP 1.28M"  sub={t("Jul 2025")}       trend="+17.4%"  trendUp icon={<DollarSign size={15} />}  accent={C.green}  />
        <KPICard title={t("Net Revenue")}   value="EGP 64,000" sub={t("5% avg take")}    trend="+17.4%"  trendUp icon={<TrendingUp size={15} />}  accent={C.blue}   />
        <KPICard title={t("Total Payouts")} value="EGP 980K"   sub={t("To providers")}   trend="+16.7%"  trendUp icon={<Wallet size={15} />}      accent={C.purple} />
        <KPICard title={t("Refunds")}       value="EGP 10,400" sub={t("0.8% of GMV")}    trend="-21.2%"  trendUp={false} icon={<ArrowDownUp size={15} />} accent={C.red} />
      </div>

      <div className="rounded-xl border p-5" style={{ background: C.card, borderColor: C.border }}>
        <SectionHeader title={t("Monthly Financial Trend")} subtitle={t("GMV, Revenue, Payouts & Refunds (YTD)")} />
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: C.textMuted }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: C.textMuted }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip contentStyle={{ border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12 }} formatter={(v: number) => `EGP ${v.toLocaleString()}`} />
            <Bar key="bar-gmv"     dataKey="gmv"     fill={C.green}  name="GMV"     radius={[2,2,0,0]} />
            <Bar key="bar-rev"     dataKey="revenue" fill={C.blue}   name="Revenue" radius={[2,2,0,0]} />
            <Bar key="bar-pay"     dataKey="payouts" fill={C.purple} name="Payouts" radius={[2,2,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-xl border overflow-hidden" style={{ background: C.card, borderColor: C.border }}>
        <div className="px-5 py-3.5 border-b text-sm font-semibold" style={{ borderColor: C.border, color: C.textPrimary }}>Revenue by Service — {period}</div>
        <TableWrapper>
          <thead><tr><Th>{t("Service")}</Th><Th>GMV</Th><Th>Revenue</Th><Th>{t("Commission Rate")}</Th><Th>{t("Share")}</Th></tr></thead>
          <tbody>
            {serviceRevenue.map(s => {
              const totalRev = serviceRevenue.reduce((a, r) => a + r.revenue, 0);
              const share = Math.round((s.revenue / totalRev) * 100);
              return (
                <tr key={s.name} className="hover:bg-slate-50/60 transition-colors">
                  <Td>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                      <span className="font-medium text-sm" style={{ color: C.textPrimary }}>{s.name}</span>
                    </div>
                  </Td>
                  <Td mono>EGP {s.gmv.toLocaleString()}</Td>
                  <Td><span className="font-semibold" style={{ color: C.green }}>EGP {s.revenue.toLocaleString()}</span></Td>
                  <Td><span className="font-mono text-xs px-2 py-0.5 rounded" style={{ background: C.bg, color: C.textSecondary }}>{s.commRate}</span></Td>
                  <Td>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full" style={{ background: C.border, minWidth: 60 }}>
                        <div className="h-1.5 rounded-full" style={{ width: `${share}%`, background: s.color }} />
                      </div>
                      <span className="text-xs font-medium" style={{ color: C.textSecondary }}>{share}%</span>
                    </div>
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </TableWrapper>
      </div>
    </div>
  );
}
