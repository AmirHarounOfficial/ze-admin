import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Truck, Battery, Flame, Lock, Wrench, AlertOctagon, UserCheck, Clock, Building2, User, MapPin, Timer } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { IncidentType } from "@/types";
import {
  KPICard, Tabs, StatusBadge, CountdownBadge, SectionHeader, TableWrapper, Th, Td, StarRating, Avatar, ModuleTag
} from "@/components/ui/CommonUI";

const incidentIcon: Record<IncidentType, React.ReactNode> = {
  Towing: <Truck size={14} />, Battery: <Battery size={14} />,
  Fuel: <Flame size={14} />, Unlocking: <Lock size={14} />, Diagnostics: <Wrench size={14} />,
};

const incidentColor: Record<IncidentType, string> = {
  Towing: C.red, Battery: C.orange, Fuel: C.blue, Unlocking: C.purple, Diagnostics: C.green,
};

const liveIncidents = [
  { id: "IA-5501", type: "Towing"      as IncidentType, customer: "Omar Farid",   location: "Ring Road, Cairo",   provider: "QuickTow",    captain: "Captain #C-42", provId: "M-0407", status: "dispatched", eta: "8 min",  seconds: 48, slaAt: 60 },
  { id: "IA-5500", type: "Battery"     as IncidentType, customer: "Nour Khaled",  location: "Tahrir Square",      provider: "FastRescue",  captain: "Unassigned",    provId: "M-0431", status: "pending",    eta: "—",      seconds: 12, slaAt: 60 },
  { id: "IA-5499", type: "Fuel"        as IncidentType, customer: "Ahmed Samir",  location: "Maadi Corniche",     provider: "QuickTow",    captain: "Captain #C-38", provId: "M-0407", status: "dispatched", eta: "12 min", seconds: 55, slaAt: 60 },
  { id: "IA-5498", type: "Unlocking"   as IncidentType, customer: "Hana Fouad",   location: "New Cairo Gate 3",   provider: "CairoAssist", captain: "Captain #C-21", provId: "M-0432", status: "dispatched", eta: "5 min",  seconds: 31, slaAt: 60 },
];

const roadsideProviders = [
  { id: "M-0407", name: "QuickTow",    captains: 8, active: 5, avgResponse: "38 sec", completions: 142, rating: 4.1, slaCompliance: 87, status: "active"    },
  { id: "M-0431", name: "FastRescue",  captains: 5, active: 3, avgResponse: "55 sec", completions: 89,  rating: 4.4, slaCompliance: 72, status: "active"    },
  { id: "M-0432", name: "CairoAssist", captains: 6, active: 4, avgResponse: "41 sec", completions: 117, rating: 4.6, slaCompliance: 94, status: "active"    },
  { id: "M-0433", name: "NileRescue",  captains: 3, active: 0, avgResponse: "—",      completions: 31,  rating: 3.8, slaCompliance: 61, status: "suspended" },
];

