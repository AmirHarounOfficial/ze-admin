import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Car, Wrench, Hammer, DollarSign, Filter, Download, MapPin, MoreHorizontal } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import {
  KPICard, Tabs, SearchBar, IconBtn, TableWrapper, Th, Td, Avatar, ModuleTag, StarRating, StatusBadge, OutlineBtn
} from "@/components/ui/CommonUI";

const carServiceProviders = [
  { id: "CS-201", name: "AutoCare Elite",    provId: "M-0451", city: "Maadi",       services: ["Oil Change", "Tyres"],         bays: 8,  activeBays: 6, rating: 4.7, jobsToday: 22, avgDuration: "45 min", revenue: "EGP 8.4K", status: "active"    },
  { id: "CS-202", name: "Pit Stop Cairo",    provId: "M-0452", city: "Heliopolis",  services: ["Detailing", "AC Recharge"],    bays: 5,  activeBays: 4, rating: 4.5, jobsToday: 16, avgDuration: "90 min", revenue: "EGP 6.1K", status: "active"    },
  { id: "CS-203", name: "ZoomFix",           provId: "M-0453", city: "New Cairo",   services: ["Diagnostics", "Brakes"],       bays: 10, activeBays: 7, rating: 4.6, jobsToday: 28, avgDuration: "60 min", revenue: "EGP 11.2K",status: "active"    },
  { id: "CS-204", name: "WheelWorks",        provId: "M-0454", city: "Giza",        services: ["Tyres", "Alignment"],          bays: 6,  activeBays: 3, rating: 4.3, jobsToday: 11, avgDuration: "35 min", revenue: "EGP 4.3K", status: "active"    },
  { id: "CS-205", name: "GearUp Alex",       provId: "M-0455", city: "Alexandria",  services: ["Oil Change", "Diagnostics"],   bays: 7,  activeBays: 5, rating: 4.4, jobsToday: 18, avgDuration: "50 min", revenue: "EGP 5.9K", status: "active"    },
  { id: "CS-206", name: "QuickLane",         provId: "M-0456", city: "Downtown",    services: ["Detailing", "AC Recharge"],    bays: 4,  activeBays: 0, rating: 3.7, jobsToday: 0,  avgDuration: "—",      revenue: "—",        status: "suspended" },
];

const liveCarJobs = [
  { id: "CJ-801", service: "Full Oil Change",     provider: "AutoCare Elite",  customer: "Ahmed Saad",    vehicle: "Toyota Camry 2020",  bay: "Bay 3", eta: "10 min",  status: "in-progress" },
  { id: "CJ-802", service: "AC Recharge",         provider: "Pit Stop Cairo",  customer: "Layla Hassan",  vehicle: "Kia Sportage 2022",  bay: "Bay 1", eta: "35 min",  status: "in-progress" },
  { id: "CJ-803", service: "Wheel Alignment",     provider: "WheelWorks",      customer: "Omar Farid",    vehicle: "Hyundai Elantra",    bay: "Bay 2", eta: "20 min",  status: "in-progress" },
  { id: "CJ-804", service: "Brake Pad Replacement",provider: "ZoomFix",        customer: "Nour Mohamed",  vehicle: "BMW 3 Series 2019",  bay: "Bay 7", eta: "55 min",  status: "pending"     },
];

