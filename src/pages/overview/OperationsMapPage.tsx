import React, { useState } from "react";
import { Activity, Navigation, Bike, Timer, MapPin } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { C } from "@/theme";
import { t } from "@/i18n";
import { mapZones } from "@/mock/mockData";
import { KPICard } from "@/components/ui/CommonUI";

const liveIncidentsFeed = [
  { id: "INC-441", type: "Delay",    service: "Food Delivery", zone: "Dokki", time: "2 min ago",  severity: "warning" },
  { id: "INC-440", type: "Dispatch", service: "Roadside",      zone: "Nasr City", time: "4 min ago", severity: "info" },
  { id: "INC-439", type: "SOS",      service: "Roadside",      zone: "Heliopolis", time: "7 min ago", severity: "critical" },
  { id: "INC-438", type: "Delay",    service: "Parcel",        zone: "Maadi", time: "11 min ago", severity: "warning" },
  { id: "INC-437", type: "Dispatch", service: "Home Services", zone: "Zamalek", time: "14 min ago", severity: "info" },
];

export function OperationsMapPage() {
  const [selectedCity, setSelectedCity] = useState("Cairo");
  const zone = mapZones.find(z => z.city === selectedCity) ?? mapZones[0];

  const serviceActivity = [
    { name: "Food Delivery", value: 38, color: C.orange },
    { name: "Roadside",      value: 24, color: C.red    },
    { name: "Home Services", value: 31, color: C.green  },
    { name: "Parcel",        value: 19, color: C.blue   },
    { name: "Car Services",  value: 15, color: C.purple },
    { name: "Restaurant",    value: 15, color: C.gold   },
  ];

  const coverageColor = (v: number) => v >= 90 ? C.green : v >= 75 ? C.orange : C.red;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-4 gap-4">
        <KPICard title={t("Total Active Jobs")}     value={mapZones.reduce((s, z) => s + z.activeJobs, 0).toString()} sub={t("Across all cities")}   trend="+12%" trendUp icon={<Activity size={15} />}    accent={C.green}  />
        <KPICard title={t("Active Captains")}       value={mapZones.reduce((s, z) => s + z.captains, 0).toString()}  sub={t("Online & available")}  trend="+4%"  trendUp icon={<Navigation size={15} />}  accent={C.blue}   />
        <KPICard title={t("Delivery Drivers")}      value={mapZones.reduce((s, z) => s + z.drivers, 0).toString()}   sub={t("Active & on-route")}   trend="+7%"  trendUp icon={<Bike size={15} />}        accent={C.purple} />
        <KPICard title={t("Avg Dispatch Time")}     value="4.1 min"                                                   sub={t("Platform-wide SLA")}   trend="-0.3" trendUp icon={<Timer size={15} />}       accent={C.orange} />
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Zone map panel */}
        <div className="col-span-2 rounded-xl border overflow-hidden" style={{ background: C.card, borderColor: C.border }}>
          <div className="px-5 py-3.5 border-b flex items-center justify-between" style={{ borderColor: C.border }}>
            <div>
              <div className="text-sm font-semibold" style={{ color: C.textPrimary }}>{t("City Coverage Overview")}</div>
              <div className="text-xs mt-0.5" style={{ color: C.textMuted }}>{t("Real-time active job distribution")}</div>
            </div>
            <div className="flex gap-1.5">
              {mapZones.map(z => (
                <button key={z.city} onClick={() => setSelectedCity(z.city)}
                  className="text-xs px-2.5 py-1.5 rounded-lg font-medium transition-colors"
                  style={{ background: selectedCity === z.city ? C.gold : C.bg, color: selectedCity === z.city ? "#fff" : C.textSecondary, border: `1px solid ${selectedCity === z.city ? C.gold : C.border}` }}>
                  {z.city}
                </button>
              ))}
            </div>
          </div>

          {/* Selected zone detail */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={14} style={{ color: C.gold }} />
              <span className="text-sm font-semibold" style={{ color: C.textPrimary }}>{zone.city} Operations Zone</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-5">
              {[
                { label: "Active Jobs",    value: zone.activeJobs, unit: "jobs",    color: C.green  },
                { label: "Captains",       value: zone.captains,   unit: "online",  color: C.blue   },
                { label: "Drivers",        value: zone.drivers,    unit: "on-route",color: C.purple },
                { label: "Avg Response",   value: zone.avgResp,    unit: "",        color: C.orange },
              ].map(s => (
                <div key={s.label} className="rounded-lg p-4" style={{ background: C.bg, border: `1px solid ${C.border}` }}>
                  <div className="text-xs mb-1" style={{ color: C.textMuted }}>{s.label}</div>
                  <div className="text-xl font-bold" style={{ color: s.color }}>{s.value}</div>
                  {s.unit && <div className="text-xs mt-0.5" style={{ color: C.textSecondary }}>{s.unit}</div>}
                </div>
              ))}
            </div>

            {/* Coverage bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium" style={{ color: C.textSecondary }}>{t("Zone Coverage")}</span>
                <span className="text-xs font-bold" style={{ color: coverageColor(zone.coverage) }}>{zone.coverage}%</span>
              </div>
              <div className="w-full h-2 rounded-full" style={{ background: C.border }}>
                <div className="h-2 rounded-full transition-all" style={{ width: `${zone.coverage}%`, background: coverageColor(zone.coverage) }} />
              </div>
            </div>

            {/* All cities summary */}
            <div className="space-y-2">
              {mapZones.map(z => (
                <div key={z.city} className="flex items-center gap-3 text-xs" onClick={() => setSelectedCity(z.city)} style={{ cursor: "pointer" }}>
                  <div className="w-20 font-medium" style={{ color: z.city === selectedCity ? C.gold : C.textPrimary }}>{z.city}</div>
                  <div className="flex-1 h-1.5 rounded-full" style={{ background: C.border }}>
                    <div className="h-1.5 rounded-full" style={{ width: `${z.coverage}%`, background: z.city === selectedCity ? C.gold : coverageColor(z.coverage) }} />
                  </div>
                  <div className="w-12 text-right font-medium" style={{ color: C.textSecondary }}>{z.activeJobs} jobs</div>
                  <div className="w-14 text-right" style={{ color: C.textMuted }}>{z.avgResp}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Service breakdown + live feed */}
        <div className="space-y-4">
          <div className="rounded-xl border p-5" style={{ background: C.card, borderColor: C.border }}>
            <div className="text-sm font-semibold mb-3" style={{ color: C.textPrimary }}>{t("Active by Service")}</div>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={serviceActivity} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value" paddingAngle={3}>
                  {serviceActivity.map((e, i) => <Cell key={`map-cell-${i}`} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={{ border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-1">
              {serviceActivity.map(s => (
                <div key={s.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                    <span style={{ color: C.textSecondary }}>{s.name}</span>
                  </div>
                  <span className="font-medium" style={{ color: C.textPrimary }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border overflow-hidden" style={{ background: C.card, borderColor: C.border }}>
            <div className="px-4 py-3 border-b text-xs font-semibold" style={{ borderColor: C.border, color: C.textPrimary }}>{t("Live Incident Feed")}</div>
            <div className="divide-y" style={{ borderColor: C.border }}>
              {liveIncidentsFeed.map(inc => (
                <div key={inc.id} className="px-4 py-2.5 flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                    style={{ background: inc.severity === "critical" ? C.red : inc.severity === "warning" ? C.orange : C.blue }} />
                  <div className="min-w-0">
                    <div className="text-xs font-medium" style={{ color: C.textPrimary }}>{inc.type} — {inc.service}</div>
                    <div className="text-xs" style={{ color: C.textMuted }}>{inc.zone} · {inc.time}</div>
                  </div>
                  <span className="text-xs font-mono shrink-0" style={{ color: C.textMuted }}>{inc.id}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