export function RoadsidePage({ onToast }: { onToast?: (m: string) => void }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState("Live Dispatch");
  const [pStatuses, setPStatuses] = useState<Record<string, string>>(
    Object.fromEntries(roadsideProviders.map(p => [p.id, p.status]))
  );

  const notify = (msg: string) => onToast ? onToast(msg) : null;

  const totalCaptains = roadsideProviders.reduce((a, p) => a + p.captains, 0);
  const activeCaptains = roadsideProviders.reduce((a, p) => a + p.active, 0);
  const platformAvgSLA = Math.round(roadsideProviders.filter(p => pStatuses[p.id] === "active").reduce((a, p) => a + p.slaCompliance, 0) / Math.max(roadsideProviders.filter(p => pStatuses[p.id] === "active").length, 1));

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-4 gap-4">
        <KPICard title={t("Live Incidents")}     value={String(liveIncidents.length)}  sub={t("Active across all providers")}  trend="+2"     trendUp={false} icon={<AlertOctagon size={15} />} accent={C.red}    />
        <KPICard title={t("Captains Online")}    value={`${activeCaptains}/${totalCaptains}`} sub={t("Across all providers")}  trend="+3"     trendUp    icon={<UserCheck size={15} />}   accent={C.green}  />
        <KPICard title={t("Platform Avg SLA")}   value={`${platformAvgSLA}%`}          sub={t("Within 60s response target")}   trend="-4.1%"  trendUp={false} icon={<Clock size={15} />}     accent={C.orange} />
        <KPICard title={t("Providers Active")}   value={String(roadsideProviders.filter(p => pStatuses[p.id] === "active").length)} sub={t("Roadside service providers")} trend="0" trendUp icon={<Building2 size={15} />} accent={C.blue} />
      </div>

      <div className="flex items-center justify-between">
        <Tabs tabs={["Live Dispatch", "Captain Registry", "Provider Performance"]} active={tab} onChange={setTab} />
        <div className="flex items-center gap-1.5 text-xs" style={{ color: C.red }}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: C.red }}></span>{t("Live monitor — 60s dispatch SLA")}</div>
      </div>

      {tab === "Live Dispatch" && (
        <>
          <div className="grid grid-cols-2 gap-4">
            {liveIncidents.map(inc => {
              const type  = inc.type as IncidentType;
              const color = incidentColor[type];
              return (
                <div key={inc.id} className="rounded-xl border p-5" style={{ background: C.card, borderColor: C.border }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: color + "18", color }}>
                        {incidentIcon[type]}
                      </div>
                      <div>
                        <div className="text-sm font-semibold" style={{ color: C.textPrimary }}>{type} Assistance</div>
                        <div className="text-xs mt-0.5" style={{ color: C.textMuted }}>{inc.id}</div>
                      </div>
                    </div>
                    <StatusBadge status={inc.status} />
                  </div>
                  <div className="space-y-1.5 text-xs mb-3" style={{ color: C.textSecondary }}>
                    <div className="flex items-center gap-1.5"><User size={11} />{inc.customer}</div>
                    <div className="flex items-center gap-1.5"><MapPin size={11} />{inc.location}</div>
                    <div className="flex items-center gap-1.5"><Building2 size={11} />
                      <span className="font-medium" style={{ color: C.textPrimary }}>{inc.provider}</span>
                      <span style={{ color: C.textMuted }}>({inc.provId})</span>
                    </div>
                    <div className="flex items-center gap-1.5"><Truck size={11} />{inc.captain} · ETA {inc.eta}</div>
                  </div>
                  <div className="flex items-center justify-between border-t pt-3 mb-3" style={{ borderColor: C.border }}>
                    <div className="flex items-center gap-1.5 text-xs" style={{ color: C.textMuted }}>
                      <Timer size={11} />{t("Dispatch window:")}</div>
                    <CountdownBadge seconds={inc.seconds} />
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-1.5 rounded-lg text-xs font-medium border hover:bg-gray-50 transition-colors" style={{ borderColor: C.border, color: C.textSecondary }}
                      onClick={() => notify("Manual captain reassignment initiated.")}>{t("Reassign Captain")}</button>
                    <button className="flex-1 py-1.5 rounded-lg text-xs font-medium transition-opacity hover:opacity-90" style={{ background: C.red, color: "#fff" }}
                      onClick={() => notify("Incident cancelled. Customer refunded.")}>{t("Cancel Incident")}</button>
                  </div>
                </div>
              );
            })}
          </div>
          <SectionHeader title={t("Completed Today — All Providers")} />
          <TableWrapper>
            <thead><tr><Th>{t("ID")}</Th><Th>{t("Type")}</Th><Th>{t("Customer")}</Th><Th>{t("Provider")}</Th><Th>{t("Captain")}</Th><Th>{t("Response Time")}</Th><Th>{t("Rating")}</Th><Th>{t("Status")}</Th></tr></thead>
            <tbody>
              {[
                { id: "IA-5497", type: "Diagnostics", customer: "Layla Ali",     provider: "CairoAssist", captain: "Captain #C-12", response: "38 sec", rating: 5.0, status: "completed" },
                { id: "IA-5496", type: "Towing",      customer: "Youssef Fathy", provider: "QuickTow",    captain: "Captain #C-07", response: "52 sec", rating: 4.0, status: "completed" },
                { id: "IA-5495", type: "Battery",     customer: "Mona Hassan",   provider: "FastRescue",  captain: "Captain #C-19", response: "44 sec", rating: 4.5, status: "completed" },
              ].map(r => (
                <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                  <Td mono>{r.id}</Td><Td>{r.type}</Td><Td>{r.customer}</Td>
                  <Td><span className="text-xs font-medium" style={{ color: C.textPrimary }}>{r.provider}</span></Td>
                  <Td>{r.captain}</Td><Td>{r.response}</Td>
                  <Td><StarRating rating={r.rating} /></Td>
                  <Td><StatusBadge status={r.status} /></Td>
                </tr>
              ))}
            </tbody>
          </TableWrapper>
        </>
      )}

      {tab === "Captain Registry" && (
        <TableWrapper>
          <thead><tr><Th>{t("Captain ID")}</Th><Th>{t("Name")}</Th><Th>{t("Provider")}</Th><Th>{t("Specialties")}</Th><Th>{t("Zone")}</Th><Th>{t("Rating")}</Th><Th>{t("Incidents Today")}</Th><Th>{t("Status")}</Th><Th>{t("Actions")}</Th></tr></thead>
          <tbody>
            {[
              { id: "C-42", name: "Mostafa Saad",  provider: "QuickTow",    provId: "M-0407", specs: ["Towing", "Fuel"],         zone: "Ring Road",    rating: 4.3, incidents: 4, status: "busy"      },
              { id: "C-38", name: "Tarek Youssef",  provider: "QuickTow",    provId: "M-0407", specs: ["Fuel", "Battery"],        zone: "Maadi",        rating: 4.5, incidents: 3, status: "available" },
              { id: "C-21", name: "Hassan Emad",    provider: "CairoAssist", provId: "M-0432", specs: ["Unlocking", "Diagnostics"],zone: "New Cairo",   rating: 4.8, incidents: 5, status: "busy"      },
              { id: "C-12", name: "Adel Karim",     provider: "CairoAssist", provId: "M-0432", specs: ["Diagnostics", "Towing"],  zone: "Zamalek",      rating: 4.9, incidents: 6, status: "available" },
              { id: "C-19", name: "Samy Fouad",     provider: "FastRescue",  provId: "M-0431", specs: ["Battery", "Unlocking"],   zone: "Heliopolis",   rating: 4.6, incidents: 2, status: "available" },
            ].map(c => (
              <tr key={c.id} className="hover:bg-slate-50/60 transition-colors">
                <Td mono>#{c.id}</Td>
                <Td><div className="flex items-center gap-2"><Avatar name={c.name} size={24} />{c.name}</div></Td>
                <Td>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium" style={{ color: C.textPrimary }}>{c.provider}</span>
                    <span className="text-xs" style={{ color: C.textMuted }}>{c.provId}</span>
                  </div>
                </Td>
                <Td><div className="flex flex-wrap gap-1">{c.specs.map(s => <ModuleTag key={s} label={s} />)}</div></Td>
                <Td><div className="flex items-center gap-1 text-xs" style={{ color: C.textSecondary }}><MapPin size={10} />{c.zone}</div></Td>
                <Td><StarRating rating={c.rating} /></Td>
                <Td><span className="font-medium">{c.incidents}</span></Td>
                <Td><StatusBadge status={c.status} /></Td>
                <Td><button className="p-1 rounded hover:bg-gray-100" onClick={() => navigate(`/operations/roadside/captains/${c.id}`)}><MoreHorizontal size={13} color={C.textSecondary} /></button></Td>
              </tr>
            ))}
          </tbody>
        </TableWrapper>
      )}

      {tab === "Provider Performance" && (
        <div className="space-y-3">
          <div className="text-xs px-3 py-2 rounded-lg" style={{ background: C.blueLight, color: C.blueMid }}>
            Platform SLA: captains must accept and respond within 60 seconds. Providers falling below 70% compliance are flagged for review.
          </div>
          <TableWrapper>
            <thead><tr><Th>{t("Provider")}</Th><Th>{t("Captains")}</Th><Th>{t("Online Now")}</Th><Th>{t("Avg Response")}</Th><Th>{t("Completions (Month)")}</Th><Th>{t("Rating")}</Th><Th>{t("SLA Compliance")}</Th><Th>{t("Status")}</Th><Th>{t("Actions")}</Th></tr></thead>
            <tbody>
              {roadsideProviders.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                  <Td>
                    <div className="flex items-center gap-2"><Avatar name={p.name} size={24} /><span className="font-medium">{p.name}</span></div>
                  </Td>
                  <Td>{p.captains}</Td>
                  <Td><span style={{ color: p.active > 0 ? C.green : C.red }}>{p.active}</span></Td>
                  <Td><span className="font-medium">{p.avgResponse}</span></Td>
                  <Td>{p.completions}</Td>
                  <Td><StarRating rating={p.rating} /></Td>
                  <Td>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: C.border, width: 60 }}>
                        <div className="h-full rounded-full" style={{ width: `${p.slaCompliance}%`, background: p.slaCompliance >= 80 ? C.green : p.slaCompliance >= 70 ? C.orange : C.red }} />
                      </div>
                      <span className="text-xs font-semibold tabular-nums" style={{ color: p.slaCompliance >= 80 ? C.green : p.slaCompliance >= 70 ? C.orange : C.red }}>
                        {p.slaCompliance}%
                      </span>
                    </div>
                  </Td>
                  <Td><StatusBadge status={pStatuses[p.id]} /></Td>
                  <Td>
                    <div className="flex items-center gap-1">
                      {p.slaCompliance < 70 && pStatuses[p.id] === "active" && (
                        <button className="px-2 py-1 rounded text-xs font-medium" style={{ background: C.orangeLight, color: C.orange }}
                          onClick={() => notify(`Compliance warning issued to ${p.name}.`)}>{t("Warn")}</button>
                      )}
                      {pStatuses[p.id] === "active" ? (
                        <button className="px-2 py-1 rounded text-xs border hover:bg-red-50" style={{ borderColor: C.red, color: C.red }}
                          onClick={() => { setPStatuses(prev => ({ ...prev, [p.id]: "suspended" })); notify(`Provider ${p.name} suspended.`); }}>{t("Suspend")}</button>
                      ) : (
                        <button className="px-2 py-1 rounded text-xs border hover:bg-green-50" style={{ borderColor: C.green, color: C.green }}
                          onClick={() => { setPStatuses(prev => ({ ...prev, [p.id]: "active" })); notify(`Provider ${p.name} reactivated.`); }}>{t("Reactivate")}</button>
                      )}
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableWrapper>
        </div>
      )}
    </div>
  );
}
