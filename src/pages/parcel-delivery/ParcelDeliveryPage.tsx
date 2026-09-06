import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Building2, Bike, Package, AlertTriangle, Filter, Download, MapPin, MoreHorizontal } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import {
  KPICard, Tabs, SearchBar, IconBtn, TableWrapper, Th, Td, Avatar, ModuleTag, StarRating, StatusBadge, OutlineBtn
} from "@/components/ui/CommonUI";

const parcelProviders = [
  { id: "PD-101", name: "SwiftShip",      provId: "M-0461", cities: ["Cairo", "Giza"],         couriers: 18, active: 13, parcelsToday: 94,  avgDelivery: "2.1 hrs", sla: 92, rating: 4.6, status: "active"    },
  { id: "PD-102", name: "FlashEx Egypt",  provId: "M-0462", cities: ["Cairo", "Alexandria"],   couriers: 12, active: 9,  parcelsToday: 61,  avgDelivery: "2.8 hrs", sla: 87, rating: 4.4, status: "active"    },
  { id: "PD-103", name: "NextDay EG",     provId: "M-0463", cities: ["Cairo", "Delta"],        couriers: 22, active: 16, parcelsToday: 118, avgDelivery: "3.2 hrs", sla: 79, rating: 4.2, status: "active"    },
  { id: "PD-104", name: "QuickBox",       provId: "M-0464", cities: ["Alexandria"],            couriers: 8,  active: 5,  parcelsToday: 39,  avgDelivery: "1.9 hrs", sla: 95, rating: 4.7, status: "active"    },
  { id: "PD-105", name: "UrbanPack",      provId: "M-0465", cities: ["Cairo"],                 couriers: 6,  active: 0,  parcelsToday: 0,   avgDelivery: "—",       sla: 52, rating: 3.8, status: "suspended" },
];

const liveParcels = [
  { id: "PKG-5501", provider: "SwiftShip",     sender: "Amr Tech Store",    recipient: "Sara Hassan",   weight: "1.2 kg", zone: "Dokki → Zamalek", eta: "14 min",  status: "in-transit" },
  { id: "PKG-5500", provider: "FlashEx Egypt", sender: "Noon Egypt",        recipient: "Omar Kamal",    weight: "3.5 kg", zone: "Heliopolis → Maadi", eta: "42 min", status: "in-transit" },
  { id: "PKG-5499", provider: "NextDay EG",    sender: "Amazon.eg",         recipient: "Nour Ali",      weight: "0.8 kg", zone: "Giza → New Cairo",   eta: "1.2 hrs", status: "in-transit" },
  { id: "PKG-5498", provider: "QuickBox",      sender: "Private Sender",    recipient: "Layla Fouad",   weight: "2.1 kg", zone: "Alex — Sidi Gaber",  eta: "20 min",  status: "in-transit" },
  { id: "PKG-5497", provider: "SwiftShip",     sender: "Carrefour",         recipient: "Mona Tarek",    weight: "5.0 kg", zone: "Maadi → Downtown",   eta: "—",       status: "failed"     },
];

const parcelZones = [
  { zone: "Cairo – North",   providers: 3, couriers: 18, coverage: "full"    },
  { zone: "Cairo – South",   providers: 2, couriers: 12, coverage: "full"    },
  { zone: "Giza",            providers: 2, couriers: 10, coverage: "full"    },
  { zone: "Alexandria",      providers: 2, couriers: 14, coverage: "full"    },
  { zone: "Delta Region",    providers: 1, couriers: 6,  coverage: "partial" },
  { zone: "Upper Egypt",     providers: 0, couriers: 0,  coverage: "none"    },
  { zone: "Red Sea Coast",   providers: 0, couriers: 0,  coverage: "none"    },
  { zone: "North Sinai",     providers: 0, couriers: 0,  coverage: "none"    },
];

