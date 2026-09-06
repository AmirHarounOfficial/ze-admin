import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Building2, Wrench, Hammer, DollarSign, Filter, Download, MapPin, MoreHorizontal } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import {
  KPICard, Tabs, SearchBar, IconBtn, TableWrapper, Th, Td, Avatar, ModuleTag, StarRating, StatusBadge, OutlineBtn
} from "@/components/ui/CommonUI";

const homeServiceProviders = [
  { id: "HS-301", name: "FixIt Pro",        provId: "M-0441", city: "Zamalek",     categories: ["Plumbing", "Electrical"], captains: 12, active: 8, rating: 4.6, jobsToday: 24, avgResponse: "18 min", compliance: 91, status: "active"    },
  { id: "HS-302", name: "QuickFix Egypt",   provId: "M-0442", city: "Heliopolis",  categories: ["Painting", "Carpentry"],  captains: 8,  active: 5, rating: 4.4, jobsToday: 17, avgResponse: "22 min", compliance: 84, status: "active"    },
  { id: "HS-303", name: "HomeGuru",         provId: "M-0443", city: "Maadi",       categories: ["Cleaning", "Pest"],       captains: 15, active: 11, rating: 4.7, jobsToday: 31, avgResponse: "14 min", compliance: 96, status: "active"    },
  { id: "HS-304", name: "TechHome Cairo",   provId: "M-0444", city: "New Cairo",   categories: ["AC", "Appliances"],      captains: 9,  active: 6, rating: 4.3, jobsToday: 19, avgResponse: "25 min", compliance: 78, status: "active"    },
  { id: "HS-305", name: "EasyMend",         provId: "M-0445", city: "Giza",        categories: ["Plumbing", "Cleaning"],  captains: 5,  active: 0, rating: 3.9, jobsToday: 0,  avgResponse: "—",      compliance: 55, status: "suspended" },
  { id: "HS-306", name: "FixPro Alex",      provId: "M-0446", city: "Alexandria",  categories: ["Electrical", "AC"],      captains: 7,  active: 4, rating: 4.5, jobsToday: 14, avgResponse: "19 min", compliance: 88, status: "active"    },
];

const homeServiceBookings = [
  { id: "HSB-901", service: "Plumbing Repair",    provider: "FixIt Pro",       customer: "Sara Ahmed",    techName: "Kareem Ali",    scheduledAt: "Jul 9, 10:00 AM", status: "in-progress" },
  { id: "HSB-902", service: "AC Servicing",       provider: "TechHome Cairo",  customer: "Omar Hassan",   techName: "Amr Sayed",     scheduledAt: "Jul 9, 11:30 AM", status: "pending"     },
  { id: "HSB-903", service: "Deep Cleaning",      provider: "HomeGuru",        customer: "Nour Farid",    techName: "Team #HG-7",    scheduledAt: "Jul 9, 2:00 PM",  status: "completed"   },
  { id: "HSB-904", service: "Electrical Fault",   provider: "FixPro Alex",     customer: "Mona Kamal",    techName: "Hassan Emad",   scheduledAt: "Jul 9, 3:30 PM",  status: "pending"     },
  { id: "HSB-905", service: "Painting — 2 rooms", provider: "QuickFix Egypt",  customer: "Youssef Tarek", techName: "Samy Abdou",    scheduledAt: "Jul 10, 9:00 AM", status: "pending"     },
];

const homeCategoryBreakdown = [
  { category: "Plumbing",     count: 38, pct: 22 },
  { category: "Electrical",   count: 29, pct: 17 },
  { category: "AC & Cooling", count: 41, pct: 24 },
  { category: "Cleaning",     count: 27, pct: 16 },
  { category: "Carpentry",    count: 18, pct: 11 },
  { category: "Pest Control", count: 17, pct: 10 },
];