export function CarServicesPage({ onToast }: { onToast?: (m: string) => void }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState("Provider Network");
  const [pStatuses, setPStatuses] = useState<Record<string, string>>(
    Object.fromEntries(carServiceProviders.map(p => [p.id, p.status]))
  );

  const notify = (msg: string) => onToast ? onToast(msg) : null;

  const activeProvs  = carServiceProviders.filter(p => pStatuses[p.id] === "active").length;
  const totalBays    = carServiceProviders.filter(p => pStatuses[p.id] === "active").reduce((a, p) => a + p.bays, 0);
  const activeBays   = carServiceProviders.filter(p => pStatuses[p.id] === "active").reduce((a, p) => a + p.activeBays, 0);
  const jobsToday    = carServiceProviders.filter(p => pStatuses[p.id] === "active").reduce((a, p) => a + p.jobsToday, 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <KPICard title={t("Active Garages")}     value={String(activeProvs)}          sub={t("Car service providers")}          trend="+1"     trendUp    icon={<Car size={15} />}          accent={C.green}  />
        <KPICard title={t("Bays In Use")}        value={`${activeBays}/${totalBays}`} sub={t("Across all active providers")}    trend="+4"     trendUp    icon={<Wrench size={15} />}       accent={C.blue}   />
        <KPICard title={t("Jobs Today")}         value={String(jobsToday)}            sub={t("Completed + in-progress")}        trend="+15%"   trendUp    icon={<Hammer size={15} />}       accent={C.orange} />
        <KPICard title={t("Platform GMV")}       value="EGP 35.9K"                    sub={t("Car services revenue (Jul)")}     trend="+11.2%" trendUp    icon={<DollarSign size={15} />}   accent={C.purple} />
      </div>

      <div className="flex items-center justify-between">
        <Tabs tabs={["Provider Network", "Live Jobs", "Service Category Mix"]} active={tab} onChange={setTab} />
        <div className="flex gap-2">
          <SearchBar placeholder={t("Search by garage, city, service type…")} />
          <IconBtn icon={<Filter size={12} />} label={t("Filter")} />
          <IconBtn icon={<Download size={12} />} label={t("Export")} />
        </div>
      </div>

      {tab === "Provider Network" && (
        <TableWrapper>
          <thead>
            <tr><Th>{t("Provider ID")}</Th><Th>{t("Garage")}</Th><Th>{t("City")}</Th><Th>{t("Services")}</Th><Th>{t("Total Bays")}</Th><Th>{t("Active Bays")}</Th><Th>{t("Jobs Today")}</Th><Th>{t("Avg Duration")}</Th><Th>{t("Rating")}</Th><Th>{t("Revenue (Jul)")}</Th><Th>{t("Status")}</Th><Th>{t("Actions")}</Th></tr>
          </thead>
          <tbody>
            {carServiceProviders.map(p => (
              <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                <Td mono>{p.provId}</Td>
                <Td><div className="flex items-center gap-2"><Avatar name={p.name} size={24} /><span className="font-medium">{p.name}</span></div></Td>
                <Td><div className="flex items-center gap-1 text-xs" style={{ color: C.textSecondary }}><MapPin size={10} />{p.city}</div></Td>
                <Td><div className="flex flex-wrap gap-1">{p.services.map(s => <ModuleTag key={s} label={s} />)}</div></Td>
                <Td>{p.bays}</Td>
                <Td>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: C.border, width: 40 }}>
                      <div className="h-full rounded-full" style={{ width: `${(p.activeBays / p.bays) * 100}%`, background: C.blue }} />
                    </div>
                    <span className="text-xs tabular-nums" style={{ color: C.textPrimary }}>{p.activeBays}</span>
                  </div>
                </Td>
                <Td><span className="font-medium">{p.jobsToday}</span></Td>
                <Td><span className="text-xs" style={{ color: C.textSecondary }}>{p.avgDuration}</span></Td>
                <Td><StarRating rating={p.rating} /></Td>
                <Td mono>{p.revenue}</Td>
                <Td><StatusBadge status={pStatuses[p.id]} /></Td>
                <Td>
                  <div className="flex items-center gap-1">
                    {pStatuses[p.id] === "active"
                      ? <button className="px-2 py-1 rounded text-xs border hover:bg-red-50" style={{ borderColor: C.red, color: C.red }}
                          onClick={() => { setPStatuses(prev => ({ ...prev, [p.id]: "suspended" })); notify(`${p.name} suspended from platform.`); }}>{t("Suspend")}</button>
                      : <button className="px-2 py-1 rounded text-xs border hover:bg-green-50" style={{ borderColor: C.green, color: C.green }}
                          onClick={() => { setPStatuses(prev => ({ ...prev, [p.id]: "active" })); notify(`${p.name} reinstated.`); }}>{t("Reinstate")}</button>
                    }
                    <button className="p-1 rounded hover:bg-gray-100" onClick={() => navigate(`/providers/registry/${p.provId}`)}><MoreHorizontal size={13} color={C.textSecondary} /></button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableWrapper>
      )}

      {tab === "Live Jobs" && (
        <TableWrapper>
          <thead><tr><Th>{t("Job ID")}</Th><Th>{t("Service")}</Th><Th>{t("Garage")}</Th><Th>{t("Customer")}</Th><Th>{t("Vehicle")}</Th><Th>{t("Bay")}</Th><Th>{t("ETA")}</Th><Th>{t("Status")}</Th><Th>{t("Actions")}</Th></tr></thead>
          <tbody>
            {liveCarJobs.map(j => (
              <tr key={j.id} className="hover:bg-slate-50/60 transition-colors">
                <Td mono>{j.id}</Td>
                <Td><span className="font-medium">{j.service}</span></Td>
                <Td>{j.provider}</Td>
                <Td><div className="flex items-center gap-2"><Avatar name={j.customer} size={22} />{j.customer}</div></Td>
                <Td><span className="text-xs" style={{ color: C.textSecondary }}>{j.vehicle}</span></Td>
                <Td mono>{j.bay}</Td>
                <Td><span className="font-medium">{j.eta}</span></Td>
                <Td><StatusBadge status={j.status} /></Td>
                <Td>
                  <div className="flex gap-1">
                    <OutlineBtn small onClick={() => navigate(`/operations/car-services/jobs/${j.id}`)}>{t("View")}</OutlineBtn>
                    {j.status !== "completed" && (
                      <button className="px-2 py-1 rounded text-xs border hover:bg-red-50" style={{ borderColor: C.red, color: C.red }}
                        onClick={() => notify("Job cancelled.")}>{t("Cancel")}</button>
                    )}
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableWrapper>
      )}

      {tab === "Service Category Mix" && (
        <div className="grid grid-cols-3 gap-4">
          {[
            { cat: "Oil Change & Lubricants", count: 84, pct: 36 },
            { cat: "Tyres & Alignment",       count: 52, pct: 22 },
            { cat: "Brake System Repair",     count: 41, pct: 18 },
            { cat: "Auto Detailing & Wash",   count: 31, pct: 13 },
            { cat: "AC Maintenance & Gas",    count: 26, pct: 11 },
          ].map(c => (
            <div key={c.cat} className="rounded-xl border p-4" style={{ background: C.card, borderColor: C.border }}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm" style={{ color: C.textPrimary }}>{c.cat}</span>
                <span className="text-xs font-bold" style={{ color: C.blue }}>{c.pct}%</span>
              </div>
              <div className="w-full h-2 rounded-full mb-3" style={{ background: C.border }}>
                <div className="h-2 rounded-full" style={{ width: `${c.pct * 2.5}%`, background: C.blue }} />
              </div>
              <div className="text-xs" style={{ color: C.textSecondary }}>{c.count} jobs completed this month</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
