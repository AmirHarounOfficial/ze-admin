import React, { useState } from "react";
import { useNavigate } from "react-router";
import { UtensilsCrossed, Calendar, AlertTriangle, Star, CheckCircle2, Clock, Users2, Filter, Download, MoreHorizontal } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import {
  KPICard, Tabs, SearchBar, IconBtn, TableWrapper, Th, Td, StatusBadge, Pagination, OutlineBtn
} from "@/components/ui/CommonUI";

const restaurantProviders = [
  { id: "RS-101", name: "Le Grill",        provider: "M-0406", city: "Zamalek",     tables: 42, resvsToday: 38, avgWait: "12 min", rating: 4.7, slaOk: true,  status: "active"    },
  { id: "RS-102", name: "Burger Hub",      provider: "M-0409", city: "Heliopolis",  tables: 28, resvsToday: 21, avgWait: "6 min",  rating: 4.5, slaOk: true,  status: "active"    },
  { id: "RS-103", name: "Lotus Garden",    provider: "M-0422", city: "Maadi",       tables: 60, resvsToday: 55, avgWait: "31 min", rating: 3.9, slaOk: false, status: "active"    },
  { id: "RS-104", name: "Nile Brasserie",  provider: "M-0423", city: "Corniche",    tables: 80, resvsToday: 72, avgWait: "19 min", rating: 4.6, slaOk: true,  status: "active"    },
  { id: "RS-105", name: "Spice Route",     provider: "M-0424", city: "New Cairo",   tables: 35, resvsToday: 11, avgWait: "4 min",  rating: 4.2, slaOk: true,  status: "active"    },
  { id: "RS-106", name: "The Rooftop",     provider: "M-0425", city: "Downtown",    tables: 50, resvsToday: 0,  avgWait: "—",     rating: 4.8, slaOk: true,  status: "suspended" },
];

const liveReservations = [
  { id: "RES-8801", restaurant: "Le Grill",       guest: "Sara Mohamed",  party: 4, time: "8:00 PM", table: "T-14", status: "completed"  },
  { id: "RES-8800", restaurant: "Lotus Garden",    guest: "Ahmed Khaled",  party: 2, time: "8:15 PM", table: "T-07", status: "in-progress" },
  { id: "RES-8799", restaurant: "Nile Brasserie",  guest: "Nour Ali",      party: 6, time: "8:30 PM", table: "T-32", status: "in-progress" },
  { id: "RES-8798", restaurant: "Burger Hub",      guest: "Omar Saad",     party: 3, time: "9:00 PM", table: "T-03", status: "pending"     },
  { id: "RES-8797", restaurant: "Spice Route",     guest: "Layla Hassan",  party: 5, time: "9:30 PM", table: "T-18", status: "pending"     },
];

const slaViolators = restaurantProviders.filter(r => !r.slaOk);