export function HomeServicesPage({ onToast }: { onToast?: (m: string) => void }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState("Provider Network");
  const [pStatuses, setPStatuses] = useState<Record<string, string>>(
    Object.fromEntries(homeServiceProviders.map(p => [p.id, p.status]))
  );

  const notify = (msg: string) => onToast ? onToast(msg) : null;

  const activeProv    = homeServiceProviders.filter(p => pStatuses[p.id] === "active").length;
  const totalTechs    = homeServiceProviders.reduce((a, p) => a + p.captains, 0);
  const activeTechs   = homeServiceProviders.filter(p => pStatuses[p.id] === "active").reduce((a, p) => a + p.active, 0);
  const jobsToday     = homeServiceProviders.filter(p => pStatuses[p.id] === "active").reduce((a, p) => a + p.jobsToday, 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <KPICard title={t("Active Providers")}  value={String(activeProv)}   sub={t("Home service companies")}      trend="+2"    trendUp    icon={<Building2 size={15} />}   accent={C.green}  />
        <KPICard title={t("Technicians Online")} value={`${activeTechs}/${totalTechs}`} sub={t("Across all providers")} trend="+5" trendUp icon={<Wrench size={15} />}     accent={C.blue}   />
        <KPICard title={t("Jobs Today")}        value={String(jobsToday)}    sub={t("Confirmed bookings")}           trend="+12%"  trendUp    icon={<Hammer size={15} />}      accent={C.orange} />
        <KPICard title={t("Platform Revenue")}  value="EGP 34.2K"            sub={t("Home services GMV (Jul)")}      trend="+9.4%" trendUp    icon={<DollarSign size={15} />}  accent={C.purple} />
      </div>

      <div className="flex items-center justify-between">
        <Tabs tabs={["Provider Network", "Live Bookings", "Category Breakdown"]} active={tab} onChange={setTab} />
        <div className="flex gap-2">
          <SearchBar placeholder={t("Search provider, city, category…")} />
          <IconBtn icon={<Filter size={12} />} label={t("Filter")} />
          <IconBtn icon={<Download size={12} />} label={t("Export")} />
        </div>
      </div>

      {tab === "Provider Network" && (
        <TableWrapper>
          <thead>
            <tr><Th>{t("Provider ID")}</Th><Th>{t("Company")}</Th><Th>{t("City")}</Th><Th>{t("Categories")}</Th><Th>{t("Techs")}</Th><Th>{t("Online")}</Th><Th>{t("Jobs Today")}</Th><Th>{t("Avg Response")}</Th><Th>{t("Rating")}</Th><Th>{t("SLA")}</Th><Th>{t("Status")}</Th><Th>{t("Actions")}</Th></tr>
          </thead>
          <tbody>
            {homeServiceProviders.map(p => (
              <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                <Td mono>{p.provId}</Td>
                <Td><div className="flex items-center gap-2"><Avatar name={p.name} size={24} /><span className="font-medium">{p.name}</span></div></Td>
                <Td><div className="flex items-center gap-1 text-xs" style={{ color: C.textSecondary }}><MapPin size={10} />{p.city}</div></Td>
                <Td><div className="flex flex-wrap gap-1">{p.categories.map(c => <ModuleTag key={c} label={c} />)}</div></Td>
                <Td>{p.captains}</Td>
                <Td><span style={{ color: p.active > 0 ? C.green : C.red }}>{p.active}</span></Td>
                <Td><span className="font-medium">{p.jobsToday}</span></Td>
                <Td><span className="font-medium" style={{ color: parseInt(p.avgResponse) > 20 ? C.red : C.textPrimary }}>{p.avgResponse}</span></Td>
                <Td><StarRating rating={p.rating} /></Td>
                <Td>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: C.border, width: 48 }}>
                      <div className="h-full rounded-full" style={{ width: `${p.compliance}%`, background: p.compliance >= 80 ? C.green : p.compliance >= 65 ? C.orange : C.red }} />
                    </div>
                    <span className="text-xs font-semibold tabular-nums" style={{ color: p.compliance >= 80 ? C.green : p.compliance >= 65 ? C.orange : C.red }}>{p.compliance}%</span>
                  </div>
                </Td>
                <Td><StatusBadge status={pStatuses[p.id]} /></Td>
                <Td>
                  <div className="flex items-center gap-1">
                    {p.compliance < 65 && pStatuses[p.id] === "active" && (
                      <button className="px-2 py-1 rounded text-xs" style={{ background: C.orangeLight, color: C.orange }}
                        onClick={() => notify(`Compliance warning sent to ${p.name}.`)}>{t("Warn")}</button>
                    )}
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

      {tab === "Live Bookings" && (
        <TableWrapper>
          <thead><tr><Th>{t("Booking ID")}</Th><Th>{t("Service")}</Th><Th>{t("Provider")}</Th><Th>{t("Customer")}</Th><Th>{t("Technician")}</Th><Th>{t("Scheduled At")}</Th><Th>{t("Status")}</Th><Th>{t("Actions")}</Th></tr></thead>
          <tbody>
            {homeServiceBookings.map(b => (
              <tr key={b.id} className="hover:bg-slate-50/60 transition-colors">
                <Td mono>{b.id}</Td>
                <Td><span className="font-medium">{b.service}</span></Td>
                <Td>{b.provider}</Td>
                <Td><div className="flex items-center gap-2"><Avatar name={b.customer} size={22} />{b.customer}</div></Td>
                <Td><div className="flex items-center gap-1 text-xs"><Wrench size={11} color={C.textSecondary} />{b.techName}</div></Td>
                <Td><span className="text-xs" style={{ color: C.textSecondary }}>{b.scheduledAt}</span></Td>
                <Td><StatusBadge status={b.status} /></Td>
                <Td>
                  <div className="flex gap-1">
                    <OutlineBtn small onClick={() => navigate(`/operations/home-services/bookings/${b.id}`)}>{t("View")}</OutlineBtn>
                    {b.status !== "completed" && (
                      <button className="px-2 py-1 rounded text-xs border hover:bg-red-50" style={{ borderColor: C.red, color: C.red }}
                        onClick={() => notify("Booking cancelled. Customer refunded.")}>{t("Cancel")}</button>
                    )}
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableWrapper>
      )}

      {tab === "Category Breakdown" && (
        <div className="grid grid-cols-3 gap-4">
          {homeCategoryBreakdown.map(cat => (
            <div key={cat.category} className="rounded-xl border p-4" style={{ background: C.card, borderColor: C.border }}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm" style={{ color: C.textPrimary }}>{cat.category}</span>
                <span className="text-xs font-bold" style={{ color: C.gold }}>{cat.pct}%</span>
              </div>
              <div className="w-full h-2 rounded-full mb-3" style={{ background: C.border }}>
                <div className="h-2 rounded-full" style={{ width: `${cat.pct}%`, background: C.gold }} />
              </div>
              <div className="text-xs" style={{ color: C.textSecondary }}>{cat.count} bookings this month</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