export function ParcelDeliveryPage({ onToast }: { onToast?: (m: string) => void }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState("Provider Network");
  const [pStatuses, setPStatuses] = useState<Record<string, string>>(
    Object.fromEntries(parcelProviders.map(p => [p.id, p.status]))
  );

  const notify = (msg: string) => onToast ? onToast(msg) : null;

  const activeProvs   = parcelProviders.filter(p => pStatuses[p.id] === "active").length;
  const totalCouriers = parcelProviders.filter(p => pStatuses[p.id] === "active").reduce((a, p) => a + p.couriers, 0);
  const activeCouriers= parcelProviders.filter(p => pStatuses[p.id] === "active").reduce((a, p) => a + p.active, 0);
  const parcelsToday  = parcelProviders.filter(p => pStatuses[p.id] === "active").reduce((a, p) => a + p.parcelsToday, 0);
  const failedParcels = liveParcels.filter(p => p.status === "failed").length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <KPICard title={t("Active Providers")}    value={String(activeProvs)}              sub={t("Delivery companies")}           trend="+1"     trendUp    icon={<Building2 size={15} />}  accent={C.green}  />
        <KPICard title={t("Couriers Online")}     value={`${activeCouriers}/${totalCouriers}`} sub={t("Across all providers")}    trend="+6"     trendUp    icon={<Bike size={15} />}       accent={C.blue}   />
        <KPICard title={t("Parcels Today")}       value={String(parcelsToday)}             sub={t("Dispatched across network")}    trend="+22%"   trendUp    icon={<Package size={15} />}    accent={C.orange} />
        <KPICard title={t("Failed Deliveries")}   value={String(failedParcels)}            sub={t("Requiring re-dispatch")}        trend="+1"     trendUp={false} icon={<AlertTriangle size={15} />} accent={C.red} />
      </div>

      {failedParcels > 0 && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs" style={{ background: C.redLight, color: C.red }}>
          <AlertTriangle size={12} /> {failedParcels} parcel(s) marked as failed delivery — customer intervention may be required.
        </div>
      )}

      <div className="flex items-center justify-between">
        <Tabs tabs={["Provider Network", "Live Parcels", "Zone Coverage"]} active={tab} onChange={setTab} />
        <div className="flex gap-2">
          <SearchBar placeholder={t("Search by provider, parcel ID, zone…")} />
          <IconBtn icon={<Filter size={12} />} label={t("Filter")} />
          <IconBtn icon={<Download size={12} />} label={t("Export")} />
        </div>
      </div>

      {tab === "Provider Network" && (
        <TableWrapper>
          <thead>
            <tr><Th>{t("Provider ID")}</Th><Th>{t("Company")}</Th><Th>{t("Coverage Cities")}</Th><Th>{t("Couriers")}</Th><Th>{t("Online")}</Th><Th>{t("Parcels Today")}</Th><Th>{t("Avg Delivery")}</Th><Th>{t("Rating")}</Th><Th>{t("SLA")}</Th><Th>{t("Status")}</Th><Th>{t("Actions")}</Th></tr>
          </thead>
          <tbody>
            {parcelProviders.map(p => (
              <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                <Td mono>{p.provId}</Td>
                <Td><div className="flex items-center gap-2"><Avatar name={p.name} size={24} /><span className="font-medium">{p.name}</span></div></Td>
                <Td><div className="flex flex-wrap gap-1">{p.cities.map(c => <ModuleTag key={c} label={c} />)}</div></Td>
                <Td>{p.couriers}</Td>
                <Td><span style={{ color: p.active > 0 ? C.green : C.red }}>{p.active}</span></Td>
                <Td><span className="font-medium">{p.parcelsToday}</span></Td>
                <Td><span className="text-xs" style={{ color: C.textSecondary }}>{p.avgDelivery}</span></Td>
                <Td><StarRating rating={p.rating} /></Td>
                <Td>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: C.border, width: 48 }}>
                      <div className="h-full rounded-full" style={{ width: `${p.sla}%`, background: p.sla >= 85 ? C.green : p.sla >= 70 ? C.orange : C.red }} />
                    </div>
                    <span className="text-xs font-semibold tabular-nums" style={{ color: p.sla >= 85 ? C.green : p.sla >= 70 ? C.orange : C.red }}>{p.sla}%</span>
                  </div>
                </Td>
                <Td><StatusBadge status={pStatuses[p.id]} /></Td>
                <Td>
                  <div className="flex items-center gap-1">
                    {p.sla < 70 && pStatuses[p.id] === "active" && (
                      <button className="px-2 py-1 rounded text-xs" style={{ background: C.orangeLight, color: C.orange }}
                        onClick={() => notify(`SLA warning issued to ${p.name}.`)}>{t("Warn")}</button>
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

      {tab === "Live Parcels" && (
        <TableWrapper>
          <thead><tr><Th>{t("Parcel ID")}</Th><Th>{t("Provider")}</Th><Th>{t("Sender")}</Th><Th>{t("Recipient")}</Th><Th>{t("Weight")}</Th><Th>{t("Route")}</Th><Th>{t("ETA")}</Th><Th>{t("Status")}</Th><Th>{t("Actions")}</Th></tr></thead>
          <tbody>
            {liveParcels.map(p => (
              <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                <Td mono>{p.id}</Td>
                <Td><span className="text-xs font-medium" style={{ color: C.textPrimary }}>{p.provider}</span></Td>
                <Td><span className="text-xs">{p.sender}</span></Td>
                <Td><div className="flex items-center gap-2"><Avatar name={p.recipient} size={22} />{p.recipient}</div></Td>
                <Td><span className="text-xs" style={{ color: C.textSecondary }}>{p.weight}</span></Td>
                <Td><div className="flex items-center gap-1 text-xs" style={{ color: C.textSecondary }}><MapPin size={10} />{p.zone}</div></Td>
                <Td><span className="font-semibold" style={{ color: p.status === "failed" ? C.red : C.textPrimary }}>{p.eta}</span></Td>
                <Td><StatusBadge status={p.status === "in-transit" ? "in-progress" : p.status} /></Td>
                <Td>
                  <div className="flex gap-1">
                    <OutlineBtn small onClick={() => navigate(`/operations/parcel-delivery/parcels/${p.id}`)}>{t("Track")}</OutlineBtn>
                    {p.status === "failed" && (
                      <button className="px-2 py-1 rounded text-xs font-medium" style={{ background: C.orange, color: "#fff" }}
                        onClick={() => notify(`Re-dispatch initiated for ${p.id}.`)}>{t("Re-dispatch")}</button>
                    )}
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableWrapper>
      )}

      {tab === "Zone Coverage" && (
        <div className="grid grid-cols-4 gap-3">
          {parcelZones.map(z => {
            const color = z.coverage === "full" ? C.green : z.coverage === "partial" ? C.orange : C.red;
            const bg    = z.coverage === "full" ? C.greenLight : z.coverage === "partial" ? C.orangeLight : C.redLight;
            return (
              <div key={z.zone} className="rounded-xl border p-4" style={{ background: C.card, borderColor: color + "60" }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm" style={{ color: C.textPrimary }}>{z.zone}</span>
                  <span className="w-2 h-2 rounded-full" style={{ background: color }}></span>
                </div>
                <div className="space-y-1 text-xs" style={{ color: C.textSecondary }}>
                  <div className="flex justify-between"><span>{t("Providers")}</span><span className="font-medium" style={{ color: C.textPrimary }}>{z.providers}</span></div>
                  <div className="flex justify-between"><span>{t("Active Couriers")}</span><span className="font-medium" style={{ color: z.couriers > 0 ? C.green : C.red }}>{z.couriers}</span></div>
                </div>
                <div className="mt-2.5 px-2 py-1 rounded-full text-center text-xs font-medium capitalize" style={{ background: bg, color }}>
                  {z.coverage === "full" ? "✓ Full Coverage" : z.coverage === "partial" ? "⚠ Partial Coverage" : "✗ No Coverage"}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