export function RestaurantPage({ onToast }: { onToast?: (m: string) => void }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState("All Restaurants");
  const notify = (msg: string) => onToast ? onToast(msg) : null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <KPICard title={t("Partner Restaurants")} value={String(restaurantProviders.length)} sub={t("Active dining partners")} trend="+2"    trendUp icon={<UtensilsCrossed size={15} />} accent={C.gold}    />
        <KPICard title={t("Reservations Today")}  value="197"                                 sub={t("Bookings placed today")}  trend="+12%" trendUp icon={<Calendar size={15} />}        accent={C.green}   />
        <KPICard title={t("Avg Seating Wait")}    value="14.4 min"                            sub={t("Across all partners")}    trend="-1.2" trendUp icon={<Clock size={15} />}           accent={C.blue}    />
        <KPICard title={t("SLA Breaches")}        value={String(slaViolators.length)}        sub={t("Exceeding wait target")}  trend="+1"   trendUp={false} icon={<AlertTriangle size={15} />} accent={C.red}  />
      </div>

      <div className="flex items-center justify-between">
        <Tabs tabs={["All Restaurants", "Live Reservations", "SLA Monitoring"]} active={tab} onChange={setTab} />
        <div className="flex gap-2">
          <SearchBar placeholder={t("Search restaurant, city…")} />
          <IconBtn icon={<Filter size={12} />} label={t("Filter")} />
          <IconBtn icon={<Download size={12} />} label={t("Export")} />
        </div>
      </div>

      {tab === "All Restaurants" && (
        <>
          <TableWrapper>
            <thead>
              <tr>
                <Th>{t("ID")}</Th><Th>{t("Restaurant")}</Th><Th>{t("City")}</Th><Th>{t("Capacity")}</Th>
                <Th>{t("Reservations Today")}</Th><Th>{t("Avg Wait")}</Th><Th>{t("Rating")}</Th><Th>{t("SLA Status")}</Th><Th>{t("Status")}</Th><Th>{t("Actions")}</Th>
              </tr>
            </thead>
            <tbody>
              {restaurantProviders.map(r => (
                <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                  <Td mono>{r.id}</Td>
                  <Td><span className="font-medium">{r.name}</span></Td>
                  <Td><span className="text-xs" style={{ color: C.textSecondary }}>{r.city}</span></Td>
                  <Td>{r.tables} tables</Td>
                  <Td mono>{r.resvsToday}</Td>
                  <Td mono><span style={{ color: r.slaOk ? C.textPrimary : C.red }}>{r.avgWait}</span></Td>
                  <Td><div className="flex items-center gap-1"><Star size={11} fill={C.orange} color={C.orange} /><span className="text-xs font-medium">{r.rating}</span></div></Td>
                  <Td>
                    {r.slaOk
                      ? <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: C.greenLight, color: C.greenText }}>✓ SLA Met</span>
                      : <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: C.redLight, color: C.red }}>✗ Wait &gt; 20m</span>}
                  </Td>
                  <Td><StatusBadge status={r.status} /></Td>
                  <Td><button className="p-1 rounded hover:bg-gray-100" onClick={() => navigate(`/operations/restaurant/${r.id}`)}><MoreHorizontal size={13} color={C.textSecondary} /></button></Td>
                </tr>
              ))}
            </tbody>
          </TableWrapper>
          <Pagination total="38 partner restaurants" showing="1–6" />
        </>
      )}

      {tab === "Live Reservations" && (
        <TableWrapper>
          <thead><tr><Th>{t("Reservation ID")}</Th><Th>{t("Restaurant")}</Th><Th>{t("Guest")}</Th><Th>{t("Party Size")}</Th><Th>{t("Time Slot")}</Th><Th>{t("Table")}</Th><Th>{t("Status")}</Th><Th>{t("Actions")}</Th></tr></thead>
          <tbody>
            {liveReservations.map(rv => (
              <tr key={rv.id} className="hover:bg-slate-50/60 transition-colors">
                <Td mono>{rv.id}</Td><Td><span className="font-medium">{rv.restaurant}</span></Td>
                <Td>{rv.guest}</Td>
                <Td><div className="flex items-center gap-1 text-xs"><Users2 size={11} color={C.textSecondary} />{rv.party} guests</div></Td>
                <Td>{rv.time}</Td><Td mono>{rv.table}</Td>
                <Td><StatusBadge status={rv.status} /></Td>
                <Td>
                  {rv.status === "pending" && <OutlineBtn small onClick={() => notify("Reservation confirmed.")}>{t("Confirm")}</OutlineBtn>}
                </Td>
              </tr>
            ))}
          </tbody>
        </TableWrapper>
      )}

      {tab === "SLA Monitoring" && (
        <div className="space-y-3">
          <div className="text-xs px-3 py-2 rounded-lg" style={{ background: C.redLight, color: C.red }}>{t("Partners exceeding 20 min average wait time trigger automatic SLA flags. Repeat violations reduce search placement.")}</div>
          <div className="grid grid-cols-2 gap-4">
            {restaurantProviders.map(r => (
              <div key={r.id} className="rounded-xl border p-4" style={{ background: C.card, borderColor: r.slaOk ? C.border : C.red }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm" style={{ color: C.textPrimary }}>{r.name}</span>
                  {r.slaOk
                    ? <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: C.greenLight, color: C.greenText }}>✓ Compliant</span>
                    : <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: C.redLight, color: C.red }}>Breach ({r.avgWait})</span>}
                </div>
                <div className="text-xs space-y-1 mb-3" style={{ color: C.textSecondary }}>
                  <div>{t("Target SLA:")} ≤ 20 min wait time</div>
                  <div>{t("Current Avg Wait:")} <span className="font-medium" style={{ color: r.slaOk ? C.textPrimary : C.red }}>{r.avgWait}</span></div>
                  <div>{t("Reservations Today:")} {r.resvsToday}</div>
                </div>
                <div className="flex gap-2">
                  <OutlineBtn small onClick={() => navigate(`/operations/restaurant/${r.id}`)}>{t("View Details")}</OutlineBtn>
                  {!r.slaOk && <button onClick={() => notify(`Warning sent to ${r.name}.`)} className="px-2.5 py-1 rounded-lg text-xs font-medium" style={{ background: C.red, color: "#fff" }}>{t("Issue Warning")}</button>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
