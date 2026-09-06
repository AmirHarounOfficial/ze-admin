import React, { useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router";
import { Calendar, Timer, Star, Lock, Users2, Table as TableIcon } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { RootCtx } from "@/types";
import {
  BackBtn, DetailHeader, OutlineBtn, KPICard, Tabs, TableWrapper, Th, Td, Avatar, StatusBadge, InfoCard, InfoRow
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

export function RestaurantDetailPage() {
  const { id = "RS-101" } = useParams();
  const navigate = useNavigate();
  const { showToast } = useOutletContext<RootCtx>();
  const [tab, setTab] = useState("Today's Reservations");
  const rest = restaurantProviders.find(r => r.id === id) ?? restaurantProviders[0];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <BackBtn to="/operations/restaurant" />
        <DetailHeader title={rest.name} id={id} subtitle={`${rest.city} · Provider ${rest.provider}`} badge={rest.status}
          actions={
            <div className="flex gap-2">
              {!rest.slaOk && <OutlineBtn small onClick={() => showToast("SLA warning sent to restaurant.")}>{t("Send SLA Warning")}</OutlineBtn>}
              <OutlineBtn small onClick={() => showToast("Restaurant suspended.")}><Lock size={13} />{t("Suspend")}</OutlineBtn>
            </div>
          } />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <KPICard title={t("Total Tables")}      value={String(rest.tables)}     sub={t("Registered seating")}     trend="0"       trendUp    icon={<TableIcon size={15} />}       accent={C.blue}   />
        <KPICard title={t("Reservations Today")} value={String(rest.resvsToday)} sub={t("All reservations")}       trend="+5"      trendUp    icon={<Calendar size={15} />}        accent={C.green}  />
        <KPICard title={t("Avg Wait Time")}     value={rest.avgWait}            sub={t("Current avg seating")}    trend="+2 min"  trendUp={false} icon={<Timer size={15} />}      accent={rest.slaOk ? C.orange : C.red} />
        <KPICard title={t("Rating")}            value={String(rest.rating)}     sub={t("Customer rating")}        trend="+0.1"    trendUp    icon={<Star size={15} />}            accent={C.orange} />
      </div>

      <Tabs tabs={["Today's Reservations", "Restaurant Info"]} active={tab} onChange={setTab} />

      {tab === "Today's Reservations" && (
        <TableWrapper>
          <thead><tr><Th>{t("Reservation ID")}</Th><Th>{t("Guest")}</Th><Th>{t("Party")}</Th><Th>{t("Time Slot")}</Th><Th>{t("Table")}</Th><Th>{t("Status")}</Th></tr></thead>
          <tbody>
            {liveReservations.filter(r => r.restaurant === rest.name).concat(liveReservations.slice(0, 2)).slice(0, 4).map((r, i) => (
              <tr key={`${r.id}-${i}`} className="hover:bg-slate-50/60 transition-colors">
                <Td mono>{r.id}</Td>
                <Td><div className="flex items-center gap-2"><Avatar name={r.guest} size={22} />{r.guest}</div></Td>
                <Td><div className="flex items-center gap-1 text-xs"><Users2 size={11} color={C.textSecondary} />{r.party}</div></Td>
                <Td>{r.time}</Td><Td mono>{r.table}</Td>
                <Td><StatusBadge status={r.status} /></Td>
              </tr>
            ))}
          </tbody>
        </TableWrapper>
      )}

      {tab === "Restaurant Info" && (
        <div className="grid grid-cols-2 gap-4">
          <InfoCard title={t("Contact & Location")}>
            <InfoRow label={t("Restaurant")}    value={rest.name} />
            <InfoRow label={t("City")}          value={rest.city} />
            <InfoRow label={t("Provider ID")}   value={rest.provider} mono />
            <InfoRow label={t("Cuisine Type")}  value="Egyptian & International" />
            <InfoRow label={t("Opening Hours")} value="12:00 PM – 11:30 PM" />
            <InfoRow label={t("Phone")}         value="+20 2 000 1234" mono />
          </InfoCard>
          <InfoCard title={t("Platform SLA Status")}>
            <InfoRow label={t("SLA Target")}       value="≤ 20 min avg wait" />
            <InfoRow label={t("Current Avg Wait")} value={<span style={{ color: rest.slaOk ? C.textPrimary : C.red }}>{rest.avgWait}</span>} />
            <InfoRow label={t("SLA Status")}       value={rest.slaOk ? <span style={{ color: C.green }}>✓ Compliant</span> : <span style={{ color: C.red }}>✗ Breach</span>} />
            <InfoRow label={t("Warnings Issued")}  value={rest.slaOk ? "0" : "1"} />
          </InfoCard>
        </div>
      )}
    </div>
  );
}
