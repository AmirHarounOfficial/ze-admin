import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Bike, Activity, Package, AlertTriangle, Filter, Download, Star, MapPin, MoreHorizontal } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import {
  KPICard, Tabs, SearchBar, IconBtn, TableWrapper, Th, Td, Avatar, StarRating, StatusBadge, OutlineBtn
} from "@/components/ui/CommonUI";

const platformDrivers = [
  { id: "D-401", name: "Maged Samir",    restaurant: "Burger Hub",      restId: "RS-102", vehicle: "Bike",       zone: "Dokki",       deliveries: 12, rating: 4.8, violations: 0, status: "available", verified: true  },
  { id: "D-402", name: "Islam Nabil",    restaurant: "Le Grill",        restId: "RS-101", vehicle: "Motorcycle", zone: "Heliopolis",  deliveries: 9,  rating: 4.6, violations: 1, status: "busy",      verified: true  },
  { id: "D-403", name: "Ramy Fouad",     restaurant: "Nile Brasserie",  restId: "RS-104", vehicle: "Bike",       zone: "Zamalek",     deliveries: 15, rating: 4.9, violations: 0, status: "available", verified: true  },
  { id: "D-404", name: "Ahmed Gouda",    restaurant: "Spice Route",     restId: "RS-105", vehicle: "Scooter",    zone: "Maadi",       deliveries: 7,  rating: 4.4, violations: 2, status: "busy",      verified: true  },
  { id: "D-405", name: "Karim Zidan",    restaurant: "Burger Hub",      restId: "RS-102", vehicle: "Motorcycle", zone: "New Cairo",   deliveries: 3,  rating: 4.5, violations: 0, status: "offline",   verified: true  },
  { id: "D-406", name: "Hossam Wael",    restaurant: "Lotus Garden",    restId: "RS-103", vehicle: "Bike",       zone: "Giza",        deliveries: 11, rating: 4.7, violations: 0, status: "available", verified: true  },
  { id: "D-407", name: "Sherif Hassan",  restaurant: "Le Grill",        restId: "RS-101", vehicle: "Scooter",    zone: "Zamalek",     deliveries: 0,  rating: 0,   violations: 0, status: "offline",   verified: false },
];

const activeOrders = [
  { id: "ORD-7701", driver: "Maged Samir",  restaurant: "Burger Hub",     customer: "Sara Mohamed",  zone: "Dokki",      eta: "8 min",  status: "in-progress" },
  { id: "ORD-7700", driver: "Islam Nabil",  restaurant: "Le Grill",       customer: "Omar Saad",     zone: "Heliopolis", eta: "14 min", status: "in-progress" },
  { id: "ORD-7699", driver: "Ahmed Gouda",  restaurant: "Spice Route",    customer: "Nour Ali",      zone: "Maadi",      eta: "22 min", status: "in-progress" },
  { id: "ORD-7698", driver: "Ramy Fouad",   restaurant: "Nile Brasserie", customer: "Layla Hassan",  zone: "Zamalek",    eta: "5 min",  status: "in-progress" },
];

const zonesCoverage = [
  { zone: "Zamalek",    drivers: 2, active: 2, status: "covered"    },
  { zone: "Heliopolis", drivers: 1, active: 1, status: "covered"    },
  { zone: "Dokki",      drivers: 1, active: 1, status: "covered"    },
  { zone: "Maadi",      drivers: 1, active: 1, status: "covered"    },
  { zone: "Giza",       drivers: 1, active: 1, status: "covered"    },
  { zone: "New Cairo",  drivers: 1, active: 0, status: "low"        },
  { zone: "Downtown",   drivers: 0, active: 0, status: "uncovered"  },
  { zone: "Alexandria", drivers: 0, active: 0, status: "uncovered"  },
];

export function FoodDeliveryPage({ onToast }: { onToast?: (m: string) => void }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState("Driver Fleet");
  const [driverStatuses, setDriverStatuses] = useState<Record<string, string>>(
    Object.fromEntries(platformDrivers.map(d => [d.id, d.status]))
  );

  const notify = (msg: string) => onToast ? onToast(msg) : null;

  const online    = Object.values(driverStatuses).filter(s => s !== "offline").length;
  const uncovered = zonesCoverage.filter(z => z.status === "uncovered").length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <KPICard title={t("Registered Drivers")}   value={String(platformDrivers.length)} sub={t("Across all restaurants")}      trend="+5"     trendUp    icon={<Bike size={15} />}        accent={C.green}  />
        <KPICard title={t("Online Now")}            value={String(online)}                 sub={t("Active on platform")}          trend="+2"     trendUp    icon={<Activity size={15} />}    accent={C.blue}   />
        <KPICard title={t("Orders In Transit")}     value={String(activeOrders.length)}    sub={t("Live deliveries right now")}   trend="+1"     trendUp    icon={<Package size={15} />}     accent={C.orange} />
        <KPICard title={t("Uncovered Zones")}       value={String(uncovered)}              sub={t("No active drivers")}           trend={`+${uncovered}`} trendUp={false} icon={<AlertTriangle size={15} />} accent={C.red} />
      </div>

      {uncovered > 0 && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs" style={{ background: C.redLight, color: C.red }}>
          <AlertTriangle size={12} />
          {zonesCoverage.filter(z => z.status === "uncovered").map(z => z.zone).join(", ")} — no registered drivers. Customers in these zones cannot place delivery orders.
        </div>
      )}

      <div className="flex items-center justify-between">
        <Tabs tabs={["Driver Fleet", "Active Orders", "Zone Coverage"]} active={tab} onChange={setTab} />
        <div className="flex gap-2">
          <SearchBar placeholder={t("Search by driver, restaurant, zone…")} />
          <IconBtn icon={<Filter size={12} />} label={t("Filter")} />
          <IconBtn icon={<Download size={12} />} label={t("Export")} />
        </div>
      </div>

      {tab === "Driver Fleet" && (
        <TableWrapper>
          <thead>
            <tr><Th>{t("Driver ID")}</Th><Th>{t("Driver")}</Th><Th>{t("Assigned Restaurant")}</Th><Th>{t("Vehicle")}</Th><Th>{t("Zone")}</Th><Th>{t("Deliveries")}</Th><Th>{t("Rating")}</Th><Th>{t("Violations")}</Th><Th>{t("Status")}</Th><Th>{t("Platform Actions")}</Th></tr>
          </thead>
          <tbody>
            {platformDrivers.map(d => (
              <tr key={d.id} className="hover:bg-slate-50/60 transition-colors">
                <Td mono>{d.id}</Td>
                <Td>
                  <div className="flex items-center gap-2">
                    <Avatar name={d.name} size={24} />
                    <div>
                      <div className="text-xs font-medium" style={{ color: C.textPrimary }}>{d.name}</div>
                      {!d.verified && <div className="text-xs" style={{ color: C.orange }}>⚠ Unverified</div>}
                    </div>
                  </div>
                </Td>
                <Td>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium" style={{ color: C.textPrimary }}>{d.restaurant}</span>
                    <span className="text-xs" style={{ color: C.textMuted }}>{d.restId}</span>
                  </div>
                </Td>
                <Td><div className="flex items-center gap-1 text-xs" style={{ color: C.textSecondary }}><Bike size={11} />{d.vehicle}</div></Td>
                <Td><span className="text-xs" style={{ color: C.textSecondary }}>{d.zone}</span></Td>
                <Td><span className="font-medium">{d.deliveries}</span></Td>
                <Td>{d.rating > 0 ? <StarRating rating={d.rating} /> : <span className="text-xs" style={{ color: C.textMuted }}>{t("New")}</span>}</Td>
                <Td>
                  <span className="font-medium tabular-nums" style={{ color: d.violations > 1 ? C.red : d.violations === 1 ? C.orange : C.textMuted }}>
                    {d.violations}
                  </span>
                </Td>
                <Td><StatusBadge status={driverStatuses[d.id]} /></Td>
                <Td>
                  <div className="flex items-center gap-1">
                    {d.violations >= 2 && (
                      <button className="px-2 py-1 rounded text-xs font-medium" style={{ background: C.redLight, color: C.red }}
                        onClick={() => { setDriverStatuses(p => ({ ...p, [d.id]: "offline" })); notify(`Driver ${d.name} suspended due to violations.`); }}>{t("Suspend")}</button>
                    )}
                    {!d.verified && (
                      <button className="px-2 py-1 rounded text-xs border hover:bg-green-50" style={{ borderColor: C.green, color: C.green }}
                        onClick={() => notify(`Driver ${d.name} verification approved.`)}>{t("Verify")}</button>
                    )}
                    <button className="p-1 rounded hover:bg-gray-100" onClick={() => navigate(`/operations/food-delivery/drivers/${d.id}`)}><MoreHorizontal size={13} color={C.textSecondary} /></button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableWrapper>
      )}

      {tab === "Active Orders" && (
        <TableWrapper>
          <thead><tr><Th>{t("Order ID")}</Th><Th>{t("Driver")}</Th><Th>{t("Restaurant")}</Th><Th>{t("Customer")}</Th><Th>{t("Delivery Zone")}</Th><Th>{t("ETA")}</Th><Th>{t("Status")}</Th><Th>{t("Actions")}</Th></tr></thead>
          <tbody>
            {activeOrders.map(o => (
              <tr key={o.id} className="hover:bg-slate-50/60 transition-colors">
                <Td mono>{o.id}</Td>
                <Td>{o.driver}</Td><Td>{o.restaurant}</Td>
                <Td><div className="flex items-center gap-2"><Avatar name={o.customer} size={22} />{o.customer}</div></Td>
                <Td><div className="flex items-center gap-1 text-xs" style={{ color: C.textSecondary }}><MapPin size={10} />{o.zone}</div></Td>
                <Td><span className="font-semibold" style={{ color: parseInt(o.eta) > 18 ? C.red : C.textPrimary }}>{o.eta}</span></Td>
                <Td><StatusBadge status={o.status} /></Td>
                <Td>
                  <div className="flex gap-1">
                    <OutlineBtn small onClick={() => navigate(`/operations/food-delivery/orders/${o.id}`)}>{t("Track")}</OutlineBtn>
                    <button className="px-2 py-1 rounded text-xs border hover:bg-red-50" style={{ borderColor: C.red, color: C.red }}
                      onClick={() => notify("Order cancelled. Customer refunded to wallet.")}>{t("Cancel")}</button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableWrapper>
      )}

      {tab === "Zone Coverage" && (
        <div className="grid grid-cols-4 gap-3">
          {zonesCoverage.map(z => {
            const color = z.status === "covered" ? C.green : z.status === "low" ? C.orange : C.red;
            const bg    = z.status === "covered" ? C.greenLight : z.status === "low" ? C.orangeLight : C.redLight;
            return (
              <div key={z.zone} className="rounded-xl border p-4" style={{ background: C.card, borderColor: color + "60" }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm" style={{ color: C.textPrimary }}>{z.zone}</span>
                  <span className="w-2 h-2 rounded-full" style={{ background: color }}></span>
                </div>
                <div className="space-y-1 text-xs" style={{ color: C.textSecondary }}>
                  <div className="flex justify-between"><span>{t("Registered")}</span><span className="font-medium" style={{ color: C.textPrimary }}>{z.drivers}</span></div>
                  <div className="flex justify-between"><span>{t("Online Now")}</span><span className="font-medium" style={{ color: z.active > 0 ? C.green : C.red }}>{z.active}</span></div>
                </div>
                <div className="mt-2.5 px-2 py-1 rounded-full text-center text-xs font-medium capitalize" style={{ background: bg, color }}>
                  {z.status === "covered" ? "✓ Covered" : z.status === "low" ? "⚠ Low Coverage" : "✗ No Coverage"}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
